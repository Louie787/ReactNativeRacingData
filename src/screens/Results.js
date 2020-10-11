import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getResults, limit} from '../store/actions/app';
import {Loader} from '../components/Loader';
import {ResultsListItem} from '../components/ResultsListItem';
import {EmptyContent} from '../components/EmptyContent';
import {CHANGE_LOADER, CHANGE_RESULTS_OFFSET} from '../store/types';

export const Results = ({route}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.appReducer.isLoading);
  const [refreshing, setRefreshing] = useState(false);
  const resultsOffset = useSelector((state) => state.appReducer.offset);
  const results = useSelector((state) => state.appReducer.results);

  useEffect(() => {
    dispatch({type: CHANGE_LOADER, payload: true});
    dispatch(getResults(route.params.id, resultsOffset));
    setRefreshing(false);
  }, [refreshing]);

  return (
    <View style={styles.container}>
      {isLoading ? (
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
          keyExtractor={(item, index) => item.driverId + index}
          onEndReached={() =>
            dispatch(getResults(route.params.id, resultsOffset + limit))
          }
          onEndReachedThreshold={0.1}
          ListEmptyComponent={<EmptyContent />}
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
