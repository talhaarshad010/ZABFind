import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import MyText from '../components/textcomponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
import {useSignUpMutation} from '../store/Api/Auth';
import ToastMessage from '../hooks/ToastMessage';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .required('Full Name is required')
    .min(2, 'Full Name must be at least 2 characters'),
  email: Yup.string()
    .trim()
    .required('Email Address is required')
    .email('Please enter a valid email address'),
  studentId: Yup.string()
    .trim()
    .required('Student ID is required')
    .min(4, 'Student ID must be at least 4 characters'),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  agreeToTerms: Yup.boolean().oneOf(
    [true],
    'You must agree to the Terms of Service and Privacy Policy',
  ),
});

// const Signup = () => {
//   const navigation = useNavigation();
//   const {Toasts} = ToastMessage();
//   const [signUp, {isLoading}] = useSignUpMutation();

//   // Create refs for each input
//   const fullNameRef = useRef(null);
//   const emailRef = useRef(null);
//   const studentIdRef = useRef(null);
//   const passwordRef = useRef(null);
//   const confirmPasswordRef = useRef(null);

//   // Initialize useForm with Yup resolver
//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//     reset,
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//     defaultValues: {
//       fullName: '',
//       email: '',
//       studentId: '',
//       password: '',
//       confirmPassword: '',
//       agreeToTerms: false,
//     },
//   });

//   const onSubmit = async data => {
//     try {
//       const payload = {
//         fullName: data.fullName.trim(),
//         emailAddress: data.email.trim(),
//         studentId: data.studentId.trim(),
//         password: data.password.trim(),
//         confirmPassword: data.confirmPassword.trim(),
//       };

//       console.log('Signup payload:', payload);

//       const res = await signUp(payload).unwrap();

//       Toasts('Success', 'User Created Successfully', 'success', 2000);

//       // Reset form
//       reset();

//       navigation.navigate('LogIn');
//     } catch (error) {
//       console.log('Signup error:', error);
//       Toasts(
//         'Error',
//         error?.data?.message || 'Something went wrong!',
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
//                   text={'CREATE ACCOUNT'}
//                 />
//                 <MyText
//                   textStyle={{textAlign: 'center'}}
//                   fontSize={responsiveFontSize(2)}
//                   color={Colors.gray}
//                   text={'Join the SZABIST LOST & Found community'}
//                 />
//               </View>
//             </View>

//             <View style={styles.InputBox}>
//               <Controller
//                 control={control}
//                 name="fullName"
//                 render={({field}) => (
//                   <MyTextInput
//                     ref={el => {
//                       fullNameRef.current = el;
//                       field.ref(el);
//                     }}
//                     fieldName={'Full Name'}
//                     placeholder={'Enter your full name'}
//                     value={field.value}
//                     onChangeText={field.onChange}
//                     onSubmitEditing={() => emailRef.current?.focus()}
//                     returnKeyType="next"
//                     autoCapitalize="words"
//                     autoCorrect={true}
//                     autoFocus={true}
//                   />
//                 )}
//               />
//               {errors.fullName && (
//                 <MyText
//                   color={Colors.red}
//                   fontSize={responsiveFontSize(1.7)}
//                   text={errors.fullName.message}
//                   textStyle={{marginLeft: responsiveWidth(2)}}
//                 />
//               )}

//               <Controller
//                 control={control}
//                 name="email"
//                 render={({field}) => (
//                   <MyTextInput
//                     ref={el => {
//                       emailRef.current = el;
//                       field.ref(el);
//                     }}
//                     fieldName={'Email Address'}
//                     placeholder={'Your@email.com'}
//                     value={field.value}
//                     onChangeText={field.onChange}
//                     onSubmitEditing={() => studentIdRef.current?.focus()}
//                     returnKeyType="next"
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                   />
//                 )}
//               />
//               {errors.email && (
//                 <MyText
//                   color={Colors.red}
//                   fontSize={responsiveFontSize(1.7)}
//                   text={errors.email.message}
//                   textStyle={{marginLeft: responsiveWidth(2)}}
//                 />
//               )}

