import { DarkTheme, DefaultTheme } from 'react-native-paper';

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#00b4d8',
    accent: '#CAAD82',
    textAccent: '#6E9AB5',
    textAccent2: '#1d3557',
  },
};
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00b4d8',
    accent: '#CAAD82',
    textAccent: '#457b9d',
    textAccent2: '#1d3557',
  },
};
