import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Viewdetails from '../screens/Viewdetails';
import MyDrawer from './drawer';
import Reportitem from '../screens/Reportitem';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const StackRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="ViewDetails" component={Viewdetails} />
      <Stack.Screen name="ReportItem" component={Reportitem} />
      <Stack.Screen name="MyProfile" component={Profile} />
    </Stack.Navigator>
  );
};
export default StackRoute;
