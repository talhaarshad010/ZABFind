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
const Signup = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toggleRemember = () => setRememberMe(!rememberMe);
  const navigation = useNavigation();

  const [signUp, {isLoading}] = useSignUpMutation();

  const handleSignin = async () => {
    try {
      const response = await signUp({
        fullName,
        emailAddress: email,
        studentId,
        password,
        confirmPassword,
        phoneNumber: '00000000000',
        address: 'Dummy address',
        bio: '',
        profileImage: '',
      }).unwrap();

      console.log('Signup successful:', response);
      navigation.navigate('LogIn');
    } catch (error) {
      console.error('Signup failed:', error);
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
                onChangeText={setFullName}
              />

              <MyTextInput
                fieldName={'Email Address'}
                placeholder={'Your@email.com'}
                value={email}
                onChangeText={setEmail}
              />

              <MyTextInput
                fieldName={'Student ID'}
                placeholder={'Enter your student ID'}
                value={studentId}
                onChangeText={setStudentId}
              />

              <MyTextInput
                fieldName={'Password'}
                placeholder={'Enter your password'}
                RightView={true}
                value={password}
                onChangeText={setPassword}
              />

              <MyTextInput
                fieldName={'Confirm Password'}
                placeholder={'Enter your confirm password'}
                RightView={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
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
                  <Text style={{color: Colors.black}}>I agrree to the</Text>
                  <Text
                    style={{
                      color: Colors.primary,
                    }}>{` Term of service `}</Text>
                  <Text style={{color: Colors.black}}>and </Text>
                  <Text
                    style={{
                      color: Colors.primary,
                    }}>{` Privacy policy `}</Text>
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
                onPress={handleSignin()}
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
