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

import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';

const Appss = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </NavigationContainer>
  );
};

AppRegistry.registerComponent(appName, () => Appss);

// /**
//  * @format
//  */
// import React, {useEffect, useRef} from 'react';
// import {AppRegistry} from 'react-native';
// import {name as appName} from './app.json';
// import {Provider, useSelector} from 'react-redux';
// import {store} from './src/store/store';
// import Toast from 'react-native-toast-message';
// import App from './App';
// import NotificationHandler from './src/components/NotificationHandler';
// import messaging from '@react-native-firebase/messaging';
// import {NavigationContainer} from '@react-navigation/native';
// import {
//   requestNotificationPermission,
//   getFcmToken,
// } from './src/config/firebaseConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import {BaseUrl} from './src/config/Urls';

// const setupBackgroundNotifications = navigation => {
//   // Handle background notifications
//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Background Notification:', remoteMessage);
//     // Optionally store the notification for later display
//   });

//   // Handle notifications when the app is opened from the background
//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background:',
//       remoteMessage,
//     );
//     if (navigation && remoteMessage?.data?.screen === 'Viewdetails') {
//       navigation.navigate('Viewdetails', {
//         imageUri: remoteMessage.data.imageUri,
//         title: remoteMessage.data.title,
//         description: remoteMessage.data.description,
//         location: remoteMessage.data.location,
//         date: remoteMessage.data.date,
//         category: remoteMessage.data.category,
//         contactInfo: remoteMessage.data.contactInfo,
//         studentId: remoteMessage.data.studentId,
//       });
//     }
//   });

//   // Handle notifications when the app is opened from a quit state
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (
//         remoteMessage &&
//         navigation &&
//         remoteMessage?.data?.screen === 'Viewdetails'
//       ) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage,
//         );
//         navigation.navigate('Viewdetails', {
//           imageUri: remoteMessage.data.imageUri,
//           title: remoteMessage.data.title,
//           description: remoteMessage.data.description,
//           location: remoteMessage.data.location,
//           date: remoteMessage.data.date,
//           category: remoteMessage.data.category,
//           contactInfo: remoteMessage.data.contactInfo,
//           studentId: remoteMessage.data.studentId,
//         });
//       }
//     });
// };
// const updateFcmToken = async () => {
//   const {user} = useSelector(state => state.Auth);
//   const hasPermission = await requestNotificationPermission();
//   if (hasPermission) {
//     const token = await getFcmToken();
//     console.log('fcm token in index.js', token);
//     console.log('user token in index.js', user.token);
//     if (token) {
//       try {
//         // const userToken = await AsyncStorage.getItem('userToken'); // Assuming you store JWT token
//         await axios.post(
//           `${BaseUrl}/common/update-fcm-token`,
//           {fcmToken: token}, // <-- send token in body
//           {
//             headers: {
//               Authorization: `Bearer ${user?.token}`,
//             },
//           },
//         );
//         console.log('FCM token sent to backend');
//       } catch (error) {
//         console.error('Error updating FCM token:', error);
//       }
//     }
//   }
// };

// const Appss = () => {
//   const navigationRef = useRef(null);
//   useEffect(() => {
//     if (navigationRef.current) {
//       setupBackgroundNotifications(navigationRef.current);
//     }
//     updateFcmToken();
//   }, []);
//   return (
//     <NavigationContainer>
//       <Provider store={store}>
//         <NotificationHandler />
//         <App />
//         <Toast position="top" />
//       </Provider>
//     </NavigationContainer>
//   );
// };

// AppRegistry.registerComponent(appName, () => Appss);

// import React, {useRef, useEffect} from 'react';
// import {AppRegistry} from 'react-native';
// import {name as appName} from './app.json';
// import {Provider} from 'react-redux';
// import {store} from './src/store/store';
// import Toast from 'react-native-toast-message';
// import {NavigationContainer} from '@react-navigation/native';
// import App from './App';
// import NotificationHandler from './src/components/NotificationHandler';
// import messaging from '@react-native-firebase/messaging';
// import {
//   requestNotificationPermission,
//   getFcmToken,
// } from './src/config/firebaseConfig';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// // Base URL for your backend (define this globally or in a config file)

// // Move background notification setup to a function
// const setupBackgroundNotifications = navigation => {
//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Background Notification:', remoteMessage);
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log(
//       'Notification caused app to open from background:',
//       remoteMessage,
//     );
//     if (navigation && remoteMessage?.data?.screen === 'Viewdetails') {
//       navigation.navigate('Viewdetails', {
//         imageUri: remoteMessage.data.imageUri,
//         title: remoteMessage.data.title,
//         description: remoteMessage.data.description,
//         location: remoteMessage.data.location,
//         date: remoteMessage.data.date,
//         category: remoteMessage.data.category,
//         contactInfo: remoteMessage.data.contactInfo,
//         studentId: remoteMessage.data.studentId,
//       });
//     }
//   });

//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (
//         remoteMessage &&
//         navigation &&
//         remoteMessage?.data?.screen === 'Viewdetails'
//       ) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           remoteMessage,
//         );
//         navigation.navigate('Viewdetails', {
//           imageUri: remoteMessage.data.imageUri,
//           title: remoteMessage.data.title,
//           description: remoteMessage.data.description,
//           location: remoteMessage.data.location,
//           date: remoteMessage.data.date,
//           category: remoteMessage.data.category,
//           contactInfo: remoteMessage.data.contactInfo,
//           studentId: remoteMessage.data.studentId,
//         });
//       }
//     });
// };

// // Updated FCM token update function
// const updateFcmToken = async user => {
//   console.log('user object', user);
//   try {
//     const hasPermission = await requestNotificationPermission();
//     if (hasPermission) {
//       const token = await getFcmToken();
//       console.log('Token==>', token);
//       if (token && user?.token) {
//         await axios.post(
//           `${BaseUrl}/common/update-fcm-token`,
//           {fcmToken: token}, // Send fcmToken in the request body
//           {
//             headers: {
//               Authorization: `Bearer ${user.token}`, // Use user.token from the parameter
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

// const Appss = () => {
//   const navigationRef = useRef(null);

//   useEffect(() => {
//     if (navigationRef.current) {
//       setupBackgroundNotifications(navigationRef.current);
//     }

//     // Example: Fetch user token from AsyncStorage or Redux
//     const fetchUserAndUpdateToken = async () => {
//       const userToken = useSelector(state => state.Auth.token);
//       if (userToken) {
//         // Here, you might want to get the full user object from Redux or API
//         const user = {token: userToken}; // Adjust this based on your app's user object structure
//         await updateFcmToken(user);
//       }
//     };
//     fetchUserAndUpdateToken();
//   }, []);

//   return (
//     <NavigationContainer ref={navigationRef}>
//       <Provider store={store}>
//         <NotificationHandler />
//         <App />
//         <Toast position="top" />
//       </Provider>
//     </NavigationContainer>
//   );
// };

// AppRegistry.registerComponent(appName, () => Appss);
