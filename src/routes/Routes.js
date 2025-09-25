// import {useNavigation} from '@react-navigation/native';
// import {StatusBar} from 'react-native';
// import {useSelector} from 'react-redux';
// import StackRoute from './stack';
// import AuthStack from './auth';
// import {useEffect} from 'react';

// const Routes = () => {
//   const token = useSelector(state => state?.Auth?.token);
//   const user = useSelector(state => state?.Auth?.user);
//   const isProfileComplete = useSelector(
//     state => state?.Auth?.isProfileComplete,
//   );
//   const role = user?.role;
//   const navigation = useNavigation();

// useEffect(() => {
//   if (token && role === 'student' && !isProfileComplete) {
//     navigation.reset({
//       index: 0,
//       routes: [{name: 'CompleteProfile'}],
//     });
//   }
// }, [token, role, isProfileComplete, navigation]);

//   return (
//     <>
//       <StatusBar hidden={false} />
//       {token ? (
//         role === 'student' ? (
//           isProfileComplete ? (
//             <StackRoute />
//           ) : (
//             <AuthStack />
//           )
//         ) : role === 'admin' ? (
//           <StackRoute />
//         ) : (
//           <StackRoute />
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

  // check onboarding flag once at launch
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
    return null; // you can show splash screen here
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
        // if no token: AuthStack with Onboarding only once
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

// import {StatusBar} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import StackRoute from './stack';
// import AuthStack from './auth';
// import {useSelector} from 'react-redux';

// const Routes = () => {
//   const token = useSelector(state => state?.Auth?.token);
//   const user = useSelector(state => state?.Auth?.user);
//   const isProfileComplete = useSelector(
//     state => state?.Auth?.isProfileComplete,
//   );
//   const [isFirstLaunch, setIsFirstLaunch] = useState(null);
//   const role = user?.role;

//   console.log('Role in routes.js:', role);
//   useEffect(() => {
//     // Check if the app has been launched before
//     const checkFirstLaunch = async () => {
//       try {
//         const hasLaunched = await AsyncStorage.getItem('hasLaunched');
//         if (hasLaunched === null) {
//           // First launch, set the flag and show onboarding
//           await AsyncStorage.setItem('hasLaunched', 'true');
//           setIsFirstLaunch(true);
//         } else {
//           // Not the first launch
//           setIsFirstLaunch(false);
//         }
//       } catch (error) {
//         console.error('Error checking first launch:', error);
//         setIsFirstLaunch(false); // Fallback to avoid onboarding loop
//       }
//     };

//     checkFirstLaunch();
//   }, []);

//   // Show nothing until we know if it's the first launch
//   if (isFirstLaunch === null) {
//     return null;
//   }

//   console.log('Token in main Route: ', token);
//   console.log('Profile complete in main Route: ', isProfileComplete);

//   return (
//     <>
//       <StatusBar hidden={false} />
//       {isFirstLaunch ? (
//         <AuthStack initialRouteName="OnBoarding" />
//       ) : token ? (
//         role === 'admin' ? (
//           // 🔹 Admin always goes to StackRoute (which mounts BottomTab with admin tabs)
//           <StackRoute />
//         ) : isProfileComplete ? (
//           // 🔹 Normal user with complete profile → StackRoute
//           <StackRoute />
//         ) : (
//           // 🔹 Normal user without complete profile → CompleteProfile
//           <AuthStack initialRouteName="CompleteProfile" />
//         )
//       ) : (
//         <AuthStack initialRouteName="LogIn" />
//       )}
//     </>
//   );
// };

// export default Routes;

// import {StatusBar} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import StackRoute from './stack';
// import AuthStack from './auth';
// import {useSelector} from 'react-redux';

// const Routes = () => {
//   const token = useSelector(state => state?.Auth?.token);
//   const login_user = useSelector(state => state?.Auth);
//   console.log('login_user:', login_user);
//   const isProfileComplete = useSelector(
//     state => state?.Auth?.isProfileComplete,
//   );
//   const userRole = useSelector(state => state?.Auth?.user?.role); // Access user role
//   console.log('user role:', userRole);
//   const [isFirstLaunch, setIsFirstLaunch] = useState(null);

//   useEffect(() => {
//     // Check if the app has been launched before
//     const checkFirstLaunch = async () => {
//       try {
//         const hasLaunched = await AsyncStorage.getItem('hasLaunched');
//         if (hasLaunched === null) {
//           // First launch, set the flag and show onboarding
//           await AsyncStorage.setItem('hasLaunched', 'true');
//           setIsFirstLaunch(true);
//         } else {
//           // Not the first launch
//           setIsFirstLaunch(false);
//         }
//       } catch (error) {
//         console.error('Error checking first launch:', error);
//         setIsFirstLaunch(false); // Fallback to avoid onboarding loop
//       }
//     };

//     checkFirstLaunch();
//   }, []);

//   // Show nothing until we know if it's the first launch
//   if (isFirstLaunch === null) {
//     return null;
//   }

//   console.log('Token in main Route: ', token);
//   console.log('Profile complete in main Route: ', isProfileComplete);
//   console.log('User role in main Route: ', userRole);

//   return (
//     <>
//       <StatusBar hidden={false} />
//       {isFirstLaunch ? (
//         <AuthStack initialRouteName="OnBoarding" />
//       ) : token ? (
//         isProfileComplete ? (
//           <StackRoute />
//         ) : (
//           <AuthStack initialRouteName="CompleteProfile" />
//         )
//       ) : (
//         <AuthStack initialRouteName="LogIn" />
//       )}
//     </>
//   );
// };

// export default Routes;
