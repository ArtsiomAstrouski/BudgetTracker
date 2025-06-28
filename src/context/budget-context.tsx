import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ITransaction } from '../assets/types';
import { mockTransactionApi } from '../api/mockApi';

interface BudgetContextType {
  budget: number;
  setBudget: (value: number) => void;
  transactions: ITransaction[];
  addTransaction: (transaction: Omit<ITransaction, 'id'>) => void;
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

export const BudgetProvider: FC<BudgetProviderProps> = ({ children }) => {
  const [budget, setBudgetState] = useState(0);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const savedBudget = await AsyncStorage.getItem('budget');
      if (savedBudget) setBudgetState(Number(savedBudget));

      const loadedTransactions = await mockTransactionApi.fetchTransactions();
      setTransactions(loadedTransactions);
      setError(null);
    } catch (e) {
      setError('Failed to load data');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const setBudget = (value: number) => {
    setBudgetState(value);
    AsyncStorage.setItem('budget', value.toString());
  };

  const addTransaction = (transaction: Omit<ITransaction, 'id'>) => {
    const newTransaction: ITransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || Date.now(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const refreshTransactions = async () => {
    setLoading(true);
    try {
      const refreshedTransactions = await mockTransactionApi.fetchTransactions();
      setTransactions(refreshedTransactions);
      setError(null);
    } catch (e) {
      setError('Failed to refresh transactions');
      console.error(e);
    } finally {
      setLoading(false);
    }
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
