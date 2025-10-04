// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import React from 'react';
// import MyText from '../components/textcomponent';
// import Colors from '../styles/Colors';
// import WrapperContainer from '../components/WrapperContainer';
// import AuthHeader from '../components/AuthHeader';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import {useNavigation} from '@react-navigation/native';
// import OTPTextInput from 'react-native-otp-textinput';
// import MyButton from '../components/CustomButton';

// const Otp = () => {
//   const navigation = useNavigation();
//   let otpInput = null;

//   const handleOTPChange = otp => {
//     console.log('Entered OTP:', otp);
//     // Optionally check if otp.length === 4 and then submit
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
//                   text={'OTP Verification'}
//                 />
//                 <MyText
//                   textStyle={{textAlign: 'center'}}
//                   fontSize={responsiveFontSize(2)}
//                   color={Colors.gray}
//                   text={
//                     'Please check your e-mail and enter the OTP sent to you.'
//                   }
//                 />
//               </View>
//             </View>

//             {/* OTP Input */}
//             <OTPTextInput
//               ref={e => (otpInput = e)}
//               inputCount={6}
//               tintColor={Colors.primary}
//               offTintColor={Colors.gray}
//               handleTextChange={handleOTPChange}
//               containerStyle={{marginVertical: responsiveHeight(2)}}
//               textInputStyle={{
//                 borderRadius: 5,
//                 borderWidth: 1,
//               }}
//             />

//             <MyButton
//               onPress={() => {
//                 navigation.navigate('ConfirmPassword');
//               }}
//               style={{
//                 width: responsiveWidth(90),
//                 marginVertical: responsiveHeight(2),
//               }}
//               backgroundColor={Colors.primary}
//               text="Verify"
//               textColor={Colors.white}
//             />
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </WrapperContainer>
//   );
// };

// export default Otp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: responsiveHeight(5),
//   },
// });

// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState} from 'react';
// import MyText from '../components/textcomponent';
// import Colors from '../styles/Colors';
// import WrapperContainer from '../components/WrapperContainer';
// import AuthHeader from '../components/AuthHeader';
// import {
//   responsiveFontSize,
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import OTPTextInput from 'react-native-otp-textinput';
// import MyButton from '../components/CustomButton';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {
//   useVerifyOtpMutation,
//   useForgotPasswordMutation,
// } from '../store/Api/Auth';
// import ToastMessage from '../hooks/ToastMessage';

// const Otp = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const {email} = route.params || {};
//   const [otp, setOtp] = useState('');
//   const {Toasts} = ToastMessage();

//   // RTK Query mutation hooks
//   const [verifyOtp, {isLoading: isLoadingVerify}] = useVerifyOtpMutation();
//   const [forgotPassword, {isLoading: isLoadingResend}] =
//     useForgotPasswordMutation();

//   const handleOTPChange = otpValue => {
//     setOtp(otpValue);
//     console.log('Entered OTP:', otpValue);
//   };

//   const handleVerify = async () => {
//     if (!otp.trim() || otp.length !== 6) {
//       Toasts('Error', 'Please enter a valid 6-digit OTP', 'error', 2000);
//       return;
//     }
//     console.log('Verifying OTP for email:', email, 'with OTP:', otp);

//     try {
//       await verifyOtp({email, otp}).unwrap();
//       Toasts('Success', 'OTP verified successfully', 'success', 2000);
//       navigation.navigate('ConfirmPassword', {email, otp});
//     } catch (err) {
//       console.error('Verify OTP Error:', err);
//       Toasts(
//         'Error',
//         err?.data?.message || 'Invalid or expired OTP',
//         'error',
//         2000,
//       );
//     }
//   };

//   const handleResendOTP = async () => {
//     if (!email) {
//       Toasts('Error', 'Email not found. Please try again.', 'error', 2000);
//       return;
//     }

//     try {
//       await forgotPassword(email).unwrap();
//       Toasts('Success', 'OTP resent to your email!', 'success', 2000);
//     } catch (err) {
//       console.error('Resend OTP Error:', err);
//       Toasts(
//         'Error',
//         err?.data?.message || 'Failed to resend OTP. Please try again.',
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
//                   text={'OTP Verification'}
//                 />
//                 <MyText
//                   textStyle={{textAlign: 'center'}}
//                   fontSize={responsiveFontSize(2)}
//                   color={Colors.gray}
//                   text={
//                     'Please check your email and enter the OTP sent to you.'
//                   }
//                 />
//               </View>
//             </View>

//             {/* OTP Input */}
//             <OTPTextInput
//               ref={e => (otpInput = e)}
//               inputCount={6}
//               tintColor={Colors.primary}
//               offTintColor={Colors.gray}
//               handleTextChange={handleOTPChange}
//               containerStyle={{marginVertical: responsiveHeight(2)}}
//               textInputStyle={{
//                 borderRadius: 5,
//                 borderWidth: 1,
//               }}
//             />

//             <MyButton
//               text={isLoadingVerify ? 'Verifying...' : 'Verify'}
//               backgroundColor={Colors.primary}
//               textColor={Colors.white}
//               fontWeight="500"
//               onPress={handleVerify}
//               disabled={isLoadingVerify}
//               style={{
//                 width: responsiveWidth(90),
//                 marginVertical: responsiveHeight(2),
//               }}
//             />

//             <TouchableOpacity
//               onPress={handleResendOTP}
//               disabled={isLoadingResend}
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 gap: responsiveWidth(2),
//               }}>
//               <Ionicons size={25} color={Colors.primary} name={'refresh'} />
//               <MyText
//                 color={Colors.primary}
//                 fontSize={responsiveFontSize(2)}
//                 textStyle={{
//                   textAlign: 'center',
//                   marginVertical: responsiveHeight(2),
//                 }}
//                 text={isLoadingResend ? 'Resending...' : 'Resend OTP'}
//               />
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </WrapperContainer>
//   );
// };

