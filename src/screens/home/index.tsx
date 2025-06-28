import React from 'react';
import { SafeAreaView } from 'react-native';
import TransactionForm from './components/transaction-form';
import TransactionList from './components/transaction-list';
import BudgetHeader from './components/budget-header';
import { styles } from './styles';

const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <BudgetHeader />
    <TransactionForm />
    <TransactionList />
  </SafeAreaView>
);

export default HomeScreen;
