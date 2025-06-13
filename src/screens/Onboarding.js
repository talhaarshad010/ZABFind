import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContainer from '../components/WrapperContainer';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MyText from '../components/textcomponent';
import Colors from '../styles/Colors';
import MyButton from '../components/CustomButton';
import AuthHeader from '../components/AuthHeader';
import {useNavigation} from '@react-navigation/native';

const Onboarding = () => {
  const navigation = useNavigation();
  const HandleSignInPress = () => {
    navigation.navigate('LogIn');
  };
  return (
    <WrapperContainer>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <AuthHeader />

        <View>
          <MyText
            fontSize={responsiveFontSize(6)}
            fontWeight="bold"
            textStyle={{
              textAlign: 'center',
              marginTop: responsiveWidth(3),
              width: responsiveWidth(90),
            }}>
            <Text style={{color: 'black'}}>Lost something?</Text>
            <Text
              style={{
                color: Colors.primary,
              }}>{` we'll help you find it.`}</Text>
          </MyText>

          <MyText
            fontSize={responsiveFontSize(2.2)}
            color={Colors.gray}
            textStyle={{
              textAlign: 'center',
              width: responsiveWidth(90),
              alignSelf: 'center',
            }}
            text={
              'The official lost and found platform for SZABIST University. Report lost items, find your belongings, and connect with others to reunite with lost items.'
            }
          />
        </View>

        <View style={styles.BOX_03}>
          <MyButton
            text="Get Started"
            backgroundColor={Colors.primary}
            textColor={Colors.white}
            fontWeight="50"
            textstyle={{
              fontSize: responsiveFontSize(3),
              width: responsiveWidth(90),
            }}
            onPress={() => navigation.navigate('SignUp')}
          />
          <MyButton
            style={{borderWidth: 1, borderColor: Colors.primary}}
            text="Sign In"
            textColor={Colors.primary}
            fontWeight="500"
            textstyle={{
              fontSize: responsiveFontSize(3),
              width: responsiveWidth(90),
            }}
            onPress={() => HandleSignInPress()}
          />
        </View>
      </View>
    </WrapperContainer>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  BOX_01: {
    width: responsiveWidth(80),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
  },
  BOX_03: {
    width: responsiveWidth(90),
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: responsiveWidth(5),
    height: responsiveWidth(30),
  },
});
