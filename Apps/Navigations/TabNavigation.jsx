import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FarmScreen from '../Screens/FarmScreen';
import ProfileScreen from '../Screens/ProfileScreen';
// import HomeScreen from '../Screens/HomeScreen';
import {Ionicons} from '@expo/vector-icons'
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (

    <Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:'#fff888' }}>
    <Tab.Screen name="Home" component={HomeNavigation} 
      options={{
        tabBarIcon:(color,size) =>(
           <Ionicons name="home" size={24} color="black" />
          ),
        tabBarLabel:() => {
          <Text style={{fontSize: 34, fontWeight:'bold'}}>Home</Text>
        }
        
      }}
    />
    <Tab.Screen name="FarmScreen" component={FarmScreen} 
    options={{
      tabBarIcon:(color,size) =>(
         <Ionicons name="bonfire" size={24} color="black" />
        ),
      tabBarLabel:() => {
        <Text style={{fontSize: 34, fontWeight:'bold'}}>Home</Text>
      }
      
    }}/>
    <Tab.Screen name="ProfileScreen" component={ProfileScreen} 
    options={{
      tabBarIcon:(color,size) =>(
         <Ionicons name="person" size={24} color="black" />
        ),
      tabBarLabel:() => {
        <Text style={{fontSize: 34, fontWeight:'bold'}}>Home</Text>
      }
      
    }}/>
  </Tab.Navigator>
  )
}


