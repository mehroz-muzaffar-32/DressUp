import React from 'react';
import Main from './Main';
import Selection from './Selection';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main"
        component={Main}/>
        <Stack.Screen name="Selection"
        component={Selection}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;