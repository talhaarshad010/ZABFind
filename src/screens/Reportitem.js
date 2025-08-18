import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  Pressable,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import MyHeader from '../components/Header';
import WrapperContainer from '../components/WrapperContainer';
import Colors from '../styles/Colors';
import MyText from '../components/textcomponent';
import Icon from 'react-native-vector-icons/Ionicons';
import UploadIcon from 'react-native-vector-icons/Feather';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import MyTextInput from '../components/TextInputComponent';
import TextInputDropdown from '../components/Dropdown';
import MyButton from '../components/CustomButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import ToastMessage from '../hooks/ToastMessage';
import {useAddReportMutation} from '../store/Api/addItemReport';

const Reportitem = () => {
  const [selected, setSelected] = useState('lost');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {Toasts} = ToastMessage();
  const [addReport, {isLoading: isApiLoading}] = useAddReportMutation();

  const categoryOptions = [
    'Electronics',
    'Personal Items',
    'Keys',
    'Accessories',
    'Books',
    'Documents',
    'Clothing',
    'Sports Equipment',
    'Other',
  ];

  const locationOptions = [
    'Library - 1st Floor',
    'Library - 2nd Floor',
    'Library - 3rd Floor',
    'Cafeteria',
    'Computer Lab 1',
    'Computer Lab 2',
    'Computer Lab 3',
    'Lecture Hall 1',
    'Lecture Hall 2',
    'Lecture Hall 3',
    'Sports Complex',
    'Parking Lot A',
    'Parking Lot B',
    'Main Entrance',
    'Administration Office',
    'Student Lounge',
    'Other',
  ];

  const resetForm = () => {
    setItemName('');
    setCategory('');
    setDescription('');
    setSelected('lost');
    setImageUri(null);
    setImageFile(null);
    setLocation('');
    setContactInfo('');
  };

  const handleSubmit = async () => {
    if (!itemName.trim()) {
      Toasts('Error', 'Please enter the item name.', 'error', 4000);
      return;
    }
    if (!category) {
      Toasts('Error', 'Please select a category.', 'error', 4000);
      return;
    }
    if (!description.trim()) {
      Toasts('Error', 'Please provide a description.', 'error', 4000);
      return;
    }
    if (!location) {
      Toasts('Error', 'Please select a location.', 'error', 4000);
      return;
    }
    if (!contactInfo.trim()) {
      Toasts('Error', 'Please enter contact information.', 'error', 4000);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('type', selected);
      formData.append('title', itemName);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('date', new Date().toISOString());
      formData.append('category', category);
      formData.append('contactInfo', contactInfo);

      if (imageFile) {
        formData.append('image', {
          uri: imageFile.uri,
          type: imageFile.type || 'image/jpeg',
          name: imageFile.fileName || 'image.jpg',
        });
      }

      const response = await addReport(formData).unwrap();

      Toasts(
        'Success',
        response.message ||
          `${
            selected === 'lost' ? 'Lost' : 'Found'
          } item reported successfully.`,
        'success',
        4000,
      );
      setTimeout(() => {
        resetForm();
        navigation.goBack();
      }, 1000);
    } catch (error) {
      let errorMessage = 'Failed to submit report. Please try again.';

      if (error.status === 400) {
        errorMessage = error.data?.message || 'Invalid input data.';
      } else if (error.status === 409) {
        errorMessage =
          error.data?.message || 'This item has already been reported.';
      } else if (error.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.originalStatus === 0) {
        errorMessage =
          'No response from server. Check your network connection.';
      }

      Toasts('Error', errorMessage, 'error', 4000);
      console.error('Report Item Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const requestStoragePermission = async () => {
    if (Platform.OS !== 'android') return true;

    let permission;
    if (parseInt(Platform.Version, 10) >= 33) {
      // Android 13+: Use granular media permissions
      permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    } else {
      // Android 12 and below: Use legacy storage permission
      permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    }

    const granted = await PermissionsAndroid.request(permission, {
      title: 'Storage Permission',
      message: 'This app needs access to your photo library.',
      buttonPositive: 'OK',
    });

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Toasts('Error', 'Camera permission denied', 'error', 4000);
      return;
    }

    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      response => {
        setImagePickerModalVisible(false);
        if (
          !response.didCancel &&
          response.assets &&
          response.assets.length > 0
        ) {
          const asset = response.assets[0];
          setImageUri(asset.uri);
          setImageFile({
            uri: asset.uri,
            type: asset.type,
            fileName: asset.fileName || `image_${Date.now()}.jpg`,
          });
          Toasts('Success', 'Image captured successfully', 'success', 4000);
        } else if (response.errorCode) {
          Toasts('Error', 'Failed to capture image', 'error', 4000);
        }
      },
    );
  };

  const openGallery = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Toasts('Error', 'Storage permission denied', 'error', 4000);
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        setImagePickerModalVisible(false);
        if (
          !response.didCancel &&
          response.assets &&
          response.assets.length > 0
        ) {
          const asset = response.assets[0];
          setImageUri(asset.uri);
          setImageFile({
            uri: asset.uri,
            type: asset.type,
            fileName: asset.fileName || `image_${Date.now()}.jpg`,
          });
          Toasts('Success', 'Image selected successfully', 'success', 4000);
        } else if (response.errorCode) {
          Toasts('Error', 'Failed to select image', 'error', 4000);
        }
      },
    );
  };

  return (
    <WrapperContainer>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{paddingBottom: responsiveHeight(10)}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <MyHeader
            ScreenName={'Report Item'}
            style={styles.header}
            leftView={
              <Icon
                name="arrow-back"
                size={30}
                color={Colors.black}
                onPress={() => navigation.goBack()}
              />
            }
            rightView={
              <View>
                <Image
                  style={styles.logo}
                  source={require('../assets/logo.png')}
                />
              </View>
            }
          />

          <View style={styles.container}>
            <View style={styles.topSection}>
              <MyText
                color={Colors.black}
                fontSize={responsiveFontSize(3.5)}
                fontWeight={'600'}
                text={'Report an item'}
              />
              <MyText
                text={
                  'Help others find their lost belongings or report items you have found.'
                }
              />
            </View>

            <View style={styles.container_02}>
              <MyText
                text="What are you reporting?"
                fontSize={responsiveFontSize(2)}
                fontWeight="600"
                color={Colors.black}
                textStyle={{marginBottom: responsiveHeight(2)}}
              />

              <View style={styles.optionsRow}>
                <TouchableOpacity
                  style={[
                    styles.card,
                    selected === 'lost' && styles.selectedCardLost,
                  ]}
                  onPress={() => setSelected('lost')}>
                  <MyText
                    text="🙁"
                    fontSize={responsiveFontSize(4)}
                    textStyle={{marginBottom: responsiveHeight(1)}}
                  />
                  <MyText
                    text="I Lost Something"
                    fontSize={responsiveFontSize(2)}
                    fontWeight="600"
                    color={Colors.black}
                    textStyle={{textAlign: 'center'}}
                  />
                  <MyText
                    text="Report a lost item"
                    fontSize={responsiveFontSize(1.6)}
                    color={Colors.gray}
                    textStyle={{
                      textAlign: 'center',
                      marginTop: responsiveHeight(0.5),
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.card,
                    selected === 'found' && styles.selectedCardFound,
                  ]}
                  onPress={() => setSelected('found')}>
                  <MyText
                    text="🎉"
                    fontSize={responsiveFontSize(4)}
                    textStyle={{marginBottom: responsiveHeight(1)}}
                  />
                  <MyText
                    text="I Found Something"
                    fontSize={responsiveFontSize(2)}
                    fontWeight="600"
                    color={Colors.black}
                    textStyle={{textAlign: 'center'}}
                  />
                  <MyText
                    text="Report a found item"
                    fontSize={responsiveFontSize(1.6)}
                    color={Colors.gray}
                    textStyle={{
                      textAlign: 'center',
                      marginTop: responsiveHeight(0.5),
                    }}
                  />
                </TouchableOpacity>
              </View>

              <MyTextInput
                fieldName="Item Name *"
                placeholder="e.g., iPhone 14, Blue Backpack, Car Keys"
                value={itemName}
                onChangeText={setItemName}
              />

              <MyText
                text="Category *"
                fontWeight="500"
                fontSize={responsiveFontSize(2.2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TextInputDropdown
                defaultValue={category}
                data={categoryOptions}
                onSelect={setCategory}
                isOpen={isCategoryDropdownOpen}
                onToggle={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setIsLocationDropdownOpen(false);
                }}
              />

              <MyText
                text="Description *"
                fontWeight="500"
                fontSize={responsiveFontSize(2.2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />

              <View style={styles.descriptionContainer}>
                <TextInput
                  placeholder="Provide a detailed description including color, brand, size, distinctive features, etc."
                  placeholderTextColor={Colors.gray}
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  numberOfLines={5}
                  style={styles.descriptionInput}
                  textAlignVertical="top"
                  allowFontScaling={false}
                  cursorColor={Colors.black}
                />
              </View>

              <MyText
                text="Location *"
                fontWeight="500"
                fontSize={responsiveFontSize(2.2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TextInputDropdown
                defaultValue={location}
                data={locationOptions}
                onSelect={setLocation}
                isOpen={isLocationDropdownOpen}
                onToggle={() => {
                  setIsLocationDropdownOpen(!isLocationDropdownOpen);
                  setIsCategoryDropdownOpen(false);
                }}
              />

              <MyTextInput
                fieldName="Contact Information *"
                placeholder="e.g., your phone number, email, or social handle"
                value={contactInfo}
                onChangeText={setContactInfo}
              />

              <MyText
                text="Attach Image (optional)"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />

              <TouchableOpacity
                onPress={() => setImagePickerModalVisible(true)}
                style={styles.dottedBox}>
                <View style={{alignItems: 'center'}}>
                  <UploadIcon
                    name="upload"
                    size={responsiveWidth(8)}
                    color={Colors.gray}
                    style={styles.uploadIcon}
                  />

                  <MyText
                    text="Click to upload"
                    fontSize={responsiveFontSize(2)}
                    fontWeight="600"
                    color={Colors.black}
                    textStyle={{marginTop: responsiveHeight(1)}}
                  />

                  <MyText
                    text="PNG, JPG up to 10MB"
                    fontSize={responsiveFontSize(1.6)}
                    color={Colors.gray}
                    textStyle={{marginVertical: responsiveHeight(0.5)}}
                  />

                  <MyButton
                    text="Choose File"
                    onPress={() => setImagePickerModalVisible(true)}
                    backgroundColor={Colors.primary}
                    textColor={Colors.white}
                    fontWeight="500"
                    style={{padding: responsiveWidth(2)}}
                  />
                </View>
              </TouchableOpacity>

              <Modal
                transparent
                animationType="slide"
                visible={imagePickerModalVisible}
                onRequestClose={() => setImagePickerModalVisible(false)}>
                <Pressable
                  onPress={() => setImagePickerModalVisible(false)}
                  style={styles.modalOverlay}
                />

                <View style={styles.modalContainer}>
                  <MyText
                    text="Upload Image"
                    fontSize={responsiveFontSize(2.5)}
                    fontWeight="600"
                    color={Colors.black}
                    textStyle={{marginBottom: responsiveHeight(2)}}
                  />

                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={openCamera}>
                    <MyText
                      text="📷 Open Camera"
                      color={Colors.black}
                      fontWeight="500"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={openGallery}>
                    <MyText
                      text="🖼️ Choose from Gallery"
                      color={Colors.black}
                      fontWeight="500"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.modalButton,
                      {backgroundColor: Colors.lightGray},
                    ]}
                    onPress={() => setImagePickerModalVisible(false)}>
                    <MyText text="Cancel" color={Colors.darkGray} />
                  </TouchableOpacity>
                </View>
              </Modal>

              {imageUri && (
                <Image source={{uri: imageUri}} style={styles.previewImage} />
              )}

              <View style={styles.buttonRow}>
                <View style={styles.buttonWrapper}>
                  <MyButton
                    backgroundColor={Colors.gray}
                    text="Cancel"
                    onPress={resetForm}
                    textStyle={{color: Colors.black}}
                    disabled={isLoading || isApiLoading}
                  />
                </View>
                <View style={styles.buttonWrapper}>
                  <MyButton
                    backgroundColor={Colors.primary}
                    text={
                      isLoading || isApiLoading ? 'Submitting...' : 'Submit'
                    }
                    onPress={handleSubmit}
                    disabled={isLoading || isApiLoading}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    zIndex: 10,
  },
  logo: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(3),
  },
  topSection: {
    paddingVertical: responsiveHeight(3),
  },
  container_02: {
    marginVertical: responsiveHeight(2),
    borderRadius: responsiveWidth(2),
    borderWidth: responsiveWidth(0.4),
    borderColor: Colors.lightGray,
    padding: responsiveWidth(3),
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(3),
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(4),
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  selectedCardLost: {
    borderColor: '#ff4d4d',
    backgroundColor: '#ffecec',
  },
  selectedCardFound: {
    borderColor: '#0fbcf9',
    backgroundColor: '#e5f7ff',
  },
  fieldLabel: {
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(1),
  },
  descriptionContainer: {
    minHeight: responsiveHeight(15),
    borderRadius: responsiveWidth(2),
    backgroundColor: Colors.white,
    borderColor: Colors.lightGray,
    borderWidth: responsiveWidth(0.4),
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
  },
  descriptionInput: {
    flex: 1,
    fontSize: responsiveFontSize(1.7),
    color: Colors.black,
    paddingVertical: 0,
  },
  previewImage: {
    width: responsiveWidth(60),
    height: responsiveHeight(20),
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: responsiveHeight(2),
  },
  buttonWrapper: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(3),
    marginTop: responsiveHeight(3),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    padding: responsiveWidth(5),
    borderTopLeftRadius: responsiveWidth(5),
    borderTopRightRadius: responsiveWidth(5),
    alignItems: 'center',
  },
  modalButton: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5),
  },
  dottedBox: {
    borderWidth: 1.5,
    borderColor: Colors.gray,
    borderStyle: 'dashed',
    borderRadius: responsiveWidth(3),
    padding: responsiveHeight(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(2),
  },
  uploadIcon: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    tintColor: Colors.gray,
  },
});

