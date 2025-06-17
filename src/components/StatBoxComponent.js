// components/StatBoxComponent.js
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../styles/Colors';

const StatBoxComponent = ({title, count, backgroundColor, icon}) => (
  <View style={[styles.statBox, {backgroundColor}]}>
    <Text style={styles.statTitle}>{title}</Text>
    <View style={styles.iconContainer}>{icon}</View>
    <Text style={styles.statCount}>{count}</Text>
  </View>
);

export default StatBoxComponent;

const styles = StyleSheet.create({
  statBox: {
    width: '100%',
    borderRadius: 12,
    padding: responsiveWidth(4),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  statTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: Colors.black,
    marginBottom: 5,
  },
  iconContainer: {
    marginVertical: responsiveHeight(1),
  },
  statCount: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: Colors.black,
  },
});
