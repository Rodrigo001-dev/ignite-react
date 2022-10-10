// essa biblioteca do stripe é para ser utlizada no frontend, usar as operações
// que são publicas do stripe, que não é necessário passar uma chave, nem nada
// do tipo
import { loadStripe } from '@stripe/stripe-js';

export async function getStripeJs() {
  // toda variavél ambiente que precisava ser carregada pelo browser e não
  // pelas funções backend precisa ser publica, para deixar ela publica é só
  // colocar NEXT_PUBLIC na começo do nome da variavél
  const stripeJs = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  return stripeJs;
};