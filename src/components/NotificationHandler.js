// import messaging from '@react-native-firebase/messaging';
// import {useEffect} from 'react';
// import {useNavigation} from '@react-navigation/native';

// const NotificationHandler = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     // ✅ Foreground notifications
//     const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
//       console.log('Foreground Notification:', remoteMessage);
//       // You can show a toast/snackbar here instead of navigating
//     });

//     // ✅ Background notification (when tapped)
//     const unsubscribeBackground = messaging().onNotificationOpenedApp(
//       remoteMessage => {
//         console.log(
//           'App opened from background by notification:',
//           remoteMessage,
//         );

//         if (remoteMessage?.data) {
//           navigation.navigate('ViewDetails', {
//             imageUri: remoteMessage.data.imageUri,
//             title: remoteMessage.data.title,
//             description: remoteMessage.data.description,
//             location: remoteMessage.data.location,
//             date: remoteMessage.data.date,
//             category: remoteMessage.data.category,
//             phoneNumber: remoteMessage.data.contactInfo,
//             studentId: remoteMessage.data.studentId,
//             username: remoteMessage.data.username,
//             emailAddress: remoteMessage.data.emailAddress,
//           });
//         }
//       },
//     );

//     // ✅ Quit state (when app is killed and user taps the notification)
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage?.data) {
//           console.log(
//             'App opened from quit state by notification:',
//             remoteMessage,
//           );

//           navigation.navigate('ViewDetails', {
//             imageUri: remoteMessage.data.imageUri,
//             title: remoteMessage.data.title,
//             description: remoteMessage.data.description,
//             location: remoteMessage.data.location,
//             date: remoteMessage.data.date,
//             category: remoteMessage.data.category,
//             contactInfo: remoteMessage.data.contactInfo,
//             studentId: remoteMessage.data.studentId,
//             username: remoteMessage.data.username,
//             emailAddress: remoteMessage.data.emailAddress,
//           });
//         }
//       });

//     return () => {
//       unsubscribeForeground();
//       unsubscribeBackground();
//     };
//   }, [navigation]);

//   return null;
// };

// export default NotificationHandler;

// import messaging from '@react-native-firebase/messaging';
// import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
// import {useEffect} from 'react';
// import {useNavigation} from '@react-navigation/native';

// const NotificationHandler = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     // ✅ Ask permission once
//     notifee.requestPermission();

//     // ✅ Foreground messages
//     const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
//       console.log('Foreground Notification:', remoteMessage);

//       const channelId = await notifee.createChannel({
//         id: 'default',
//         name: 'Default Channel',
//         importance: AndroidImportance.HIGH, // ensures heads-up
//       });

//       // Display using Notifee
//       await notifee.displayNotification({
//         title: remoteMessage.notification?.title || remoteMessage.data?.title,
//         body:
//           remoteMessage.notification?.body || remoteMessage.data?.description,
//         data: remoteMessage.data, // 👈 pass data for navigation
//         android: {
//           channelId,
//           smallIcon: 'ic_stat_ic_notification', // ensure this exists in mipmap
//           largeIcon: remoteMessage.data?.imageUri || null,
//           pressAction: {id: 'default'},
//         },
//       });
//     });

//     // ✅ Handle notification events (clicks from foreground/background/quit)
//     const unsubscribeNotifee = notifee.onForegroundEvent(({type, detail}) => {
//       if (type === EventType.PRESS) {
//         console.log('Notification pressed:', detail.notification);

//         const data = detail.notification?.data;
//         if (data) {
//           navigation.navigate('ViewDetails', {
//             imageUri: data.imageUri,
//             title: data.title,
//             description: data.description,
//             location: data.location,
//             date: data.date,
//             category: data.category,
//             phoneNumber: data.contactInfo,
//             studentId: data.studentId,
//             username: data.username,
//             emailAddress: data.emailAddress,
//           });
//         }
//       }
//     });

//     // ✅ For quit state (when app is killed)
//     notifee.getInitialNotification().then(initialNotification => {
//       if (initialNotification) {
//         console.log('App opened from killed state:', initialNotification);

//         const data = initialNotification.notification?.data;
//         if (data) {
//           navigation.navigate('ViewDetails', {
//             imageUri: data.imageUri,
//             title: data.title,
//             description: data.description,
//             location: data.location,
//             date: data.date,
//             category: data.category,
//             phoneNumber: data.contactInfo,
//             studentId: data.studentId,
//             username: data.username,
//             emailAddress: data.emailAddress,
//           });
//         }
//       }
//     });

//     return () => {
//       unsubscribeForeground();
//       unsubscribeNotifee();
//     };
//   }, [navigation]);

//   return null;
// };

// export default NotificationHandler;

import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

// Reusable function to display notifications
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
    console.error('Error displaying notification:', e);
  }
};

const NotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Request notification permissions
    notifee.requestPermission();

    // Handle foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Notification:', remoteMessage);
      // Only display if no notification payload to avoid duplication
      if (!remoteMessage.notification || !remoteMessage.notification.title) {
        await displayNotification(remoteMessage);
      }
    });

    // Handle notification presses (foreground)
    const unsubscribeNotifeeForeground = notifee.onForegroundEvent(
      ({type, detail}) => {
        if (type === EventType.PRESS) {
          console.log('Foreground notification pressed:', detail.notification);
          const data = detail.notification?.data;
          if (data) {
            navigation.navigate('ViewDetails', {
              imageUri: data.imageUri,
              title: data.title,
              description: data.description,
              location: data.location,
              date: data.date,
              category: data.category,
              phoneNumber: data.contactInfo,
              studentId: data.studentId,
              username: data.username,
              emailAddress: data.emailAddress,
            });
          }
        }
      },
    );

    // Handle notifications when app is opened from quit state
    notifee.getInitialNotification().then(initialNotification => {
      if (initialNotification) {
        console.log('App opened from killed state:', initialNotification);
        const data = initialNotification.notification?.data;
        if (data) {
          navigation.navigate('ViewDetails', {
            imageUri: data.imageUri,
            title: data.title,
            description: data.description,
            location: data.location,
            date: data.date,
            category: data.category,
            phoneNumber: data.contactInfo,
            studentId: data.studentId,
            username: data.username,
            emailAddress: data.emailAddress,
          });
        }
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeNotifeeForeground();
    };
  }, [navigation]);

  return null;
};

// Handle background notification presses
notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    console.log('Background notification pressed:', detail.notification);
    // Navigation handled by getInitialNotification when app opens
  }
});

export default NotificationHandler;
