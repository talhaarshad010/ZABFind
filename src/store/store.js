import {configureStore} from '@reduxjs/toolkit';
import Reducers from './slices';
import {MMKV} from 'react-native-mmkv';
import {persistReducer, persistStore} from 'redux-persist';
import {Auth} from './Api/Auth';

const storage = new MMKV();

const reduxPersistStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },

  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },

  deleteItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxPersistStorage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, Reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(Auth.middleware),
});

export const persistore = persistStore(store);
