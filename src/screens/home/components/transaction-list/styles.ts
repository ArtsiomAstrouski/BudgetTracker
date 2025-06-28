import { Colors } from '../../../../assets/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 10,
  },
  filterButton: {
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterIncome: {
    backgroundColor: Colors.successLight,
  },
  filterIncomeActive: {
    backgroundColor: Colors.success,
  },
  filterExpense: {
    backgroundColor: Colors.dangerLight,
  },
  filterExpenseActive: {
    backgroundColor: Colors.danger,
  },
  filterText: {
    color: Colors.textDark,
    fontWeight: '600',
  },
  filterTextActive: {
    color: Colors.white,
  },
  listContent: {
    flexGrow: 1,
  },
  transaction: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 16,
  },
  transactionTitle: {
    fontSize: 16,
    color: Colors.textDark,
  },
  transactionAmount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  positiveAmount: {
    color: Colors.success,
  },
  negativeAmount: {
    color: Colors.danger,
  },
  error: {
    color: Colors.danger,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  emptyList: {
    textAlign: 'center',
    color: Colors.textGray,
    marginTop: 16,
  },
});
