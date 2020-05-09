import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Divider, List, Switch, useTheme } from 'react-native-paper';
import { ThemeContext } from '../context/ThemeContext';

export default () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { colors } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState();
  //   const { width } = Dimensions.get('window');

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
  }, [theme]);
  const _onToggleSwitch = () => {
    setIsDarkMode(!isDarkMode);
    toggleTheme(theme === 'dark' ? 'light' : 'dark');
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <List.Item
        style={styles.listItem}
        title="Mode Sombre"
        right={() => (
          <Switch
            value={isDarkMode}
            trackColor={colors.primary}
            color={colors.primary}
            onValueChange={_onToggleSwitch}
          />
        )}
      />
      <Divider />
      <List.Item
        style={styles.listItem}
        title="Supprimer mes donnés"
        right={() => (
          <Button
            mode={'outlined'}
            style={{ borderColor: colors.error }}
            color={colors.error}>
            Supprimer
          </Button>
        )}
      />
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
});
