// import {StatusBar, StyleSheet} from 'react-native';
// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import StackRoute from './stack';
// import AuthStack from './auth';
// import {useSelector} from 'react-redux';

// const Routes = () => {
//   const token = useSelector(state => state?.Auth?.token);
//   console.log('token in main Route: ', token);
//   return (
//     <NavigationContainer>
//       <StatusBar hidden={true} />
//       <AuthStack />
//       {/* <StackRoute/> */}
//       {/* {token ? <StackRoute /> : <AuthStack />} */}
//     </NavigationContainer>
//   );
// };

// export default Routes;

import {StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackRoute from './stack';
import AuthStack from './auth';
import {useSelector} from 'react-redux';

const Routes = () => {
  const token = useSelector(state => state?.Auth?.token);
  const {user} = useSelector(state => state.Auth);
  console.log('User in main Route:', user);
  const isProfileComplete = useSelector(
    state => state?.Auth?.isProfileComplete,
  );
  console.log('Token in main Route: ', token);

  console.log('Profile complete in main Route: ', isProfileComplete);

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      {token ? (
        isProfileComplete ? (
          <StackRoute />
        ) : (
          <AuthStack />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Routes;
