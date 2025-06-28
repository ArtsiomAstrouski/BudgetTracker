import React, { useContext, useState, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { BudgetContext } from '../../../../context/budget-context';
import { styles } from './styles';

const BudgetHeader = () => {
  const { budget, setBudget, spent } = useContext(BudgetContext);
  const [inputBudget, setInputBudget] = useState(budget.toString());

  const handleSaveBudget = useCallback(() => {
    const num = Number(inputBudget);
    if (isNaN(num) || num < 0) {
      Alert.alert('Invalid budget', 'Please enter a valid positive number');
      return;
    }
    setBudget(num);
  }, [inputBudget, setBudget]);

  const spentPercentage = budget > 0 ? ((spent / budget) * 100).toFixed(0) : '0';
  const isOverBudget = spent > budget;

  return (
    <>
      <Text style={styles.title}>Budget Tracker</Text>

      <View style={styles.budgetInputContainer}>
        <Text style={styles.budgetLabel}>Set Monthly Budget:</Text>
        <TextInput
          style={styles.budgetInput}
          value={inputBudget}
          onChangeText={setInputBudget}
          keyboardType="numeric"
          placeholder="Enter budget"
        />
        <Button title="Save" onPress={handleSaveBudget} />
      </View>

      <Text style={styles.budgetTitle}>Monthly Budget: ${budget}</Text>
      <Text style={[styles.spent, isOverBudget ? styles.overBudget : styles.underBudget]}>
        Spent: ${spent} ({spentPercentage}%)
      </Text>
    </>
  );
};

export default BudgetHeader;
