import {
  CHANGE_LOADER,
  CHANGE_OFFSET,
  CHANGE_RESULTS_OFFSET,
  GET_DRIVERS,
  GET_RESULTS, REFRESH_DRIVERS, REFRESH_RESULTS,
} from '../types';
const initialState = {
  isLoading: true,
  offset: 0,
  resultsOffset: 0,
  drivers: [],
  results: [],
};

const appReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case CHANGE_LOADER:
      return {
        ...state,
        isLoading: payload,
      };
    case CHANGE_OFFSET:
      return {
        ...state,
        offset: payload,
      };
    case CHANGE_RESULTS_OFFSET:
      return {
        ...state,
        resultsOffset: payload,
      };
    case GET_DRIVERS:
      return {
        ...state,
        drivers: state.drivers.concat(payload),
      };
    case GET_RESULTS:
      return {
        ...state,
        results: state.results.concat(payload),
      };
    case REFRESH_DRIVERS:
      return {
        ...state,
        drivers: payload,
      };
    case REFRESH_RESULTS:
      return {
        ...state,
        results: payload,
      };
    default:
      return state;
  }
};

export default appReducer;
