import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
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
import {checkMinLength, validateEmail} from '../utils/validations';
import ToastMessage from '../hooks/ToastMessage';
import messaging from '@react-native-firebase/messaging';

const Signup = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toggleRemember = () => setRememberMe(!rememberMe);
  const navigation = useNavigation();
  const {Toasts} = ToastMessage();
  const [signUp] = useSignUpMutation();

  const handleSignup = async () => {
    try {
      const trimmedFullName = fullName.trim();
      const trimmedEmail = email.trim();
      const trimmedStudentId = studentId.trim();
      const trimmedPassword = password.trim();
      const trimmedConfirmPassword = confirmPassword.trim();

      if (
        !trimmedFullName ||
        !trimmedEmail ||
        !trimmedStudentId ||
        !trimmedPassword ||
        !trimmedConfirmPassword
      ) {
        return Toasts('Error', 'Please fill all fields', 'error', 2000);
      }

      if (trimmedPassword !== trimmedConfirmPassword) {
        return Toasts('Error', 'Passwords do not match', 'error', 2000);
      }

      if (!validateEmail(trimmedEmail)) {
        return Toasts(
          'Error',
          'Please enter a valid email address',
          'error',
          2000,
        );
      }

      if (checkMinLength(trimmedPassword, 8, 'Password')) {
        return Toasts(
          'Error',
          'Password must be at least 8 characters long',
          'error',
          2000,
        );
      }

      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      let fcmToken = null;
      if (enabled) {
        // ✅ 2. Get FCM token
        fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);
      } else {
        console.log('Notification permission not granted');
      }

      const payload = {
        fullName: trimmedFullName,
        emailAddress: trimmedEmail,
        studentId: trimmedStudentId,
        password: trimmedPassword,
        confirmPassword: trimmedConfirmPassword,
        fcmToken,
      };

      console.log('Signup payload:', payload);

      const res = await signUp(payload).unwrap();

      Toasts('Success', 'User Created Successfully', 'success', 2000);

      // Reset form
      setFullName('');
      setEmail('');
      setStudentId('');
      setPassword('');
      setConfirmPassword('');
      setRememberMe(false);

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
              <MyTextInput
                fieldName={'Full Name'}
                placeholder={'Enter your full name'}
                value={fullName}
                onChangeText={text => {
                  setFullName(text);
                }}
              />

              <MyTextInput
                fieldName={'Email Address'}
                placeholder={'Your@email.com'}
                value={email}
                onChangeText={text => setEmail(text)}
              />

              <MyTextInput
                fieldName={'Student ID'}
                placeholder={'Enter your student ID'}
                value={studentId}
                onChangeText={text => setStudentId(text)}
              />

              <MyTextInput
                fieldName={'Password'}
                placeholder={'Enter your password'}
                RightView={true}
                value={password}
                onChangeText={text => setPassword(text)}
              />

              <MyTextInput
                fieldName={'Confirm Password'}
                placeholder={'Enter your confirm password'}
                RightView={true}
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                }}
              />

              <View style={styles.RememberAndForget}>
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
                <MyText fontSize={responsiveFontSize(1.7)}>
                  <Text style={{color: Colors.black}}>I agree to the</Text>
                  <Text
                    style={{
                      color: Colors.primary,
                    }}>{` Terms of Service `}</Text>
                  <Text style={{color: Colors.black}}>and</Text>
                  <Text
                    style={{color: Colors.primary}}>{` Privacy Policy `}</Text>
                </MyText>
              </View>
            </View>

            <View>
              <MyButton
                text="Sign Up"
                backgroundColor={Colors.primary}
                textColor={Colors.white}
                fontWeight="50"
                textstyle={{
                  fontSize: responsiveFontSize(3),
                  width: responsiveWidth(90),
                }}
                onPress={handleSignup}
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
