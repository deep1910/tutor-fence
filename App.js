import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { useEffect, useState , createContext } from 'react';
import { client } from './Constants/KindConfig';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigations/TabNavigation';
import {AuthContext} from './Constants/AuthContext';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultComponent from './Apps/Components/DefaultComponent';

// export const AuthContext = createContext();
// export const AuthContext = createContext();
export default function App() {

  const Stack = createStackNavigator();
  // const [auth ,setAuth] = useState(false);
const [auth,setAuth] = useState(false);
  
useEffect(() => {
  checkAuthenticate();
}, [auth]);


  const checkAuthenticate = async () => {
    // Using `isAuthenticated` to check if the user is authenticated or not
    if (await client.isAuthenticated) {
      const userProfile = await client.getUserDetails();
      console.log(userProfile); 
      setAuth(true);
        // Need to implement, e.g: call an api, etc...
    } else {
      setAuth(false);
      //  <LoginScreen/>
        // Need to implement, e.g: redirect user to sign in, etc..
    }
};





  return (
    <View style={styles.container}>
      <AuthContext.Provider value={{auth,setAuth}}>
       <NavigationContainer>
        
         {auth ?  <Stack.Navigator> 
               <Stack.Screen name="Tabs" component={TabNavigation} options={{headerShown:false}}/>
               <Stack.Screen name="Default" component={DefaultComponent} options={{headerShown:false}}/> 
                                    {/* <TabNavigation/>  */}
               </Stack.Navigator>
                   : <LoginScreen/>}




       
       
      </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  
  },
});
