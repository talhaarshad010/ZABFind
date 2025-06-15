import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from '../screens/Dashboard';
import Colors from '../styles/Colors';
import {StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Reportitem from '../screens/Reportitem';
import Admindashboard from '../screens/Admindashboard';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          height: responsiveHeight(9),
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
          } else if (route.name === 'AddItem') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'AdminDashboard') {
            iconName = focused
              ? 'shield-checkmark'
              : 'shield-checkmark-outline';
          }
          // else if (route.name === 'My Profile') {
          //   iconName = focused ? 'person-circle' : 'person-circle-outline';
          // }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="AddItem" component={Reportitem} />
      <Tab.Screen name="AdminDashboard" component={Admindashboard} />
      {/* <Tab.Screen name="My Profile" component={Profile} /> */}
    </Tab.Navigator>
  );
};

export default BottomTab;
