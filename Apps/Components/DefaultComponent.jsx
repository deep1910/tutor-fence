import { View, Text, Image , Button} from 'react-native'
import React from 'react'

export default function DefaultComponent() {
  return (
    <View>
     <Image
         style={{ width: 350, height: 200 ,marginTop:20 , marginBottom:360}}
        source={{uri: 'https://assets.website-files.com/5cb818e9bfadbe53aa4ed7e0/5e288d127e735f7ba2972e25_Geofencing.png' }} />
        <Button title='Deep house' />
    </View>
  )
}