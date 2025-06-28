import React, { useCallback, useContext, useMemo, useState } from 'react';
import { FlatList, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Colors } from '../../../../assets/colors';
import { BudgetContext } from '../../../../context/budget-context';
import { FilterType } from './type';
import { ITransaction } from '../../../../assets/types';

const FILTER_TYPES: FilterType[] = ['all', 'income', 'expense'];

const TransactionList = () => {
  const { transactions, loading, error, refreshTransactions } = useContext(BudgetContext);
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTransactions = useMemo(() => {
    switch (filter) {
      case 'income':
        return transactions.filter((t) => t.amount > 0);
      case 'expense':
        return transactions.filter((t) => t.amount < 0);
      default:
        return transactions;
    }
  }, [transactions, filter]);

  const handleFilterChange = useCallback((type: FilterType) => () => setFilter(type), []);

  const renderFilterButton = (type: FilterType) => {
    const isActive = filter === type;
    const isIncome = type === 'income';
    const isExpense = type === 'expense';

    return (
      <TouchableOpacity
        key={type}
        onPress={handleFilterChange(type)}
        style={[
          styles.filterButton,
          isActive && styles.filterButtonActive,
          isIncome && styles.filterIncome,
          isExpense && styles.filterExpense,
          isActive && isIncome && styles.filterIncomeActive,
          isActive && isExpense && styles.filterExpenseActive,
        ]}
      >
        <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTransactionItem = useCallback(({ item }: { item: ITransaction }) => {
    const isNegative = item.amount < 0;
    const amountText = `${isNegative ? '-' : '+'}$${Math.abs(item.amount)}`;

    return (
      <View style={styles.transaction}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text
          style={[
            styles.transactionAmount,
            isNegative ? styles.negativeAmount : styles.positiveAmount,
          ]}
        >
          {amountText}
        </Text>
      </View>
    );
  }, []);

  const renderEmptyComponent = useMemo(
    () => (!loading ? <Text style={styles.emptyList}>No transactions</Text> : null),
    [loading],
  );

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <>
      <View style={styles.filterContainer}>{FILTER_TYPES.map(renderFilterButton)}</View>
      {loading && <ActivityIndicator size="large" color={Colors.primary} />}

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        onRefresh={refreshTransactions}
        refreshing={loading}
        ListEmptyComponent={renderEmptyComponent}
        renderItem={renderTransactionItem}
        contentContainerStyle={styles.listContent}
      />
    </>
  );
};

export default TransactionList;
