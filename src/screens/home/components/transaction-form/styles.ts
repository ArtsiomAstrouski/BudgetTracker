import { Colors } from '../../../../assets/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  addTransactionContainer: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: Colors.textDark,
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.white,
    borderColor: Colors.borderGray,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
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
    fontWeight: 600,
    fontSize: 16,
  },
  toggleTextActive: {
    color: Colors.white,
  },
});
