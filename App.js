import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen_00 from './screens/Screen_00';
import Screen_01 from './screens/Screen_01';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Ẩn header cho màn hình đăng nhập
        />
        <Stack.Screen 
          name="Screen_01" 
          component={Screen_01} 
          options={{ 
            headerTitle: 'Home',
            headerBackTitleVisible: false,
            headerStyle: {
              elevation: 0, 
              shadowOpacity: 0, 
              borderBottomWidth: 0, 
            },
          }}
        />
        <Stack.Screen 
          name="SignUpScreen" 
          component={SignUpScreen} 
          options={{ headerShown: false }} // Ẩn header cho màn hình đăng nhập
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
