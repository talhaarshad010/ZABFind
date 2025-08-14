import {StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Confirmpassword from '../screens/Confirmpassword';
import Otp from '../screens/Otp';
import ForgetPassword from '../screens/Forgetpassword';
import CompleteProfile from '../screens/Completeprofile';

const Stack = createNativeStackNavigator();
const AuthStack = ({initialRouteName = 'OnBoarding'}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen name="OnBoarding" component={Onboarding} />
      <Stack.Screen name="SignUp" component={Signup} />
      <Stack.Screen name="LogIn" component={Login} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ConfirmPassword" component={Confirmpassword} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
