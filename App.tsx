// import React, {useEffect} from 'react';
// import {PermissionsAndroid, Platform, Alert} from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import Routes from './src/routes/Routes';

// const App = () => {
//   useEffect(() => {
//     const requestPermissions = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           const cameraStatus = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//           );

//           let storageStatus;
//           if (Platform.Version >= 33) {
//             storageStatus = await PermissionsAndroid.request(
//               PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//             );
//           } else {
//             storageStatus = await PermissionsAndroid.request(
//               PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//             );
//           }

//           if (
//             cameraStatus !== PermissionsAndroid.RESULTS.GRANTED ||
//             storageStatus !== PermissionsAndroid.RESULTS.GRANTED
//           ) {
//             Alert.alert(
//               'Permission required',
//               'Camera or storage permission was denied. Some features may not work properly.',
//             );
//           }
//         } catch (error) {
//           console.warn('Permission request error:', error);
//         }
//       }
//     };

//     requestPermissions();
//   }, []);

//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <Routes />
//     </GestureHandlerRootView>
//   );
// };

// export default App;

import React, {useEffect} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Routes from './src/routes/Routes';

const App = () => {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          // Request Camera
          const cameraStatus = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );

          // Request Storage
          let storageStatus;
          if (Platform.Version >= 33) {
            storageStatus = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            );
          } else {
            storageStatus = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            );
          }

          // ✅ Request Notifications (Android 13+)
          let notificationStatus = 'granted';
          if (Platform.Version >= 33) {
            notificationStatus = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
          }

          // 🔍 Log results
          console.log('📷 Camera Permission:', cameraStatus);
          console.log('🗂 Storage Permission:', storageStatus);
          console.log('🔔 Notification Permission:', notificationStatus);

          // Check all permissions
          if (
            cameraStatus !== PermissionsAndroid.RESULTS.GRANTED ||
            storageStatus !== PermissionsAndroid.RESULTS.GRANTED ||
            notificationStatus !== PermissionsAndroid.RESULTS.GRANTED
          ) {
            Alert.alert(
              'Permission required',
              'Some permissions were denied. Features may not work properly.',
            );
          }
        } catch (error) {
          console.warn('Permission request error:', error);
        }
      }
    };

    requestPermissions();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Routes />
    </GestureHandlerRootView>
  );
};

export default App;
