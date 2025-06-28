import { StyleSheet } from 'react-native';
import { Colors } from '../../../../assets/colors';

export const styles = StyleSheet.create({
  title: {
    color: Colors.dark,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  container: {
    padding: 16,
  },
  editContainer: {
    marginTop: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  budgetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 5,
    gap: 10,
  },
  budgetLabel: {
    fontWeight: '600',
    color: Colors.textDark,
  },
  budgetInput: {
    flex: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.borderGray,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  budgetTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 8,
    textAlign: 'center',
    color: Colors.dark,
  },
  spent: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  overBudget: {
    color: Colors.danger,
  },
  underBudget: {
    color: Colors.success,
  },
});
