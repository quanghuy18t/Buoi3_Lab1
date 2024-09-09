import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ImageScreen from './screens/ImageScreen';
import { NoteProvider } from './context';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NoteProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, orientation: 'all' }} />
          <Stack.Screen name="Image" component={ImageScreen} options={{ headerShown: false, orientation: 'all' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NoteProvider>
  )
};