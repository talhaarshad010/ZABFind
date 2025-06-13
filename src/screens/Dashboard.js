import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WrapperContainer from '../components/WrapperContainer';
import MyHeader from '../components/Header';
import Colors from '../styles/Colors';

const Dashboard = () => {
  return (
    <WrapperContainer>
      <View style={{flex: 1}}>
        <MyHeader
          ScreenName={'Dashboard'}
          style={{backgroundColor: Colors.white, elevation: 10}}
        />
      </View>
    </WrapperContainer>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
