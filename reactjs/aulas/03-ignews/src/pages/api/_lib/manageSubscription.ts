// toda pasta que tem _ na frente não vai ser tratada como uma rota da aplicação

import { query as q } from 'faunadb';

import { fauna } from "../../../services/fauna";
import { stripe } from '../../../services/stripe';

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  // essa função vai salvar essas informações no banco de dados
  // primeiro eu tenho que buscar o usuário do FaunaDB com o customerID
  // depois de buscar o usuário dentro do stripe, eu tenho que salvar os dados
  // da subscription do usuário no FaunaDB
  
  // o Ref dentro do Fauna é como se fosse o ID
  // o Fauna utiliza o Ref para fazer realacionamentos entre collections
  const userRef = await fauna.query(
    // com o Select eu informo quais os campos eu quero do Fauna
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId
        )
      )
    )
  );

  // no webhook o stripe vai enviar para mim apenas o ID da subscription e não
  // todos os dados da subscription, para eu buscar todos os dados da
  // subscription eu pego o método retrieve para buscar uma só, passando a
  // subscriptionId
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // pegando os dados relevantes para salvar no banco de dados
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  // se uma ação de criação for necessária, ou seja, se o createAction for true
  // eu vou criar uma subscription(document) dentro da collection de 
  // subscriptions
  if (createAction) {
    // salvando os dados dentro da collection subscriptions
    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        { data: subscriptionData }
      )
    );
  } else { // se não, se o createAction for false
    await fauna.query(
      // existe dois métodos para atualizar um registro dentro do Fauna
      // Update ou Replace
      // Update eu consigo atualizar alguns campos dentro daquele registro
      // o Replace vai substituir a subscription por completa, então eu vou
      // passar qual a Ref da subscription e substituo toda a subscription 
      q.Replace(
        q.Select(
          "ref",
          q.Get(
            q.Match(
              q.Index('subscription_by_id'),
              subscriptionId
            )
          )
        ),
        // como segundo parâmetro do Replace eu mando quais dados eu quero
        // atualizar
        { data: subscriptionData }
      )
    )
  }
};