export default Reportitem;

// import {
//   Image,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   Modal,
//   Pressable,
//   PermissionsAndroid,
//   TextInput,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import MyHeader from '../components/Header';
// import WrapperContainer from '../components/WrapperContainer';
// import Colors from '../styles/Colors';
// import MyText from '../components/textcomponent';
// import Icon from 'react-native-vector-icons/Ionicons';
// import UploadIcon from 'react-native-vector-icons/Feather';
// import {
//   responsiveWidth,
//   responsiveHeight,
//   responsiveFontSize,
// } from 'react-native-responsive-dimensions';
// import MyTextInput from '../components/TextInputComponent';
// import TextInputDropdown from '../components/Dropdown';
// import MyButton from '../components/CustomButton';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {useNavigation} from '@react-navigation/native';
// import ToastMessage from '../hooks/ToastMessage';
// import {useAddReportMutation} from '../store/Api/addItemReport';
// import messaging from '@react-native-firebase/messaging';
// import {useSelector} from 'react-redux';

// const Reportitem = () => {
//   const [selected, setSelected] = useState('lost');
//   const [itemName, setItemName] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [imageUri, setImageUri] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [location, setLocation] = useState('');
//   const [contactInfo, setContactInfo] = useState('');
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//   const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
//   const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigation = useNavigation();
//   const {Toasts} = ToastMessage();
//   const [addReport, {isLoading: isApiLoading}] = useAddReportMutation();
//   const fcmToken = useSelector(state => state.Auth?.user?.fcmToken);

