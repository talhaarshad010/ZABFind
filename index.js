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
import Routes from './src/routes/Routes';

const App = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const camera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'This app needs access to your camera.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
              buttonNeutral: 'Ask Me Later',
            },
          );

          const storage = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'This app needs access to your storage.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
              buttonNeutral: 'Ask Me Later',
            },
          );

          if (
            camera !== PermissionsAndroid.RESULTS.GRANTED ||
            storage !== PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.warn('Camera or Storage permission denied');
          }
        } catch (error) {
          console.warn('Permission request error:', error);
        }
      }
    };

    requestPermissions();
  }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => App);
