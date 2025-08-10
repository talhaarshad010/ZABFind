import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './Auth';
import {Auth} from '../Api/Auth';
import {ItemReports} from '../Api/addItemReport';
const Reducers = combineReducers({
  Auth: authSlice,
  [Auth.reducerPath]: Auth.reducer,
  [ItemReports.reducerPath]: ItemReports.reducer,
});
export default Reducers;
