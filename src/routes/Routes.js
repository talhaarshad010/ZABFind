import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './auth';
import StackRoute from './stack';

const Routes = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      {/* <AuthStack /> */}
      <StackRoute />
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
