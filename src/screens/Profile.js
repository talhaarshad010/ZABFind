// import React, {useState, useEffect} from 'react';
// import {
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Modal,
//   Pressable,
//   PermissionsAndroid,
//   ActivityIndicator,
//   FlatList,
// } from 'react-native';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {useSelector, useDispatch} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';

// import MyText from '../components/textcomponent';
// import MyTextInput from '../components/TextInputComponent';
// import MyHeader from '../components/Header';
// import MyButton from '../components/CustomButton';
// import Colors from '../styles/Colors';
// import Icon from 'react-native-vector-icons/Feather';
// import ToastMessage from '../hooks/ToastMessage';
// import {useUpdateProfileMutation} from '../store/Api/Auth';
// import {updateUserProfile} from '../store/slices/Auth';

// const EditProfileScreen = () => {
//   const {user} = useSelector(state => state.Auth);
//   console.log('User data in EditProfileScreen:', user);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const {Toasts} = ToastMessage();
//   const [updateProfile, {isLoading}] = useUpdateProfileMutation();

//   const [form, setForm] = useState({
//     fullName: '',
//     studentId: '',
//     emailAddress: '',
//     phoneNumber: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       country: '',
//       zipcode: '',
//     },
//     bio: '',
//     gender: '',
//     semester: '',
//     department: '',
//     dateOfBirth: '',
//   });
//   const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
//   const [imageUri, setImageUri] = useState(null);
//   const [studentCardImageUri, setStudentCardImageUri] = useState(null);
//   const [dropdownModal, setDropdownModal] = useState({
//     visible: false,
//     field: '',
//     options: [],
//     title: '',
//   });
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   // Initialize form with user data
//   useEffect(() => {
//     if (user) {
//       setForm({
//         fullName: user.fullName || '',
//         studentId: user.studentId || '',
//         emailAddress: user.emailAddress || '',
//         phoneNumber: user.phoneNumber || '',
//         address: {
//           street: user.address?.street || '',
//           city: user.address?.city || '',
//           state: user.address?.state || '',
//           country: user.address?.country || '',
//           zipcode: user.address?.zipcode || '',
//         },
//         bio: user.bio || '',
//         gender: user.gender || '',
//         semester: user.semester || '',
//         department: user.department || '',
//         dateOfBirth: user.dateOfBirth
//           ? new Date(user.dateOfBirth).toISOString().split('T')[0]
//           : '',
//       });
//       setImageUri(user.profileImage || null);
//       setStudentCardImageUri(user.studentCardImage || null);
//     }
//   }, [user]);

//   const posts = [
//     {item: 'Black Wallet', status: 'Returned', date: 'June 10, 2025'},
//     {item: 'USB Drive', status: 'Active', date: 'June 13, 2025'},
//     {item: 'Water Bottle', status: 'Found', date: 'June 14, 2025'},
//   ];

//   const getStatusStyle = status => {
//     switch (status) {
//       case 'Active':
//         return {bgColor: '#D0E8FF', textColor: '#005EAD'};
//       case 'Found':
//         return {bgColor: '#D2F5C7', textColor: '#218C00'};
//       case 'Returned':
//       default:
//         return {bgColor: '#D0E8FF', textColor: '#005EAD'};
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
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//         {
//           title: 'Storage Permission',
//           message: 'This app needs access to your photo library.',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   const handleImagePick = async setter => {
//     const hasPermission = await requestStoragePermission();
//     if (!hasPermission) {
//       Toasts('Error', 'Permission denied to access gallery', 'error', 2000);
//       return;
//     }

//     launchImageLibrary({mediaType: 'photo'}, response => {
//       if (response?.assets?.length) {
//         setter(response.assets[0].uri);
//         setImageError(false);
//       }
//     });
//   };

//   const openCamera = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//       Toasts('Error', 'Camera permission denied', 'error', 2000);
//       return;
//     }

//     launchCamera({mediaType: 'photo', cameraType: 'back'}, response => {
//       setImagePickerModalVisible(false);
//       if (response?.assets?.length) {
//         setImageUri(response.assets[0].uri);
//         setImageError(false);
//       }
//     });
//   };

//   const openGallery = async () => {
//     const hasPermission = await requestStoragePermission();
//     if (!hasPermission) {
//       Toasts('Error', 'Storage permission denied', 'error', 2000);
//       return;
//     }

//     launchImageLibrary({mediaType: 'photo'}, response => {
//       setImagePickerModalVisible(false);
//       if (response?.assets?.length) {
//         setImageUri(response.assets[0].uri);
//         setImageError(false);
//       }
//     });
//   };

//   const handleChange = (field, value) => {
//     if (field.startsWith('address.')) {
//       const addressField = field.split('.')[1];
//       setForm(prev => ({
//         ...prev,
//         address: {...prev.address, [addressField]: value},
//       }));
//     } else {
//       setForm(prev => ({...prev, [field]: value}));
//     }
//   };

//   const openDropdown = (field, options, title) => {
//     setDropdownModal({visible: true, field, options, title});
//   };

//   const handleDropdownSelect = value => {
//     handleChange(dropdownModal.field, value);
//     setDropdownModal({visible: false, field: '', options: [], title: ''});
//   };

//   const handleSubmit = async () => {
//     if (
//       !form.fullName ||
//       !form.studentId ||
//       !form.emailAddress ||
//       !form.phoneNumber ||
//       !form.address.street ||
//       !form.address.city ||
//       !form.address.state ||
//       !form.address.country ||
//       !form.address.zipcode ||
//       !form.bio ||
//       !form.gender ||
//       !form.semester ||
//       !form.department ||
//       !form.dateOfBirth
//     ) {
//       Toasts('Error', 'Please fill all required fields', 'error', 2000);
//       return;
//     }

//     const formData = new FormData();
//     formData.append('fullName', form.fullName);
//     formData.append('studentId', form.studentId);
//     formData.append('emailAddress', form.emailAddress);
//     formData.append('phoneNumber', form.phoneNumber);
//     formData.append('bio', form.bio);
//     formData.append('gender', form.gender);
//     formData.append('semester', form.semester);
//     formData.append('department', form.department);
//     formData.append('dateOfBirth', form.dateOfBirth);
//     formData.append('address', JSON.stringify(form.address));