//   const categoryOptions = [
//     'Electronics',
//     'Personal Items',
//     'Keys',
//     'Accessories',
//     'Books',
//     'Documents',
//     'Clothing',
//     'Sports Equipment',
//     'Other',
//   ];

//   const locationOptions = [
//     'Library - 1st Floor',
//     'Library - 2nd Floor',
//     'Library - 3rd Floor',
//     'Cafeteria',
//     'Computer Lab 1',
//     'Computer Lab 2',
//     'Computer Lab 3',
//     'Lecture Hall 1',
//     'Lecture Hall 2',
//     'Lecture Hall 3',
//     'Sports Complex',
//     'Parking Lot A',
//     'Parking Lot B',
//     'Main Entrance',
//     'Administration Office',
//     'Student Lounge',
//     'Other',
//   ];

//   useEffect(() => {
//     const requestNotificationPermission = async () => {
//       try {
//         const authStatus = await messaging().requestPermission({
//           alert: true,
//           badge: true,
//           sound: true,
//         });
//         const enabled =
//           authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//           authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//         if (!enabled) {
//           console.log('Notification permission denied');
//         }
//       } catch (error) {
//         console.error('Error requesting notification permission:', error);
//       }
//     };

//     const setupNotifications = async () => {
//       try {
//         // Set up background message handler
//         await messaging().setBackgroundMessageHandler(async remoteMessage => {
//           console.log('Background notification received:', remoteMessage);
//           // System notification is handled automatically by FCM if the payload includes a 'notification' field
//         });

