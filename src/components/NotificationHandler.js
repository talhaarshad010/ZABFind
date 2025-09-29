// import messaging from '@react-native-firebase/messaging';
// import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
// import {useEffect} from 'react';
// import {useNavigation} from '@react-navigation/native';

// // Reusable function to display notifications
// const displayNotification = async remoteMessage => {
//   try {
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//       importance: AndroidImportance.HIGH,
//     });

//     await notifee.displayNotification({
//       title: remoteMessage.data?.title || remoteMessage.notification?.title,
//       body: remoteMessage.data?.description || remoteMessage.notification?.body,
//       data: remoteMessage.data,
//       android: {
//         channelId,
//         smallIcon: 'ic_stat_ic_notification', // Match drawable resource
//         largeIcon: remoteMessage.data?.imageUri || null,
//         pressAction: {id: 'default'},
//         color: '#0C54A3',
//       },
//     });
//   } catch (e) {
//     console.error('Error displaying notification:', e);
//   }
// };

// const NotificationHandler = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     // Request notification permissions
//     notifee.requestPermission();

//     // Handle foreground messages
//     const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
//       console.log('Foreground Notification:', remoteMessage);
//       // Only display if no notification payload to avoid duplication
//       if (!remoteMessage.notification || !remoteMessage.notification.title) {
//         await displayNotification(remoteMessage);
//       }
//     });

//     // Handle notification presses (foreground)
//     const unsubscribeNotifeeForeground = notifee.onForegroundEvent(
//       ({type, detail}) => {
//         if (type === EventType.PRESS) {
//           console.log('Foreground notification pressed:', detail.notification);
//           const data = detail.notification?.data;
//           if (data) {
//             navigation.navigate('ViewDetails', {
//               imageUri: data.imageUri,
//               title: data.title,
//               description: data.description,
//               location: data.location,
//               date: data.date,
//               category: data.category,
//               phoneNumber: data.contactInfo,
//               studentId: data.studentId,
//               username: data.username,
//               emailAddress: data.emailAddress,
//             });
//           }
//         }
//       },
//     );

//     // Handle notifications when app is opened from quit state
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
//       unsubscribeNotifeeForeground();
//     };
//   }, [navigation]);

//   return null;
// };

// // Handle background notification presses
// notifee.onBackgroundEvent(async ({type, detail}) => {
//   if (type === EventType.PRESS) {
//     console.log('Background notification pressed:', detail.notification);
//     // Navigation handled by getInitialNotification when app opens
//   }
// });

// export default NotificationHandler;

import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

// Reusable function to display notifications with consistent layout
const displayNotification = async remoteMessage => {
  try {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title:
        remoteMessage.data?.title ||
        remoteMessage.notification?.title ||
        'Notification',
      body:
        remoteMessage.data?.description ||
        remoteMessage.notification?.body ||
        'New notification received',
      data: remoteMessage.data || {},
      android: {
        channelId,
        smallIcon: 'ic_launcher', // Use app logo as small icon (ensure ic_launcher exists in drawable)
        largeIcon: remoteMessage.data?.imageUri || null,
        pressAction: {id: 'default'},
        color: '#0C54A3',
        style: {
          type: notifee.AndroidStyle.BIGTEXT,
          text:
            remoteMessage.data?.description ||
            remoteMessage.notification?.body ||
            'New notification received',
        },
      },
    });
  } catch (e) {
    console.error('Error displaying notification:', e);
  }
};

// Handle background and quit state notifications
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Notification:', remoteMessage);
  await displayNotification(remoteMessage);
});

const NotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Handle foreground messages
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Notification:', remoteMessage);
      await displayNotification(remoteMessage);
    });

    // Handle notification presses (foreground and background)
    const unsubscribeNotifee = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        console.log('Notification pressed:', detail.notification);
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
    });

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
      unsubscribeNotifee();
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
