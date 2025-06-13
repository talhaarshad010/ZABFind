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

const ConfirmPassword = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const toggleRemember = () => setRememberMe(!rememberMe);
  const navigation = useNavigation();

  return (
    <WrapperContainer>
      {/* Remove or hide the StatusBar */}

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

            <View style={styles.InputBox}>
              <MyTextInput
                fieldName={'New Password'}
                placeholder={'Enter your New password'}
                RightView={true}
              />
              <MyTextInput
                fieldName={'Confirm New Password'}
                placeholder={'Enter your Confirm password'}
                RightView={true}
              />
              <View style={{marginTop: responsiveHeight(2)}}>
                <MyButton
                  text="Confirm Password"
                  backgroundColor={Colors.primary}
                  textColor={Colors.white}
                  fontWeight="50"
                  textstyle={{
                    fontSize: responsiveFontSize(3),
                    width: responsiveWidth(90),
                  }}
                  onPress={() => {
                    navigation.navigate('LogIn');
                  }}
                />
              </View>
            </View>
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
    // justifyContent: 'space-around',
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
