import React from 'react';
import Main from './Main';
import Selection from './Selection';
import WardrobeTab from './wardrobTab';
import FullView from './FullView';
import {StatusBar} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Main"
        component={Main}/>
        <Stack.Screen name="Selection"
        component={Selection}/>
        <Stack.Screen name="WardrobeTab"
        component={WardrobeTab}/>
        <Stack.Screen name="FullView"
        component={FullView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;