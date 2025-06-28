import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { BudgetContext } from '../../context/budget-context';
import { Colors } from '../../assets/colors';

type FilterType = 'all' | 'income' | 'expense';

const HomeScreen = () => {
  const {
    budget,
    setBudget,
    transactions,
    loading,
    error,
    refreshTransactions,
    addTransaction,
    spent,
  } = useContext(BudgetContext);

  const [inputBudget, setInputBudget] = useState(budget.toString());
  const [title, setTitle] = useState('');
  const [amountStr, setAmountStr] = useState('');
  const [isIncome, setIsIncome] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  const onSaveBudget = () => {
    const num = Number(inputBudget);
    if (isNaN(num) || num < 0) {
      Alert.alert('Invalid budget', 'Please enter a valid positive number');
      return;
    }
    setBudget(num);
  };

  const onAddTransaction = () => {
    const amountNum = Number(amountStr);
    if (!title.trim()) {
      Alert.alert('Invalid title', 'Please enter a title');
      return;
    }
    if (isNaN(amountNum) || amountNum <= 0) {
      Alert.alert('Invalid amount', 'Please enter a positive number');
      return;
    }

    addTransaction({
      title: title.trim(),
      amount: isIncome ? amountNum : -amountNum,
      date: new Date().toISOString().split('T')[0],
    });

    setTitle('');
    setAmountStr('');
    setIsIncome(false);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (filter === 'all') return true;
    if (filter === 'income') return t.amount > 0;
    if (filter === 'expense') return t.amount < 0;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Budget Tracker</Text>

      <View style={styles.budgetInputContainer}>
        <Text style={{ fontWeight: '600' }}>Set Monthly Budget:</Text>
        <TextInput
          style={[styles.input, styles.inputWrapper]}
          value={inputBudget}
          onChangeText={setInputBudget}
          keyboardType="numeric"
          placeholder="Enter budget"
        />
        <Button title="Save" onPress={onSaveBudget} />
      </View>

      <Text style={styles.budgetTitle}>Monthly Budget: ${budget}</Text>
      <Text style={[styles.spent, { color: spent > budget ? '#d9534f' : '#5cb85c' }]}>
        Spent: ${spent} ({budget > 0 ? ((spent / budget) * 100).toFixed(0) : '0'}%)
      </Text>

      <View style={styles.addTransactionContainer}>
        <Text style={styles.sectionTitle}>Add Transaction</Text>
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
            onPress={() => setIsIncome(true)}
          >
            <Text style={isIncome ? styles.toggleTextActive : styles.toggleText}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, !isIncome && styles.toggleButtonActive]}
            onPress={() => setIsIncome(false)}
          >
            <Text style={!isIncome ? styles.toggleTextActive : styles.toggleText}>Expense</Text>
          </TouchableOpacity>
          <Button title="Add" onPress={onAddTransaction} />
        </View>
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'income', 'expense'] as FilterType[]).map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilter(type)}
            style={[
              styles.filterButton,
              filter === type && styles.filterButtonActive,
              type === 'income' && styles.filterIncome,
              type === 'expense' && styles.filterExpense,
            ]}
          >
            <Text style={[styles.filterText, filter === type && styles.filterTextActive]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading && <ActivityIndicator size="large" color="#007bff" />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        onRefresh={refreshTransactions}
        refreshing={loading}
        ListEmptyComponent={
          !loading && <Text style={{ textAlign: 'center' }}>No transactions</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <Text
              style={{
                color: item.amount < 0 ? '#d9534f' : '#5cb85c',
                fontWeight: 'bold',
                fontSize: 16,
              }}
            >
              {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount)}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    flex: 1,
    padding: 20,
  },
  title: {
    color: Colors.dark,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  budgetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: Colors.white,
    borderColor: Colors.borderGray,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 5,
    fontSize: 16,
  },
  budgetTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center',
    color: Colors.dark,
  },
  spent: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.dark,
  },
  addTransactionContainer: {
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 5,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    color: Colors.dark,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    gap: 10,
  },
  toggleButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    color: Colors.textDark,
    fontWeight: '600',
    fontSize: 16,
  },
  toggleTextActive: {
    color: Colors.white,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    gap: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: Colors.textDark,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  filterButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterExpense: {
    backgroundColor: Colors.danger,
  },
  filterIncome: {
    backgroundColor: Colors.success,
  },
  filterText: {
    color: Colors.textDark,
    fontWeight: '600',
  },
  filterTextActive: {
    color: Colors.white,
  },
  transaction: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 15,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  error: {
    color: Colors.danger,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
});
export default HomeScreen;
