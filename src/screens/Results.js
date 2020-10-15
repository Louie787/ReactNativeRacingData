import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Loader} from '../components/Loader';
import {ResultsListItem} from '../components/ResultsListItem';
import {EmptyContent} from '../components/EmptyContent';
import {CHANGE_RESULTS_OFFSET, REFRESH_RESULTS} from '../store/types';
import {resultsLimit} from '../fetches';
import {getResults} from '../store/actions/results';

export const Results = ({route}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.results.isLoading);
  const [refreshing, setRefreshing] = useState(false);
  const offset = useSelector((state) => state.results.resultsOffset);
  const results = useSelector((state) => state.results.results);

  useEffect(() => {
    dispatch(getResults(route.params.id, offset));
    setRefreshing(false);
  }, [refreshing]);

  return (
    <View style={styles.container}>
      {isLoading && offset === 0 ? (
        <Loader />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                dispatch({type: CHANGE_RESULTS_OFFSET, payload: 0});
                setRefreshing(true);
              }}
            />
          }
          data={results}
          renderItem={({item}) => (
            <ResultsListItem
              season={item.season}
              round={item.round}
              position={item.DriverStandings[0].position}
              points={item.DriverStandings[0].points}
              wins={item.DriverStandings[0].wins}
            />
          )}
          keyExtractor={(item, index) =>
            item.DriverStandings[0].Driver.driverId + index
          }
          onEndReached={() => {
            dispatch({
              type: CHANGE_RESULTS_OFFSET,
              payload: offset + resultsLimit,
            });
            dispatch(getResults(route.params.id, offset));
          }}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={<EmptyContent />}
          ListFooterComponent={() => (isLoading ? <Loader /> : null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
