import { DarkTheme, DefaultTheme } from 'react-native-paper';
import configColors from '../../config/colors.json';

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...configColors.darkTheme,
  },
};
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...configColors.lightTheme,
  },
};
