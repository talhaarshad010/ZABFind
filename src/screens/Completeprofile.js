// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
//   PermissionsAndroid,
//   ActivityIndicator,
//   Modal,
//   FlatList,
//   Keyboard,
// } from 'react-native';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import {launchImageLibrary} from 'react-native-image-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import {useDispatch} from 'react-redux';
// import {useNavigation} from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';

// import MyText from '../components/textcomponent';
// import Colors from '../styles/Colors';
// import MyTextInput from '../components/TextInputComponent';
// import WrapperContainer from '../components/WrapperContainer';
// import AuthHeader from '../components/AuthHeader';
// import MyButton from '../components/CustomButton';
// import ToastMessage from '../hooks/ToastMessage';
// import {useCompleteProfileMutation} from '../store/Api/Auth';
// import {updateUserProfile} from '../store/slices/Auth';

// const CompleteProfile = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [address, setAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     country: 'Pakistan',
//     zipcode: '',
//   });
//   const [gender, setGender] = useState('');
//   const [semester, setSemester] = useState('');
//   const [department, setDepartment] = useState('');
//   const [bio, setBio] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [profileImage, setProfileImage] = useState(null);
//   const [studentCardImage, setStudentCardImage] = useState(null);
//   const [dropdownModal, setDropdownModal] = useState({
//     visible: false,
//     field: '',
//     options: [],
//     title: '',
//   });
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const {Toasts} = ToastMessage();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [completeProfile, {isLoading}] = useCompleteProfileMutation();

//   const genderOptions = ['Male', 'Female', 'Other'];
//   const semesterOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];
//   const departmentOptions = ['BSCS', 'BBA'];
//   const cityOptions = [
//     'Karachi',
//     'Lahore',
//     'Islamabad',
//     'Rawalpindi',
//     'Faisalabad',
//     'Multan',
//     'Peshawar',
//     'Quetta',
//     'Sialkot',
//     'Gujranwala',
//   ];
//   const stateOptions = [
//     'Sindh',
//     'Punjab',
//     'Khyber Pakhtunkhwa',
//     'Balochistan',
//     'Gilgit-Baltistan',
//     'Azad Jammu and Kashmir',
//   ];

