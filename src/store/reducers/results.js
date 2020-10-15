import {
  SHOW_RESULTS_LOADER,
  HIDE_RESULTS_LOADER,
  GET_RESULTS,
  CHANGE_RESULTS_OFFSET,
  REFRESH_RESULTS,
} from '../types';

const initialState = {
  isLoading: true,
  resultsOffset: 0,
  results: [],
};

export default function results(state = initialState, {type, payload}) {
  switch (type) {
    case SHOW_RESULTS_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_RESULTS_LOADER:
      return {
        ...state,
        isLoading: false,
      };
    case GET_RESULTS:
      return {
        ...state,
        results: state.results.concat(payload),
      };
    case CHANGE_RESULTS_OFFSET:
      return {
        ...state,
        resultsOffset: payload,
      };
    case REFRESH_RESULTS:
      return {
        ...state,
        results: payload,
      };
    default:
      return state;
  }
}
