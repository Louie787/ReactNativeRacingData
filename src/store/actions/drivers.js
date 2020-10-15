import {
  SHOW_DRIVERS_LOADER,
  HIDE_DRIVERS_LOADER,
  GET_DRIVERS,
  REFRESH_DRIVERS,
} from '../types';
import {fetchDrivers} from '../../fetches';

export function getDrivers(offset) {
  return async (dispatch) => {
    dispatch({type: SHOW_DRIVERS_LOADER});
    dispatch({
      type: offset === 0 ? REFRESH_DRIVERS : GET_DRIVERS,
      payload: await fetchDrivers(offset),
    });
    dispatch({type: HIDE_DRIVERS_LOADER});
  };
}