//   const requestGalleryPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         if (Platform.Version >= 33) {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//             {
//               title: 'Gallery Permission',
//               message: 'App needs access to your photos',
//               buttonPositive: 'OK',
//             },
//           );
//           return granted === PermissionsAndroid.RESULTS.GRANTED;
//         } else {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//             {
//               title: 'Storage Permission',
//               message: 'App needs access to your storage',
//               buttonPositive: 'OK',
//             },
//           );
//           return granted === PermissionsAndroid.RESULTS.GRANTED;
//         }
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const handleImagePick = async setter => {
//     const hasPermission = await requestGalleryPermission();
//     if (!hasPermission) {
//       Toasts('Error', 'Permission denied to access gallery', 'error', 2000);
//       return;
//     }

//     launchImageLibrary({mediaType: 'photo'}, response => {
//       if (response?.assets?.length) {
//         setter(response.assets[0]);
//       }
//     });
//   };

//   const openDropdown = (field, options, title) => {
//     Keyboard.dismiss();
//     setDropdownModal({visible: true, field, options, title});
//   };

//   const handleDropdownSelect = value => {
//     if (dropdownModal.field === 'gender') {
//       setGender(value);
//     } else if (dropdownModal.field === 'semester') {
//       setSemester(value);
//     } else if (dropdownModal.field === 'department') {
//       setDepartment(value);
//     } else if (dropdownModal.field === 'city') {
//       setAddress({...address, city: value});
//     } else if (dropdownModal.field === 'state') {
//       setAddress({...address, state: value});
//     }
//     setDropdownModal({visible: false, field: '', options: [], title: ''});
//   };

//   const handleSubmit = async () => {
//     if (
//       !phoneNumber ||
//       !gender ||
//       !semester ||
//       !department ||
//       !dateOfBirth ||
//       !bio ||
//       !address.street ||
//       !address.city ||
//       !address.state ||
//       !address.zipcode
//     ) {
//       return Toasts('Error', 'Please fill all required fields', 'error', 2000);
//     }

//     const formData = new FormData();
//     formData.append('phoneNumber', phoneNumber);
//     formData.append('gender', gender);
//     formData.append('semester', semester);
//     formData.append('department', department);
//     formData.append('bio', bio);
//     formData.append('dateOfBirth', dateOfBirth);
//     formData.append('address', JSON.stringify(address));

//     if (profileImage) {
//       formData.append('profileImage', {
//         uri: profileImage.uri,
//         type: profileImage.type,
//         name: profileImage.fileName || `profile_${Date.now()}.jpg`,
//       });
//     }

//     if (studentCardImage) {
//       formData.append('studentCardImage', {
//         uri: studentCardImage.uri,
//         type: studentCardImage.type,
//         name: studentCardImage.fileName || `studentCard_${Date.now()}.jpg`,
//       });
//     }

//     try {
//       const result = await completeProfile(formData).unwrap();
//       console.log('Profile update result:', result);
//       dispatch(updateUserProfile(result.user));
//       Toasts('Success', 'Profile Updated', 'success', 2000);
//     } catch (err) {
//       Toasts('Error', err?.data?.message || 'Update failed', 'error', 2000);
//     }
//   };

//   return (
//     <WrapperContainer>
//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <ScrollView
//           contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
//           keyboardShouldPersistTaps="handled">
//           <View style={styles.container}>
//             <AuthHeader />
//             <MyText
//               textStyle={{textAlign: 'center'}}
//               fontSize={responsiveFontSize(3)}
//               fontWeight={'500'}
//               color={Colors.black}
//               text={'Complete Your Profile'}
//             />
//             <View style={styles.InputBox}>
//               <MyTextInput
//                 fieldName="Phone Number"
//                 placeholder="03xxxxxxxxx"
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//               />
//               <MyTextInput
//                 placeholder={'Street Address'}
//                 fieldName="Street Address"
//                 value={address.street}
//                 onChangeText={text => setAddress({...address, street: text})}
//               />
//               <MyText
//                 text="City"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <TouchableOpacity
//                 style={styles.inputContainer}
//                 onPress={() =>
//                   openDropdown('city', cityOptions, 'Select City')
//                 }>
//                 <MyText
//                   text={address.city || 'Select City'}
//                   fontSize={responsiveFontSize(1.9)}
//                   color={address.city ? Colors.black : Colors.gray}
//                 />
//                 <Icon name="chevron-down" size={20} color={Colors.gray} />
//               </TouchableOpacity>
//               <MyText
//                 text="State"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <TouchableOpacity
//                 style={styles.inputContainer}
//                 onPress={() =>
//                   openDropdown('state', stateOptions, 'Select State')
//                 }>
//                 <MyText
//                   text={address.state || 'Select State'}
//                   fontSize={responsiveFontSize(1.9)}
//                   color={address.state ? Colors.black : Colors.gray}
//                 />
//                 <Icon name="chevron-down" size={20} color={Colors.gray} />
//               </TouchableOpacity>
//               <MyTextInput
//                 placeholder={'Zipcode'}
//                 fieldName="Zipcode"
//                 value={address.zipcode}
//                 onChangeText={text => setAddress({...address, zipcode: text})}
//               />
//               <MyText
//                 text="Gender"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <TouchableOpacity
//                 style={styles.inputContainer}
//                 onPress={() =>
//                   openDropdown('gender', genderOptions, 'Select Gender')
//                 }>
//                 <MyText
//                   text={gender || 'Select Gender'}
//                   fontSize={responsiveFontSize(1.9)}
//                   color={gender ? Colors.black : Colors.gray}
//                 />
//                 <Icon name="chevron-down" size={20} color={Colors.gray} />
//               </TouchableOpacity>
//               <MyText
//                 text="Semester"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <TouchableOpacity
//                 style={styles.inputContainer}
//                 onPress={() =>
//                   openDropdown('semester', semesterOptions, 'Select Semester')
//                 }>
//                 <MyText
//                   text={semester || 'Select Semester'}
//                   fontSize={responsiveFontSize(1.9)}
//                   color={semester ? Colors.black : Colors.gray}
//                 />
//                 <Icon name="chevron-down" size={20} color={Colors.gray} />
//               </TouchableOpacity>
//               <MyText
//                 text="Department"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2)}
//                 color={Colors.black}
//                 textStyle={styles.fieldLabel}
//               />
//               <TouchableOpacity
//                 style={styles.inputContainer}
//                 onPress={() =>
//                   openDropdown(
//                     'department',
//                     departmentOptions,
//                     'Select Department',
//                   )
//                 }>
//                 <MyText
//                   text={department || 'Select Department'}
//                   fontSize={responsiveFontSize(1.9)}
//                   color={department ? Colors.black : Colors.gray}
//                 />
//                 <Icon name="chevron-down" size={20} color={Colors.gray} />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//                 <MyTextInput
//                   fieldName="Date of Birth"
//                   value={dateOfBirth}
//                   placeholder="YYYY-MM-DD"
//                   editable={false}
//                 />
//               </TouchableOpacity>
//               {showDatePicker && (
//                 <DateTimePicker
//                   value={new Date()}
//                   mode="date"
//                   display="default"
//                   maximumDate={new Date()}
//                   onChange={(event, selectedDate) => {
//                     setShowDatePicker(false);
//                     if (selectedDate) {
//                       const formatted = selectedDate
//                         .toISOString()
//                         .split('T')[0];
//                       setDateOfBirth(formatted);
//                     }
//                   }}
//                 />
//               )}
//               <MyTextInput
//                 fieldName="Bio"
//                 placeholder="Tell us about yourself"
//                 value={bio}
//                 onChangeText={setBio}
//                 multiline
//                 textStyle={{fontSize: responsiveFontSize(1.9)}}
//                 containerStyle={styles.inputContainer}
//               />
//               {profileImage && (
//                 <Image
//                   source={{uri: profileImage.uri}}
//                   style={styles.imagePreview}
//                 />
//               )}
//               <TouchableOpacity
//                 style={styles.ProfileuploadBtn}
//                 onPress={() => handleImagePick(setProfileImage)}>
//                 <MyText
//                   color={Colors.white}
//                   text={
//                     profileImage
//                       ? 'Change Profile Image'
//                       : 'Upload Profile Image'
//                   }
//                 />
//               </TouchableOpacity>
//               {studentCardImage && (
//                 <Image
//                   source={{uri: studentCardImage.uri}}
//                   style={[
//                     styles.imagePreview,
//                     {marginTop: responsiveHeight(2)},
//                   ]}
//                 />
//               )}
//               <TouchableOpacity
//                 style={styles.CarduploadBtn}
//                 onPress={() => handleImagePick(setStudentCardImage)}>
//                 <MyText
//                   color={Colors.white}
//                   text={
//                     studentCardImage
//                       ? 'Change Student Card Image'
//                       : 'Upload Student Card Image'
//                   }
//                 />
//               </TouchableOpacity>
//             </View>
//             <Modal
//               transparent
//               animationType="fade"
//               visible={dropdownModal.visible}
//               onRequestClose={() =>
//                 setDropdownModal({
//                   visible: false,
//                   field: '',
//                   options: [],
//                   title: '',
//                 })
//               }>
//               <View style={styles.modalOverlay}>
//                 <View style={styles.dropdownModal}>
//                   <MyText
//                     text={dropdownModal.title}
//                     fontSize={responsiveFontSize(2.5)}
//                     fontWeight="600"
//                     color={Colors.black}
//                     textStyle={{
//                       marginBottom: responsiveHeight(2),
//                       textAlign: 'center',
//                     }}
//                   />
//                   <FlatList
//                     data={dropdownModal.options}
//                     keyExtractor={item => item}
//                     showsVerticalScrollIndicator={false}
//                     renderItem={({item}) => (
//                       <TouchableOpacity
//                         style={[
//                           styles.dropdownItem,
//                           (dropdownModal.field === 'gender' &&
//                             gender === item) ||
//                           (dropdownModal.field === 'semester' &&
//                             semester === item) ||
//                           (dropdownModal.field === 'department' &&
//                             department === item) ||
//                           (dropdownModal.field === 'city' &&
//                             address.city === item) ||
//                           (dropdownModal.field === 'state' &&
//                             address.state === item)
//                             ? {backgroundColor: Colors.primaryLight}
//                             : {},
//                         ]}
//                         onPress={() => handleDropdownSelect(item)}>
//                         <MyText
//                           text={item}
//                           fontSize={responsiveFontSize(2)}
//                           color={
//                             (dropdownModal.field === 'gender' &&
//                               gender === item) ||
//                             (dropdownModal.field === 'semester' &&
//                               semester === item) ||
//                             (dropdownModal.field === 'department' &&
//                               department === item) ||
//                             (dropdownModal.field === 'city' &&
//                               address.city === item) ||
//                             (dropdownModal.field === 'state' &&
//                               address.state === item)
//                               ? Colors.primary
//                               : Colors.black
//                           }
//                           fontWeight={
//                             (dropdownModal.field === 'gender' &&
//                               gender === item) ||
//                             (dropdownModal.field === 'semester' &&
//                               semester === item) ||
//                             (dropdownModal.field === 'department' &&
//                               department === item) ||
//                             (dropdownModal.field === 'city' &&
//                               address.city === item) ||
//                             (dropdownModal.field === 'state' &&
//                               address.state === item)
//                               ? '600'
//                               : '500'
//                           }
//                         />
//                       </TouchableOpacity>
//                     )}
//                     style={{maxHeight: responsiveHeight(30)}}
//                   />
//                   <TouchableOpacity
//                     style={styles.modalButton}
//                     onPress={() =>
//                       setDropdownModal({
//                         visible: false,
//                         field: '',
//                         options: [],
//                         title: '',
//                       })
//                     }>
//                     <MyText
//                       text="Cancel"
//                       color={Colors.darkGray}
//                       fontSize={responsiveFontSize(2)}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </Modal>
//             <MyButton
//               isLoading={isLoading}
//               text={'Submit'}
//               backgroundColor={Colors.primary}
//               textColor={Colors.white}
//               onPress={handleSubmit}
//               disabled={isLoading}
//               textstyle={{
//                 fontSize: responsiveFontSize(2.5),
//                 width: responsiveWidth(90),
//               }}
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: responsiveWidth(90),
//                 padding: responsiveHeight(1.5),
//               }}
//               leftIcon={
//                 isLoading ? (
//                   <ActivityIndicator
//                     size="small"
//                     color={Colors.white}
//                     style={{marginRight: responsiveWidth(2)}}
//                   />
//                 ) : null
//               }
//             />
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </WrapperContainer>
//   );
// };

// export default CompleteProfile;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: responsiveHeight(5),
//   },
//   InputBox: {
//     width: responsiveWidth(90),
//     alignSelf: 'center',
//     gap: responsiveHeight(1),
//   },
//   ProfileuploadBtn: {
//     backgroundColor: Colors.primary,
//     padding: responsiveHeight(1.5),
//     borderRadius: responsiveWidth(2),
//     alignItems: 'center',
//     marginTop: responsiveHeight(10),
//   },
//   CarduploadBtn: {
//     backgroundColor: Colors.primary,
//     padding: responsiveHeight(1.5),
//     borderRadius: responsiveWidth(2),
//     alignItems: 'center',
//     marginBottom: responsiveHeight(2),
//   },
//   imagePreview: {
//     width: responsiveWidth(50),
//     height: responsiveHeight(20),
//     resizeMode: 'cover',
//     alignSelf: 'center',
//     borderRadius: responsiveWidth(2),
//     marginTop: responsiveHeight(10),
//   },
//   fieldLabel: {
//     marginTop: responsiveHeight(1),
//     // marginBottom: responsiveHeight(1),
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
//   modalButton: {
//     width: '100%',
//     backgroundColor: '#f9f9f9',
//     paddingVertical: responsiveHeight(1.5),
//     borderRadius: responsiveWidth(3),
//     alignItems: 'center',
//     marginTop: responsiveHeight(1),
//   },
// });

import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
  Modal,
  FlatList,
  Keyboard,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {launchImageLibrary} from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as Yup from 'yup';

import MyText from '../components/textcomponent';
import Colors from '../styles/Colors';
import MyTextInput from '../components/TextInputComponent';
import WrapperContainer from '../components/WrapperContainer';
import AuthHeader from '../components/AuthHeader';
import MyButton from '../components/CustomButton';
import ToastMessage from '../hooks/ToastMessage';
import {useCompleteProfileMutation} from '../store/Api/Auth';
import {updateUserProfile} from '../store/slices/Auth';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .trim()
    .required('Phone Number is required')
    .matches(
      /^03[0-4][0-9]{8}$/,
      'Enter a valid Pakistani phone number (e.g., 03xxxxxxxxx)',
    ),
  address: Yup.object().shape({
    street: Yup.string().trim().required('Street Address is required'),
    city: Yup.string().trim().required('City is required'),
    state: Yup.string().trim().required('State is required'),
    zipcode: Yup.string()
      .trim()
      .required('Zipcode is required')
      .matches(/^\d{5}$/, 'Zipcode must be a 5-digit number'),
    country: Yup.string().trim().required('Country is required'),
  }),
  gender: Yup.string()
    .trim()
    .required('Gender is required')
    .oneOf(['Male', 'Female', 'Other'], 'Select a valid gender'),
  semester: Yup.string()
    .trim()
    .required('Semester is required')
    .oneOf(['1', '2', '3', '4', '5', '6', '7', '8'], 'Select a valid semester'),
  department: Yup.string()
    .trim()
    .required('Department is required')
    .oneOf(['BSCS', 'BBA'], 'Select a valid department'),
  bio: Yup.string()
    .trim()
    .required('Bio is required')
    .min(10, 'Bio must be at least 10 characters'),
  dateOfBirth: Yup.string().trim().required('Date of Birth is required'),
  profileImage: Yup.mixed().required('Profile Image is required'),
  studentCardImage: Yup.mixed().required('Student Card Image is required'),
});