//     if (imageUri && imageUri !== user?.profileImage) {
//       formData.append('profileImage', {
//         uri: imageUri,
//         type: 'image/jpeg',
//         name: `profile_${Date.now()}.jpg`,
//       });
//     }

//     if (studentCardImageUri && studentCardImageUri !== user?.studentCardImage) {
//       formData.append('studentCardImage', {
//         uri: studentCardImageUri,
//         type: 'image/jpeg',
//         name: `studentCard_${Date.now()}.jpg`,
//       });
//     }

//     try {
//       const result = await updateProfile(formData).unwrap();
//       dispatch(updateUserProfile(result.user));
//       Toasts('Success', 'Profile updated successfully', 'success', 2000);
//       navigation.goBack();
//     } catch (err) {
//       console.error('Profile Update Error:', err);
//       Toasts(
//         'Error',
//         err?.data?.message || 'Failed to update profile',
//         'error',
//         2000,
//       );
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
//       <MyHeader
//         style={styles.header}
//         ScreenName="Edit Profile"
//         leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
//         rightView={
//           <Image source={require('../assets/logo.png')} style={styles.logo} />
//         }
//         onPressleft={() => navigation.goBack()}
//       />

//       <ScrollView
//         contentContainerStyle={styles.content}
//         keyboardShouldPersistTaps="handled">
//         <View style={styles.profileCard}>
//           <View style={styles.profileImageContainer}>
//             <Image
//               source={{
//                 uri:
//                   imageError || !imageUri
//                     ? 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'
//                     : imageUri,
//               }}
//               style={styles.profileImage}
//               onError={() => setImageError(true)}
//             />
//             <TouchableOpacity
//               style={styles.editIconContainer}
//               onPress={() => setImagePickerModalVisible(true)}>
//               <Icon name="edit" size={16} color={Colors.white} />
//             </TouchableOpacity>
//           </View>

//           <Modal
//             transparent
//             animationType="slide"
//             visible={imagePickerModalVisible}
//             onRequestClose={() => setImagePickerModalVisible(false)}>
//             <Pressable
//               onPress={() => setImagePickerModalVisible(false)}
//               style={styles.modalOverlay}
//             />
//             <View style={styles.modalContainer}>
//               <MyText
//                 text="Upload Profile Image"
//                 fontSize={responsiveFontSize(2.5)}
//                 fontWeight="600"
//                 color={Colors.black}
//                 textStyle={{marginBottom: responsiveHeight(2)}}
//               />
//               <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
//                 <MyText
//                   text="📷 Open Camera"
//                   color={Colors.black}
//                   fontWeight="500"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={openGallery}>
//                 <MyText
//                   text="🖼️ Choose from Gallery"
//                   color={Colors.black}
//                   fontWeight="500"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={[
//                   styles.modalButton,
//                   {backgroundColor: Colors.lightGray},
//                 ]}
//                 onPress={() => setImagePickerModalVisible(false)}>
//                 <MyText text="Cancel" color={Colors.darkGray} />
//               </TouchableOpacity>
//             </View>
//           </Modal>

//           <MyText
//             text={form.fullName || 'Unknown'}
//             fontSize={responsiveFontSize(2.2)}
//             fontWeight="600"
//             color={Colors.black}
//             textStyle={styles.centerText}
//           />
//           <MyText
//             text={`Student ID: ${form.studentId || 'N/A'}`}
//             fontSize={responsiveFontSize(1.8)}
//             color={Colors.gray}
//             textStyle={styles.centerTextMargin}
//           />

//           <View style={styles.statsRow}>
//             <View style={styles.statBoxRed}>
//               <MyText
//                 text="5"
//                 fontSize={responsiveFontSize(2.5)}
//                 fontWeight="600"
//                 color={Colors.red}
//                 textStyle={styles.centerText}
//               />
//               <MyText
//                 text="Items Reported"
//                 fontSize={responsiveFontSize(1.6)}
//                 color={Colors.black}
//                 textStyle={styles.centerText}
//               />
//             </View>
//             <View style={styles.statBoxGreen}>
//               <MyText
//                 text="3"
//                 fontSize={responsiveFontSize(2.5)}
//                 fontWeight="600"
//                 color={Colors.green}
//                 textStyle={styles.centerText}
//               />
//               <MyText
//                 text="Successfully Returned"
//                 fontSize={responsiveFontSize(1.6)}
//                 color={Colors.black}
//                 textStyle={styles.centerText}
//               />
//             </View>
//           </View>

//           <MyText
//             text={`Member since ${new Date(
//               user?.registeredAt || Date.now(),
//             ).getFullYear()}`}
//             fontSize={responsiveFontSize(1.6)}
//             color={Colors.gray}
//             textStyle={styles.centerTextMargin}
//           />
//         </View>

