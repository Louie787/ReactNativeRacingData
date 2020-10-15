import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Loader} from '../components/Loader';
import {DriversListItem} from '../components/DriversListItem';
import {EmptyContent} from '../components/EmptyContent';
import {CHANGE_DRIVERS_OFFSET} from '../store/types';
import {driversLimit} from '../fetches';
import {getDrivers} from '../store/actions/drivers';

export function Home({navigation}) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.drivers.isLoading);
  const [refreshing, setRefreshing] = useState(false);
  const offset = useSelector((state) => state.drivers.driversOffset);
  const drivers = useSelector((state) => state.drivers.drivers);

  useEffect(() => {
    dispatch(getDrivers(offset));
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
                dispatch({type: CHANGE_DRIVERS_OFFSET, payload: 0});
                setRefreshing(true);
              }}
            />
          }
          data={drivers}
          renderItem={({item}) => (
            <DriversListItem
              firstName={item.givenName}
              lastName={item.familyName}
              dob={item.dateOfBirth}
              nationality={item.nationality}
              navigation={navigation}
              id={item.driverId}
            />
          )}
          keyExtractor={(item, index) => item.driverId + index}
          onEndReached={() => {
            dispatch({
              type: CHANGE_DRIVERS_OFFSET,
              payload: offset + driversLimit,
            });
            dispatch(getDrivers(offset));
          }}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={<EmptyContent />}
          ListFooterComponent={() => (isLoading ? <Loader /> : null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});
