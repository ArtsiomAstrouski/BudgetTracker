export const Colors = {
  primary: '#007bff',
  success: '#5cb85c',
  danger: '#d9534f',
  warning: '#f0ad4e',
  light: '#f8f9fa',
  dark: '#212529',
  white: '#ffffff',
  gray: '#6c757d',
  lightGray: '#e9ecef',
  borderGray: '#ced4da',
  textDark: '#495057',
} as const;

export type ColorKey = keyof typeof Colors;
