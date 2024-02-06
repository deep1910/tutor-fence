import { View, Text, Image, Button} from 'react-native'
import React, {useState,  useEffect } from 'react'
import { client } from '../../Constants/KindConfig';

export default function Header() {
    
    const [userDetail, setUserDetail] = useState();

    useEffect(()=>{
        getUserDetails();
    
    },[])

    const getUserDetails = async() => {
       const user = await client.getUserDetails();
       setUserDetail(user);
    }

    return (
    <View style={{display:'flex', flexDirection:'row', gap:5, alignItems:'center'}}>
        <Image source={{uri:userDetail?.picture}}
         style={{width: 45, height: 45, borderRadius:99}}
        />
        <Button title="Measure my farm" onPress={handleLogout} />
       
    </View>
  )
}