import { View, Text, Button, Image } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { client } from '../../Constants/KindConfig';
import { AuthContext } from '../../Constants/AuthContext'
import { db } from '../../firebaseConfig'
import {ref, onValue} from 'firebase/database';

// import { getDatabase, ref, onValue } from "firebase/database";

// const db = getDatabase();
// const starCountRef = ref(db, 'devicelocations/' + '/deviceId' )
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });





export default function ProfileScreen() {

  const [fetchData, setfetchData] = useState([]);

  useEffect(() => {
    const starcountRef = ref(db, 'devicelocations/');
    onValue(starcountRef, (snapshot) => {
      const data = snapshot.val();
      const newPosts = Object.keys(data).map((key) => ({
            id:key,
            ...data[key],
      }))
      console.log(data);
      setfetchData(newPosts);
      console.log(newPosts);
    })
  }, [])

  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    const loggedout = await client.logout();
    if (loggedout) {
       console.log(auth);
      // auth = false;
      setAuth(false);
      console.log("Logout success")
      // User was logged out
    }
  }



  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    getUserDetails();

  }, [])

  const getUserDetails = async () => {
    const user = await client.getUserDetails();
    setUserDetail(user);
  }



  return (
   <View style={{marginTop:30}}>
    <View style={{ marginBottom:20,display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
      <Image source={{ uri: userDetail?.picture }}
        style={{ width: 45, height: 45, borderRadius: 99 }}
      />
      <View>
        <Text style={{ fontSize: 18 }}>Welcome</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hello {userDetail?.given_name}</Text>
      </View>

    </View>
    <View >
     {
       fetchData.map((item) => {
         return (
           <View key={item.id} style={{marginBottom:15}}>
             <Text>DeviceID: {item.id}</Text>
             <Text>Body: {item.longitude}</Text>
             <Text>Title: {item.latitude}</Text>
           </View>
         )
       })
     }
      </View>
    <Button title="LogOut" onPress={handleLogout} />

    </View>

  )
}



