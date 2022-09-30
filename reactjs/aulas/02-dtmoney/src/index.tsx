import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer } from 'miragejs';

import { App } from './App';

// o miragejs server para criar uma fake API
createServer({
  routes() {
    // estou dizendo para o miragejs que todas as chamadas a api que eu vou fazer
    // vão estar a partir do endereço http://localhost:3000/api
    this.namespace = 'api';

    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: 'Transactions 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date()
        }
      ]
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
