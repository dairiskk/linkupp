// theme.ts
import { createTheme } from '@rneui/themed';

// Your one source of truth for the neon‐green accent
export const ACCENT = '#00ff7f';

export const theme = createTheme({
  mode: 'dark',
  darkColors: {
    primary: ACCENT,
  },
  components: {
    Card: {
      containerStyle: {
        backgroundColor: '#111111',
        borderRadius: 12,
        borderWidth: 0,
      },
    },
    Input: {
      containerStyle: { marginVertical: 8 },
      inputContainerStyle: {
        backgroundColor: '#1a1a1a',
        borderBottomWidth: 0,
        borderRadius: 8,
        paddingHorizontal: 12,
      },
      inputStyle: { color: '#e0e0e0' },
      placeholderTextColor: '#666666',
      leftIcon: { color: ACCENT },
    },
    Button: {
      buttonStyle: {
        backgroundColor: ACCENT,
        borderRadius: 8,
      },
      titleStyle: {
        color: '#000000',
        fontWeight: 'bold',
      },
      containerStyle: { marginTop: 16 },
    },
    Text: {
      style: { color: '#e0e0e0' },
    },
    Icon: {
      color: ACCENT,
    },
  },
});
