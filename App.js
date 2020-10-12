import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import rootReducer from './src/store/reducers';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const Stack = createStackNavigator();

import {Home} from './src/screens/Home';
import {Results} from './src/screens/Results';
import {DriverInfo} from './src/screens/DriverInfo';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar backgroundColor={'#fff'} barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="DriverInfo"
            component={DriverInfo}
            options={{title: 'Driver Info'}}
          />
          <Stack.Screen name="Results" component={Results} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