//         // Request notification permissions
//         await requestNotificationPermission();

//         // Handle foreground notifications
//         const unsubscribeForeground = messaging().onMessage(
//           async remoteMessage => {
//             console.log('Foreground notification received:', remoteMessage);
//             // FCM automatically displays system notifications if the payload includes a 'notification' field
//             // No additional action needed unless you want custom handling
//           },
//         );

//         // Handle notification tap when app is in background
//         const unsubscribeBackground = messaging().onNotificationOpenedApp(
//           remoteMessage => {
//             console.log(
//               'Notification caused app to open from background:',
//               remoteMessage,
//             );
//             const itemId = remoteMessage.data?.itemId;
//             if (itemId) {
//               navigation.navigate('ItemDetails', {itemId});
//             } else {
//               navigation.navigate('Home');
//             }
//           },
//         );

//         // Handle notification tap when app is opened from quit state
//         messaging()
//           .getInitialNotification()
//           .then(remoteMessage => {
//             if (remoteMessage) {
//               console.log(
//                 'Notification caused app to open from quit state:',
//                 remoteMessage,
//               );
//               const itemId = remoteMessage.data?.itemId;
//               if (itemId) {
//                 navigation.navigate('ItemDetails', {itemId});
//               } else {
//                 navigation.navigate('Home');
//               }
//             }
//           })
//           .catch(error => {
//             console.error('Error handling initial notification:', error);
//           });

