import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MapmyfarmScreen from '../Screens/MapmyfarmScreen';
import HomeScreen from '../Screens/HomeScreen';

const Stack = createStackNavigator();


export default function HomeNavigation() {

    return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="otherScreen" component={MapmyfarmScreen} />
    
    </Stack.Navigator>
  )
}