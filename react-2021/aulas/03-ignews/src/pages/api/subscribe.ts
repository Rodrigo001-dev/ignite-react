/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { query as q } from "faunadb";

import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async (request: NextApiRequest, response: NextApiResponse) => {
  // estou verificando se o método da requisição é POST pois eu só quero aceitar
  // requisições do tipo POST porque eu estou criando uma checkout session do
  // stripe
  if (request.method === "POST") {
    // pegando a sessão do usuário utilizando o getSession, que vai buscar essa
    // informação nos cookies pois eu não consigo acessar as informações do
    // localStorage dentro do backend do Next mas as informações dos cookies eu
    // consigo acessar tanto do front quanto do back
    const session = await getSession({ req: request });

    // pegando as informações do usuário no Fauna
    const user = await fauna.query<User>(
      q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
    );

    // pegando o valor do stripe_customer_id dentro do Fauna
    let customerId = user.data.stripe_customer_id;

    // se o customerId não existir, ou seja, se o usuário que está salvo no
    // banco de dados ainda não tem um stripe_customer_id
    if (!customerId) {
      // eu vou cadastrar o usuário dentro do stripe
      const stripeCustomer = await stripe.customers.create({
        // o email é uma informação obrigatória
        email: session.user.email,
      });

      // atualizando as informações de 1 usuário colocando o id do customer que
      // foi criado dentro do stripe
      await fauna.query(
        q.Update(q.Ref(q.Collection("users"), user.ref.id), {
          data: {
            stripe_customer_id: stripeCustomer.id,
          },
        })
      );

      // reatribuindo o valor do stripe_customer_id para a variável
      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      // eu preciso passar algumas informações para criar o checkout
      // o customer é quem está comprando esse pacote(plano, produto, etc)
      // stripeCustomer.id é id do customer no stripe e não no Fauna
      customer: customerId,
      // a primeira informação é quais métodos de pagamento eu quero aceitar
      payment_method_types: ["card"],
      // o billing_address_collection fala se eu quero obrigar o usuário a
      // preencher o endereço ou se eu quero deixar isso como automático
      billing_address_collection: "required",
      // line_items é quais são os items que o usuário vai ter dentro do
      // carrinho
      line_items: [
        // o price é o id do preço
        { price: "price_1LpI2TBXG0NwZs9IJqRdjoh9", quantity: 1 },
      ],
      // o mode é o modelo do pagamento, no caso é um pagamento
      // recorrente(subscription) e não um pagamento de uma única vez
      mode: "subscription",
      // deixei como true porque talvez algum dia tenha um cupom de desconto ou
      // algo do tipo
      allow_promotion_codes: true,
      // o success_url é para quando der sucesso para redirecionar o usuário
      success_url: process.env.STRIPE_SUCCESS_URL,
      // o cancel_url é para onde o usuário tem que ser redirecionado quando
      // ele cancela a requisição
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return response.status(200).json({ sessionId: stripeCheckoutSession.id });
  } else {
    // se não for uma requisição com método HTTP POST
    // eu vou explicar para o front-end(para quem está fazendo a requisição) que
    // o método que essa rota aqui aceita(Allow) é POST
    response.setHeader("Allow", "POST");
    // e vou devolver uma resposta com erro 405 para informar que o método não
    // é permitido
    response.status(405).end("Method not allowed");
  }
};
