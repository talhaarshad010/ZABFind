import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import CustomDrawerContent from '../components/CustomDrawer';
import BottomTab from './bottomtab';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: Dimensions.width >= 768 ? 'permanent' : 'front',
        drawerItemStyle: {display: 'none'},
        drawerStyle: {
          width: Dimensions.width >= 768 ? '25%' : '75%',
          backgroundColor: '#fff',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="BottomTab" component={BottomTab} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
