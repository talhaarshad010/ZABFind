// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   StatusBar, // import is optional now, just for safety
// } from 'react-native';
// import React, {useState} from 'react';
// import MyText from '../components/textcomponent';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Colors from '../styles/Colors';
// import MyTextInput from '../components/TextInputComponent';
// import WrapperContainer from '../components/WrapperContainer';
// import AuthHeader from '../components/AuthHeader';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import MyButton from '../components/CustomButton';
// import {useNavigation} from '@react-navigation/native';

// const ConfirmPassword = () => {
//   const [rememberMe, setRememberMe] = useState(false);
//   const toggleRemember = () => setRememberMe(!rememberMe);
//   const navigation = useNavigation();

//   return (
//     <WrapperContainer>
//       {/* Remove or hide the StatusBar */}

//       <KeyboardAvoidingView
//         style={{flex: 1}}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//         <ScrollView
//           contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
//           keyboardShouldPersistTaps="handled">
//           <View style={styles.container}>
//             <View style={{marginTop: responsiveHeight(4)}}>
//               <AuthHeader />
//               <View style={{marginVertical: responsiveHeight(4)}}>
//                 <MyText
//                   textStyle={{textAlign: 'center'}}
//                   fontSize={responsiveFontSize(3.5)}
//                   fontWeight={'500'}
//                   color={Colors.black}
//                   text={'Confirm Password'}
//                 />
//                 <MyText
//                   textStyle={{textAlign: 'center'}}
//                   fontSize={responsiveFontSize(2)}
//                   color={Colors.gray}
//                   text={'Enter your new password to continue'}
//                 />
//               </View>
//             </View>

//             <View style={styles.InputBox}>
//               <MyTextInput
//                 fieldName={'New Password'}
//                 placeholder={'Enter your New password'}
//                 RightView={true}
//               />
//               <MyTextInput
//                 fieldName={'Confirm New Password'}
//                 placeholder={'Enter your Confirm password'}
//                 RightView={true}
//               />
//               <View style={{marginTop: responsiveHeight(2)}}>
//                 <MyButton
//                   text="Confirm Password"
//                   backgroundColor={Colors.primary}
//                   textColor={Colors.white}
//                   fontWeight="50"
//                   textstyle={{
//                     fontSize: responsiveFontSize(3),
//                     width: responsiveWidth(90),
//                   }}
//                   onPress={() => {
//                     navigation.navigate('LogIn');
//                   }}
//                 />
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </WrapperContainer>
//   );
// };

// export default ConfirmPassword;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: responsiveHeight(5),
//   },
//   InputBox: {
//     width: responsiveWidth(90),
//     alignSelf: 'center',
//     gap: responsiveHeight(0.5),
//   },
//   RememberAndForget: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: responsiveWidth(90),
//     alignSelf: 'center',
//     marginVertical: responsiveHeight(2),
//   },
//   RememberBox: {
//     height: responsiveHeight(2.5),
//     width: responsiveHeight(2.5),
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: Colors.primary,
//     borderWidth: responsiveWidth(0.3),
//     borderRadius: responsiveWidth(1),
//   },
// });

// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import React, {useState} from 'react';
// import MyText from '../components/textcomponent';
// import Colors from '../styles/Colors';
// import MyTextInput from '../components/TextInputComponent';
// import WrapperContainer from '../components/WrapperContainer';
// import AuthHeader from '../components/AuthHeader';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import MyButton from '../components/CustomButton';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {useResetPasswordMutation} from '../store/Api/Auth';
// import ToastMessage from '../hooks/ToastMessage';

// const ConfirmPassword = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {email, otp} = route.params || {};
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const {Toasts} = ToastMessage();

//   console.log('Email from route params:', email, 'OTP from route params:', otp);

//   // RTK Query mutation hook
//   const [resetPassword, {isLoading}] = useResetPasswordMutation();

//   const handleResetPassword = async () => {
//     // Validate inputs
//     if (!newPassword.trim() || !confirmPassword.trim()) {
//       Toasts('Error', 'Please fill in both password fields', 'error', 2000);
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       Toasts('Error', 'Passwords do not match', 'error', 2000);
//       return;
//     }
//     if (newPassword.length < 8) {
//       Toasts('Error', 'Password must be at least 8 characters', 'error', 2000);
//       return;
//     }

//     try {
//       await resetPassword({email, otp, newPassword}).unwrap();
//       Toasts('Success', 'Password reset successful', 'success', 2000);
//       navigation.navigate('LogIn');
//     } catch (err) {
//       console.error('Reset Password Error:', err);
//       Toasts(
//         'Error',
//         err?.data?.message || 'Failed to reset password. Please try again.',
//         'error',
//         2000,
//       );
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
//             <View style={{marginTop: responsiveHeight(4)}}>
//               <AuthHeader />
//               <View style={{marginVertical: responsiveHeight(4)}}>
//                 <MyText
//                   textStyle={{textAlign: 'center'}}
//                   fontSize={responsiveFontSize(3.5)}
//                   fontWeight={'500'}
//                   color={Colors.black}
//                   text={'Confirm Password'}
//                 />
//                 <MyText
//                   textStyle={{textAlign: 'center'}}
//                   fontSize={responsiveFontSize(2)}
//                   color={Colors.gray}
//                   text={'Enter your new password to continue'}
//                 />
//               </View>
//             </View>

