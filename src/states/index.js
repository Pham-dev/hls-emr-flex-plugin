import { combineReducers } from 'redux';
import { reduce as CustomPanel2Reducer } from './CustomPanel2State';
// Register your redux store under a unique namespace
export const namespace = 'hls-emr';

// Combine the reducers
export default combineReducers({
  customPanel2: CustomPanel2Reducer,
});
