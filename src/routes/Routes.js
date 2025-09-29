import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StackRoute from './stack';
import AuthStack from './auth';
import {useNavigation} from '@react-navigation/native';

const Routes = () => {
  const token = useSelector(state => state?.Auth?.token);
  const user = useSelector(state => state?.Auth?.user);
  const isProfileComplete = useSelector(
    state => state?.Auth?.isProfileComplete,
  );
  const role = user?.role;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    if (token && role === 'student' && !isProfileComplete) {
      navigation.reset({
        index: 0,
        routes: [{name: 'CompleteProfile'}],
      });
    }
  }, [token, role, isProfileComplete, navigation]);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('hasSeenOnboarding');
        if (value === 'true') {
          setHasSeenOnboarding(true);
        }
      } catch (err) {
        console.log('Error reading onboarding flag', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar hidden={false} />
      {token ? (
        role === 'student' ? (
          isProfileComplete ? (
            <StackRoute />
          ) : (
            <AuthStack initialRouteName="CompleteProfile" />
          )
        ) : role === 'admin' ? (
          <StackRoute />
        ) : (
          <StackRoute />
        )
      ) : (
        <AuthStack
          key={
            hasSeenOnboarding ? 'authWithoutOnboarding' : 'authWithOnboarding'
          }
          initialRouteName={hasSeenOnboarding ? 'LogIn' : 'OnBoarding'}
        />
      )}
    </>
  );
};

export default Routes;
