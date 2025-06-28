import React, { useState, useCallback, useContext, memo } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { styles } from './styles';
import { BudgetContext } from '../../../../context/budget-context';

const TransactionForm = () => {
  const { addTransaction } = useContext(BudgetContext);
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    isIncome: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isDisabled = isSubmitting || !formData.title.length || !formData.amount.length;

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const { title, amount } = formData;

    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title');
      return false;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) {
      Alert.alert('Validation Error', 'Please enter a valid number');
      return false;
    }

    if (amountNum <= 0) {
      Alert.alert('Validation Error', 'Amount must be greater than zero');
      return false;
    }

    return true;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const { title, amount, isIncome } = formData;
      const amountNum = parseFloat(amount);

      await addTransaction({
        title: title.trim(),
        amount: isIncome ? amountNum : -amountNum,
        date: new Date().getTime(),
      });

      setFormData({
        title: '',
        amount: '',
        isIncome: false,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to add transaction. Please try again.');
      console.error('Transaction submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isSubmitting, validateForm, addTransaction]);

  return (
    <View style={styles.addTransactionContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={formData.title}
          onChangeText={(text) => handleInputChange('title', text)}
          maxLength={20}
          accessibilityLabel="Transaction title input"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={formData.amount}
          onChangeText={(text) => handleInputChange('amount', text)}
          keyboardType="decimal-pad"
          accessibilityLabel="Transaction amount input"
        />
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, formData.isIncome && styles.toggleButtonActive]}
          onPress={() => handleInputChange('isIncome', true)}
          accessibilityLabel="Set as income"
          accessibilityRole="button"
        >
          <Text style={[styles.toggleText, formData.isIncome && styles.toggleTextActive]}>
            Income
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, !formData.isIncome && styles.toggleButtonActive]}
          onPress={() => handleInputChange('isIncome', false)}
          accessibilityLabel="Set as expense"
          accessibilityRole="button"
        >
          <Text style={[styles.toggleText, !formData.isIncome && styles.toggleTextActive]}>
            Expense
          </Text>
        </TouchableOpacity>
        <Button
          title={isSubmitting ? 'Processing...' : 'Add Transaction'}
          onPress={handleSubmit}
          disabled={isDisabled}
          accessibilityLabel="Add transaction button"
        />
      </View>
    </View>
  );
};

export default memo(TransactionForm);
