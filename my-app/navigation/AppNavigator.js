import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SendMessageScreen from '../screens/SendMessageScreen';
import RetrieveMessagesScreen from '../screens/RetrieveMessagesScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Send">
        <Stack.Screen name="Send" component={SendMessageScreen} />
        <Stack.Screen name="Retrieve" component={RetrieveMessagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}