//               <Controller
//                 control={control}
//                 name="studentId"
//                 render={({field}) => (
//                   <MyTextInput
//                     ref={el => {
//                       studentIdRef.current = el;
//                       field.ref(el);
//                     }}
//                     fieldName={'Student ID'}
//                     placeholder={'Enter your student ID'}
//                     value={field.value}
//                     onChangeText={field.onChange}
//                     onSubmitEditing={() => passwordRef.current?.focus()}
//                     returnKeyType="next"
//                     keyboardType="default"
//                     autoCapitalize="characters"
//                     autoCorrect={false}
//                   />
//                 )}
//               />
//               {errors.studentId && (
//                 <MyText
//                   color={Colors.red}
//                   fontSize={responsiveFontSize(1.7)}
//                   text={errors.studentId.message}
//                   textStyle={{marginLeft: responsiveWidth(2)}}
//                 />
//               )}

//               <Controller
//                 control={control}
//                 name="password"
//                 render={({field}) => (
//                   <MyTextInput
//                     ref={el => {
//                       passwordRef.current = el;
//                       field.ref(el);
//                     }}
//                     fieldName={'Password'}
//                     placeholder={'Enter your password'}
//                     RightView={true}
//                     value={field.value}
//                     onChangeText={field.onChange}
//                     onSubmitEditing={() => confirmPasswordRef.current?.focus()}
//                     returnKeyType="next"
//                     secureTextEntry={true}
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                   />
//                 )}
//               />
//               {errors.password && (
//                 <MyText
//                   color={Colors.red}
//                   fontSize={responsiveFontSize(1.7)}
//                   text={errors.password.message}
//                   textStyle={{marginLeft: responsiveWidth(2)}}
//                 />
//               )}

//               <Controller
//                 control={control}
//                 name="confirmPassword"
//                 render={({field}) => (
//                   <MyTextInput
//                     ref={el => {
//                       confirmPasswordRef.current = el;
//                       field.ref(el);
//                     }}
//                     fieldName={'Confirm Password'}
//                     placeholder={'Enter your confirm password'}
//                     RightView={true}
//                     value={field.value}
//                     onChangeText={field.onChange}
//                     onSubmitEditing={handleSubmit(onSubmit)}
//                     returnKeyType="done"
//                     secureTextEntry={true}
//                     autoCapitalize="none"
//                     autoCorrect={false}
//                   />
//                 )}
//               />
//               {errors.confirmPassword && (
//                 <MyText
//                   color={Colors.red}
//                   fontSize={responsiveFontSize(1.7)}
//                   text={errors.confirmPassword.message}
//                   textStyle={{marginLeft: responsiveWidth(2)}}
//                 />
//               )}

//               <Controller
//                 control={control}
//                 name="agreeToTerms"
//                 render={({field: {onChange, value}}) => (
//                   <View style={styles.RememberAndForget}>
//                     <TouchableOpacity
//                       style={styles.RememberBox}
//                       onPress={() => onChange(!value)}>
//                       {value && (
//                         <Icon
//                           name="check"
//                           size={responsiveFontSize(2)}
//                           color={Colors.primary}
//                         />
//                       )}
//                     </TouchableOpacity>
//                     <MyText fontSize={responsiveFontSize(1.7)}>
//                       <Text style={{color: Colors.black}}>I agree to the</Text>
//                       <Text
//                         style={{
//                           color: Colors.primary,
//                         }}>{` Terms of Service `}</Text>
//                       <Text style={{color: Colors.black}}>and</Text>
//                       <Text
//                         style={{
//                           color: Colors.primary,
//                         }}>{` Privacy Policy `}</Text>
//                     </MyText>
//                   </View>
//                 )}
//               />
//               {errors.agreeToTerms && (
//                 <MyText
//                   color={Colors.red}
//                   fontSize={responsiveFontSize(1.7)}
//                   text={errors.agreeToTerms.message}
//                   textStyle={{marginLeft: responsiveWidth(2)}}
//                 />
//               )}
//             </View>

