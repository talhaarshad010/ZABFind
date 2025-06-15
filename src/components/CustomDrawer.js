import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MyText from './textcomponent';
import Colors from '../styles/Colors';

const CustomDrawerContent = props => {
  return (
    <View style={{flex: 1}}>
      <View>
        <Text>Drawer...</Text>
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({});
