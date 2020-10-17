import {
  SHOW_DRIVERS_LOADER,
  HIDE_DRIVERS_LOADER,
  GET_DRIVERS,
  REFRESH_DRIVERS,
  SET_ERROR,
} from '../types';
import {fetchDrivers} from '../../fetches';

export function getDrivers(offset) {
  return async (dispatch) => {
    dispatch({type: SHOW_DRIVERS_LOADER});

    const response = await fetchDrivers(offset);
    if (response.status === 200) {
      dispatch({
        type: offset === 0 ? REFRESH_DRIVERS : GET_DRIVERS,
        payload: response.data.MRData.DriverTable.Drivers,
      });
      dispatch({type: SET_ERROR, payload: false});
    } else {
      dispatch({type: SET_ERROR, payload: true});
    }

    dispatch({type: HIDE_DRIVERS_LOADER});
  };
}
