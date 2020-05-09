import React, { useEffect, useState } from 'react';
import { AsyncStorage, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigation from './AppNavigation';
import Spinner from './components/Spinner';
import { ThemeContext, THEME_KEY } from './context/ThemeContext';
import { darkTheme, lightTheme } from './helpers/themes';

export default () => {
  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState();
  const [statusBarStyle, setStatusBarStyle] = useState('default');
  const [selectedTheme, setSelectedTheme] = useState(darkTheme);
  useEffect(() => {
    const restoreThemeState = async () => {
      try {
        const themeName = await AsyncStorage.getItem(THEME_KEY);
        if (themeName) {
          setTheme(JSON.parse(themeName));
        } else {
          setTheme('dark');
        }
      } catch (e) {
        setTheme('dark');
      } finally {
        setIsReady(true);
      }
    };
    restoreThemeState();
  }, []);

  useEffect(() => {
    setSelectedTheme(theme === 'dark' ? darkTheme : lightTheme);
    setStatusBarStyle(theme === 'dark' ? 'default' : 'dark-content');
  }, [theme]);

  const themeContextValue = {
    toggleTheme: async themeName => {
      setTheme(themeName);
      try {
        await AsyncStorage.setItem(THEME_KEY, JSON.stringify(themeName));
      } catch (e) {}
    },
    theme,
  };

  return !isReady ? (
    <Spinner />
  ) : (
    <PaperProvider theme={selectedTheme}>
      <ThemeContext.Provider value={themeContextValue}>
        <SafeAreaView style={styles.container}>
          <StatusBar
            backgroundColor={selectedTheme.colors.background}
            barStyle={statusBarStyle}
          />
          <AppNavigation />
        </SafeAreaView>
      </ThemeContext.Provider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
