import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from '../screens/Dashboard';
import Reportitem from '../screens/Reportitem';
import Admindashboard from '../screens/Admindashboard';
import Colors from '../styles/Colors';
import {useSelector} from 'react-redux';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

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
          } else if (route.name === 'AddItem') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'AdminDashboard') {
            iconName = focused
              ? 'shield-checkmark'
              : 'shield-checkmark-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      {isAdmin ? (
        <>
          <Tab.Screen name="AdminDashboard" component={Admindashboard} />
          <Tab.Screen name="AddItem" component={Reportitem} />
        </>
      ) : (
        <>
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="AddItem" component={Reportitem} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTab;
