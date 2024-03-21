import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginOrProfileRouter = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={Login} />
      <Stack.Screen name="ProfileScreen" component={Profile} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ color, size,  }) => (
              <Icon name="home" size={size} color={color} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="AddPhoto"
          component={AddPhoto}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="camera" size={size} color={color} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Profile"
          component={LoginOrProfileRouter}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" size={size} color={color} />
            ),
            headerShown: false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;