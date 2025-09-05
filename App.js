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

// import React, {useEffect} from 'react';
// import {PermissionsAndroid, Platform, Alert} from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import Routes from './src/routes/Routes';

// const App = () => {
//   useEffect(() => {
//     const requestPermissions = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           // Request Camera
//           const cameraStatus = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//           );

//           // Request Storage
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

//           // ✅ Request Notifications (Android 13+)
//           let notificationStatus = 'granted';
//           if (Platform.Version >= 33) {
//             notificationStatus = await PermissionsAndroid.request(
//               PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//             );
//           }

//           // 🔍 Log results
//           console.log('📷 Camera Permission:', cameraStatus);
//           console.log('🗂 Storage Permission:', storageStatus);
//           console.log('🔔 Notification Permission:', notificationStatus);

//           // Check all permissions
//           if (
//             cameraStatus !== PermissionsAndroid.RESULTS.GRANTED ||
//             storageStatus !== PermissionsAndroid.RESULTS.GRANTED ||
//             notificationStatus !== PermissionsAndroid.RESULTS.GRANTED
//           ) {
//             Alert.alert(
//               'Permission required',
//               'Some permissions were denied. Features may not work properly.',
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

// import React, {useEffect, useRef} from 'react';
// import {PermissionsAndroid, Platform, Alert} from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import Routes from './src/routes/Routes';
// import NotificationHandler from './src/components/NotificationHandler';
// import Toast from 'react-native-toast-message';
// import messaging from '@react-native-firebase/messaging';
// import {useNavigation} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import {
//   requestNotificationPermission,
//   getFcmToken,
// } from './src/config/firebaseConfig';
// import axios from 'axios';
// import {BaseUrl} from './src/config/Urls';

// // Updated FCM token update function
// const updateFcmToken = async userToken => {
//   console.log('user token in updateFcmToken', userToken);
//   try {
//     const hasPermission = await requestNotificationPermission();
//     if (hasPermission) {
//       const token = await getFcmToken();
//       console.log('Token==>', token);
//       if (token && userToken) {
//         await axios.post(
//           `${BaseUrl}/common/update-fcm-token`,
//           {fcmToken: token},
//           {
//             headers: {
//               Authorization: `Bearer ${userToken}`,
//             },
//           },
//         );
//         console.log('FCM token sent to backend');
//       } else {
//         console.warn('No FCM token or user token available');
//       }
//     }
//   } catch (error) {
//     console.error('Error updating FCM token:', error);
//   }
// };

// const App = () => {
//   const navigationRef = useRef(null);
//   const userToken = useSelector(state => state.Auth.token);

//   // console.log("User data in app.js",user);

//   useEffect(() => {
//     // Set up background notifications
//     if (navigationRef.current) {
//       setupBackgroundNotifications(navigationRef.current);
//     }

//     // Request permissions and update FCM token
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

//           console.log('📷 Camera Permission:', cameraStatus);
//           console.log('🗂 Storage Permission:', storageStatus);

//           if (
//             cameraStatus !== PermissionsAndroid.RESULTS.GRANTED ||
//             storageStatus !== PermissionsAndroid.RESULTS.GRANTED
//           ) {
//             Alert.alert(
//               'Permission required',
//               'Some permissions were denied. Features may not work properly.',
//             );
//           }
//         } catch (error) {
//           console.warn('Permission request error:', error);
//         }
//       }
//       // Update FCM token after permissions are handled
//       if (userToken) {
//         updateFcmToken(userToken);
//       }
//     };

//     requestPermissions();
//   }, [userToken]);

//   return (
//     <GestureHandlerRootView style={{flex: 1}}>
//       <Routes />
//       <NotificationHandler />
//       <Toast position="top" />
//     </GestureHandlerRootView>
//   );
// };

// export default App;

import React, {useEffect, useRef} from 'react';
import {PermissionsAndroid, Platform, Alert} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Routes from './src/routes/Routes';
import NotificationHandler from './src/components/NotificationHandler';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {
  requestNotificationPermission,
  getFcmToken,
} from './src/config/firebaseConfig';
import axios from 'axios';
import {BaseUrl} from './src/config/Urls';

// 🔹 Update FCM token to backend
const updateFcmToken = async userToken => {
  console.log('user token in updateFcmToken', userToken);
  try {
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
      const token = await getFcmToken();
      console.log('Token==>', token);
      if (token && userToken) {
        await axios.post(
          `${BaseUrl}/common/update-fcm-token`,
          {fcmToken: token},
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          },
        );
        console.log('FCM token sent to backend');
      } else {
        console.warn('No FCM token or user token available');
      }
    }
  } catch (error) {
    console.error('Error updating FCM token:', error);
  }
};

// 🔹 Request Camera + Gallery + Notification permissions
const requestAppPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      // Camera
      const cameraStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      // Gallery (depends on Android version)
      let galleryStatus;
      if (Platform.Version >= 33) {
        galleryStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );
      } else {
        galleryStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }

      console.log('📷 Camera Permission:', cameraStatus);
      console.log('🖼 Gallery Permission:', galleryStatus);

      if (
        cameraStatus !== PermissionsAndroid.RESULTS.GRANTED ||
        galleryStatus !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        Alert.alert(
          'Permissions Required',
          'Camera and Gallery permissions are required for full functionality.',
        );
      }
    } catch (error) {
      console.warn('⚠️ Permission request error:', error);
    }
  }

  // 🔔 Notifications (Firebase)
  const notiStatus = await requestNotificationPermission();
  console.log('🔔 Notification Permission:', notiStatus);
};

const App = () => {
  const navigationRef = useRef(null);
  const userToken = useSelector(state => state.Auth.token);

  useEffect(() => {
    // ✅ Ask all permissions on app start
    requestAppPermissions();

    // ✅ Update FCM token after permissions
    if (userToken) {
      updateFcmToken(userToken);
    }
  }, [userToken]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Routes />
      <NotificationHandler />
      <Toast position="top" />
    </GestureHandlerRootView>
  );
};

export default App;