//         <View style={styles.inputSection}>
//           <MyText
//             text="Personal Information"
//             fontSize={responsiveFontSize(2.2)}
//             fontWeight="600"
//             color={Colors.black}
//             textStyle={{marginBottom: responsiveHeight(1.5)}}
//           />
//           <MyTextInput
//             fieldName="Full Name"
//             placeholder="Enter full name"
//             value={form.fullName}
//             onChangeText={val => handleChange('fullName', val)}
//             textStyle={{fontSize: responsiveFontSize(1.9)}}
//             containerStyle={styles.inputContainer}
//           />
//           <MyTextInput
//             fieldName="Student ID"
//             placeholder="Enter student ID"
//             value={form.studentId}
//             onChangeText={val => handleChange('studentId', val)}
//             textStyle={{fontSize: responsiveFontSize(1.9)}}
//             containerStyle={styles.inputContainer}
//           />
//           <MyTextInput
//             fieldName="Email"
//             placeholder="Enter email"
//             value={form.emailAddress}
//             onChangeText={val => handleChange('emailAddress', val)}
//             textStyle={{fontSize: responsiveFontSize(1.9)}}
//             containerStyle={styles.inputContainer}
//           />
//           <MyTextInput
//             fieldName="Phone Number"
//             placeholder="03xxxxxxxxx"
//             value={form.phoneNumber}
//             onChangeText={val => handleChange('phoneNumber', val)}
//             textStyle={{fontSize: responsiveFontSize(1.9)}}
//             containerStyle={styles.inputContainer}
//           />
//           <MyTextInput
//             fieldName="Street Address"
//             placeholder="Enter street address"
//             value={form.address.street}
//             onChangeText={val => handleChange('address.street', val)}
//             textStyle={{fontSize: responsiveFontSize(1.9)}}
//             containerStyle={styles.inputContainer}
//           />
//           <MyTextInput
//             fieldName="City"
//             placeholder="Enter city"
//             value={form.address.city}
//             onChangeText={val => handleChange('address.city', val)}
//             textStyle={{fontSize: responsiveFontSize(1.9)}}
//             containerStyle={styles.inputContainer}
//           />
//           <MyTextInput
//             fieldName="State"
//             placeholder="Enter state"
//             value={form.address.state}
//             onChangeText={val => handleChange('address.state', val)}
//             textStyle={{fontSize: responsiveFontSize(1.9)}}
//             containerStyle={styles.inputContainer}
//           />
//           <MyTextInput
//             fieldName="Country"
//             placeholder="Enter country"
//             value={form.address.country}
//             onChangeText={val => handleChange('address.country', val)}
//             textStyle={{fontSize: responsiveFontSize(1.9)}}
//             containerStyle={styles.inputContainer}
//           />
//           <MyTextInput
//             fieldName="Zipcode"
//             placeholder="Enter zipcode"
//             value={form.address.zipcode}
//             onChangeText={val => handleChange('address.zipcode', val)}
//             textStyle={{fontSize: responsiveFontSize(1.9)}}
//             containerStyle={styles.inputContainer}
//           />

//           <MyText
//             text="Gender"
//             fontWeight="500"
//             fontSize={responsiveFontSize(2)}
//             textStyle={{
//               marginTop: responsiveHeight(1.5),
//               marginBottom: responsiveHeight(0.5),
//             }}
//           />
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() =>
//               openDropdown(
//                 'gender',
//                 ['Male', 'Female', 'Other'],
//                 'Select Gender',
//               )
//             }>
//             <MyText
//               text={form.gender || 'Select Gender'}
//               fontSize={responsiveFontSize(1.9)}
//               color={form.gender ? Colors.black : Colors.gray}
//             />
//             <Icon name="chevron-down" size={20} color={Colors.gray} />
//           </TouchableOpacity>

//           <MyText
//             text="Semester"
//             fontWeight="500"
//             fontSize={responsiveFontSize(2)}
//             textStyle={{
//               marginTop: responsiveHeight(1.5),
//               marginBottom: responsiveHeight(0.5),
//             }}
//           />
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() =>
//               openDropdown(
//                 'semester',
//                 ['1', '2', '3', '4', '5', '6', '7', '8'],
//                 'Select Semester',
//               )
//             }>
//             <MyText
//               text={form.semester || 'Select Semester'}
//               fontSize={responsiveFontSize(1.9)}
//               color={form.semester ? Colors.black : Colors.gray}
//             />
//             <Icon name="chevron-down" size={20} color={Colors.gray} />
//           </TouchableOpacity>

//           <MyText
//             text="Department"
//             fontWeight="500"
//             fontSize={responsiveFontSize(2)}
//             textStyle={{
//               marginTop: responsiveHeight(1.5),
//               marginBottom: responsiveHeight(0.5),
//             }}
//           />
//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() =>
//               openDropdown('department', ['BSCS', 'BBA'], 'Select Department')
//             }>
//             <MyText
//               text={form.department || 'Select Department'}
//               fontSize={responsiveFontSize(1.9)}
//               color={form.department ? Colors.black : Colors.gray}
//             />
//             <Icon name="chevron-down" size={20} color={Colors.gray} />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.inputContainer}
//             onPress={() => setShowDatePicker(true)}>
//             <MyTextInput
//               fieldName="Date of Birth"
//               value={form.dateOfBirth}
//               placeholder="YYYY-MM-DD"
//               editable={false}
//               textStyle={{fontSize: responsiveFontSize(1.9)}}
//               containerStyle={{borderWidth: 0}}
//             />
//           </TouchableOpacity>
//           {showDatePicker && (
//             <DateTimePicker
//               value={form.dateOfBirth ? new Date(form.dateOfBirth) : new Date()}
//               mode="date"
//               display="default"
//               maximumDate={new Date()}
//               onChange={(event, selectedDate) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) {
//                   const formatted = selectedDate.toISOString().split('T')[0];
//                   handleChange('dateOfBirth', formatted);
//                 }
//               }}
//             />
//           )}

//           <MyTextInput
//             fieldName="Bio"
//             placeholder="Tell us about yourself"
//             value={form.bio}
//             onChangeText={val => handleChange('bio', val)}
//             multiline
//             textStyle={{fontSize: responsiveFontSize(1.9)}}
//             containerStyle={styles.inputContainer}
//           />

//           {imageUri && (
//             <Image
//               source={{uri: imageUri}}
//               style={[styles.imagePreview, {marginTop: responsiveHeight(10)}]}
//               onError={() => setImageError(true)}
//             />
//           )}
//           <TouchableOpacity
//             style={styles.cardUploadBtn}
//             onPress={() => handleImagePick(setImageUri)}>
//             <MyText
//               color={Colors.white}
//               text={imageUri ? 'Change Profile Image' : 'Upload Profile Image'}
//               fontSize={responsiveFontSize(2)}
//               fontWeight="500"
//             />
//           </TouchableOpacity>

