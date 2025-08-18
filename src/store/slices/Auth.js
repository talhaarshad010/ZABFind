// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   token: null,
//   user: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setAuth(state, action) {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//     },
//     clearAuth(state) {
//       state.token = null;
//       state.user = null;
//     },
//   },
// });
// export const {setAuth, clearAuth} = authSlice.actions;
// export default authSlice.reducer;

// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   token: null,
//   user: null,
//   isProfileComplete: false, // 👈 new
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setAuth: (state, action) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.isProfileComplete = !!action.payload.user?.isProfileComplete; // or whatever field indicates completeness
//     },
//     updateUserProfile: (state, action) => {
//       state.user = {
//         ...state.user,
//         ...action.payload,
//       };
//       state.isProfileComplete = true; // 👈 mark profile as complete
//     },
//     clearAuth: state => {
//       state.token = null;
//       state.user = null;
//       // state.isProfileComplete = false;
//     },
//   },
// });

// export const {setAuth, updateUserProfile, clearAuth} = authSlice.actions;
// export default authSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  isProfileComplete: false,
  fcmToken: null, // 👈 Added for FCM token
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isProfileComplete = !!action.payload.user?.isProfileComplete;
      state.fcmToken = action.payload.fcmToken || state.fcmToken; // 👈 Preserve existing fcmToken if not provided
    },
    updateUserProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
      state.isProfileComplete = true;
    },
    setFcmToken: (state, action) => {
      state.fcmToken = action.payload; // 👈 Set FCM token
    },
    clearAuth: state => {
      state.token = null;
      state.user = null;
      state.isProfileComplete = false;
      state.fcmToken = null; // 👈 Clear FCM token on logout
    },
  },
});

export const {setAuth, updateUserProfile, setFcmToken, clearAuth} =
  authSlice.actions;
export default authSlice.reducer;
