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
//   FlatList,
// } from 'react-native';
// import React, {useState, useRef} from 'react';
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
// import MyButton from '../components/CustomButton';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {useNavigation} from '@react-navigation/native';
// import ToastMessage from '../hooks/ToastMessage';
// import {useAddReportMutation} from '../store/Api/addItemReport';

// const ReportItem = () => {
//   const [selected, setSelected] = useState('lost');
//   const [itemName, setItemName] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [imageUri, setImageUri] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [location, setLocation] = useState('');
//   const [contactInfo, setContactInfo] = useState('');
//   const [dropdownModal, setDropdownModal] = useState({
//     visible: false,
//     field: '',
//     options: [],
//     title: '',
//   });
//   const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigation = useNavigation();
//   const {Toasts} = ToastMessage();
//   const [addReport, {isLoading: isApiLoading}] = useAddReportMutation();

//   // Create refs for input fields
//   const itemNameInputRef = useRef(null);
//   const descriptionInputRef = useRef(null);
//   const contactInfoInputRef = useRef(null);

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

//   const openDropdown = (field, options, title) => {
//     setDropdownModal({visible: true, field, options, title});
//   };

//   const handleDropdownSelect = value => {
//     if (dropdownModal.field === 'category') {
//       setCategory(value);
//       descriptionInputRef.current?.focus();
//     } else if (dropdownModal.field === 'location') {
//       setLocation(value);
//       contactInfoInputRef.current?.focus();
//     }
//     setDropdownModal({visible: false, field: '', options: [], title: ''});
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
//                   onPress={() => {
//                     setSelected('lost');
//                     itemNameInputRef.current?.focus();
//                   }}>
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
//                   onPress={() => {
//                     setSelected('found');
//                     itemNameInputRef.current?.focus();
//                   }}>
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
//                 ref={itemNameInputRef}
//                 fieldName="Item Name *"
//                 placeholder="e.g., iPhone 14, Blue Backpack, Car Keys"
//                 value={itemName}
//                 onChangeText={setItemName}
//                 onSubmitEditing={() =>
//                   openDropdown('category', categoryOptions, 'Select Category')
//                 }
//                 returnKeyType="next"
//                 autoCapitalize="words"
//                 autoCorrect={true}
//               />

//               <MyText
//                 text="Category *"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2.2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <TouchableOpacity
//                 style={styles.inputContainer}
//                 onPress={() =>
//                   openDropdown('category', categoryOptions, 'Select Category')
//                 }>
//                 <MyText
//                   text={category || 'Select Category'}
//                   fontSize={responsiveFontSize(1.9)}
//                   color={category ? Colors.black : Colors.gray}
//                 />
//                 <Icon name="chevron-down" size={20} color={Colors.gray} />
//               </TouchableOpacity>

//               <MyText
//                 text="Description *"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2.2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <View style={styles.descriptionContainer}>
//                 <TextInput
//                   ref={descriptionInputRef}
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
//                   onSubmitEditing={() =>
//                     openDropdown('location', locationOptions, 'Select Location')
//                   }
//                   returnKeyType="next"
//                   autoCapitalize="sentences"
//                   autoCorrect={true}
//                 />
//               </View>

//               <MyText
//                 text="Location *"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2.2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <TouchableOpacity
//                 style={styles.inputContainer}
//                 onPress={() =>
//                   openDropdown('location', locationOptions, 'Select Location')
//                 }>
//                 <MyText
//                   text={location || 'Select Location'}
//                   fontSize={responsiveFontSize(1.9)}
//                   color={location ? Colors.black : Colors.gray}
//                 />
//                 <Icon name="chevron-down" size={20} color={Colors.gray} />
//               </TouchableOpacity>

//               <MyTextInput
//                 ref={contactInfoInputRef}
//                 fieldName="Contact Information *"
//                 placeholder="e.g., your number, email, or social handle"
//                 value={contactInfo}
//                 onChangeText={setContactInfo}
//                 onSubmitEditing={handleSubmit}
//                 returnKeyType="done"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoCorrect={false}
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

