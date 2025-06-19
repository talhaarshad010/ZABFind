import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './Auth';
import {Auth} from '../Api/Auth';
const Reducers = combineReducers({
  Auth: authSlice,
  [Auth.reducerPath]: Auth.reducer,
});
export default Reducers;
