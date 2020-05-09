import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

export default function SecondTab() {
  return (
    <View style={styles.container}>
      <Title>Under construction</Title>
    </View>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    margin: 50,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
