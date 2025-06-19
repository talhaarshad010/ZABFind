import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload.token;
    },
    setUser(state, action) {
      state.token = action.payload;
    },
    clearUser(state) {
      state.token = null;
    },
  },
});

export const {setUser, clearUser} = authSlice.actions;
export default authSlice.reducer;
