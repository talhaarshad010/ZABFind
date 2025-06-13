import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../styles/Colors';
import MyText from './textcomponent';

const MyButton = ({
  isLoading = false,
  text = '',
  onPress = () => {},
  style = {},
  textstyle = {},
  fontWeight = 'bold',
  backgroundColor = Colors.blue, // Default background color
  textColor = Colors.white, // Default text color
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={[styles.Container, {backgroundColor}, style]}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={textColor} />
      ) : (
        <MyText
          text={text}
          fontSize={responsiveFontSize(2.3)}
          color={textColor}
          fontWeight={fontWeight}
          textStyle={[styles.textstyle, textstyle]}
        />
      )}
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  Container: {
    height: responsiveHeight(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
  },
  textstyle: {
    textAlign: 'center',
  },
});