//             <View>
//               <MyButton
//                 style={{width: responsiveWidth(90)}}
//                 isLoading={isLoading}
//                 text="Sign Up"
//                 backgroundColor={Colors.primary}
//                 textColor={Colors.white}
//                 fontWeight="50"
//                 textstyle={{
//                   fontSize: responsiveFontSize(3),
//                 }}
//                 onPress={handleSubmit(onSubmit)}
//               />
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   marginTop: responsiveHeight(2),
//                   alignSelf: 'center',
//                 }}>
//                 <MyText
//                   fontSize={responsiveFontSize(1.7)}
//                   text={'Already have an account? '}
//                 />
//                 <TouchableOpacity
//                   onPress={() => {
//                     navigation.navigate('LogIn');
//                   }}>
//                   <MyText
//                     color={Colors.primary}
//                     fontSize={responsiveFontSize(1.7)}
//                     text={'Sign In '}
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

const Signup = () => {
  const navigation = useNavigation();
  const {Toasts} = ToastMessage();
  const [signUp, {isLoading}] = useSignUpMutation();

  // Create refs for each input
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const studentIdRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    Keyboard.dismiss(); // Dismiss the keyboard when the screen mounts
  }, []);

  // Initialize useForm with Yup resolver
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      studentId: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async data => {
    try {
      const payload = {
        fullName: data.fullName.trim(),
        emailAddress: data.email.trim(),
        studentId: data.studentId.trim(),
        password: data.password.trim(),
        confirmPassword: data.confirmPassword.trim(),
      };

      console.log('Signup payload:', payload);

      const res = await signUp(payload).unwrap();

      Toasts('Success', 'User Created Successfully', 'success', 2000);

      // Reset form
      reset();

      navigation.navigate('LogIn');
    } catch (error) {
      console.log('Signup error:', error);
      Toasts(
        'Error',
        error?.data?.message || 'Something went wrong!',
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
                  text={'CREATE ACCOUNT'}
                />
                <MyText
                  textStyle={{textAlign: 'center'}}
                  fontSize={responsiveFontSize(2)}
                  color={Colors.gray}
                  text={'Join the SZABIST LOST & Found community'}
                />
              </View>
            </View>

            <View style={styles.InputBox}>
              <Controller
                control={control}
                name="fullName"
                render={({field}) => (
                  <MyTextInput
                    ref={el => {
                      fullNameRef.current = el;
                      field.ref(el);
                    }}
                    fieldName={'Full Name'}
                    placeholder={'Enter your full name'}
                    value={field.value}
                    onChangeText={field.onChange}
                    onSubmitEditing={() => emailRef.current?.focus()}
                    returnKeyType="next"
                    autoCapitalize="words"
                    autoCorrect={true}
                    autoFocus={false}
                    error={!!errors.fullName} // Pass error prop
                  />
                )}
              />
              {errors.fullName && (
                <MyText
                  color={Colors.red}
                  fontSize={responsiveFontSize(1.7)}
                  text={errors.fullName.message}
                  textStyle={{marginLeft: responsiveWidth(2)}}
                />
              )}

              <Controller
                control={control}
                name="email"
                render={({field}) => (
                  <MyTextInput
                    ref={el => {
                      emailRef.current = el;
                      field.ref(el);
                    }}
                    fieldName={'Email Address'}
                    placeholder={'Your@email.com'}
                    value={field.value}
                    onChangeText={field.onChange}
                    onSubmitEditing={() => studentIdRef.current?.focus()}
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={!!errors.email} // Pass error prop
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

              <Controller
                control={control}
                name="studentId"
                render={({field}) => (
                  <MyTextInput
                    ref={el => {
                      studentIdRef.current = el;
                      field.ref(el);
                    }}
                    fieldName={'Student ID'}
                    placeholder={'Enter your student ID'}
                    value={field.value}
                    onChangeText={field.onChange}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    returnKeyType="next"
                    keyboardType="default"
                    autoCapitalize="characters"
                    autoCorrect={false}
                    error={!!errors.studentId} // Pass error prop
                  />
                )}
              />
              {errors.studentId && (
                <MyText
                  color={Colors.red}
                  fontSize={responsiveFontSize(1.7)}
                  text={errors.studentId.message}
                  textStyle={{marginLeft: responsiveWidth(2)}}
                />
              )}

              <Controller
                control={control}
                name="password"
                render={({field}) => (
                  <MyTextInput
                    ref={el => {
                      passwordRef.current = el;
                      field.ref(el);
                    }}
                    fieldName={'Password'}
                    placeholder={'Enter your password'}
                    RightView={true}
                    value={field.value}
                    onChangeText={field.onChange}
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                    returnKeyType="next"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={!!errors.password} // Pass error prop
                  />
                )}
              />
              {errors.password && (
                <MyText
                  color={Colors.red}
                  fontSize={responsiveFontSize(1.7)}
                  text={errors.password.message}
                  textStyle={{marginLeft: responsiveWidth(2)}}
                />
              )}

              <Controller
                control={control}
                name="confirmPassword"
                render={({field}) => (
                  <MyTextInput
                    ref={el => {
                      confirmPasswordRef.current = el;
                      field.ref(el);
                    }}
                    fieldName={'Confirm Password'}
                    placeholder={'Enter your confirm password'}
                    RightView={true}
                    value={field.value}
                    onChangeText={field.onChange}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    returnKeyType="done"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={!!errors.confirmPassword} // Pass error prop
                  />
                )}
              />
              {errors.confirmPassword && (
                <MyText
                  color={Colors.red}
                  fontSize={responsiveFontSize(1.7)}
                  text={errors.confirmPassword.message}
                  textStyle={{marginLeft: responsiveWidth(2)}}
                />
              )}

              <Controller
                control={control}
                name="agreeToTerms"
                render={({field: {onChange, value}}) => (
                  <View style={styles.RememberAndForget}>
                    <TouchableOpacity
                      style={styles.RememberBox}
                      onPress={() => onChange(!value)}>
                      {value && (
                        <Icon
                          name="check"
                          size={responsiveFontSize(2)}
                          color={Colors.primary}
                        />
                      )}
                    </TouchableOpacity>
                    <MyText fontSize={responsiveFontSize(1.7)}>
                      <Text style={{color: Colors.black}}>I agree to the</Text>
                      <Text
                        style={{
                          color: Colors.primary,
                        }}>{` Terms of Service `}</Text>
                      <Text style={{color: Colors.black}}>and</Text>
                      <Text
                        style={{
                          color: Colors.primary,
                        }}>{` Privacy Policy `}</Text>
                    </MyText>
                  </View>
                )}
              />
              {errors.agreeToTerms && (
                <MyText
                  color={Colors.red}
                  fontSize={responsiveFontSize(1.7)}
                  text={errors.agreeToTerms.message}
                  textStyle={{marginLeft: responsiveWidth(2)}}
                />
              )}
            </View>

            <View>
              <MyButton
                style={{width: responsiveWidth(90)}}
                isLoading={isLoading}
                text="Sign Up"
                backgroundColor={Colors.primary}
                textColor={Colors.white}
                fontWeight="50"
                textstyle={{
                  fontSize: responsiveFontSize(3),
                }}
                onPress={handleSubmit(onSubmit)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: responsiveHeight(2),
                  alignSelf: 'center',
                }}>
                <MyText
                  fontSize={responsiveFontSize(1.7)}
                  text={'Already have an account? '}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('LogIn');
                  }}>
                  <MyText
                    color={Colors.primary}
                    fontSize={responsiveFontSize(1.7)}
                    text={'Sign In '}
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

export default Signup;

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
    gap: responsiveHeight(0.5),
  },
  RememberAndForget: {
    flexDirection: 'row',
    gap: responsiveWidth(2),
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginVertical: responsiveHeight(2),
  },
  RememberBox: {
    height: responsiveHeight(2.5),
    width: responsiveHeight(2.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: responsiveWidth(0.3),
    borderRadius: responsiveWidth(1),
  },
});
