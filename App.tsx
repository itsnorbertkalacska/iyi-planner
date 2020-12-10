import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/app/home';
import DetailScreen from './src/app/detail';
import InstaLogin from './src/app/insta-login';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Your Grid' }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: 'Post Details' }}
        />
        <Stack.Screen
          name="InstaLogin"
          component={InstaLogin}
          options={{ title: 'Login with Your Instagram' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