//         return () => {
//           unsubscribeForeground();
//           unsubscribeBackground();
//         };
//       } catch (error) {
//         console.error('Error in notification setup:', error);
//       }
//     };

//     setupNotifications();
//   }, [navigation]);

//   const resetForm = () => {
//     setItemName('');
//     setCategory('');
//     setDescription('');
//     setSelected('lost');
//     setImageUri(null);
//     setImageFile(null);
//     setLocation('');
//     setContactInfo('');
//   };

//   const handleSubmit = async () => {
//     if (!itemName.trim()) {
//       Toasts('Error', 'Please enter the item name.', 'error', 4000);
//       return;
//     }
//     if (!category) {
//       Toasts('Error', 'Please select a category.', 'error', 4000);
//       return;
//     }
//     if (!description.trim()) {
//       Toasts('Error', 'Please provide a description.', 'error', 4000);
//       return;
//     }
//     if (!location) {
//       Toasts('Error', 'Please select a location.', 'error', 4000);
//       return;
//     }
//     if (!contactInfo.trim()) {
//       Toasts('Error', 'Please enter contact information.', 'error', 4000);
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append('type', selected);
//       formData.append('title', itemName);
//       formData.append('description', description);
//       formData.append('location', location);
//       formData.append('date', new Date().toISOString());
//       formData.append('category', category);
//       formData.append('contactInfo', contactInfo);

//       if (imageFile) {
//         formData.append('image', {
//           uri: imageFile.uri,
//           type: imageFile.type || 'image/jpeg',
//           name: imageFile.fileName || 'image.jpg',
//         });
//       }

//       const response = await addReport(formData).unwrap();

//       Toasts(
//         'Success',
//         response.message ||
//           `${
//             selected === 'lost' ? 'Lost' : 'Found'
//           } item reported successfully.`,
//         'success',
//         4000,
//       );
//       setTimeout(() => {
//         resetForm();
//         navigation.goBack();
//       }, 1000);
//     } catch (error) {
//       let errorMessage = 'Failed to submit report. Please try again.';
//       if (error.status === 400) {
//         errorMessage = error.data?.message || 'Invalid input data.';
//       } else if (error.status === 409) {
//         errorMessage =
//           error.data?.message || 'This item has already been reported.';
//       } else if (error.status === 500) {
//         errorMessage = 'Server error. Please try again later.';
//       } else if (error.originalStatus === 0) {
//         errorMessage =
//           'No response from server. Check your network connection.';
//       }
//       Toasts('Error', errorMessage, 'error', 4000);
//       console.error('Report Item Error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'This app needs access to your camera.',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   const requestStoragePermission = async () => {
//     if (Platform.OS !== 'android') return true;
//     let permission;
//     if (parseInt(Platform.Version, 10) >= 33) {
//       permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
//     } else {
//       permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
//     }
//     const granted = await PermissionsAndroid.request(permission, {
//       title: 'Storage Permission',
//       message: 'This app needs access to your photo library.',
//       buttonPositive: 'OK',
//     });
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   const openCamera = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//       Toasts('Error', 'Camera permission denied', 'error', 4000);
//       return;
//     }
//     launchCamera(
//       {
//         mediaType: 'photo',
//         cameraType: 'back',
//       },
//       response => {
//         setImagePickerModalVisible(false);
//         if (
//           !response.didCancel &&
//           response.assets &&
//           response.assets.length > 0
//         ) {
//           const asset = response.assets[0];
//           setImageUri(asset.uri);
//           setImageFile({
//             uri: asset.uri,
//             type: asset.type,
//             fileName: asset.fileName || `image_${Date.now()}.jpg`,
//           });
//           Toasts('Success', 'Image captured successfully', 'success', 4000);
//         } else if (response.errorCode) {
//           Toasts('Error', 'Failed to capture image', 'error', 4000);
//         }
//       },
//     );
//   };