//           {studentCardImageUri && (
//             <Image
//               source={{uri: studentCardImageUri}}
//               style={[styles.imagePreview, {marginTop: responsiveHeight(2)}]}
//               onError={() => setImageError(true)}
//             />
//           )}
//           <TouchableOpacity
//             style={styles.cardUploadBtn}
//             onPress={() => handleImagePick(setStudentCardImageUri)}>
//             <MyText
//               color={Colors.white}
//               text={
//                 studentCardImageUri ? 'Change Card Image' : 'Upload Card Image'
//               }
//               fontSize={responsiveFontSize(2)}
//               fontWeight="500"
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.recentPostsBox}>
//           <MyText
//             text="Recent Activities"
//             fontSize={responsiveFontSize(2.2)}
//             fontWeight="600"
//             color={Colors.black}
//             textStyle={{marginBottom: responsiveHeight(1)}}
//           />
//           {posts.map((post, index) => {
//             const {bgColor, textColor} = getStatusStyle(post.status);
//             return (
//               <View key={index} style={styles.postItem}>
//                 <View style={styles.postTopRow}>
//                   <MyText
//                     text={post.item}
//                     fontSize={responsiveFontSize(2)}
//                     fontWeight="500"
//                     color={Colors.black}
//                   />
//                   <View
//                     style={[
//                       styles.statusBox,
//                       {backgroundColor: bgColor, borderColor: textColor},
//                     ]}>
//                     <MyText
//                       text={post.status}
//                       fontSize={responsiveFontSize(1.6)}
//                       fontWeight="500"
//                       color={textColor}
//                     />
//                   </View>
//                 </View>
//                 <MyText
//                   text={`Posted on ${post.date}`}
//                   fontSize={responsiveFontSize(1.6)}
//                   color={Colors.gray}
//                   textStyle={{marginTop: 2}}
//                 />
//                 {index < posts.length - 1 && <View style={styles.divider} />}
//               </View>
//             );
//           })}
//         </View>

//         <MyButton
//           text={isLoading ? '' : 'Save Changes'}
//           backgroundColor={Colors.primary}
//           textColor={Colors.white}
//           onPress={handleSubmit}
//           disabled={isLoading}
//           textstyle={{
//             fontSize: responsiveFontSize(2.5),
//             fontWeight: '600',
//           }}
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignItems: 'center',
//             width: responsiveWidth(90),
//             paddingVertical: responsiveHeight(1.8),
//             borderRadius: responsiveWidth(3),
//             alignSelf: 'center',
//             marginBottom: responsiveHeight(2),
//             elevation: 3,
//             shadowColor: '#000',
//             shadowOffset: {width: 0, height: 2},
//             shadowOpacity: 0.1,
//             shadowRadius: 4,
//           }}
//           leftIcon={
//             isLoading ? (
//               <ActivityIndicator
//                 size="small"
//                 color={Colors.white}
//                 style={{marginRight: responsiveWidth(2)}}
//               />
//             ) : null
//           }
//         />
//       </ScrollView>

//       <Modal
//         transparent
//         animationType="fade"
//         visible={dropdownModal.visible}
//         onRequestClose={() =>
//           setDropdownModal({visible: false, field: '', options: [], title: ''})
//         }>
//         <View style={styles.modalOverlay}>
//           <View style={styles.dropdownModal}>
//             <MyText
//               text={dropdownModal.title}
//               fontSize={responsiveFontSize(2.5)}
//               fontWeight="600"
//               color={Colors.black}
//               textStyle={{
//                 marginBottom: responsiveHeight(2),
//                 textAlign: 'center',
//               }}
//             />
//             <FlatList
//               data={dropdownModal.options}
//               keyExtractor={item => item}
//               renderItem={({item}) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.dropdownItem,
//                     form[dropdownModal.field] === item && {
//                       backgroundColor: Colors.primaryLight,
//                     },
//                   ]}
//                   onPress={() => handleDropdownSelect(item)}>
//                   <MyText
//                     text={item}
//                     fontSize={responsiveFontSize(2)}
//                     color={
//                       form[dropdownModal.field] === item
//                         ? Colors.primary
//                         : Colors.black
//                     }
//                     fontWeight={
//                       form[dropdownModal.field] === item ? '600' : '500'
//                     }
//                   />
//                 </TouchableOpacity>
//               )}
//               style={{maxHeight: responsiveHeight(30)}}
//             />
//             <TouchableOpacity
//               style={styles.modalButton}
//               onPress={() =>
//                 setDropdownModal({
//                   visible: false,
//                   field: '',
//                   options: [],
//                   title: '',
//                 })
//               }>
//               <MyText
//                 text="Cancel"
//                 color={Colors.darkGray}
//                 fontSize={responsiveFontSize(2)}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </KeyboardAvoidingView>
//   );
// };

