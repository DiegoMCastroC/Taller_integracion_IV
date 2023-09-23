import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Main2 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default Main2;