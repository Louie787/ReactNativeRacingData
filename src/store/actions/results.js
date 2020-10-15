import {
  SHOW_RESULTS_LOADER,
  HIDE_RESULTS_LOADER,
  GET_RESULTS,
  REFRESH_RESULTS,
} from '../types';
import {fetchResults} from '../../fetches';

export function getResults(driver, offset) {
  return async (dispatch) => {
    dispatch({type: SHOW_RESULTS_LOADER});
    dispatch({
      type: offset === 0 ? REFRESH_RESULTS : GET_RESULTS,
      payload: await fetchResults(driver, offset),
    });
    dispatch({type: HIDE_RESULTS_LOADER});
  };
}
