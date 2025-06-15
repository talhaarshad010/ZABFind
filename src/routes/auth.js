import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Confirmpassword from '../screens/Confirmpassword';
import Otp from '../screens/Otp';
import ForgetPassword from '../screens/Forgetpassword';

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoarding" component={Onboarding} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ConfirmPassword" component={Confirmpassword} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