//               <Modal
//                 transparent
//                 animationType="fade"
//                 visible={dropdownModal.visible}
//                 onRequestClose={() =>
//                   setDropdownModal({
//                     visible: false,
//                     field: '',
//                     options: [],
//                     title: '',
//                   })
//                 }>
//                 <View style={styles.modalOverlay}>
//                   <View style={styles.dropdownModal}>
//                     <MyText
//                       text={dropdownModal.title}
//                       fontSize={responsiveFontSize(2.5)}
//                       fontWeight="600"
//                       color={Colors.black}
//                       textStyle={{
//                         marginBottom: responsiveHeight(2),
//                         textAlign: 'center',
//                       }}
//                     />
//                     <FlatList
//                       data={dropdownModal.options}
//                       keyExtractor={item => item}
//                       showsVerticalScrollIndicator={false}
//                       renderItem={({item}) => (
//                         <TouchableOpacity
//                           style={[
//                             styles.dropdownItem,
//                             (dropdownModal.field === 'category' &&
//                               category === item) ||
//                             (dropdownModal.field === 'location' &&
//                               location === item)
//                               ? {backgroundColor: Colors.primaryLight}
//                               : {},
//                           ]}
//                           onPress={() => handleDropdownSelect(item)}>
//                           <MyText
//                             text={item}
//                             fontSize={responsiveFontSize(2)}
//                             color={
//                               (dropdownModal.field === 'category' &&
//                                 category === item) ||
//                               (dropdownModal.field === 'location' &&
//                                 location === item)
//                                 ? Colors.primary
//                                 : Colors.black
//                             }
//                             fontWeight={
//                               (dropdownModal.field === 'category' &&
//                                 category === item) ||
//                               (dropdownModal.field === 'location' &&
//                                 location === item)
//                                 ? '600'
//                                 : '500'
//                             }
//                           />
//                         </TouchableOpacity>
//                       )}
//                       style={{maxHeight: responsiveHeight(30)}}
//                     />
//                     <TouchableOpacity
//                       style={styles.modalButton}
//                       onPress={() =>
//                         setDropdownModal({
//                           visible: false,
//                           field: '',
//                           options: [],
//                           title: '',
//                         })
//                       }>
//                       <MyText
//                         text="Cancel"
//                         color={Colors.darkGray}
//                         fontSize={responsiveFontSize(2)}
//                       />
//                     </TouchableOpacity>
//                   </View>
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
//     justifyContent: 'center',
//     alignItems: 'center',
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
//     backgroundColor: '#f9f9f9',
//     paddingVertical: responsiveHeight(1.5),
//     borderRadius: responsiveWidth(3),
//     alignItems: 'center',
//     marginTop: responsiveHeight(1),
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
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: Colors.lightGray,
//     borderRadius: responsiveWidth(2.5),
//     paddingHorizontal: responsiveWidth(3),
//     paddingVertical: responsiveHeight(1.5),
//     marginBottom: responsiveHeight(1.5),
//     backgroundColor: '#f9f9f9',
//   },
//   dropdownModal: {
//     backgroundColor: Colors.white,
//     borderRadius: responsiveWidth(3),
//     padding: responsiveWidth(4),
//     width: responsiveWidth(80),
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   dropdownItem: {
//     paddingVertical: responsiveHeight(1.5),
//     paddingHorizontal: responsiveWidth(3),
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.lightGray,
//   },
// });

// export default ReportItem;

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
  FlatList,
  Keyboard,
} from 'react-native';
import React, {useState, useRef} from 'react';
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
import MyButton from '../components/CustomButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import ToastMessage from '../hooks/ToastMessage';
import {useAddReportMutation} from '../store/Api/addItemReport';