// export default Otp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: responsiveHeight(5),
//   },
// });
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MyText from '../components/textcomponent';
import Colors from '../styles/Colors';
import WrapperContainer from '../components/WrapperContainer';
import AuthHeader from '../components/AuthHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation, useRoute} from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import MyButton from '../components/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  useVerifyOtpMutation,
  useForgotPasswordMutation,
} from '../store/Api/Auth';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  otp: Yup.string()
    .trim()
    .required('OTP is required')
    .matches(/^\d{6}$/, 'OTP must be a 6-digit number'),
});

const Otp = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params || {};
  const otpInputRef = useRef(null);
  const [apiError, setApiError] = useState(''); // State for API errors

  // RTK Query mutation hooks
  const [verifyOtp, {isLoading: isLoadingVerify}] = useVerifyOtpMutation();
  const [forgotPassword, {isLoading: isLoadingResend}] =
    useForgotPasswordMutation();

  // Auto-focus the OTP input after a short delay to ensure mounting
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        otpInputRef.current &&
        typeof otpInputRef.current.focus === 'function'
      ) {
        otpInputRef.current.focus();
      }
    }, 100); // 100ms delay for component to fully mount
    return () => clearTimeout(timer);
  }, []);

  const handleVerify = async (values, {resetForm}) => {
    // Dismiss keyboard before API call
    Keyboard.dismiss();
    setApiError(''); // Clear previous API errors

    try {
      await verifyOtp({email, otp: values.otp}).unwrap();
      resetForm(); // Clear form on success
      navigation.navigate('ConfirmPassword', {email, otp: values.otp});
    } catch (err) {
      console.error('Verify OTP Error:', err);
      setApiError(err?.data?.message || 'Invalid or expired OTP');
    }
  };

  const handleResendOTP = async resetForm => {
    if (!email) {
      setApiError('Email not found. Please try again.');
      return;
    }

    // Dismiss keyboard before resend
    Keyboard.dismiss();
    setApiError(''); // Clear previous API errors

    try {
      await forgotPassword(email).unwrap();
      resetForm(); // Clear OTP field on successful resend
    } catch (err) {
      console.error('Resend OTP Error:', err);
      setApiError(
        err?.data?.message || 'Failed to resend OTP. Please try again.',
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
                  text={'OTP Verification'}
                />
                <MyText
                  textStyle={{textAlign: 'center'}}
                  fontSize={responsiveFontSize(2)}
                  color={Colors.gray}
                  text={
                    'Please check your email and enter the OTP sent to you.'
                  }
                />
              </View>
            </View>

            <Formik
              initialValues={{otp: ''}}
              validationSchema={validationSchema}
              onSubmit={handleVerify}>
              {({
                handleSubmit,
                values,
                setFieldValue,
                errors,
                touched,
                resetForm,
              }) => (
                <>
                  {/* OTP Input */}
                  <OTPTextInput
                    ref={otpInputRef}
                    inputCount={6}
                    tintColor={Colors.primary}
                    offTintColor={Colors.gray}
                    handleTextChange={otpValue => {
                      setFieldValue('otp', otpValue); // Sync with Formik
                      console.log('Entered OTP:', otpValue);
                    }}
                    containerStyle={styles.otpContainer}
                    textInputStyle={styles.otpInputStyle}
                    // Library handles paste natively (long-press on any box)
                  />

                  {/* Paste Hint */}
                  {/* <MyText
                    color={Colors.gray}
                    fontSize={responsiveFontSize(1.6)}
                    textStyle={styles.pasteHint}
                    text="Long-press any box to paste OTP"
                  /> */}

                  {/* Validation or API Error */}
                  {(touched.otp && errors.otp) || apiError ? (
                    <MyText
                      color={Colors.red}
                      fontSize={responsiveFontSize(1.7)}
                      text={errors.otp || apiError}
                      textStyle={styles.errorText}
                    />
                  ) : null}

                  <MyButton
                    text={isLoadingVerify ? 'Verifying...' : 'Verify OTP'}
                    backgroundColor={Colors.primary}
                    textColor={Colors.white}
                    fontWeight="500"
                    onPress={handleSubmit}
                    disabled={isLoadingVerify || !values.otp || errors.otp}
                    style={styles.verifyButton}
                  />

                  <TouchableOpacity
                    onPress={() => handleResendOTP(resetForm)}
                    disabled={isLoadingResend}
                    style={styles.resendContainer}>
                    <Ionicons
                      size={25}
                      color={Colors.primary}
                      name={'refresh'}
                    />
                    <MyText
                      color={Colors.primary}
                      fontSize={responsiveFontSize(2)}
                      textStyle={styles.resendText}
                      text={isLoadingResend ? 'Resending...' : 'Resend OTP'}
                    />
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: responsiveHeight(5),
  },
  otpContainer: {
    marginVertical: responsiveHeight(2),
  },
  otpInputStyle: {
    borderRadius: 5,
    borderWidth: 1,
    fontSize: responsiveFontSize(2.5),
    color: Colors.black,
  },
  pasteHint: {
    textAlign: 'center',
    marginBottom: responsiveHeight(1),
    opacity: 0.7,
    fontStyle: 'italic',
  },
  errorText: {
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(0.5),
  },
  verifyButton: {
    width: responsiveWidth(90),
    marginVertical: responsiveHeight(2),
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveWidth(2),
  },
  resendText: {
    textAlign: 'center',
    marginVertical: responsiveHeight(2),
  },
});
