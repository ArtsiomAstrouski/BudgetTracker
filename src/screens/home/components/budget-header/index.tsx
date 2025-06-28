import React, { useContext, useState, useCallback, useMemo, memo } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { BudgetContext } from '../../../../context/budget-context';
import { styles } from './styles';

const BudgetHeader = () => {
  const { budget, setBudget, spent } = useContext(BudgetContext);
  const [inputBudget, setInputBudget] = useState(budget.toString());
  const [isEditing, setIsEditing] = useState(false);

  const { spentPercentage, isOverBudget } = useMemo(() => {
    const percentage = budget > 0 ? ((spent / budget) * 100).toFixed(0) : '0';

    return {
      spentPercentage: percentage,
      isOverBudget: spent > budget,
    };
  }, [budget, spent]);

  const handleEditPress = useCallback(() => {
    setIsEditing(true);
    setInputBudget(budget.toString());
  }, [budget]);

  const handleSaveBudget = useCallback(() => {
    const num = Number(inputBudget);

    if (isNaN(num)) {
      Alert.alert('Invalid Input', 'Please enter a valid number');
      return;
    }

    if (num < 0) {
      Alert.alert('Invalid Budget', 'Budget cannot be negative');
      return;
    }

    setBudget(num);
    setIsEditing(false);
  }, [inputBudget, setBudget]);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  return (
    <>
      <Text style={styles.title}>Budget Tracker</Text>

      {isEditing ? (
        <View style={styles.editContainer}>
          <View style={styles.budgetInputContainer}>
            <Text style={styles.budgetLabel}>Monthly Budget:</Text>
            <TextInput
              style={styles.budgetInput}
              value={inputBudget}
              onChangeText={setInputBudget}
              keyboardType="numeric"
              placeholder="Enter amount"
              autoFocus
            />
            <Button title="Cancel" onPress={handleCancelEdit} color="#999" />
            <Button title="Save" onPress={handleSaveBudget} />
          </View>
        </View>
      ) : (
        <>
          <Text style={styles.budgetTitle}>Monthly Budget: ${budget.toLocaleString()}</Text>
          <Text style={[styles.spent, isOverBudget ? styles.overBudget : styles.underBudget]}>
            Spent: ${spent.toLocaleString()} ({spentPercentage}%)
          </Text>
          <Button title="Edit Budget" onPress={handleEditPress} />
        </>
      )}
    </>
  );
};

export default memo(BudgetHeader);
