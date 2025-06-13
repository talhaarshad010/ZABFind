import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../styles/Colors';
import MyText from './textcomponent';

const MyHeader = ({
  leftView,
  ScreenName,
  rightView,
  rightText,
  style = {},
  onPressleft = () => {},
  onPressright = () => {},
}) => {
  return (
    <View style={[styles.header, style]}>
      {/* Left View (optional) */}
      {leftView && (
        <TouchableOpacity onPress={onPressleft} style={styles.left}>
          {leftView}
        </TouchableOpacity>
      )}

      {/* Screen Name centered */}
      <View style={styles.center}>
        <MyText
          color={Colors.black}
          fontWeight={'bold'}
          text={ScreenName}
          fontSize={responsiveFontSize(2.5)}
        />
      </View>

      {/* Right View or Text (optional) */}
      {rightView ? (
        <TouchableOpacity onPress={onPressright} style={styles.right}>
          {rightView}
        </TouchableOpacity>
      ) : rightText ? (
        <Text style={styles.rightText}>{rightText}</Text>
      ) : (
        <View style={styles.rightPlaceholder} />
      )}
    </View>
  );
};

export default MyHeader;

const styles = StyleSheet.create({
  header: {
    height: responsiveHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: responsiveWidth(3),
  },
  left: {
    position: 'absolute',
    left: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    position: 'absolute',
    right: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightText: {
    position: 'absolute',
    right: responsiveWidth(3),
    fontSize: responsiveFontSize(2),
    color: Colors.primary,
  },
  rightPlaceholder: {
    width: responsiveWidth(8), // ensure symmetry
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
