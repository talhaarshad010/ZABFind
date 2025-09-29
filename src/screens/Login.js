import {
  StyleSheet,
  Text,
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
import {useSignInMutation} from '../store/Api/Auth';
import {useDispatch} from 'react-redux';
import {setAuth} from '../store/slices/Auth';
import ToastMessage from '../hooks/ToastMessage';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Email Address is required')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  // Optionally, make "Remember me" required
  rememberMe: Yup.boolean().oneOf([true], 'You must agree to remember me'),
});

const Login = () => {
  const navigation = useNavigation();
  const [signIn, {isLoading}] = useSignInMutation();
  const dispatch = useDispatch();
  const {Toasts} = ToastMessage();

  // Initialize useForm with Yup resolver
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async data => {
    try {
      const payload = {
        emailAddress: data.email.trim(),
        password: data.password.trim(),
      };

      const result = await signIn(payload).unwrap();
      console.log('Response from login:', result);

      await dispatch(setAuth({token: result.token, user: result.user}));
      Toasts(
        'Login Successful',
        `Welcome back, ${result.user.fullName}!`,
        'success',
        5000,
      );

      // Reset form
      reset();
    } catch (err) {
      const errorMessage =
        err?.data?.message || 'Something went wrong. Please try again.';
      console.log('Login failed:', err);
      Toasts('Login Failed', errorMessage, 'error', 5000);
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
                  text={'WELCOME BACK'}
                />
                <MyText
                  textStyle={{textAlign: 'center'}}
                  fontSize={responsiveFontSize(2)}
                  color={Colors.gray}
                  text={'Sign in to your account to continue'}
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
                    onSubmitEditing={() =>
                      control._fields.password._f.ref.current?.focus()
                    }
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoFocus={true}
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

              <Controller
                control={control}
                name="password"
                render={({field: {onChange, value}}) => (
                  <MyTextInput
                    fieldName={'Password'}
                    placeholder={'Enter your password'}
                    RightView={true}
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    returnKeyType="done"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    error={errors.password?.message}
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

              <View style={styles.RememberAndForget}>
                <View style={{flexDirection: 'row', gap: responsiveWidth(2)}}>
                  <Controller
                    control={control}
                    name="rememberMe"
                    render={({field: {onChange, value}}) => (
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
                    )}
                  />
                  <MyText color={Colors.black} text={'Remember me'} />
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  <MyText
                    fontSize={responsiveFontSize(1.7)}
                    color={Colors.primary}
                    text={'Forget Password?'}
                  />
                </TouchableOpacity>
              </View>
              {/* Display error for rememberMe if required */}
              {errors.rememberMe && (
                <MyText
                  color={Colors.red}
                  fontSize={responsiveFontSize(1.7)}
                  text={errors.rememberMe.message}
                  textStyle={{marginLeft: responsiveWidth(2)}}
                />
              )}
            </View>

            <View>
              <MyButton
                isLoading={isLoading}
                text="Sign In"
                backgroundColor={Colors.primary}
                textColor={Colors.white}
                fontWeight="50"
                textstyle={{
                  fontSize: responsiveFontSize(3),
                  width: responsiveWidth(90),
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
                  text={"Don't have an account? "}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}>
                  <MyText
                    color={Colors.primary}
                    fontSize={responsiveFontSize(1.7)}
                    text={'Sign up '}
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

export default Login;

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
  RememberAndForget: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
