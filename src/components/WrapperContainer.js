import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../styles/Colors';

const WrapperContainer = ({style = {}, children}) => {
  return (
    <View style={{...styles.Container, ...style}}>
      <SafeAreaView style={{flex: 1}}>{children}</SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
export default WrapperContainer;
