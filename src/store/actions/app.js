import axios from 'axios';
import {
  CHANGE_LOADER,
  CHANGE_OFFSET,
  CHANGE_RESULTS_OFFSET,
  GET_DRIVERS,
  GET_RESULTS,
  REFRESH_DRIVERS,
  REFRESH_RESULTS,
} from '../types';

export const limit = 20;

export const getDrivers = (offset) => {
  return (dispatch) => {
    axios
      .get(
        `http://ergast.com/api/f1/drivers.json?limit=${limit}&offset=${offset}`,
      )
      .then(function (response) {
        dispatch({
          type: offset === 0 ? REFRESH_DRIVERS : GET_DRIVERS,
          payload: response.data.MRData.DriverTable.Drivers,
        });
        dispatch({type: CHANGE_OFFSET, payload: offset});
        dispatch({type: CHANGE_LOADER, payload: false});
      })
      .catch(function () {
        dispatch({
          type: REFRESH_DRIVERS,
          payload: [],
        });
        dispatch({type: CHANGE_OFFSET, payload: 0});
        dispatch({type: CHANGE_LOADER, payload: false});
      });
  };
};

export const getResults = (driver, offset) => {
  return (dispatch) => {
    axios
      .get(
        `http://ergast.com/api/f1/drivers/${driver}/driverStandings.json?limit=${limit}&offset=${offset}`,
      )
      .then(function (response) {
        dispatch({
          type: offset === 0 ? REFRESH_RESULTS : GET_RESULTS,
          payload: response.data.MRData.StandingsTable.StandingsLists,
        });
        dispatch({type: CHANGE_RESULTS_OFFSET, payload: offset});
        dispatch({type: CHANGE_LOADER, payload: false});
      })
      .catch(function () {
        dispatch({
          type: REFRESH_RESULTS,
          payload: [],
        });
        dispatch({type: CHANGE_RESULTS_OFFSET, payload: 0});
        dispatch({type: CHANGE_LOADER, payload: false});
      });
  };
};
