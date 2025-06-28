import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
}

interface BudgetContextType {
  budget: number;
  setBudget: (value: number) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  spent: number;
  loading: boolean;
  error: string | null;
  refreshTransactions: () => void;
}

export const BudgetContext = createContext<BudgetContextType>({
  budget: 0,
  setBudget: () => {},
  transactions: [],
  addTransaction: () => {},
  spent: 0,
  loading: false,
  error: null,
  refreshTransactions: () => {},
});

interface BudgetProviderProps {
  children: ReactNode;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Coffee', amount: -50, date: '2023-10-01' },
  { id: '2', title: 'Groceries', amount: -200, date: '2023-10-02' },
  { id: '3', title: 'Salary', amount: 1000, date: '2023-10-03' },
];

export const BudgetProvider: React.FC<BudgetProviderProps> = ({ children }) => {
  const [budget, setBudgetState] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const savedBudget = await AsyncStorage.getItem('budget');
        if (savedBudget) setBudgetState(Number(savedBudget));
        await new Promise((r) => setTimeout(r, 1000));
        setTransactions(MOCK_TRANSACTIONS);
        setError(null);
      } catch (e) {
        setError('Failed to load data');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const setBudget = (value: number) => {
    setBudgetState(value);
    AsyncStorage.setItem('budget', value.toString());
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 9),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const refreshTransactions = () => {
    setLoading(true);
    setTimeout(() => {
      setTransactions(MOCK_TRANSACTIONS);
      setLoading(false);
      setError(null);
    }, 1000);
  };

  const spent = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <BudgetContext.Provider
      value={{
        budget,
        setBudget,
        transactions,
        addTransaction,
        spent,
        loading,
        error,
        refreshTransactions,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