//   const openGallery = async () => {
//     const hasPermission = await requestStoragePermission();
//     if (!hasPermission) {
//       Toasts('Error', 'Storage permission denied', 'error', 4000);
//       return;
//     }
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//       },
//       response => {
//         setImagePickerModalVisible(false);
//         if (
//           !response.didCancel &&
//           response.assets &&
//           response.assets.length > 0
//         ) {
//           const asset = response.assets[0];
//           setImageUri(asset.uri);
//           setImageFile({
//             uri: asset.uri,
//             type: asset.type,
//             fileName: asset.fileName || `image_${Date.now()}.jpg`,
//           });
//           Toasts('Success', 'Image selected successfully', 'success', 4000);
//         } else if (response.errorCode) {
//           Toasts('Error', 'Failed to select image', 'error', 4000);
//         }
//       },
//     );
//   };

//   return (
//     <WrapperContainer>
//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
//         <ScrollView
//           style={{flex: 1}}
//           contentContainerStyle={{paddingBottom: responsiveHeight(10)}}
//           keyboardShouldPersistTaps="handled"
//           showsVerticalScrollIndicator={false}>
//           <MyHeader
//             ScreenName={'Report Item'}
//             style={styles.header}
//             leftView={
//               <Icon
//                 name="arrow-back"
//                 size={30}
//                 color={Colors.black}
//                 onPress={() => navigation.goBack()}
//               />
//             }
//             rightView={
//               <View>
//                 <Image
//                   style={styles.logo}
//                   source={require('../assets/logo.png')}
//                 />
//               </View>
//             }
//           />
//           <View style={styles.container}>
//             <View style={styles.topSection}>
//               <MyText
//                 color={Colors.black}
//                 fontSize={responsiveFontSize(3.5)}
//                 fontWeight={'600'}
//                 text={'Report an item'}
//               />
//               <MyText
//                 text={
//                   'Help others find their lost belongings or report items you have found.'
//                 }
//               />
//             </View>
//             <View style={styles.container_02}>
//               <MyText
//                 text="What are you reporting?"
//                 fontSize={responsiveFontSize(2)}
//                 fontWeight="600"
//                 color={Colors.black}
//                 textStyle={{marginBottom: responsiveHeight(2)}}
//               />
//               <View style={styles.optionsRow}>
//                 <TouchableOpacity
//                   style={[
//                     styles.card,
//                     selected === 'lost' && styles.selectedCardLost,
//                   ]}
//                   onPress={() => setSelected('lost')}>
//                   <MyText
//                     text="🙁"
//                     fontSize={responsiveFontSize(4)}
//                     textStyle={{marginBottom: responsiveHeight(1)}}
//                   />
//                   <MyText
//                     text="I Lost Something"
//                     fontSize={responsiveFontSize(2)}
//                     fontWeight="600"
//                     color={Colors.black}
//                     textStyle={{textAlign: 'center'}}
//                   />
//                   <MyText
//                     text="Report a lost item"
//                     fontSize={responsiveFontSize(1.6)}
//                     color={Colors.gray}
//                     textStyle={{
//                       textAlign: 'center',
//                       marginTop: responsiveHeight(0.5),
//                     }}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[
//                     styles.card,
//                     selected === 'found' && styles.selectedCardFound,
//                   ]}
//                   onPress={() => setSelected('found')}>
//                   <MyText
//                     text="🎉"
//                     fontSize={responsiveFontSize(4)}
//                     textStyle={{marginBottom: responsiveHeight(1)}}
//                   />
//                   <MyText
//                     text="I Found Something"
//                     fontSize={responsiveFontSize(2)}
//                     fontWeight="600"
//                     color={Colors.black}
//                     textStyle={{textAlign: 'center'}}
//                   />
//                   <MyText
//                     text="Report a found item"
//                     fontSize={responsiveFontSize(1.6)}
//                     color={Colors.gray}
//                     textStyle={{
//                       textAlign: 'center',
//                       marginTop: responsiveHeight(0.5),
//                     }}
//                   />
//                 </TouchableOpacity>
//               </View>
//               <MyTextInput
//                 fieldName="Item Name *"
//                 placeholder="e.g., iPhone 14, Blue Backpack, Car Keys"
//                 value={itemName}
//                 onChangeText={setItemName}
//               />
//               <MyText
//                 text="Category *"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2.2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <TextInputDropdown
//                 defaultValue={category}
//                 data={categoryOptions}
//                 onSelect={setCategory}
//                 isOpen={isCategoryDropdownOpen}
//                 onToggle={() => {
//                   setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
//                   setIsLocationDropdownOpen(false);
//                 }}
//               />
//               <MyText
//                 text="Description *"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2.2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <View style={styles.descriptionContainer}>
//                 <TextInput
//                   placeholder="Provide a detailed description including color, brand, size, distinctive features, etc."
//                   placeholderTextColor={Colors.gray}
//                   value={description}
//                   onChangeText={setDescription}
//                   multiline={true}
//                   numberOfLines={5}
//                   style={styles.descriptionInput}
//                   textAlignVertical="top"
//                   allowFontScaling={false}
//                   cursorColor={Colors.black}
//                 />
//               </View>
//               <MyText
//                 text="Location *"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2.2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <TextInputDropdown
//                 defaultValue={location}
//                 data={locationOptions}
//                 onSelect={setLocation}
//                 isOpen={isLocationDropdownOpen}
//                 onToggle={() => {
//                   setIsLocationDropdownOpen(!isLocationDropdownOpen);
//                   setIsCategoryDropdownOpen(false);
//                 }}
//               />
//               <MyTextInput
//                 fieldName="Contact Information *"
//                 placeholder="e.g., your phone number, email, or social handle"
//                 value={contactInfo}
//                 onChangeText={setContactInfo}
//               />
//               <MyText
//                 text="Attach Image (optional)"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <TouchableOpacity
//                 onPress={() => setImagePickerModalVisible(true)}
//                 style={styles.dottedBox}>
//                 <View style={{alignItems: 'center'}}>
//                   <UploadIcon
//                     name="upload"
//                     size={responsiveWidth(8)}
//                     color={Colors.gray}
//                     style={styles.uploadIcon}
//                   />
//                   <MyText
//                     text="Click to upload"
//                     fontSize={responsiveFontSize(2)}
//                     fontWeight="600"
//                     color={Colors.black}
//                     textStyle={{marginTop: responsiveHeight(1)}}
//                   />
//                   <MyText
//                     text="PNG, JPG up to 10MB"
//                     fontSize={responsiveFontSize(1.6)}
//                     color={Colors.gray}
//                     textStyle={{marginVertical: responsiveHeight(0.5)}}
//                   />
//                   <MyButton
//                     text="Choose File"
//                     onPress={() => setImagePickerModalVisible(true)}
//                     backgroundColor={Colors.primary}
//                     textColor={Colors.white}
//                     fontWeight="500"
//                     style={{padding: responsiveWidth(2)}}
//                   />
//                 </View>
//               </TouchableOpacity>
//               <Modal
//                 transparent
//                 animationType="slide"
//                 visible={imagePickerModalVisible}
//                 onRequestClose={() => setImagePickerModalVisible(false)}>
//                 <Pressable
//                   onPress={() => setImagePickerModalVisible(false)}
//                   style={styles.modalOverlay}
//                 />
//                 <View style={styles.modalContainer}>
//                   <MyText
//                     text="Upload Image"
//                     fontSize={responsiveFontSize(2.5)}
//                     fontWeight="600"
//                     color={Colors.black}
//                     textStyle={{marginBottom: responsiveHeight(2)}}
//                   />
//                   <TouchableOpacity
//                     style={styles.modalButton}
//                     onPress={openCamera}>
//                     <MyText
//                       text="📷 Open Camera"
//                       color={Colors.black}
//                       fontWeight="500"
//                     />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={styles.modalButton}
//                     onPress={openGallery}>
//                     <MyText
//                       text="🖼️ Choose from Gallery"
//                       color={Colors.black}
//                       fontWeight="500"
//                     />
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     style={[
//                       styles.modalButton,
//                       {backgroundColor: Colors.lightGray},
//                     ]}
//                     onPress={() => setImagePickerModalVisible(false)}>
//                     <MyText text="Cancel" color={Colors.darkGray} />
//                   </TouchableOpacity>
//                 </View>
//               </Modal>
//               {imageUri && (
//                 <Image source={{uri: imageUri}} style={styles.previewImage} />
//               )}
//               <View style={styles.buttonRow}>
//                 <View style={styles.buttonWrapper}>
//                   <MyButton
//                     backgroundColor={Colors.gray}
//                     text="Cancel"
//                     onPress={resetForm}
//                     textStyle={{color: Colors.black}}
//                     disabled={isLoading || isApiLoading}
//                   />
//                 </View>
//                 <View style={styles.buttonWrapper}>
//                   <MyButton
//                     backgroundColor={Colors.primary}
//                     text={
//                       isLoading || isApiLoading ? 'Submitting...' : 'Submit'
//                     }
//                     onPress={handleSubmit}
//                     disabled={isLoading || isApiLoading}
//                   />
//                 </View>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </WrapperContainer>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: Colors.white,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#ccc',
//     zIndex: 10,
//   },
//   logo: {
//     width: responsiveWidth(10),
//     height: responsiveWidth(10),
//   },
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//     paddingHorizontal: responsiveWidth(3),
//   },
//   topSection: {
//     paddingVertical: responsiveHeight(3),
//   },
//   container_02: {
//     marginVertical: responsiveHeight(2),
//     borderRadius: responsiveWidth(2),
//     borderWidth: responsiveWidth(0.4),
//     borderColor: Colors.lightGray,
//     padding: responsiveWidth(3),
//   },
//   optionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: responsiveWidth(3),
//   },
//   card: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: Colors.gray,
//     borderRadius: responsiveWidth(3),
//     padding: responsiveWidth(4),
//     alignItems: 'center',
//     backgroundColor: Colors.white,
//   },
//   selectedCardLost: {
//     borderColor: '#ff4d4d',
//     backgroundColor: '#ffecec',
//   },
//   selectedCardFound: {
//     borderColor: '#0fbcf9',
//     backgroundColor: '#e5f7ff',
//   },
//   fieldLabel: {
//     marginTop: responsiveHeight(2),
//     marginBottom: responsiveHeight(1),
//   },
//   descriptionContainer: {
//     minHeight: responsiveHeight(15),
//     borderRadius: responsiveWidth(2),
//     backgroundColor: Colors.white,
//     borderColor: Colors.lightGray,
//     borderWidth: responsiveWidth(0.4),
//     paddingHorizontal: responsiveWidth(4),
//     paddingVertical: responsiveHeight(1.5),
//   },
//   descriptionInput: {
//     flex: 1,
//     fontSize: responsiveFontSize(1.7),
//     color: Colors.black,
//     paddingVertical: 0,
//   },
//   previewImage: {
//     width: responsiveWidth(60),
//     height: responsiveHeight(20),
//     alignSelf: 'center',
//     borderRadius: 10,
//     marginBottom: responsiveHeight(2),
//   },
//   buttonWrapper: {
//     flex: 1,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: responsiveWidth(3),
//     marginTop: responsiveHeight(3),
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContainer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     backgroundColor: Colors.white,
//     padding: responsiveWidth(5),
//     borderTopLeftRadius: responsiveWidth(5),
//     borderTopRightRadius: responsiveWidth(5),
//     alignItems: 'center',
//   },
//   modalButton: {
//     width: '100%',
//     backgroundColor: Colors.lightGray,
//     paddingVertical: responsiveHeight(1.5),
//     borderRadius: responsiveWidth(3),
//     alignItems: 'center',
//     marginBottom: responsiveHeight(1.5),
//   },
//   dottedBox: {
//     borderWidth: 1.5,
//     borderColor: Colors.gray,
//     borderStyle: 'dashed',
//     borderRadius: responsiveWidth(3),
//     padding: responsiveHeight(3),
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: responsiveHeight(2),
//   },
//   uploadIcon: {
//     width: responsiveWidth(10),
//     height: responsiveWidth(10),
//     tintColor: Colors.gray,
//   },
// });

// export default Reportitem;
