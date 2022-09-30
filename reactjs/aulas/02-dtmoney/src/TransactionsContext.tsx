import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from './services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// };

// o TransactionInput vai herdar todos os campos do Transaction menos o id e o
// createdAt porque eu estou omitindo esses campos
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// diferente do Omit que eu omito as informações que eu não quero quendo uso o
// Pick eu falor quaid as informações que eu quero utilizar
// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

interface TransactionsProviderProps {
  children: ReactNode;
};

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
};

// essa é a forma mais simples de criar um contexto no React
export const TransactionsContext = createContext<TransactionsContextData>(
  // nessa linha eu estou forçando o typescript a entender que esse valor
  // inicial tem sim o tipo que eu espero
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction
    ]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};
