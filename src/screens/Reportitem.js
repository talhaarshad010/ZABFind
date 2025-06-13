import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyHeader from '../components/Header';
import WrapperContainer from '../components/WrapperContainer';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Reportitem = () => {
  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <MyHeader
          ScreenName={'Report Item'}
          style={{backgroundColor: Colors.white, elevation: 10}}
        />
      </View>
    </WrapperContainer>
  );
};

export default Reportitem;

const styles = StyleSheet.create({});
