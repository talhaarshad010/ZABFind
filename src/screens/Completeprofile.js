// // import React, {useState} from 'react';
// // import {
// //   StyleSheet,
// //   TouchableOpacity,
// //   View,
// //   ScrollView,
// //   KeyboardAvoidingView,
// //   Platform,
// //   Image,
// //   PermissionsAndroid,
// // } from 'react-native';
// // import MyText from '../components/textcomponent';
// // import Colors from '../styles/Colors';
// // import MyTextInput from '../components/TextInputComponent';
// // import WrapperContainer from '../components/WrapperContainer';
// // import AuthHeader from '../components/AuthHeader';
// // import {
// //   responsiveFontSize,
// //   responsiveHeight,
// //   responsiveWidth,
// // } from 'react-native-responsive-dimensions';
// // import MyButton from '../components/CustomButton';
// // import ToastMessage from '../hooks/ToastMessage';
// // import {launchImageLibrary} from 'react-native-image-picker';
// // import TextInputDropdown from '../components/Dropdown';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import {useCompleteProfileMutation} from '../store/Api/Auth';
// // import {updateUserProfile} from '../store/slices/Auth';

// // const CompleteProfile = () => {
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [address, setAddress] = useState({
// //     street: '',
// //     city: '',
// //     state: '',
// //     country: '',
// //     zipcode: '',
// //   });
// //   const [gender, setGender] = useState('');
// //   const [semester, setSemester] = useState('');
// //   const [department, setDepartment] = useState('');
// //   const [bio, setBio] = useState('');
// //   const [dateOfBirth, setDateOfBirth] = useState('');
// //   const [profileImage, setProfileImage] = useState(null);
// //   const [studentCardImage, setStudentCardImage] = useState(null);
// //   const {Toasts} = ToastMessage();
// //   const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
// //   const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);
// //   const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const [completeProfile, {data, isLoading, error}] =
// //     useCompleteProfileMutation();

// //   const requestGalleryPermission = async () => {
// //     if (Platform.OS === 'android') {
// //       const granted = await PermissionsAndroid.request(
// //         PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
// //         {
// //           title: 'Gallery Permission',
// //           message: 'App needs access to your photos to upload images',
// //           buttonNeutral: 'Ask Me Later',
// //           buttonNegative: 'Cancel',
// //           buttonPositive: 'OK',
// //         },
// //       );
// //       return granted === PermissionsAndroid.RESULTS.GRANTED;
// //     }
// //     return true;
// //   };

// //   const handleImagePick = async setter => {
// //     const hasPermission = await requestGalleryPermission();
// //     if (!hasPermission) {
// //       Toasts('Error', 'Permission denied to access gallery', 'error', 2000);
// //       return;
// //     }

// //     launchImageLibrary({mediaType: 'photo'}, response => {
// //       if (
// //         !response.didCancel &&
// //         response.assets &&
// //         response.assets.length > 0
// //       ) {
// //         setter(response.assets[0]);
// //       }
// //     });
// //   };

// //   const handleSubmit = async () => {
// //     if (!phoneNumber || !gender || !semester || !department || !dateOfBirth) {
// //       return Toasts('Error', 'Please fill all required fields', 'error', 2000);
// //     }

// //     const formData = new FormData();
// //     formData.append('phoneNumber', phoneNumber);
// //     formData.append('gender', gender);
// //     formData.append('semester', semester);
// //     formData.append('department', department);
// //     formData.append('bio', bio);
// //     formData.append('dateOfBirth', dateOfBirth);
// //     formData.append('address', JSON.stringify(address));
// //     if (profileImage) {
// //       formData.append('profileImage', {
// //         uri: profileImage.uri,
// //         type: profileImage.type,
// //         name: profileImage.fileName,
// //       });
// //     }
// //     if (studentCardImage) {
// //       formData.append('studentCardImage', {
// //         uri: studentCardImage.uri,
// //         type: studentCardImage.type,
// //         name: studentCardImage.fileName,
// //       });
// //     }

// //     try {
// //       const result = await completeProfile(formData).unwrap();
// //       dispatch(updateUserProfile(result.user));
// //       Toasts('Success', 'Profile Updated', 'success', 2000);
// //       // navigation.navigate('Dashboard'); // or wherever next
// //     } catch (err) {
// //       Toasts('Error', err?.data?.message || 'Update failed', 'error', 2000);
// //     }
// //   };

// //   return (
// //     <WrapperContainer>
// //       <KeyboardAvoidingView
// //         style={{flex: 1}}
// //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
// //         <ScrollView
// //           contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
// //           keyboardShouldPersistTaps="handled">
// //           <View style={styles.container}>
// //             <AuthHeader />
// //             <MyText
// //               textStyle={{textAlign: 'center'}}
// //               fontSize={responsiveFontSize(3)}
// //               fontWeight={'500'}
// //               color={Colors.black}
// //               text={'Complete Your Profile'}
// //             />

// //             <View style={styles.InputBox}>
// //               <MyTextInput
// //                 fieldName={'Phone Number'}
// //                 placeholder={'03xxxxxxxxx'}
// //                 value={phoneNumber}
// //                 onChangeText={text => setPhoneNumber(text)}
// //               />
// //               <MyTextInput
// //                 fieldName={'Street'}
// //                 placeholder={'Street'}
// //                 value={address.street}
// //                 onChangeText={text =>
// //                   setAddress(prev => ({...prev, street: text}))
// //                 }
// //               />
// //               <MyTextInput
// //                 fieldName={'City'}
// //                 placeholder={'City'}
// //                 value={address.city}
// //                 onChangeText={text =>
// //                   setAddress(prev => ({...prev, city: text}))
// //                 }
// //               />
// //               <MyTextInput
// //                 fieldName={'State'}
// //                 placeholder={'State'}
// //                 value={address.state}
// //                 onChangeText={text =>
// //                   setAddress(prev => ({...prev, state: text}))
// //                 }
// //               />
// //               <MyTextInput
// //                 fieldName={'Country'}
// //                 placeholder={'Country'}
// //                 value={address.country}
// //                 onChangeText={text =>
// //                   setAddress(prev => ({...prev, country: text}))
// //                 }
// //               />
// //               <MyTextInput
// //                 fieldName={'Zipcode'}
// //                 placeholder={'Zipcode'}
// //                 value={address.zipcode}
// //                 onChangeText={text =>
// //                   setAddress(prev => ({...prev, zipcode: text}))
// //                 }
// //               />

// //               <MyText
// //                 text={'Gender'}
// //                 fontWeight="500"
// //                 fontSize={responsiveFontSize(2)}
// //                 textStyle={{marginTop: responsiveHeight(1)}}
// //               />
// //               <TextInputDropdown
// //                 defaultValue={gender}
// //                 data={['Male', 'Female', 'Other']}
// //                 onSelect={setGender}
// //                 isOpen={genderDropdownOpen}
// //                 onToggle={() => setGenderDropdownOpen(!genderDropdownOpen)}
// //               />

// //               <MyText
// //                 text={'Semester'}
// //                 fontWeight="500"
// //                 fontSize={responsiveFontSize(2)}
// //                 textStyle={{marginTop: responsiveHeight(1)}}
// //               />
// //               <TextInputDropdown
// //                 defaultValue={semester}
// //                 data={['1', '2', '3', '4', '5', '6', '7', '8']}
// //                 onSelect={setSemester}
// //                 isOpen={semesterDropdownOpen}
// //                 onToggle={() => setSemesterDropdownOpen(!semesterDropdownOpen)}
// //               />

// //               <MyText
// //                 text={'Department'}
// //                 fontWeight="500"
// //                 fontSize={responsiveFontSize(2)}
// //                 textStyle={{marginTop: responsiveHeight(1)}}
// //               />
// //               <TextInputDropdown
// //                 defaultValue={department}
// //                 data={['BSCS', 'BBA']}
// //                 onSelect={setDepartment}
// //                 isOpen={departmentDropdownOpen}
// //                 onToggle={() =>
// //                   setDepartmentDropdownOpen(!departmentDropdownOpen)
// //                 }
// //               />

// //               <TouchableOpacity onPress={() => setShowDatePicker(true)}>
// //                 <MyTextInput
// //                   fieldName={'Date of Birth'}
// //                   placeholder={'YYYY-MM-DD'}
// //                   value={dateOfBirth}
// //                   editable={false}
// //                 />
// //               </TouchableOpacity>
// //               {showDatePicker && (
// //                 <DateTimePicker
// //                   value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
// //                   mode="date"
// //                   display="default"
// //                   maximumDate={new Date()}
// //                   onChange={(event, selectedDate) => {
// //                     setShowDatePicker(false);
// //                     if (selectedDate) {
// //                       const formatted = selectedDate
// //                         .toISOString()
// //                         .split('T')[0]; // YYYY-MM-DD
// //                       setDateOfBirth(formatted);
// //                     }
// //                   }}
// //                 />
// //               )}

// //               <MyTextInput
// //                 fieldName={'Bio'}
// //                 placeholder={'Tell us about yourself'}
// //                 value={bio}
// //                 onChangeText={text => setBio(text)}
// //                 multiline
// //               />
// //               {profileImage && (
// //                 <Image
// //                   source={{uri: profileImage.uri}}
// //                   style={styles.imagePreview}
// //                 />
// //               )}
// //               <TouchableOpacity
// //                 style={styles.ProfileuploadBtn}
// //                 onPress={() => handleImagePick(setProfileImage)}>
// //                 <MyText
// //                   color={Colors.white}
// //                   text={
// //                     profileImage
// //                       ? 'Change Profile Image'
// //                       : 'Upload Profile Image'
// //                   }
// //                 />
// //               </TouchableOpacity>
// //               {studentCardImage && (
// //                 <Image
// //                   source={{uri: studentCardImage.uri}}
// //                   style={styles.imagePreview}
// //                 />
// //               )}
// //               <TouchableOpacity
// //                 style={styles.CarduploadBtn}
// //                 onPress={() => handleImagePick(setStudentCardImage)}>
// //                 <MyText
// //                   color={Colors.white}
// //                   text={
// //                     studentCardImage
// //                       ? 'Change Student Card Image'
// //                       : 'Upload Student Card Image'
// //                   }
// //                 />
// //               </TouchableOpacity>
// //             </View>

// //             <MyButton
// //               text="Submit"
// //               backgroundColor={Colors.primary}
// //               textColor={Colors.white}
// //               onPress={handleSubmit}
// //               textstyle={{
// //                 fontSize: responsiveFontSize(2.5),
// //                 width: responsiveWidth(90),
// //               }}
// //             />
// //           </View>
// //         </ScrollView>
// //       </KeyboardAvoidingView>
// //     </WrapperContainer>
// //   );
// // };

// // export default CompleteProfile;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'space-around',
// //     alignItems: 'center',
// //     paddingVertical: responsiveHeight(5),
// //   },
// //   InputBox: {
// //     width: responsiveWidth(90),
// //     alignSelf: 'center',
// //     gap: responsiveHeight(1),
// //   },
// //   ProfileuploadBtn: {
// //     backgroundColor: Colors.primary,
// //     padding: responsiveHeight(1.5),
// //     borderRadius: responsiveWidth(2),
// //     alignItems: 'center',
// //     marginTop: responsiveHeight(9),
// //   },
// //   CarduploadBtn: {
// //     backgroundColor: Colors.primary,
// //     padding: responsiveHeight(1.5),
// //     borderRadius: responsiveWidth(2),
// //     alignItems: 'center',
// //     marginBottom: responsiveHeight(1),
// //   },
// //   imagePreview: {
// //     width: responsiveWidth(50),
// //     height: responsiveHeight(20),
// //     resizeMode: 'cover',
// //     alignSelf: 'center',
// //     borderRadius: responsiveWidth(2),
// //   },
// // });

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

// import MyText from '../components/textcomponent';
// import Colors from '../styles/Colors';
// import MyTextInput from '../components/TextInputComponent';
// import WrapperContainer from '../components/WrapperContainer';
// import AuthHeader from '../components/AuthHeader';
// import MyButton from '../components/CustomButton';
// import TextInputDropdown from '../components/Dropdown';
// import ToastMessage from '../hooks/ToastMessage';
// import {useCompleteProfileMutation} from '../store/Api/Auth';
// import {updateUserProfile} from '../store/slices/Auth';

// const CompleteProfile = () => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [address, setAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     country: '',
//     zipcode: '',
//   });
//   const [gender, setGender] = useState('');
//   const [semester, setSemester] = useState('');
//   const [department, setDepartment] = useState('');
//   const [bio, setBio] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [profileImage, setProfileImage] = useState(null);
//   const [studentCardImage, setStudentCardImage] = useState(null);
//   const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
//   const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);
//   const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const {Toasts} = ToastMessage();
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [completeProfile, {isLoading}] = useCompleteProfileMutation();

//   const requestGalleryPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
//         {
//           title: 'Gallery Permission',
//           message: 'App needs access to your photos',
//           buttonPositive: 'OK',
//         },
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
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

//   const handleSubmit = async () => {
//     if (
//       !phoneNumber ||
//       !gender ||
//       !semester ||
//       !department ||
//       !dateOfBirth ||
//       !bio === '' ||
//       !address.street ||
//       !address.city ||
//       !address.state ||
//       !address.country ||
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
//         name: profileImage.fileName,
//       });
//     }

//     if (studentCardImage) {
//       formData.append('studentCardImage', {
//         uri: studentCardImage.uri,
//         type: studentCardImage.type,
//         name: studentCardImage.fileName,
//       });
//     }

//     try {
//       const result = await completeProfile(formData).unwrap();
//       console.log('Profile update result:', result);
//       dispatch(updateUserProfile(result.user)); // Save updated user data
//       Toasts('Success', 'Profile Updated', 'success', 2000);
//       // navigation.reset({index: 0, routes: [{name: 'StackRoute'}]}); // Navigate to main app
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
//                 fieldName="Street"
//                 value={address.street}
//                 onChangeText={text => setAddress({...address, street: text})}
//               />
//               <MyTextInput
//                 placeholder={'City'}
//                 fieldName="City"
//                 value={address.city}
//                 onChangeText={text => setAddress({...address, city: text})}
//               />
//               <MyTextInput
//                 placeholder={'State'}
//                 fieldName="State"
//                 value={address.state}
//                 onChangeText={text => setAddress({...address, state: text})}
//               />
//               <MyTextInput
//                 placeholder={'Country'}
//                 fieldName="Country"
//                 value={address.country}
//                 onChangeText={text => setAddress({...address, country: text})}
//               />
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
//               />
//               <TextInputDropdown
//                 defaultValue={gender}
//                 data={['Male', 'Female', 'Other']}
//                 onSelect={setGender}
//                 isOpen={genderDropdownOpen}
//                 onToggle={() => setGenderDropdownOpen(!genderDropdownOpen)}
//               />

//               <MyText
//                 text="Semester"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2)}
//               />
//               <TextInputDropdown
//                 defaultValue={semester}
//                 data={['1', '2', '3', '4', '5', '6', '7', '8']}
//                 onSelect={setSemester}
//                 isOpen={semesterDropdownOpen}
//                 onToggle={() => setSemesterDropdownOpen(!semesterDropdownOpen)}
//               />

//               <MyText
//                 text="Department"
//                 fontWeight="500"
//                 fontSize={responsiveFontSize(2)}
//               />
//               <TextInputDropdown
//                 defaultValue={department}
//                 data={['BSCS', 'BBA']}
//                 onSelect={setDepartment}
//                 isOpen={departmentDropdownOpen}
//                 onToggle={() =>
//                   setDepartmentDropdownOpen(!departmentDropdownOpen)
//                 }
//               />

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
//                 value={bio}
//                 onChangeText={setBio}
//                 multiline
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

//             <MyButton
//               text="Submit"
//               backgroundColor={Colors.primary}
//               textColor={Colors.white}
//               onPress={handleSubmit}
//               textstyle={{
//                 fontSize: responsiveFontSize(2.5),
//                 width: responsiveWidth(90),
//               }}
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
// });

import React, {useState} from 'react';
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

import MyText from '../components/textcomponent';
import Colors from '../styles/Colors';
import MyTextInput from '../components/TextInputComponent';
import WrapperContainer from '../components/WrapperContainer';
import AuthHeader from '../components/AuthHeader';
import MyButton from '../components/CustomButton';
import TextInputDropdown from '../components/Dropdown';
import ToastMessage from '../hooks/ToastMessage';
import {useCompleteProfileMutation} from '../store/Api/Auth';
import {updateUserProfile} from '../store/slices/Auth';

const CompleteProfile = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zipcode: '',
  });
  const [gender, setGender] = useState('');
  const [semester, setSemester] = useState('');
  const [department, setDepartment] = useState('');
  const [bio, setBio] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [studentCardImage, setStudentCardImage] = useState(null);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [semesterDropdownOpen, setSemesterDropdownOpen] = useState(false);
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {Toasts} = ToastMessage();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [completeProfile, {isLoading}] = useCompleteProfileMutation();

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Gallery Permission',
          message: 'App needs access to your photos',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleImagePick = async setter => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Toasts('Error', 'Permission denied to access gallery', 'error', 2000);
      return;
    }

    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response?.assets?.length) {
        setter(response.assets[0]);
      }
    });
  };

  const handleSubmit = async () => {
    if (
      !phoneNumber ||
      !gender ||
      !semester ||
      !department ||
      !dateOfBirth ||
      !bio ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.zipcode
    ) {
      return Toasts('Error', 'Please fill all required fields', 'error', 2000);
    }

    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('gender', gender);
    formData.append('semester', semester);
    formData.append('department', department);
    formData.append('bio', bio);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('address', JSON.stringify(address));

    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: profileImage.type,
        name: profileImage.fileName || `profile_${Date.now()}.jpg`,
      });
    }

    if (studentCardImage) {
      formData.append('studentCardImage', {
        uri: studentCardImage.uri,
        type: studentCardImage.type,
        name: studentCardImage.fileName || `studentCard_${Date.now()}.jpg`,
      });
    }

    try {
      const result = await completeProfile(formData).unwrap();
      console.log('Profile update result:', result);
      dispatch(updateUserProfile(result.user)); // Save updated user data
      Toasts('Success', 'Profile Updated', 'success', 2000);
      // navigation.reset({ index: 0, routes: [{ name: 'StackRoute' }] }); // Navigate to main app
    } catch (err) {
      Toasts('Error', err?.data?.message || 'Update failed', 'error', 2000);
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
            <View style={styles.InputBox}>
              <MyTextInput
                fieldName="Phone Number"
                placeholder="03xxxxxxxxx"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <MyTextInput
                placeholder={'Street Address'}
                fieldName="Street Address"
                value={address.street}
                onChangeText={text => setAddress({...address, street: text})}
              />
              <MyTextInput
                placeholder={'City'}
                fieldName="City"
                value={address.city}
                onChangeText={text => setAddress({...address, city: text})}
              />
              <MyTextInput
                placeholder={'State'}
                fieldName="State"
                value={address.state}
                onChangeText={text => setAddress({...address, state: text})}
              />
              <MyTextInput
                placeholder={'Country'}
                fieldName="Country"
                value={address.country}
                onChangeText={text => setAddress({...address, country: text})}
              />
              <MyTextInput
                placeholder={'Zipcode'}
                fieldName="Zipcode"
                value={address.zipcode}
                onChangeText={text => setAddress({...address, zipcode: text})}
              />

              <MyText
                text="Gender"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
              />
              <TextInputDropdown
                defaultValue={gender}
                data={['Male', 'Female', 'Other']}
                onSelect={setGender}
                isOpen={genderDropdownOpen}
                onToggle={() => setGenderDropdownOpen(!genderDropdownOpen)}
              />

              <MyText
                text="Semester"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
              />
              <TextInputDropdown
                defaultValue={semester}
                data={['1', '2', '3', '4', '5', '6', '7', '8']}
                onSelect={setSemester}
                isOpen={semesterDropdownOpen}
                onToggle={() => setSemesterDropdownOpen(!semesterDropdownOpen)}
              />

              <MyText
                text="Department"
                fontWeight="500"
                fontSize={responsiveFontSize(2)}
              />
              <TextInputDropdown
                defaultValue={department}
                data={['BSCS', 'BBA']}
                onSelect={setDepartment}
                isOpen={departmentDropdownOpen}
                onToggle={() =>
                  setDepartmentDropdownOpen(!departmentDropdownOpen)
                }
              />

              <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <MyTextInput
                  fieldName="Date of Birth"
                  value={dateOfBirth}
                  placeholder="YYYY-MM-DD"
                  editable={false}
                />
              </TouchableOpacity>
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
                      setDateOfBirth(formatted);
                    }
                  }}
                />
              )}

              <MyTextInput
                fieldName="Bio"
                value={bio}
                onChangeText={setBio}
                multiline
              />

              {profileImage && (
                <Image
                  source={{uri: profileImage.uri}}
                  style={styles.imagePreview}
                />
              )}
              <TouchableOpacity
                style={styles.ProfileuploadBtn}
                onPress={() => handleImagePick(setProfileImage)}>
                <MyText
                  color={Colors.white}
                  text={
                    profileImage
                      ? 'Change Profile Image'
                      : 'Upload Profile Image'
                  }
                />
              </TouchableOpacity>

              {studentCardImage && (
                <Image
                  source={{uri: studentCardImage.uri}}
                  style={[
                    styles.imagePreview,
                    {marginTop: responsiveHeight(2)},
                  ]}
                />
              )}
              <TouchableOpacity
                style={styles.CarduploadBtn}
                onPress={() => handleImagePick(setStudentCardImage)}>
                <MyText
                  color={Colors.white}
                  text={
                    studentCardImage
                      ? 'Change Student Card Image'
                      : 'Upload Student Card Image'
                  }
                />
              </TouchableOpacity>
            </View>

            <MyButton
              text={isLoading ? '' : 'Submit'} // Hide text when loading
              backgroundColor={Colors.primary}
              textColor={Colors.white}
              onPress={handleSubmit}
              disabled={isLoading} // Disable button during loading
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
    marginTop: responsiveHeight(10),
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
    marginTop: responsiveHeight(10),
  },
});
