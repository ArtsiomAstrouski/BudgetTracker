export interface Transaction {
  id: string;
  amount: number;
  title: string;
  date: string;
}

let idCounter = 0;
const generateId = () => {
  idCounter += 1;
  return `${Date.now()}-${idCounter}`;
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: generateId(), amount: -50, title: 'Coffee', date: '2023-10-01' },
        { id: generateId(), amount: -200, title: 'Groceries', date: '2023-10-02' },
        { id: generateId(), amount: 1000, title: 'Salary', date: '2023-10-03' },
      ]);
    }, 1000);
  });
};