const ReportItem = () => {
  const [selected, setSelected] = useState('lost');
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [location, setLocation] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [dropdownModal, setDropdownModal] = useState({
    visible: false,
    field: '',
    options: [],
    title: '',
  });
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {Toasts} = ToastMessage();
  const [addReport, {isLoading: isApiLoading}] = useAddReportMutation();

  // Create refs for input fields
  const itemNameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const contactInfoInputRef = useRef(null);

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
    setDropdownModal({visible: false, field: '', options: [], title: ''});
    setImagePickerModalVisible(false);
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
      resetForm(); // Reset form immediately after successful submission
      navigation.goBack();
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
      permission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
    } else {
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
        Keyboard.dismiss(); // Dismiss keyboard to prevent focus issues
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
        Keyboard.dismiss(); // Dismiss keyboard to prevent focus issues
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

  const openDropdown = (field, options, title) => {
    Keyboard.dismiss(); // Dismiss keyboard before opening dropdown
    setDropdownModal({visible: true, field, options, title});
  };

  const handleDropdownSelect = value => {
    if (dropdownModal.field === 'category') {
      setCategory(value);
      descriptionInputRef.current?.focus();
    } else if (dropdownModal.field === 'location') {
      setLocation(value);
      contactInfoInputRef.current?.focus();
    }
    setDropdownModal({visible: false, field: '', options: [], title: ''});
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
                  onPress={() => {
                    setSelected('lost');
                    itemNameInputRef.current?.focus();
                  }}>
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
                  onPress={() => {
                    setSelected('found');
                    itemNameInputRef.current?.focus();
                  }}>
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
                ref={itemNameInputRef}
                fieldName="Item Name *"
                placeholder="e.g., iPhone 14, Blue Backpack, Car Keys"
                value={itemName}
                onChangeText={setItemName}
                onSubmitEditing={() =>
                  openDropdown('category', categoryOptions, 'Select Category')
                }
                returnKeyType="next"
                autoCapitalize="words"
                autoCorrect={true}
              />

              <MyText
                text="Category *"
                fontWeight="500"
                fontSize={responsiveFontSize(2.2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown('category', categoryOptions, 'Select Category')
                }>
                <MyText
                  text={category || 'Select Category'}
                  fontSize={responsiveFontSize(1.9)}
                  color={category ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>

              <MyText
                text="Description *"
                fontWeight="500"
                fontSize={responsiveFontSize(2.2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <View style={styles.descriptionContainer}>
                <TextInput
                  ref={descriptionInputRef}
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
                  onSubmitEditing={() =>
                    openDropdown('location', locationOptions, 'Select Location')
                  }
                  returnKeyType="next"
                  autoCapitalize="sentences"
                  autoCorrect={true}
                />
              </View>

              <MyText
                text="Location *"
                fontWeight="500"
                fontSize={responsiveFontSize(2.2)}
                color={Colors.black}
                textStyle={styles.fieldLabel}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown('location', locationOptions, 'Select Location')
                }>
                <MyText
                  text={location || 'Select Location'}
                  fontSize={responsiveFontSize(1.9)}
                  color={location ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>

              <MyTextInput
                ref={contactInfoInputRef}
                fieldName="Contact Information *"
                placeholder="e.g., your number, email, or social handle"
                value={contactInfo}
                onChangeText={setContactInfo}
                returnKeyType="done"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
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

              <Modal
                transparent
                animationType="fade"
                visible={dropdownModal.visible}
                onRequestClose={() =>
                  setDropdownModal({
                    visible: false,
                    field: '',
                    options: [],
                    title: '',
                  })
                }>
                <View style={styles.modalOverlay}>
                  <View style={styles.dropdownModal}>
                    <MyText
                      text={dropdownModal.title}
                      fontSize={responsiveFontSize(2.5)}
                      fontWeight="600"
                      color={Colors.black}
                      textStyle={{
                        marginBottom: responsiveHeight(2),
                        textAlign: 'center',
                      }}
                    />
                    <FlatList
                      data={dropdownModal.options}
                      keyExtractor={item => item}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={[
                            styles.dropdownItem,
                            (dropdownModal.field === 'category' &&
                              category === item) ||
                            (dropdownModal.field === 'location' &&
                              location === item)
                              ? {backgroundColor: Colors.primaryLight}
                              : {},
                          ]}
                          onPress={() => handleDropdownSelect(item)}>
                          <MyText
                            text={item}
                            fontSize={responsiveFontSize(2)}
                            color={
                              (dropdownModal.field === 'category' &&
                                category === item) ||
                              (dropdownModal.field === 'location' &&
                                location === item)
                                ? Colors.primary
                                : Colors.black
                            }
                            fontWeight={
                              (dropdownModal.field === 'category' &&
                                category === item) ||
                              (dropdownModal.field === 'location' &&
                                location === item)
                                ? '600'
                                : '500'
                            }
                          />
                        </TouchableOpacity>
                      )}
                      style={{maxHeight: responsiveHeight(30)}}
                    />
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() =>
                        setDropdownModal({
                          visible: false,
                          field: '',
                          options: [],
                          title: '',
                        })
                      }>
                      <MyText
                        text="Cancel"
                        color={Colors.darkGray}
                        fontSize={responsiveFontSize(2)}
                      />
                    </TouchableOpacity>
                  </View>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#f9f9f9',
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    marginTop: responsiveHeight(1),
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(2.5),
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    marginBottom: responsiveHeight(1.5),
    backgroundColor: '#f9f9f9',
  },
  dropdownModal: {
    backgroundColor: Colors.white,
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(4),
    width: responsiveWidth(80),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
});

export default ReportItem;