// export default EditProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.white,
//   },
//   content: {
//     padding: responsiveWidth(5),
//     paddingBottom: responsiveHeight(4),
//   },
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
//     resizeMode: 'contain',
//   },
//   profileImageContainer: {
//     alignItems: 'center',
//     marginBottom: responsiveHeight(3),
//   },
//   profileImage: {
//     width: responsiveWidth(30),
//     height: responsiveWidth(30),
//     borderRadius: responsiveWidth(15),
//     borderWidth: 2,
//     borderColor: Colors.primary,
//   },
//   editIconContainer: {
//     position: 'absolute',
//     bottom: responsiveWidth(0),
//     right: responsiveWidth(25),
//     backgroundColor: Colors.primary,
//     borderRadius: 50,
//     padding: responsiveWidth(2),
//     borderWidth: 2,
//     borderColor: Colors.white,
//   },
//   recentPostsBox: {
//     borderWidth: 1,
//     borderColor: Colors.lightGray,
//     borderRadius: responsiveWidth(3),
//     padding: responsiveWidth(4),
//     backgroundColor: Colors.white,
//     marginBottom: responsiveHeight(3),
//   },
//   postItem: {
//     marginBottom: responsiveHeight(1.5),
//   },
//   postTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   statusBox: {
//     paddingHorizontal: responsiveWidth(3),
//     paddingVertical: responsiveHeight(0.4),
//     borderRadius: responsiveWidth(5),
//     borderWidth: 1,
//   },
//   profileCard: {
//     borderWidth: 1,
//     borderColor: Colors.lightGray,
//     borderRadius: responsiveWidth(4),
//     paddingVertical: responsiveHeight(3),
//     paddingHorizontal: responsiveWidth(5),
//     backgroundColor: Colors.white,
//     marginBottom: responsiveHeight(3),
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   centerText: {
//     textAlign: 'center',
//   },
//   centerTextMargin: {
//     textAlign: 'center',
//     marginBottom: responsiveHeight(2),
//     marginTop: responsiveHeight(1),
//   },
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: responsiveHeight(2),
//     paddingHorizontal: responsiveWidth(2),
//   },
//   statBoxRed: {
//     backgroundColor: '#ffe5e5',
//     borderRadius: responsiveWidth(3),
//     padding: responsiveHeight(1.5),
//     width: '48%',
//     alignItems: 'center',
//   },
//   statBoxGreen: {
//     backgroundColor: '#e6ffea',
//     borderRadius: responsiveWidth(3),
//     padding: responsiveHeight(1.5),
//     width: '48%',
//     alignItems: 'center',
//   },
//   inputSection: {
//     borderWidth: 1,
//     borderColor: Colors.lightGray,
//     borderRadius: responsiveWidth(4),
//     padding: responsiveWidth(5),
//     backgroundColor: Colors.white,
//     marginBottom: responsiveHeight(3),
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
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
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
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
//   imagePreview: {
//     width: responsiveWidth(60),
//     height: responsiveHeight(25),
//     resizeMode: 'cover',
//     alignSelf: 'center',
//     borderRadius: responsiveWidth(3),
//     marginTop: responsiveHeight(2),
//     borderWidth: 1,
//     borderColor: Colors.lightGray,
//   },
//   cardUploadBtn: {
//     backgroundColor: Colors.primary,
//     paddingVertical: responsiveHeight(1.5),
//     paddingHorizontal: responsiveWidth(5),
//     borderRadius: responsiveWidth(3),
//     alignItems: 'center',
//     marginBottom: responsiveHeight(2),
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 1},
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
// });

import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Pressable,
  PermissionsAndroid,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import MyText from '../components/textcomponent';
import MyTextInput from '../components/TextInputComponent';
import MyHeader from '../components/Header';
import MyButton from '../components/CustomButton';
import Colors from '../styles/Colors';
import Icon from 'react-native-vector-icons/Feather';
import ToastMessage from '../hooks/ToastMessage';
import {useUpdateProfileMutation} from '../store/Api/Auth';
import {updateUserProfile} from '../store/slices/Auth';