const CompleteProfile = () => {
  const {Toasts} = ToastMessage();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [completeProfile, {isLoading}] = useCompleteProfileMutation();
  const [dropdownModal, setDropdownModal] = useState({
    visible: false,
    field: '',
    options: [],
    title: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [apiError, setApiError] = useState('');

  // Refs only for text inputs
  const phoneNumberRef = useRef(null);
  const streetRef = useRef(null);
  const zipcodeRef = useRef(null);
  const bioRef = useRef(null);

  const genderOptions = ['Male', 'Female', 'Other'];
  const semesterOptions = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const departmentOptions = ['BSCS', 'BBA'];
  const cityOptions = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
  ];
  const stateOptions = [
    'Sindh',
    'Punjab',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Gilgit-Baltistan',
    'Azad Jammu and Kashmir',
  ];

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        if (Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Gallery Permission',
              message: 'App needs access to your photos',
              buttonPositive: 'OK',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } else {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage',
              buttonPositive: 'OK',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
      } catch (err) {
        console.warn(err);
        setApiError('Permission denied to access gallery');
        return false;
      }
    }
    return true;
  };

  const handleImagePick = async (setter, setFieldValue) => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      return;
    }

    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response?.assets?.length) {
        setFieldValue(setter, response.assets[0]);
      }
    });
  };

  const openDropdown = (field, options, title) => {
    Keyboard.dismiss();
    setDropdownModal({visible: true, field, options, title});
  };

  const handleSubmit = async (values, {resetForm}) => {
    Keyboard.dismiss();
    setApiError('');

    const formData = new FormData();
    formData.append('phoneNumber', values.phoneNumber.trim());
    formData.append('gender', values.gender);
    formData.append('semester', values.semester);
    formData.append('department', values.department);
    formData.append('bio', values.bio.trim());
    formData.append('dateOfBirth', values.dateOfBirth);
    formData.append(
      'address',
      JSON.stringify({
        street: values.address.street.trim(),
        city: values.address.city,
        state: values.address.state,
        country: values.address.country,
        zipcode: values.address.zipcode.trim(),
      }),
    );

    if (values.profileImage) {
      formData.append('profileImage', {
        uri: values.profileImage.uri,
        type: values.profileImage.type,
        name: values.profileImage.fileName || `profile_${Date.now()}.jpg`,
      });
    }

    if (values.studentCardImage) {
      formData.append('studentCardImage', {
        uri: values.studentCardImage.uri,
        type: values.studentCardImage.type,
        name:
          values.studentCardImage.fileName || `studentCard_${Date.now()}.jpg`,
      });
    }

    try {
      const result = await completeProfile(formData).unwrap();
      console.log('Profile update result:', result);
      dispatch(updateUserProfile(result.user));
      Toasts('Success', 'Profile Updated', 'success', 2000);
      resetForm();
      // navigation.navigate('Home');
    } catch (err) {
      console.error('Profile Update Error:', err);
      setApiError(
        err?.data?.message || 'Profile update failed. Please try again.',
      );
    }
  };

  return (
    <WrapperContainer>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <AuthHeader />
            <MyText
              textStyle={{textAlign: 'center'}}
              fontSize={responsiveFontSize(3)}
              fontWeight={'500'}
              color={Colors.black}
              text={'Complete Your Profile'}
            />
            <Formik
              initialValues={{
                phoneNumber: '',
                address: {
                  street: '',
                  city: '',
                  state: '',
                  country: 'Pakistan',
                  zipcode: '',
                },
                gender: '',
                semester: '',
                department: '',
                bio: '',
                dateOfBirth: '',
                profileImage: null,
                studentCardImage: null,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}>
              {({handleSubmit, values, setFieldValue, errors, touched}) => (
                <>
                  <View style={styles.InputBox}>
                    <MyTextInput
                      fieldName="Phone Number"
                      placeholder="03xxxxxxxxx"
                      value={values.phoneNumber}
                      onChangeText={text => setFieldValue('phoneNumber', text)}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoFocus={true}
                      inputRef={phoneNumberRef}
                      onSubmitEditing={() => streetRef.current?.focus()}
                      error={touched.phoneNumber && errors.phoneNumber}
                    />
                    {touched.phoneNumber && errors.phoneNumber && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.phoneNumber}
                        textStyle={styles.errorText}
                      />
                    )}

                    <MyTextInput
                      fieldName="Street Address"
                      placeholder="Street Address"
                      value={values.address.street}
                      onChangeText={text =>
                        setFieldValue('address.street', text)
                      }
                      returnKeyType="next"
                      autoCapitalize="words"
                      autoCorrect={false}
                      inputRef={streetRef}
                      onSubmitEditing={() => zipcodeRef.current?.focus()}
                      error={touched.address?.street && errors.address?.street}
                    />
                    {touched.address?.street && errors.address?.street && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.address.street}
                        textStyle={styles.errorText}
                      />
                    )}

                    <MyText
                      text="City"
                      fontWeight="500"
                      fontSize={responsiveFontSize(2)}
                      color={Colors.black}
                      textStyle={styles.fieldLabel}
                    />
                    <TouchableOpacity
                      style={styles.inputContainer}
                      onPress={() =>
                        openDropdown('city', cityOptions, 'Select City')
                      }>
                      <MyText
                        text={values.address.city || 'Select City'}
                        fontSize={responsiveFontSize(1.9)}
                        color={values.address.city ? Colors.black : Colors.gray}
                      />
                      <Icon name="chevron-down" size={20} color={Colors.gray} />
                    </TouchableOpacity>
                    {touched.address?.city && errors.address?.city && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.address.city}
                        textStyle={styles.errorText}
                      />
                    )}

                    <MyText
                      text="State"
                      fontWeight="500"
                      fontSize={responsiveFontSize(2)}
                      color={Colors.black}
                      textStyle={styles.fieldLabel}
                    />
                    <TouchableOpacity
                      style={styles.inputContainer}
                      onPress={() =>
                        openDropdown('state', stateOptions, 'Select State')
                      }>
                      <MyText
                        text={values.address.state || 'Select State'}
                        fontSize={responsiveFontSize(1.9)}
                        color={
                          values.address.state ? Colors.black : Colors.gray
                        }
                      />
                      <Icon name="chevron-down" size={20} color={Colors.gray} />
                    </TouchableOpacity>
                    {touched.address?.state && errors.address?.state && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.address.state}
                        textStyle={styles.errorText}
                      />
                    )}

                    <MyTextInput
                      fieldName="Zipcode"
                      placeholder="Zipcode"
                      value={values.address.zipcode}
                      onChangeText={text =>
                        setFieldValue('address.zipcode', text)
                      }
                      keyboardType="numeric"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      inputRef={zipcodeRef}
                      onSubmitEditing={() => bioRef.current?.focus()}
                      error={
                        touched.address?.zipcode && errors.address?.zipcode
                      }
                    />
                    {touched.address?.zipcode && errors.address?.zipcode && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.address.zipcode}
                        textStyle={styles.errorText}
                      />
                    )}

                    <MyText
                      text="Gender"
                      fontWeight="500"
                      fontSize={responsiveFontSize(2)}
                      color={Colors.black}
                      textStyle={styles.fieldLabel}
                    />
                    <TouchableOpacity
                      style={styles.inputContainer}
                      onPress={() =>
                        openDropdown('gender', genderOptions, 'Select Gender')
                      }>
                      <MyText
                        text={values.gender || 'Select Gender'}
                        fontSize={responsiveFontSize(1.9)}
                        color={values.gender ? Colors.black : Colors.gray}
                      />
                      <Icon name="chevron-down" size={20} color={Colors.gray} />
                    </TouchableOpacity>
                    {touched.gender && errors.gender && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.gender}
                        textStyle={styles.errorText}
                      />
                    )}

                    <MyText
                      text="Semester"
                      fontWeight="500"
                      fontSize={responsiveFontSize(2)}
                      color={Colors.black}
                      textStyle={styles.fieldLabel}
                    />
                    <TouchableOpacity
                      style={styles.inputContainer}
                      onPress={() =>
                        openDropdown(
                          'semester',
                          semesterOptions,
                          'Select Semester',
                        )
                      }>
                      <MyText
                        text={values.semester || 'Select Semester'}
                        fontSize={responsiveFontSize(1.7)}
                        color={values.semester ? Colors.black : Colors.gray}
                      />
                      <Icon name="chevron-down" size={20} color={Colors.gray} />
                    </TouchableOpacity>
                    {touched.semester && errors.semester && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.semester}
                        textStyle={styles.errorText}
                      />
                    )}

                    <MyText
                      text="Department"
                      fontWeight="500"
                      fontSize={responsiveFontSize(2)}
                      color={Colors.black}
                      textStyle={styles.fieldLabel}
                    />
                    <TouchableOpacity
                      style={styles.inputContainer}
                      onPress={() =>
                        openDropdown(
                          'department',
                          departmentOptions,
                          'Select Department',
                        )
                      }>
                      <MyText
                        text={values.department || 'Select Department'}
                        fontSize={responsiveFontSize(1.7)}
                        color={values.department ? Colors.black : Colors.gray}
                      />
                      <Icon name="chevron-down" size={20} color={Colors.gray} />
                    </TouchableOpacity>
                    {touched.department && errors.department && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.department}
                        textStyle={styles.errorText}
                      />
                    )}

                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                      <MyTextInput
                        fieldName="Date of Birth"
                        value={values.dateOfBirth}
                        placeholder="YYYY-MM-DD"
                        editable={false}
                        error={touched.dateOfBirth && errors.dateOfBirth}
                      />
                    </TouchableOpacity>
                    {touched.dateOfBirth && errors.dateOfBirth && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.dateOfBirth}
                        textStyle={styles.errorText}
                      />
                    )}
                    {showDatePicker && (
                      <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        maximumDate={new Date()}
                        onChange={(event, selectedDate) => {
                          setShowDatePicker(false);
                          if (selectedDate) {
                            const formatted = selectedDate
                              .toISOString()
                              .split('T')[0];
                            setFieldValue('dateOfBirth', formatted);
                            bioRef.current?.focus();
                          }
                        }}
                      />
                    )}

                    <MyTextInput
                      fieldName="Bio"
                      placeholder="Tell us about yourself"
                      value={values.bio}
                      onChangeText={text => setFieldValue('bio', text)}
                      multiline
                      textStyle={{fontSize: responsiveFontSize(1.9)}}
                      containerStyle={styles.inputContainer}
                      error={touched.bio && errors.bio}
                      returnKeyType="done"
                      inputRef={bioRef}
                    />
                    {touched.bio && errors.bio && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.bio}
                        textStyle={[
                          styles.errorText,
                          {marginTop: responsiveHeight(8)},
                        ]}
                      />
                    )}

                    {values.profileImage && (
                      <Image
                        source={{uri: values.profileImage.uri}}
                        style={[
                          styles.imagePreview,
                          {marginTop: responsiveHeight(10)},
                        ]}
                      />
                    )}
                    <TouchableOpacity
                      style={styles.ProfileuploadBtn}
                      onPress={() =>
                        handleImagePick('profileImage', setFieldValue)
                      }>
                      <MyText
                        color={Colors.white}
                        text={
                          values.profileImage
                            ? 'Change Profile Image'
                            : 'Upload Profile Image'
                        }
                      />
                    </TouchableOpacity>
                    {touched.profileImage && errors.profileImage && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.profileImage}
                        textStyle={styles.errorText}
                      />
                    )}

                    {values.studentCardImage && (
                      <Image
                        source={{uri: values.studentCardImage.uri}}
                        style={[
                          styles.imagePreview,
                          {marginTop: responsiveHeight(2)},
                        ]}
                      />
                    )}
                    <TouchableOpacity
                      style={styles.CarduploadBtn}
                      onPress={() =>
                        handleImagePick('studentCardImage', setFieldValue)
                      }>
                      <MyText
                        color={Colors.white}
                        text={
                          values.studentCardImage
                            ? 'Change Student Card Image'
                            : 'Upload Student Card Image'
                        }
                      />
                    </TouchableOpacity>
                    {touched.studentCardImage && errors.studentCardImage && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={errors.studentCardImage}
                        textStyle={styles.errorText}
                      />
                    )}

                    {apiError && (
                      <MyText
                        color={Colors.red}
                        fontSize={responsiveFontSize(1.7)}
                        text={apiError}
                        textStyle={styles.errorText}
                      />
                    )}

                    <MyButton
                      isLoading={isLoading}
                      text={'Submit'}
                      backgroundColor={Colors.primary}
                      textColor={Colors.white}
                      onPress={handleSubmit}
                      disabled={
                        isLoading ||
                        !values.phoneNumber ||
                        !values.address.street ||
                        !values.address.city ||
                        !values.address.state ||
                        !values.address.zipcode ||
                        !values.gender ||
                        !values.semester ||
                        !values.department ||
                        !values.bio ||
                        !values.dateOfBirth ||
                        !values.profileImage ||
                        !values.studentCardImage ||
                        Object.keys(errors).length > 0
                      }
                      textstyle={{
                        fontSize: responsiveFontSize(2.5),
                        width: responsiveWidth(90),
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: responsiveWidth(90),
                        padding: responsiveHeight(1.5),
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
                  </View>

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
                                (dropdownModal.field === 'gender' &&
                                  values.gender === item) ||
                                (dropdownModal.field === 'semester' &&
                                  values.semester === item) ||
                                (dropdownModal.field === 'department' &&
                                  values.department === item) ||
                                (dropdownModal.field === 'city' &&
                                  values.address.city === item) ||
                                (dropdownModal.field === 'state' &&
                                  values.address.state === item)
                                  ? {backgroundColor: Colors.primaryLight}
                                  : {},
                              ]}
                              onPress={() => {
                                if (dropdownModal.field === 'gender') {
                                  setFieldValue('gender', item);
                                } else if (dropdownModal.field === 'semester') {
                                  setFieldValue('semester', item);
                                } else if (
                                  dropdownModal.field === 'department'
                                ) {
                                  setFieldValue('department', item);
                                } else if (dropdownModal.field === 'city') {
                                  setFieldValue('address.city', item);
                                } else if (dropdownModal.field === 'state') {
                                  setFieldValue('address.state', item);
                                }
                                setDropdownModal({
                                  visible: false,
                                  field: '',
                                  options: [],
                                  title: '',
                                });
                              }}>
                              <MyText
                                text={item}
                                fontSize={responsiveFontSize(2)}
                                color={
                                  (dropdownModal.field === 'gender' &&
                                    values.gender === item) ||
                                  (dropdownModal.field === 'semester' &&
                                    values.semester === item) ||
                                  (dropdownModal.field === 'department' &&
                                    values.department === item) ||
                                  (dropdownModal.field === 'city' &&
                                    values.address.city === item) ||
                                  (dropdownModal.field === 'state' &&
                                    values.address.state === item)
                                    ? Colors.primary
                                    : Colors.black
                                }
                                fontWeight={
                                  (dropdownModal.field === 'gender' &&
                                    values.gender === item) ||
                                  (dropdownModal.field === 'semester' &&
                                    values.semester === item) ||
                                  (dropdownModal.field === 'department' &&
                                    values.department === item) ||
                                  (dropdownModal.field === 'city' &&
                                    values.address.city === item) ||
                                  (dropdownModal.field === 'state' &&
                                    values.address.state === item)
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
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: responsiveHeight(5),
  },
  InputBox: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    gap: responsiveHeight(1),
  },
  ProfileuploadBtn: {
    backgroundColor: Colors.primary,
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    marginTop: responsiveHeight(4),
  },
  CarduploadBtn: {
    backgroundColor: Colors.primary,
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(2),
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },
  imagePreview: {
    width: responsiveWidth(50),
    height: responsiveHeight(20),
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: responsiveWidth(2),
    marginTop: responsiveHeight(2),
  },
  fieldLabel: {
    marginTop: responsiveHeight(1),
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
  modalButton: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    paddingVertical: responsiveHeight(1.5),
    borderRadius: responsiveWidth(3),
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  errorText: {
    // marginLeft: responsiveWidth(2),
    // marginTop: responsiveHeight(0.5),
  },
});
