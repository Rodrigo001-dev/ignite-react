import Stripe from 'stripe';

import { version } from '../../package.json';

export const stripe = new Stripe(
  // o primeiro parâmetro eu preciso colocar qual a chave do stripe
  process.env.STRIPE_API_KEY,
  // o segundo parâmetro são algumas informações obrigatórias
  {
    apiVersion: '2022-08-01',
    appInfo: {
      name: 'Ignews',
      version
    },
  }
);