import React, { useState, useCallback, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { BudgetContext } from '../../../../context/budget-context';

const TransactionForm = () => {
  const { addTransaction } = useContext(BudgetContext);
  const [title, setTitle] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [isIncome, setIsIncome] = useState(false);

  const handleSubmit = useCallback(() => {
    const amountNum = Number(amountStr);
    if (!title.trim()) {
      Alert.alert('Invalid title', 'Please enter a title');
      return;
    }
    if (isNaN(amountNum)) {
      Alert.alert('Invalid amount', 'Please enter a valid number');
      return;
    }
    if (amountNum <= 0) {
      Alert.alert('Invalid amount', 'Please enter a positive number');
      return;
    }

    addTransaction({
      title,
      amount: isIncome ? amountNum : -amountNum,
      date: new Date().getTime(),
    });
    setTitle('');
    setAmountStr('');
    setIsIncome(false);
  }, [title, amountStr, isIncome]);

  const handleIncome = () => setIsIncome(true);
  const handleExpense = () => setIsIncome(false);

  return (
    <View style={styles.addTransactionContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amountStr}
          onChangeText={setAmountStr}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isIncome && styles.toggleButtonActive]}
          onPress={handleIncome}
        >
          <Text style={[styles.toggleText, isIncome && styles.toggleTextActive]}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isIncome && styles.toggleButtonActive]}
          onPress={handleExpense}
        >
          <Text style={[styles.toggleText, !isIncome && styles.toggleTextActive]}>Expense</Text>
        </TouchableOpacity>
        <Button title="Add Transaction" onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default TransactionForm;
