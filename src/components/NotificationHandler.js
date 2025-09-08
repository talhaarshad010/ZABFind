// import messaging from '@react-native-firebase/messaging';
// import {useNavigation} from '@react-navigation/native';
// import {useEffect} from 'react';

// const NotificationHandler = () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     // Handle foreground notifications
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('Foreground Notification:', remoteMessage);
//       // Display a local notification (optional)
//       // You can also navigate directly
//       navigation.navigate('ViewDetails', {
//         imageUri: remoteMessage.data.imageUri,
//         title: remoteMessage.data.title,
//         description: remoteMessage.data.description,
//         location: remoteMessage.data.location,
//         date: remoteMessage.data.date,
//         category: remoteMessage.data.category,
//         contactInfo: remoteMessage.data.contactInfo,
//         studentId: remoteMessage.data.studentId,
//       });
//     });

//     return unsubscribe;
//   }, [navigation]);

//   return null;
// };

// export default NotificationHandler;

// import messaging from '@react-native-firebase/messaging';
// import {useEffect} from 'react';

// const NotificationHandler = () => {
//   useEffect(() => {
//     // Handle foreground notifications
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('Foreground Notification:', remoteMessage);
//       // ✅ Don’t navigate — just handle as you like
//       // Example: show an in-app banner, toast, or store in Redux/context
//     });

//     return unsubscribe;
//   }, []);

//   return null;
// };

// export default NotificationHandler;

import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';

const NotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // ✅ Foreground notifications
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Notification:', remoteMessage);
      // You can show a toast/snackbar here instead of navigating
    });

    // ✅ Background notification (when tapped)
    const unsubscribeBackground = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log(
          'App opened from background by notification:',
          remoteMessage,
        );

        if (remoteMessage?.data) {
          navigation.navigate('ViewDetails', {
            imageUri: remoteMessage.data.imageUri,
            title: remoteMessage.data.title,
            description: remoteMessage.data.description,
            location: remoteMessage.data.location,
            date: remoteMessage.data.date,
            category: remoteMessage.data.category,
            phoneNumber: remoteMessage.data.contactInfo,
            studentId: remoteMessage.data.studentId,
            username: remoteMessage.data.username,
            emailAddress: remoteMessage.data.emailAddress,
          });
        }
      },
    );

    // ✅ Quit state (when app is killed and user taps the notification)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage?.data) {
          console.log(
            'App opened from quit state by notification:',
            remoteMessage,
          );

          navigation.navigate('ViewDetails', {
            imageUri: remoteMessage.data.imageUri,
            title: remoteMessage.data.title,
            description: remoteMessage.data.description,
            location: remoteMessage.data.location,
            date: remoteMessage.data.date,
            category: remoteMessage.data.category,
            contactInfo: remoteMessage.data.contactInfo,
            studentId: remoteMessage.data.studentId,
            username: remoteMessage.data.username,
            emailAddress: remoteMessage.data.emailAddress,
          });
        }
      });

    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, [navigation]);

  return null;
};

export default NotificationHandler;





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
//         body: remoteMessage.notification?.body || remoteMessage.data?.description,
//         data: remoteMessage.data, // 👈 pass data for navigation
//         android: {
//           channelId,
//           smallIcon: 'ic_launcher', // ensure this exists in mipmap
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
