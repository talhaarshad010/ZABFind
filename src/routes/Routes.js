import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackRoute from './stack';
import AuthStack from './auth';

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
