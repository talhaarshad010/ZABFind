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
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const ForgetPassword = () => {
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
//                   text={'Forget Password'}
//                 />
//                 <MyText
//                   textStyle={{textAlign: 'center'}}
//                   fontSize={responsiveFontSize(2)}
//                   color={Colors.gray}
//                   text={'No worries, we will help you recover your password.'}
//                 />
//               </View>
//             </View>

//             <View style={styles.InputBox}>
//               <MyTextInput
//                 fieldName={'Email Address'}
//                 placeholder={'your@email.com'}
//               />

//               <View style={{marginTop: responsiveHeight(2)}}>
//                 <MyButton
//                   text="Send Reset Instructions"
//                   backgroundColor={Colors.primary}
//                   textColor={Colors.white}
//                   fontWeight="500 "
//                   textstyle={{
//                     fontSize: responsiveFontSize(3),
//                     width: responsiveWidth(90),
//                   }}
//                   onPress={() => {
//                     navigation.navigate('Otp');
//                   }}
//                 />
//                 <TouchableOpacity
//                   onPress={() => {
//                     navigation.navigate('LogIn');
//                   }}
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: responsiveWidth(2),
//                   }}>
//                   <Ionicons
//                     size={25}
//                     color={Colors.primary}
//                     name={'arrow-back'}
//                   />
//                   <MyText
//                     color={Colors.primary}
//                     fontSize={responsiveFontSize(2)}
//                     textStyle={{
//                       textAlign: 'center',
//                       marginVertical: responsiveHeight(2),
//                     }}
//                     text={'Back to login'}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </WrapperContainer>
//   );
// };

// export default ForgetPassword;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'space-around',
//     alignItems: 'center',
//     paddingVertical: responsiveHeight(5),
//     // width: responsiveWidth(90),
//     // justifyContent: 'center',
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
//   Text,
//   TouchableOpacity,
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
// import {useNavigation} from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useForgotPasswordMutation} from '../store/Api/Auth';

// const ForgetPassword = () => {
//   const [email, setEmail] = useState('');
//   const navigation = useNavigation();

//   // RTK Query mutation hook
//   const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

//   const handleSendOTP = async () => {
//     if (!email.trim()) {
//       alert('Please enter your email address');
//       return;
//     }
//     console.log('email', email);

//     try {
//       await forgotPassword(email).unwrap();
//       alert('OTP sent to your email!');
//       navigation.navigate('Otp', {email}); // Pass email for OTP verification screen
//     } catch (err) {
//       console.error(err);
//       alert('Failed to send OTP. Please try again.');
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
//                   text={'Forget Password'}
//                 />
//                 <MyText
//                   textStyle={{textAlign: 'center'}}
//                   fontSize={responsiveFontSize(2)}
//                   color={Colors.gray}
//                   text={'No worries, we will help you recover your password.'}
//                 />
//               </View>
//             </View>

//             <View style={styles.InputBox}>
//               <MyTextInput
//                 fieldName={'Email Address'}
//                 placeholder={'your@email.com'}
//                 value={email}
//                 onChangeText={text => setEmail(text)} // Bind to state
//               />

//               <View style={{marginTop: responsiveHeight(2)}}>
//                 <MyButton
//                   text={isLoading ? 'Sending...' : 'Send Reset Instructions'}
//                   backgroundColor={Colors.primary}
//                   textColor={Colors.white}
//                   fontWeight="500"
//                   textstyle={{
//                     fontSize: responsiveFontSize(3),
//                     width: responsiveWidth(90),
//                   }}
//                   onPress={handleSendOTP}
//                   disabled={isLoading}
//                 />

//                 <TouchableOpacity
//                   onPress={() => {
//                     navigation.navigate('LogIn');
//                   }}
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: responsiveWidth(2),
//                   }}>
//                   <Ionicons
//                     size={25}
//                     color={Colors.primary}
//                     name={'arrow-back'}
//                   />
//                   <MyText
//                     color={Colors.primary}
//                     fontSize={responsiveFontSize(2)}
//                     textStyle={{
//                       textAlign: 'center',
//                       marginVertical: responsiveHeight(2),
//                     }}
//                     text={'Back to login'}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </WrapperContainer>
//   );
// };

// export default ForgetPassword;

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

// import {
//   StyleSheet,
//   TouchableOpacity,
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
// import {useNavigation} from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useForgotPasswordMutation} from '../store/Api/Auth';
// import ToastMessage from '../hooks/ToastMessage';

// const ForgetPassword = () => {
//   const [email, setEmail] = useState('');
//   const navigation = useNavigation();
//   const {Toasts} = ToastMessage();

//   // RTK Query mutation hook
//   const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

//   const handleSendOTP = async () => {
//     if (!email.trim()) {
//       Toasts('Error', 'Please enter your email address', 'error', 2000);
//       return;
//     }
//     console.log('email', email);

//     try {
//       await forgotPassword(email).unwrap();
//       Toasts('Success', 'OTP sent to your email!', 'success', 2000);
//       navigation.navigate('Otp', {email});
//     } catch (err) {
//       console.error(err);
//       Toasts(
//         'Error',
//         err?.data?.message || 'Failed to send OTP. Please try again.',
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
//                   text={'Forget Password'}
//                 />
//                 <MyText
//                   textStyle={{textAlign: 'center'}}
//                   fontSize={responsiveFontSize(2)}
//                   color={Colors.gray}
//                   text={'No worries, we will help you recover your password.'}
//                 />
//               </View>
//             </View>

//             <View style={styles.InputBox}>
//               <MyTextInput
//                 fieldName={'Email Address'}
//                 placeholder={'your@email.com'}
//                 value={email}
//                 onChangeText={text => setEmail(text)}
//               />

//               <View style={{marginTop: responsiveHeight(2)}}>
//                 <MyButton
//                   text={isLoading ? 'Sending...' : 'Send Reset Instructions'}
//                   backgroundColor={Colors.primary}
//                   textColor={Colors.white}
//                   fontWeight="500"
//                   textstyle={{
//                     fontSize: responsiveFontSize(3),
//                     width: responsiveWidth(90),
//                   }}
//                   onPress={handleSendOTP}
//                   disabled={isLoading}
//                 />

//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('LogIn')}
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: responsiveWidth(2),
//                   }}>
//                   <Ionicons
//                     size={25}
//                     color={Colors.primary}
//                     name={'arrow-back'}
//                   />
//                   <MyText
//                     color={Colors.primary}
//                     fontSize={responsiveFontSize(2)}
//                     textStyle={{
//                       textAlign: 'center',
//                       marginVertical: responsiveHeight(2),
//                     }}
//                     text={'Back to login'}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </WrapperContainer>
//   );
// };

// export default ForgetPassword;

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
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
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
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useForgotPasswordMutation} from '../store/Api/Auth';
import ToastMessage from '../hooks/ToastMessage';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Email Address is required')
    .email('Please enter a valid email address'),
});

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();
  const {Toasts} = ToastMessage();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSendOTP = async data => {
    try {
      await forgotPassword(data.email.trim()).unwrap();
      Toasts('Success', 'OTP sent to your email!', 'success', 2000);
      navigation.navigate('Otp', {email: data.email});
      reset();
    } catch (err) {
      console.error(err);
      Toasts(
        'Error',
        err?.data?.message || 'Failed to send OTP. Please try again.',
        'error',
        2000,
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
                  text={'Forget Password'}
                />
                <MyText
                  textStyle={{textAlign: 'center'}}
                  fontSize={responsiveFontSize(2)}
                  color={Colors.gray}
                  text={'No worries, we will help you recover your password.'}
                />
              </View>
            </View>

            <View style={styles.InputBox}>
              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value}}) => (
                  <MyTextInput
                    fieldName={'Email Address'}
                    placeholder={'your@email.com'}
                    value={value}
                    onChangeText={onChange}
                    returnKeyType="done"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={false}
                    error={errors.email?.message}
                  />
                )}
              />
              {errors.email && (
                <MyText
                  color={Colors.red}
                  fontSize={responsiveFontSize(1.7)}
                  text={errors.email.message}
                  textStyle={{marginLeft: responsiveWidth(2)}}
                />
              )}

              <View style={{marginTop: responsiveHeight(2)}}>
                <MyButton
                  text={isLoading ? 'Sending...' : 'Send Reset Instructions'}
                  backgroundColor={Colors.primary}
                  textColor={Colors.white}
                  fontWeight="500"
                  textstyle={{
                    fontSize: responsiveFontSize(3),
                    width: responsiveWidth(90),
                  }}
                  onPress={handleSubmit(handleSendOTP)}
                  disabled={isLoading}
                />

                <TouchableOpacity
                  onPress={() => navigation.navigate('LogIn')}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: responsiveWidth(2),
                  }}>
                  <Ionicons
                    size={25}
                    color={Colors.primary}
                    name={'arrow-back'}
                  />
                  <MyText
                    color={Colors.primary}
                    fontSize={responsiveFontSize(2)}
                    textStyle={{
                      textAlign: 'center',
                      marginVertical: responsiveHeight(2),
                    }}
                    text={'Back to login'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
};

export default ForgetPassword;

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
});
