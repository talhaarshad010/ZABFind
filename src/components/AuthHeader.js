import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import MyText from './textcomponent';
import Colors from '../styles/Colors';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const AuthHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="center"
        style={styles.logo}
        source={require('../assets/logo.png')}
      />
      <View>
        <MyText
          color={Colors.primary}
          text="ZABFIND"
          fontSize={responsiveFontSize(4)}
          fontWeight="bold"
          textStyle={{textAlign: 'center', marginTop: responsiveWidth(3)}}
        />
        <MyText
          color={Colors.primary}
          text="Lost & Found"
          fontSize={responsiveFontSize(2)}
          fontWeight="bold"
          textStyle={{textAlign: 'Left'}}
        />
      </View>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(80),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  logo: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
  },
});
