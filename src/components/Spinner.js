import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { darkTheme } from '../helpers/themes';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={darkTheme.colors.primary}
      />
    </View>
  );
};
