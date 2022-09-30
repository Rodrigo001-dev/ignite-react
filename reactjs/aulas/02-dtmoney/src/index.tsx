import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';

import { App } from './App';

// o miragejs server para criar uma fake API
createServer({
  // criando os modelos para salvar no banco de dados
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2022-02-12 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Cassa',
          amount: 1100,
          createdAt: new Date('2022-02-14 11:00:00')
        }
      ],
    })
  },

  routes() {
    // estou dizendo para o miragejs que todas as chamadas a api que eu vou fazer
    // vão estar a partir do endereço http://localhost:3000/api
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      // o schema é o banco de dados
      return schema.create('transaction', data);
    })
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