const EditProfileScreen = () => {
  const {user} = useSelector(state => state.Auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {Toasts} = ToastMessage();
  const [updateProfile, {isLoading}] = useUpdateProfileMutation();

  const isAdmin = user?.role !== 'student';

  const [form, setForm] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    bio: '',
    address: isAdmin
      ? ''
      : {
          street: '',
          city: '',
          state: '',
          country: '',
          zipcode: '',
        },
    studentId: '',
    adminId: '',
    gender: '',
    semester: '',
    department: '',
    dateOfBirth: '',
    role: isAdmin ? 'admin' : 'student',
  });
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [studentCardImageUri, setStudentCardImageUri] = useState(null);
  const [dropdownModal, setDropdownModal] = useState({
    visible: false,
    field: '',
    options: [],
    title: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        emailAddress: user.emailAddress || '',
        phoneNumber: user.phoneNumber || '',
        bio: user.bio || '',
        address: isAdmin
          ? user.address || ''
          : {
              street: user.address?.street || '',
              city: user.address?.city || '',
              state: user.address?.state || '',
              country: user.address?.country || '',
              zipcode: user.address?.zipcode || '',
            },
        studentId: user.studentId || '',
        adminId: user.adminId || '',
        gender: user.gender || '',
        semester: user.semester || '',
        department: user.department || '',
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split('T')[0]
          : '',
        role: user.role || (isAdmin ? 'admin' : 'student'),
      });
      setImageUri(user.profileImage || null);
      setStudentCardImageUri(user.studentCardImage || null);
    }
  }, [user, isAdmin]);

  const posts = [
    {item: 'Black Wallet', status: 'Returned', date: 'June 10, 2025'},
    {item: 'USB Drive', status: 'Active', date: 'June 13, 2025'},
    {item: 'Water Bottle', status: 'Found', date: 'June 14, 2025'},
  ];

  const getStatusStyle = status => {
    switch (status) {
      case 'Active':
        return {bgColor: '#D0E8FF', textColor: '#005EAD'};
      case 'Found':
        return {bgColor: '#D2F5C7', textColor: '#218C00'};
      case 'Returned':
      default:
        return {bgColor: '#D0E8FF', textColor: '#005EAD'};
    }
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Toasts('Error', 'Camera permission denied', 'error', 2000);
          Alert.alert(
            'Permission Required',
            'Camera access is required to take photos. Please enable it in your device settings.',
            [{text: 'OK'}],
          );
          return false;
        }
        return true;
      } catch (err) {
        console.warn('Camera permission error:', err);
        return false;
      }
    }
    return true;
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // Check Android version for appropriate permission
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission, {
          title: 'Storage Permission',
          message:
            'This app needs access to your photo library to select images.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        });

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Toasts('Error', 'Permission denied to access gallery', 'error', 2000);
          Alert.alert(
            'Permission Required',
            'Gallery access is required to select photos. Please enable it in your device settings.',
            [{text: 'OK'}],
          );
          return false;
        }
        return true;
      } catch (err) {
        console.warn('Storage permission error:', err);
        return false;
      }
    }
    return true;
  };

  const handleImagePick = async setter => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      return;
    }

    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Toasts(
          'Error',
          `Image picker error: ${response.errorMessage}`,
          'error',
          2000,
        );
      } else if (response.assets?.length) {
        setter(response.assets[0].uri);
        setImageError(false);
      }
    });
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      return;
    }

    launchCamera(
      {mediaType: 'photo', cameraType: 'back', quality: 1},
      response => {
        setImagePickerModalVisible(false);
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          Toasts(
            'Error',
            `Camera error: ${response.errorMessage}`,
            'error',
            2000,
          );
        } else if (response.assets?.length) {
          setImageUri(response.assets[0].uri);
          setImageError(false);
        }
      },
    );
  };

  const openGallery = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      return;
    }

    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
      setImagePickerModalVisible(false);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        Toasts(
          'Error',
          `Image picker error: ${response.errorMessage}`,
          'error',
          2000,
        );
      } else if (response.assets?.length) {
        setImageUri(response.assets[0].uri);
        setImageError(false);
      }
    });
  };

  const handleChange = (field, value) => {
    if (!isAdmin && field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setForm(prev => ({
        ...prev,
        address: {...prev.address, [addressField]: value},
      }));
    } else {
      setForm(prev => ({...prev, [field]: value}));
    }
  };

  const openDropdown = (field, options, title) => {
    setDropdownModal({visible: true, field, options, title});
  };

  const handleDropdownSelect = value => {
    handleChange(dropdownModal.field, value);
    setDropdownModal({visible: false, field: '', options: [], title: ''});
  };

  const handleSubmit = async () => {
    // Validation for required fields based on role
    const requiredFields = isAdmin
      ? ['fullName', 'adminId', 'emailAddress', 'phoneNumber', 'address']
      : [
          'fullName',
          'studentId',
          'emailAddress',
          'phoneNumber',
          'bio',
          'gender',
          'semester',
          'department',
          'dateOfBirth',
          'address.street',
          'address.city',
          'address.state',
          'address.country',
          'address.zipcode',
        ];

    for (const field of requiredFields) {
      if (field.includes('address.')) {
        const addressField = field.split('.')[1];
        if (!form.address[addressField]) {
          Toasts('Error', `Please fill ${addressField} field`, 'error', 2000);
          return;
        }
      } else if (!form[field]) {
        Toasts('Error', `Please fill ${field} field`, 'error', 2000);
        return;
      }
    }

    const formData = new FormData();
    formData.append('fullName', form.fullName);
    formData.append('emailAddress', form.emailAddress);
    formData.append('phoneNumber', form.phoneNumber);

    if (isAdmin) {
      formData.append('adminId', form.adminId);
      formData.append('address', form.address);
      formData.append('role', form.role);
    } else {
      formData.append('studentId', form.studentId);
      formData.append('bio', form.bio);
      formData.append('gender', form.gender);
      formData.append('semester', form.semester);
      formData.append('department', form.department);
      formData.append('dateOfBirth', form.dateOfBirth);
      formData.append('address', JSON.stringify(form.address));
    }

    if (imageUri && imageUri !== user?.profileImage) {
      formData.append('profileImage', {
        uri: imageUri,
        type: 'image/jpeg',
        name: `profile_${Date.now()}.jpg`,
      });
    }

    if (
      !isAdmin &&
      studentCardImageUri &&
      studentCardImageUri !== user?.studentCardImage
    ) {
      formData.append('studentCardImage', {
        uri: studentCardImageUri,
        type: 'image/jpeg',
        name: `studentCard_${Date.now()}.jpg`,
      });
    }

    try {
      const result = await updateProfile(formData).unwrap();
      dispatch(updateUserProfile(result.user));
      Toasts('Success', 'Profile updated successfully', 'success', 2000);
      navigation.goBack();
    } catch (err) {
      console.error('Profile Update Error:', err);
      Toasts(
        'Error',
        err?.data?.message || 'Failed to update profile',
        'error',
        2000,
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <MyHeader
        style={styles.header}
        ScreenName={isAdmin ? 'Edit Admin Profile' : 'Edit Profile'}
        leftView={<Icon name="arrow-left" size={24} color={Colors.black} />}
        rightView={
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        }
        onPressleft={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled">
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri:
                  imageError || !imageUri
                    ? 'https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg'
                    : imageUri,
              }}
              style={styles.profileImage}
              onError={() => setImageError(true)}
            />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => setImagePickerModalVisible(true)}>
              <Icon name="edit" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>

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
                text="Upload Profile Image"
                fontSize={responsiveFontSize(2.5)}
                fontWeight="600"
                color={Colors.black}
                textStyle={{marginBottom: responsiveHeight(2)}}
              />
              <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
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

          <MyText
            text={form.fullName || 'Unknown'}
            fontSize={responsiveFontSize(2.2)}
            fontWeight="600"
            color={Colors.black}
            textStyle={styles.centerText}
          />
          <MyText
            text={
              isAdmin
                ? `Admin ID: ${form.adminId || 'N/A'}`
                : `Student ID: ${form.studentId || 'N/A'}`
            }
            fontSize={responsiveFontSize(1.8)}
            color={Colors.gray}
            textStyle={styles.centerTextMargin}
          />

          {!isAdmin && (
            <View style={styles.statsRow}>
              <View style={styles.statBoxRed}>
                <MyText
                  text="5"
                  fontSize={responsiveFontSize(2.5)}
                  fontWeight="600"
                  color={Colors.red}
                  textStyle={styles.centerText}
                />
                <MyText
                  text="Items Reported"
                  fontSize={responsiveFontSize(1.6)}
                  color={Colors.black}
                  textStyle={styles.centerText}
                />
              </View>
              <View style={styles.statBoxGreen}>
                <MyText
                  text="3"
                  fontSize={responsiveFontSize(2.5)}
                  fontWeight="600"
                  color={Colors.green}
                  textStyle={styles.centerText}
                />
                <MyText
                  text="Successfully Returned"
                  fontSize={responsiveFontSize(1.6)}
                  color={Colors.black}
                  textStyle={styles.centerText}
                />
              </View>
            </View>
          )}

          <MyText
            text={`Member since ${new Date(
              user?.registeredAt || Date.now(),
            ).getFullYear()}`}
            fontSize={responsiveFontSize(1.6)}
            color={Colors.gray}
            textStyle={styles.centerTextMargin}
          />
        </View>

        <View style={styles.inputSection}>
          <MyText
            text="Personal Information"
            fontSize={responsiveFontSize(2.2)}
            fontWeight="600"
            color={Colors.black}
            textStyle={{marginBottom: responsiveHeight(1.5)}}
          />
          <MyTextInput
            fieldName="Full Name"
            placeholder="Enter full name"
            value={form.fullName}
            onChangeText={val => handleChange('fullName', val)}
            textStyle={{fontSize: responsiveFontSize(1.9)}}
            containerStyle={styles.inputContainer}
          />
          {isAdmin ? (
            <MyTextInput
              fieldName="Admin ID"
              placeholder="Enter admin ID"
              value={form.adminId}
              onChangeText={val => handleChange('adminId', val)}
              textStyle={{fontSize: responsiveFontSize(1.9)}}
              containerStyle={styles.inputContainer}
            />
          ) : (
            <MyTextInput
              fieldName="Student ID"
              placeholder="Enter student ID"
              value={form.studentId}
              onChangeText={val => handleChange('studentId', val)}
              textStyle={{fontSize: responsiveFontSize(1.9)}}
              containerStyle={styles.inputContainer}
            />
          )}
          <MyTextInput
            fieldName="Email"
            placeholder="Enter email"
            value={form.emailAddress}
            onChangeText={val => handleChange('emailAddress', val)}
            textStyle={{fontSize: responsiveFontSize(1.9)}}
            containerStyle={styles.inputContainer}
          />
          <MyTextInput
            fieldName="Phone Number"
            placeholder="03xxxxxxxxx"
            value={form.phoneNumber}
            onChangeText={val => handleChange('phoneNumber', val)}
            textStyle={{fontSize: responsiveFontSize(1.9)}}
            containerStyle={styles.inputContainer}
          />
          {isAdmin ? (
            <MyTextInput
              fieldName="Address"
              placeholder="Enter address"
              value={form.address}
              onChangeText={val => handleChange('address', val)}
              textStyle={{fontSize: responsiveFontSize(1.9)}}
              containerStyle={styles.inputContainer}
            />
          ) : (
            <>
              <MyTextInput
                fieldName="Street Address"
                placeholder="Enter street address"
                value={form.address.street}
                onChangeText={val => handleChange('address.street', val)}
                textStyle={{fontSize: responsiveFontSize(1.9)}}
                containerStyle={styles.inputContainer}
              />
              <MyTextInput
                fieldName="City"
                placeholder="Enter city"
                value={form.address.city}
                onChangeText={val => handleChange('address.city', val)}
                textStyle={{fontSize: responsiveFontSize(1.9)}}
                containerStyle={styles.inputContainer}
              />
              <MyTextInput
                fieldName="State"
                placeholder="Enter state"
                value={form.address.state}
                onChangeText={val => handleChange('address.state', val)}
                textStyle={{fontSize: responsiveFontSize(1.9)}}
                containerStyle={styles.inputContainer}
              />
              <MyTextInput
                fieldName="Country"
                placeholder="Enter country"
                value={form.address.country}
                onChangeText={val => handleChange('address.country', val)}
                textStyle={{fontSize: responsiveFontSize(1.9)}}
                containerStyle={styles.inputContainer}
              />
              <MyTextInput
                fieldName="Zipcode"
                placeholder="Enter zipcode"
                value={form.address.zipcode}
                onChangeText={val => handleChange('address.zipcode', val)}
                textStyle={{fontSize: responsiveFontSize(1.9)}}
                containerStyle={styles.inputContainer}
              />
            </>
          )}

          {!isAdmin && (
            <>
              <MyText
                text="Gender"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                textStyle={{
                  marginTop: responsiveHeight(1.5),
                  marginBottom: responsiveHeight(0.5),
                }}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown(
                    'gender',
                    ['Male', 'Female', 'Other'],
                    'Select Gender',
                  )
                }>
                <MyText
                  text={form.gender || 'Select Gender'}
                  fontSize={responsiveFontSize(1.9)}
                  color={form.gender ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>

              <MyText
                text="Semester"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                textStyle={{
                  marginTop: responsiveHeight(1.5),
                  marginBottom: responsiveHeight(0.5),
                }}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown(
                    'semester',
                    ['1', '2', '3', '4', '5', '6', '7', '8'],
                    'Select Semester',
                  )
                }>
                <MyText
                  text={form.semester || 'Select Semester'}
                  fontSize={responsiveFontSize(1.9)}
                  color={form.semester ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>

              <MyText
                text="Department"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                textStyle={{
                  marginTop: responsiveHeight(1.5),
                  marginBottom: responsiveHeight(0.5),
                }}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown(
                    'department',
                    ['BSCS', 'BBA'],
                    'Select Department',
                  )
                }>
                <MyText
                  text={form.department || 'Select Department'}
                  fontSize={responsiveFontSize(1.9)}
                  color={form.department ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowDatePicker(true)}>
                <MyTextInput
                  fieldName="Date of Birth"
                  value={form.dateOfBirth}
                  placeholder="YYYY-MM-DD"
                  editable={false}
                  textStyle={{fontSize: responsiveFontSize(1.9)}}
                  containerStyle={{borderWidth: 0}}
                />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={
                    form.dateOfBirth ? new Date(form.dateOfBirth) : new Date()
                  }
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      const formatted = selectedDate
                        .toISOString()
                        .split('T')[0];
                      handleChange('dateOfBirth', formatted);
                    }
                  }}
                />
              )}

              <MyTextInput
                fieldName="Bio"
                placeholder="Tell us about yourself"
                value={form.bio}
                onChangeText={val => handleChange('bio', val)}
                multiline
                textStyle={{fontSize: responsiveFontSize(1.9)}}
                containerStyle={styles.inputContainer}
              />
            </>
          )}

          {isAdmin && (
            <>
              <MyText
                text="Role"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
                textStyle={{
                  marginTop: responsiveHeight(1.5),
                  marginBottom: responsiveHeight(0.5),
                }}
              />
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() =>
                  openDropdown(
                    'role',
                    ['superadmin', 'moderator', 'admin'],
                    'Select Role',
                  )
                }>
                <MyText
                  text={form.role || 'Select Role'}
                  fontSize={responsiveFontSize(1.9)}
                  color={form.role ? Colors.black : Colors.gray}
                />
                <Icon name="chevron-down" size={20} color={Colors.gray} />
              </TouchableOpacity>
            </>
          )}

          {imageUri && (
            <Image
              source={{uri: imageUri}}
              style={[styles.imagePreview, {marginTop: responsiveHeight(10)}]}
              onError={() => setImageError(true)}
            />
          )}
          <TouchableOpacity
            style={styles.cardUploadBtn}
            onPress={() => handleImagePick(setImageUri)}>
            <MyText
              color={Colors.white}
              text={imageUri ? 'Change Profile Image' : 'Upload Profile Image'}
              fontSize={responsiveFontSize(2)}
              fontWeight="500"
            />
          </TouchableOpacity>

          {!isAdmin && studentCardImageUri && (
            <Image
              source={{uri: studentCardImageUri}}
              style={[styles.imagePreview, {marginTop: responsiveHeight(2)}]}
              onError={() => setImageError(true)}
            />
          )}
          {!isAdmin && (
            <TouchableOpacity
              style={styles.cardUploadBtn}
              onPress={() => handleImagePick(setStudentCardImageUri)}>
              <MyText
                color={Colors.white}
                text={
                  studentCardImageUri
                    ? 'Change Card Image'
                    : 'Upload Card Image'
                }
                fontSize={responsiveFontSize(2)}
                fontWeight="500"
              />
            </TouchableOpacity>
          )}
        </View>

        {!isAdmin && (
          <View style={styles.recentPostsBox}>
            <MyText
              text="Recent Activities"
              fontSize={responsiveFontSize(2.2)}
              fontWeight="600"
              color={Colors.black}
              textStyle={{marginBottom: responsiveHeight(1)}}
            />
            {posts.map((post, index) => {
              const {bgColor, textColor} = getStatusStyle(post.status);
              return (
                <View key={index} style={styles.postItem}>
                  <View style={styles.postTopRow}>
                    <MyText
                      text={post.item}
                      fontSize={responsiveFontSize(2)}
                      fontWeight="500"
                      color={Colors.black}
                    />
                    <View
                      style={[
                        styles.statusBox,
                        {backgroundColor: bgColor, borderColor: textColor},
                      ]}>
                      <MyText
                        text={post.status}
                        fontSize={responsiveFontSize(1.6)}
                        fontWeight="500"
                        color={textColor}
                      />
                    </View>
                  </View>
                  <MyText
                    text={`Posted on ${post.date}`}
                    fontSize={responsiveFontSize(1.6)}
                    color={Colors.gray}
                    textStyle={{marginTop: 2}}
                  />
                  {index < posts.length - 1 && <View style={styles.divider} />}
                </View>
              );
            })}
          </View>
        )}

        <MyButton
          text={isLoading ? '' : 'Save Changes'}
          backgroundColor={Colors.primary}
          textColor={Colors.white}
          onPress={handleSubmit}
          disabled={isLoading}
          textstyle={{
            fontSize: responsiveFontSize(2.5),
            fontWeight: '600',
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: responsiveWidth(90),
            paddingVertical: responsiveHeight(1.8),
            borderRadius: responsiveWidth(3),
            alignSelf: 'center',
            marginBottom: responsiveHeight(2),
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}
          leftIcon={
            isLoading ? (
              <ActivityIndicator
                size="small"
                color={Colors.white}
                style={{marginRight: responsiveWidth(2)}}
              />
            ) : null
          }
        />
      </ScrollView>

      <Modal
        transparent
        animationType="fade"
        visible={dropdownModal.visible}
        onRequestClose={() =>
          setDropdownModal({visible: false, field: '', options: [], title: ''})
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
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    form[dropdownModal.field] === item && {
                      backgroundColor: Colors.primaryLight,
                    },
                  ]}
                  onPress={() => handleDropdownSelect(item)}>
                  <MyText
                    text={item}
                    fontSize={responsiveFontSize(2)}
                    color={
                      form[dropdownModal.field] === item
                        ? Colors.primary
                        : Colors.black
                    }
                    fontWeight={
                      form[dropdownModal.field] === item ? '600' : '500'
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
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: responsiveWidth(5),
    paddingBottom: responsiveHeight(4),
  },
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
    resizeMode: 'contain',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  profileImage: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    borderRadius: responsiveWidth(15),
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: responsiveWidth(0),
    right: responsiveWidth(25),
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: responsiveWidth(2),
    borderWidth: 2,
    borderColor: Colors.white,
  },
  recentPostsBox: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(3),
    padding: responsiveWidth(4),
    backgroundColor: Colors.white,
    marginBottom: responsiveHeight(3),
  },
  postItem: {
    marginBottom: responsiveHeight(1.5),
  },
  postTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBox: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.4),
    borderRadius: responsiveWidth(5),
    borderWidth: 1,
  },
  profileCard: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(4),
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: Colors.white,
    marginBottom: responsiveHeight(3),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  centerText: {
    textAlign: 'center',
  },
  centerTextMargin: {
    textAlign: 'center',
    marginBottom: responsiveHeight(2),
    marginTop: responsiveHeight(1),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(2),
  },
  statBoxRed: {
    backgroundColor: '#ffe5e5',
    borderRadius: responsiveWidth(3),
    padding: responsiveHeight(1.5),
    width: '48%',
    alignItems: 'center',
  },
  statBoxGreen: {
    backgroundColor: '#e6ffea',
    borderRadius: responsiveWidth(3),
    padding: responsiveHeight(1.5),
    width: '48%',
    alignItems: 'center',
  },
  inputSection: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: responsiveWidth(4),
    padding: responsiveWidth(5),
    backgroundColor: Colors.white,
    marginBottom: responsiveHeight(3),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
  imagePreview: {
    width: responsiveWidth(60),
    height: responsiveHeight(25),
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: responsiveWidth(3),
    marginTop: responsiveHeight(2),
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  cardUploadBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
