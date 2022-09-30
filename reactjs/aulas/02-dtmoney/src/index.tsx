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