//             <View style={styles.InputBox}>
//               <MyTextInput
//                 fieldName={'New Password'}
//                 placeholder={'Enter your new password'}
//                 value={newPassword}
//                 onChangeText={setNewPassword}
//                 secureTextEntry={true}
//                 RightView={true}
//               />
//               <MyTextInput
//                 fieldName={'Confirm New Password'}
//                 placeholder={'Confirm your new password'}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//                 secureTextEntry={true}
//                 RightView={true}
//               />
//               <View style={{marginTop: responsiveHeight(2)}}>
//                 <MyButton
//                   text={isLoading ? 'Resetting...' : 'Confirm Password'}
//                   backgroundColor={Colors.primary}
//                   textColor={Colors.white}
//                   fontWeight="500"
//                   textstyle={{
//                     fontSize: responsiveFontSize(3),
//                     width: responsiveWidth(90),
//                   }}
//                   onPress={handleResetPassword}
//                   disabled={isLoading}
//                 />
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </WrapperContainer>
//   );
// };

// export default ConfirmPassword;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: responsiveHeight(5),
//   },
//   InputBox: {
//     width: responsiveWidth(90),
//     alignSelf: 'center',
//     gap: responsiveHeight(0.5),
//   },
// });

import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MyText from '../components/textcomponent';
import Colors from '../styles/Colors';
import MyTextInput from '../components/TextInputComponent';
import WrapperContainer from '../components/WrapperContainer';
import AuthHeader from '../components/AuthHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MyButton from '../components/CustomButton';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useResetPasswordMutation} from '../store/Api/Auth';
import ToastMessage from '../hooks/ToastMessage';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .trim()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ConfirmPassword = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email, otp} = route.params || {};
  const [apiError, setApiError] = useState(''); // State for API errors
  const {Toasts} = ToastMessage();

  // RTK Query mutation hook
  const [resetPassword, {isLoading}] = useResetPasswordMutation();

  console.log('Email from route params:', email, 'OTP from route params:', otp);

  const handleResetPassword = async (values, {resetForm}) => {
    // Dismiss keyboard before API call
    Keyboard.dismiss();
    setApiError(''); // Clear previous API errors

    try {
      await resetPassword({
        email,
        otp,
        newPassword: values.newPassword.trim(),
      }).unwrap();
      Toasts('Success', 'Password reset successful', 'success', 2000); // Success toast
      resetForm(); // Clear form on success
      navigation.navigate('LogIn');
    } catch (err) {
      console.error('Reset Password Error:', err);
      setApiError(
        err?.data?.message || 'Failed to reset password. Please try again.',
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
            <View style={{marginTop: responsiveHeight(4)}}>
              <AuthHeader />
              <View style={{marginVertical: responsiveHeight(4)}}>
                <MyText
                  textStyle={{textAlign: 'center'}}
                  fontSize={responsiveFontSize(3.5)}
                  fontWeight={'500'}
                  color={Colors.black}
                  text={'Confirm Password'}
                />
                <MyText
                  textStyle={{textAlign: 'center'}}
                  fontSize={responsiveFontSize(2)}
                  color={Colors.gray}
                  text={'Enter your new password to continue'}
                />
              </View>
            </View>

            <Formik
              initialValues={{newPassword: '', confirmPassword: ''}}
              validationSchema={validationSchema}
              onSubmit={handleResetPassword}>
              {({handleSubmit, values, setFieldValue, errors, touched}) => (
                <View style={styles.InputBox}>
                  <MyTextInput
                    fieldName={'New Password'}
                    placeholder={'Enter your new password'}
                    value={values.newPassword}
                    onChangeText={text => setFieldValue('newPassword', text)}
                    secureTextEntry={true}
                    RightView={true}
                    returnKeyType="next"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
                    error={touched.newPassword && errors.newPassword}
                  />
                  {touched.newPassword && errors.newPassword && (
                    <MyText
                      color={Colors.red}
                      fontSize={responsiveFontSize(1.7)}
                      text={errors.newPassword}
                      textStyle={styles.errorText}
                    />
                  )}

                  <MyTextInput
                    fieldName={'Confirm New Password'}
                    placeholder={'Confirm your new password'}
                    value={values.confirmPassword}
                    onChangeText={text =>
                      setFieldValue('confirmPassword', text)
                    }
                    secureTextEntry={true}
                    RightView={true}
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={handleSubmit}
                    error={touched.confirmPassword && errors.confirmPassword}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <MyText
                      color={Colors.red}
                      fontSize={responsiveFontSize(1.7)}
                      text={errors.confirmPassword}
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

                  <View style={{marginTop: responsiveHeight(2)}}>
                    <MyButton
                      text={isLoading ? 'Resetting...' : 'Confirm Password'}
                      backgroundColor={Colors.primary}
                      textColor={Colors.white}
                      fontWeight="500"
                      textstyle={{
                        fontSize: responsiveFontSize(3),
                        width: responsiveWidth(90),
                      }}
                      onPress={handleSubmit}
                      disabled={
                        isLoading ||
                        !values.newPassword ||
                        !values.confirmPassword ||
                        errors.newPassword ||
                        errors.confirmPassword
                      }
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
};

export default ConfirmPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: responsiveHeight(5),
  },
  InputBox: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    gap: responsiveHeight(0.5),
  },
  errorText: {
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(0.5),
  },
});
