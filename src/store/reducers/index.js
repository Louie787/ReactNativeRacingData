import {combineReducers} from 'redux';
import drivers from './drivers';
import results from './results';

export default combineReducers({
  drivers,
  results,
});
