// /**
//  * @format
//  */

// import {AppRegistry, StatusBar} from 'react-native';
// import {name as appName} from './app.json';
// import Routes from './src/routes/Routes';
// import {Provider} from 'react-redux';
// import {store} from './src/store/store';
// import StackRoute from './src/routes/stack';
// import BottomTab from './src/routes/bottomtab';
// import App from './App';

// const APP = () => {
//   return (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
// };
// AppRegistry.registerComponent(appName, () => APP);

/**
 * @format
 */
import React, {useEffect} from 'react';
import {AppRegistry, PermissionsAndroid, Platform} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import Toast from 'react-native-toast-message';
import App from './App';
const Appss = () => {
  return (
    <Provider store={store}>
      <App />
      <Toast position="top" />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Appss);
