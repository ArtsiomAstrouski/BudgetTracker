import React from 'react';
import { BudgetProvider } from './src/context/budget-context';
import HomeScreen from './src/screens/home';

export default function App() {
  return (
    <BudgetProvider>
      <HomeScreen />
    </BudgetProvider>
  );
}
