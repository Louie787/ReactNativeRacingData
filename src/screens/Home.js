import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Loader} from '../components/Loader';
import {DriversListItem} from '../components/DriversListItem';
import {getDrivers, limit} from '../store/actions/app';
import {EmptyContent} from '../components/EmptyContent';
import {CHANGE_LOADER, CHANGE_OFFSET} from '../store/types';

export const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.appReducer.isLoading);
  const [refreshing, setRefreshing] = useState(false);
  const offset = useSelector((state) => state.appReducer.offset);
  const drivers = useSelector((state) => state.appReducer.drivers);

  useEffect(() => {
    dispatch({type: CHANGE_LOADER, payload: true});
    dispatch(getDrivers(offset));
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
                dispatch({type: CHANGE_OFFSET, payload: 0});
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
          onEndReached={() => dispatch(getDrivers(offset + limit))}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={<EmptyContent />}
          ListFooterComponent={<Loader />}
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
