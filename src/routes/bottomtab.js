// import * as React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import messagesIcon from 'react-native-vector-icons/AntDesign';
// import Dashboard from '../screens/Dashboard';
// import Reportitem from '../screens/Reportitem';
// import Admindashboard from '../screens/Admindashboard';
// import Colors from '../styles/Colors';
// import {useSelector} from 'react-redux';
// import {
//   responsiveFontSize,
//   responsiveHeight,
// } from 'react-native-responsive-dimensions';
// import Messages from '../screens/Messages';

// const Tab = createBottomTabNavigator();

// const BottomTab = () => {
//   const {user} = useSelector(state => state.Auth);
//   const isAdmin = user?.role === 'admin';

//   return (
//     <Tab.Navigator
//       screenOptions={({route}) => ({
//         tabBarStyle: {
//           height: responsiveHeight(7),
//         },
//         tabBarActiveTintColor: Colors.primary,
//         tabBarInactiveTintColor: Colors.grayInput,
//         headerShown: false,
//         tabBarLabelStyle: {
//           fontWeight: 'bold',
//           fontSize: responsiveFontSize(1.3),
//         },
//         tabBarIcon: ({focused, color, size}) => {
//           let iconName;

//           if (route.name === 'Dashboard') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'AddItem') {
//             iconName = focused ? 'add-circle' : 'add-circle-outline';
//           } else if (route.name === 'Messages') {
//             iconName = focused ? 'chat' : 'chat-outline';
//           } else if (route.name === 'AdminDashboard') {
//             iconName = focused
//               ? 'shield-checkmark'
//               : 'shield-checkmark-outline';
//           }

//           return iconName === 'Messages' ? (
//             <messagesIcon name={iconName} size={size} color={color} />
//           ) : (
//             <Ionicons name={iconName} size={size} color={color} />
//           );
//         },
//       })}>
//       {isAdmin ? (
//         <>
//           <Tab.Screen name="AdminDashboard" component={Admindashboard} />
//           <Tab.Screen name="AddItem" component={Reportitem} />
//           <Tab.Screen name="Messages" component={Messages} />
//         </>
//       ) : (
//         <>
//           <Tab.Screen name="Dashboard" component={Dashboard} />
//           <Tab.Screen name="AddItem" component={Reportitem} />
//           <Tab.Screen name="Messages" component={Messages} />
//         </>
//       )}
//     </Tab.Navigator>
//   );
// };

// export default BottomTab;

import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Corrected import for AntDesign
import Dashboard from '../screens/Dashboard';
import Reportitem from '../screens/Reportitem';
import Admindashboard from '../screens/Admindashboard';
import Colors from '../styles/Colors';
import {useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Messages from '../screens/Messages';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const {user} = useSelector(state => state.Auth);
  const isAdmin = user?.role === 'admin';

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          height: responsiveHeight(7),
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grayInput,
        headerShown: false,
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: responsiveFontSize(1.3),
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'AddItem') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Messages') {
            iconName = focused ? 'message1' : 'message1'; // AntDesign message icon
            return <AntDesign name={iconName} size={size} color={color} />;
          } else if (route.name === 'AdminDashboard') {
            iconName = focused
              ? 'shield-checkmark'
              : 'shield-checkmark-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}>
      {isAdmin ? (
        <>
          <Tab.Screen name="AdminDashboard" component={Admindashboard} />
          <Tab.Screen name="AddItem" component={Reportitem} />
          <Tab.Screen name="Messages" component={Messages} />
        </>
      ) : (
        <>
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="AddItem" component={Reportitem} />
          <Tab.Screen name="Messages" component={Messages} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTab;
