import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const ResultsListItem = ({season, round, position, points, wins}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.season}>
        Season: {season} Round: {round}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.results}>
          Position: <Text style={styles.resultsValue}>{position}</Text>
        </Text>
        <Text style={styles.results}>
          Points: <Text style={styles.resultsValue}>{points}</Text>
        </Text>
        <Text style={styles.results}>
          Wins: <Text style={styles.resultsValue}>{wins}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 5,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  season: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  results: {
    color: '#777',
    textTransform: 'uppercase',
    fontSize: 12,
    marginRight: 25,
  },
  resultsValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
});
