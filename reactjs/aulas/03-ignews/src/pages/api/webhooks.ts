// webhooks é quando uma aplicação terceira avisa a nossa aplicação que algun
// evento aconteceu, geralmente a aplicação terceira avisa por uma rota http
// http://localhost:3000/api/webhooks
// toda que acontecer um evento nessa aplicação terceira(no caso vai ser o stripe)
// ele vai mandar para essa rota e vai mandar as informações do evento

import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from 'stream';
import Stripe from "stripe";

import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

// essa função vai converter a readable stream em uma string, em um objeto, em
// uma requisição em si
async function buffer(readable: Readable) {
  // chunks são os pedaços da stream
  const chunks = [];

  // utilizando uma sintaxe do for await, que é uma sintaxe bem recente que vai
  // aguardar novos chunks e colocando eles dentro do chunk
  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    );
  }

  // concatenando todos os chunks e converte em um Buffer
  return Buffer.concat(chunks);
};

// por padrão o Next tem um formato de entender a requisição, ele entende que 
// toda a requisição estã vindo como um JSON por exemplo, ou como um envio de um
// formulário, ou qualquer coisa assim
// mas nesse caso, a requisição está vindo como uma stream(readable), então eu 
// tenho que desabilitar o entendimento padrão do Next sobre o que está vindo da
// requisição
export const config = {
  api: {
    bodyParser: false
  }
};

// o Set é como se fosse um array só que não pode ter nada duplicado dentro
const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
]);

// eslint-disable-next-line import/no-anonymous-default-export
export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    // o request é um readable por padrão
    const buf = await buffer(request);
    const secret = request.headers['stripe-signature'];
    // quando criamos uma funcionalidade de webhooks na nossa aplicação, é
    // básicamente uma rota, uma rota como qualquer outra na aplicação e ela pode
    // ser acessada externamente, então se um usuário descobri a nossa rota de
    // webhooks e começa a enviar requsições POST aqui para dentro, ele pode
    // começar a fazer coisas indesejadas na nossa aplicação
    // é muito comum que quando uma aplicação terceira se comunicar com a nossa
    // aplicação através de webhooks, essa aplicação terceira manda um código
    // para o nosso app para falar que se eu recebi esse código quer dizer qua a
    // requisição está vindo por ela, se eu não receber provavelmente é alguém
    // mal intencionado
    let event: Stripe.Event;

    try {
      // se ele conseguiu bater as duas variaveis(buf, secret) e construir o nosso objeto de evento
      // quer dizer que deu tudo certo
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
      return response.status(400).send(`Webhook error: ${error.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription;

            await saveSubscription(
              subscription.id,
              subscription.customer.toString(),
              // aqui eu estou falando que o createAction vai ser true no evento
              // customer.subscription.created porque não vai ser necessário
              // realizar a criação de uma subscription no 
              // customer.subscription.updated e nem no 
              // customer.subscription.deleted
              // type === 'customer.subscription.created',
              false
            );

            break;
          case 'checkout.session.completed':
            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString(),
              // aqui vai ser o createAction vai ser true porque aqui eu preciso
              // criar uma nova subscription
              true
            );

            break;
          default:
            throw new Error('Unhandle event.')
        }
      } catch (error) {
        return response.json({ error: 'Webhook handler failed.' })
      }
    }

    response.json({ received: true });
  } else { // se não for uma requisição com método HTTP POST 
    // eu vou explicar para o front-end(para quem está fazendo a requisição) que
    // o método que essa rota aqui aceita(Allow) é POST
    response.setHeader('Allow', 'POST');
    // e vou devolver uma resposta com erro 405 para informar que o método não
    // é permitido
    response.status(405).end('Method not allowed');
  }
};