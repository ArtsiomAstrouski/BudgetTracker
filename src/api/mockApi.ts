import { ITransaction } from '../assets/type';

let nextId = 1;

export const mockTransactionApi = {
  fetchTransactions: (): Promise<ITransaction[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: `${nextId++}`,
            title: 'Coffee',
            amount: -50,
            date: new Date('2023-10-01').getTime(),
          },
          {
            id: `${nextId++}`,
            title: 'Groceries',
            amount: -200,
            date: new Date('2023-10-02').getTime(),
          },
          {
            id: `${nextId++}`,
            title: 'Salary',
            amount: 1000,
            date: new Date('2023-10-03').getTime(),
          },
        ]);
      }, 1000);
    });
  },
};
