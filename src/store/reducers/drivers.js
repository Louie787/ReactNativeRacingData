import {
  SHOW_DRIVERS_LOADER,
  HIDE_DRIVERS_LOADER,
  GET_DRIVERS,
  CHANGE_DRIVERS_OFFSET,
  REFRESH_DRIVERS,
} from '../types';

const initialState = {
  isLoading: true,
  driversOffset: 0,
  drivers: [],
};

export default function drivers(state = initialState, {type, payload}) {
  switch (type) {
    case SHOW_DRIVERS_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_DRIVERS_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    case GET_DRIVERS:
      return {
        ...state,
        drivers: state.drivers.concat(payload),
      };
    case CHANGE_DRIVERS_OFFSET:
      return {
        ...state,
        driversOffset: payload,
      };
    case REFRESH_DRIVERS:
      return {
        ...state,
        drivers: payload,
      };
    default:
      return state;
  }
}
