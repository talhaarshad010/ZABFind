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
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';
const displayNotification = async remoteMessage => {
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: remoteMessage.data?.title || remoteMessage.notification?.title,
      body: remoteMessage.data?.description || remoteMessage.notification?.body,
      data: remoteMessage.data,
      android: {
        channelId,
        smallIcon: 'ic_stat_ic_notification', // Match drawable resource
        largeIcon: remoteMessage.data?.imageUri || null,
        pressAction: {id: 'default'},
        color: '#0C54A3',
      },
    });
  } catch (e) {
    console.error('Error displaying background notification:', e);
  }
};

// Register Firebase background message handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Notification:', remoteMessage);
  // Only display if no notification payload to avoid duplication
  if (!remoteMessage.notification || !remoteMessage.notification.title) {
    await displayNotification(remoteMessage);
  }
});
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
