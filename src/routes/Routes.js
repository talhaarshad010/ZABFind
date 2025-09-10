// import {StatusBar} from 'react-native';
// import React from 'react';
// import StackRoute from './stack';
// import AuthStack from './auth';
// import {useSelector} from 'react-redux';

// const Routes = () => {
//   const token = useSelector(state => state?.Auth?.token);
//   const isProfileComplete = useSelector(
//     state => state?.Auth?.isProfileComplete,
//   );
//   console.log('Token in main Route: ', token);

//   console.log('Profile complete in main Route: ', isProfileComplete);

//   return (
//     <>
//       <StatusBar hidden={false} />
//       {token ? (
//         isProfileComplete ? (
//           <StackRoute />
//         ) : (
//           <AuthStack initialRouteName="CompleteProfile" />
//         )
//       ) : (
//         <AuthStack />
//       )}
//     </>
//   );
// };

// export default Routes;

import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackRoute from './stack';
import AuthStack from './auth';
import {useSelector} from 'react-redux';

const Routes = () => {
  const token = useSelector(state => state?.Auth?.token);
  const isProfileComplete = useSelector(
    state => state?.Auth?.isProfileComplete,
  );
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    // Check if the app has been launched before
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (hasLaunched === null) {
          // First launch, set the flag and show onboarding
          await AsyncStorage.setItem('hasLaunched', 'true');
          setIsFirstLaunch(true);
        } else {
          // Not the first launch
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        setIsFirstLaunch(false); // Fallback to avoid onboarding loop
      }
    };

    checkFirstLaunch();
  }, []);

  // Show nothing until we know if it's the first launch
  if (isFirstLaunch === null) {
    return null;
  }

  console.log('Token in main Route: ', token);
  console.log('Profile complete in main Route: ', isProfileComplete);

  return (
    <>
      <StatusBar hidden={false} />
      {isFirstLaunch ? (
        <AuthStack initialRouteName="OnBoarding" />
      ) : token ? (
        isProfileComplete ? (
          <StackRoute />
        ) : (
          <AuthStack initialRouteName="CompleteProfile" />
        )
      ) : (
        <AuthStack initialRouteName="LogIn" />
      )}
    </>
  );
};

export default Routes;
