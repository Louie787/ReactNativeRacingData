import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const DriversListItem = ({
  firstName,
  lastName,
  dob,
  nationality,
  navigation,
  id,
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.name}
        onPress={() =>
          navigation.navigate('DriverInfo', {
            firstName,
            lastName,
            dob,
            nationality,
          })
        }>
        {firstName} {lastName}
      </Text>
      <Text
        style={styles.results}
        onPress={() => navigation.navigate('Results', {id})}>
        View Results
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#dadada',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  results: {
    color: '#777',
    textTransform: 'uppercase',
    fontSize: 10,
  },
});
