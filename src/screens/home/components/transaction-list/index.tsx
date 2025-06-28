import React, { useCallback, useContext, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Colors } from '../../../../assets/colors';
import { BudgetContext } from '../../../../context/budget-context';
import { FilterType } from './type';
import { ITransaction } from '../../../../assets/type';

const TransactionList = () => {
  const { transactions, loading, error, refreshTransactions } = useContext(BudgetContext);
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTransactions = useCallback(() => {
    return transactions.filter((t) => {
      if (filter === 'all') return true;
      if (filter === 'income') return t.amount > 0;
      return t.amount < 0;
    });
  }, [transactions, filter]);

  const renderFilterButton = useCallback(
    (type: FilterType) => (
      <TouchableOpacity
        key={type}
        onPress={() => setFilter(type)}
        style={[
          styles.filterButton,
          filter === type && styles.filterButtonActive,
          type === 'income' && styles.filterIncome,
          type === 'expense' && styles.filterExpense,
          filter === type && type === 'income' && styles.filterIncomeActive,
          filter === type && type === 'expense' && styles.filterExpenseActive,
        ]}
      >
        <Text style={[styles.filterText, filter === type && styles.filterTextActive]}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Text>
      </TouchableOpacity>
    ),
    [filter],
  );

  const renderTransactionItem = useCallback(
    ({ item }: { item: ITransaction }) => (
      <View style={styles.transaction}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text
          style={[
            styles.transactionAmount,
            item.amount < 0 ? styles.negativeAmount : styles.positiveAmount,
          ]}
        >
          {item.amount < 0 ? '-' : '+'}${Math.abs(item.amount)}
        </Text>
      </View>
    ),
    [],
  );

  return (
    <>
      <View style={styles.filterContainer}>
        {(['all', 'income', 'expense'] as FilterType[]).map(renderFilterButton)}
      </View>
      {loading && <ActivityIndicator size="large" color={Colors.primary} />}
      {error && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={filteredTransactions()}
        keyExtractor={(item) => item.id}
        onRefresh={refreshTransactions}
        refreshing={loading}
        ListEmptyComponent={!loading && <Text style={styles.emptyList}>No transactions</Text>}
        renderItem={renderTransactionItem}
        contentContainerStyle={styles.listContent}
      />
    </>
  );
};

export default TransactionList;
