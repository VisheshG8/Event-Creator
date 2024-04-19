import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingScreen1 from '../screens/OS1';
import OnboardingScreen2 from '../screens/OS2';
import OnboardingScreen3 from '../screens/OS3';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
      <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        animation: 'slide_from_right',
        headerBackTitleVisible: false,
      }}>
        <Stack.Screen
          name="OnboardingScreen1"
          component={OnboardingScreen1}
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="OnboardingScreen2" 
          component={OnboardingScreen2}  
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OnboardingScreen3" 
          component={OnboardingScreen3}  
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="Login" 
        component={Login}
        options={{ headerShown: false }}
         />
        <Stack.Screen 
        name="Signup" 
        component={Signup}
        options={{ headerShown: false }}
         />
          <Stack.Screen 
        name="Home" 
        component={Home}
        options={{ headerShown: false }}
         />
      </Stack.Navigator>
  );
};

export default AppNavigation;
