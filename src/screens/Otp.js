import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import MyText from '../components/textcomponent';
import Colors from '../styles/Colors';
import WrapperContainer from '../components/WrapperContainer';
import AuthHeader from '../components/AuthHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import MyButton from '../components/CustomButton';

const Otp = () => {
  const navigation = useNavigation();
  let otpInput = null;

  const handleOTPChange = otp => {
    console.log('Entered OTP:', otp);
    // Optionally check if otp.length === 4 and then submit
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
                    'Please check your e-mail and enter the OTP sent to you.'
                  }
                />
              </View>
            </View>

            {/* OTP Input */}
            <OTPTextInput
              ref={e => (otpInput = e)}
              inputCount={4}
              tintColor={Colors.primary}
              offTintColor={Colors.gray}
              handleTextChange={handleOTPChange}
              containerStyle={{marginVertical: responsiveHeight(2)}}
              textInputStyle={{
                borderRadius: 5,
                borderWidth: 1,
              }}
            />

            <MyButton
              onPress={() => {
                navigation.navigate('ConfirmPassword');
              }}
              style={{
                width: responsiveWidth(90),
                marginVertical: responsiveHeight(2),
              }}
              backgroundColor={Colors.primary}
              text="Verify"
              textColor={Colors.white}
            />
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
});
