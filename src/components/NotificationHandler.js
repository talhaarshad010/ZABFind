import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

const NotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Handle foreground notifications
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground Notification:', remoteMessage);
      // Display a local notification (optional)
      // You can also navigate directly
      navigation.navigate('ViewDetails', {
        imageUri: remoteMessage.data.imageUri,
        title: remoteMessage.data.title,
        description: remoteMessage.data.description,
        location: remoteMessage.data.location,
        date: remoteMessage.data.date,
        category: remoteMessage.data.category,
        contactInfo: remoteMessage.data.contactInfo,
        studentId: remoteMessage.data.studentId,
      });
    });

    return unsubscribe;
  }, [navigation]);

  return null;
};

export default NotificationHandler;
