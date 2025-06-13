/**
 * @format
 */

import {AppRegistry, StatusBar} from 'react-native';
import {name as appName} from './app.json';
import Routes from './src/routes/Routes';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import StackRoute from './src/routes/stack';
import BottomTab from './src/routes/bottomtab';

const APP = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => APP);
