import { StyleSheet,TouchableOpacity, View, Text , Button, Image} from 'react-native'
import React , {useContext, useEffect} from 'react'
import { client } from '../../Constants/KindConfig';
// import AuthContext from '../../App';
import { AuthContext } from '../../Constants/AuthContext';
import Header from '../Components/Header';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Mapmyfarm from '../Components/Mapmyfarm';
import DefaultComponent from '../Components/DefaultComponent';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();
    return(
      <View style={{marginTop:30}}> 
      <Text style={{fontSize:40 , margin:20}} >Welcome to GeoFence App</Text>  
    <Image
        style={{ width: 370, height: 200 ,marginTop:20 , marginBottom:30}}
        source={{ uri: 'https://assets.website-files.com/5cb818e9bfadbe53aa4ed7e0/5e288d127e735f7ba2972e25_Geofencing.png' }}
      />
      <Button  title="Measure My Farm" onPress={() => navigation.navigate('otherScreen')} />
     
        
      </View>
    )
   
    }




