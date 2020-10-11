import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const DriverInfo = ({route}) => {
  const {firstName, lastName, dob, nationality} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {firstName} {lastName}
      </Text>
      <Text style={styles.dob}>{dob}</Text>
      <Text style={styles.nationality}>{nationality}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 70,
  },
  name: {
    fontSize: 36,
    fontWeight: '700',
  },
  dob: {
    fontSize: 18,
    color: '#777',
  },
  nationality: {
    fontSize: 20,
    color: 'red',
  },
});
