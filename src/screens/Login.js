import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar, // import is optional now, just for safety
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from '../store/slices/Auth';
import ToastMessage from '../hooks/ToastMessage';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const toggleRemember = () => setRememberMe(!rememberMe);
  const navigation = useNavigation();
  const [signIn, {data, isLoading, error}] = useSignInMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {Toasts} = ToastMessage();

  const handleLogin = async () => {
    try {
      const result = await signIn({emailAddress: email, password}).unwrap();
      console.log('responce from login: ', result);

      await dispatch(setAuth({token: result.token, user: result.user}));
      Toasts(
        'Login Successful',
        `Welcome back, ${result.user.fullName}!`,
        'success',
        5000,
      );
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
              <MyTextInput
                fieldName={'Email Address'}
                placeholder={'your@email.com'}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <MyTextInput
                fieldName={'Password'}
                placeholder={'Enter your password'}
                RightView={true}
                value={password}
                onChangeText={text => setPassword(text)}
              />

              <View style={styles.RememberAndForget}>
                <View style={{flexDirection: 'row', gap: responsiveWidth(2)}}>
                  <TouchableOpacity
                    style={styles.RememberBox}
                    onPress={toggleRemember}>
                    {rememberMe && (
                      <Icon
                        name="check"
                        size={responsiveFontSize(2)}
                        color={Colors.primary}
                      />
                    )}
                  </TouchableOpacity>
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
              <View style={{marginTop: responsiveHeight(2)}}>
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
                  onPress={handleLogin}
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
