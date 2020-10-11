import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const EmptyContent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Something went wrong :(</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
