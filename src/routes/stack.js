import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './bottomtab';
import Viewdetails from '../screens/Viewdetails';

const Stack = createNativeStackNavigator();

const StackRoute = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyBottomTab" component={BottomTab} />
      <Stack.Screen name="ViewDetails" component={Viewdetails} />
    </Stack.Navigator>
  );
};
export default StackRoute;
