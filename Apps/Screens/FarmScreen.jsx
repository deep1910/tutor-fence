import { View, Text, TextInput ,Image, Button, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import MapView, {Marker,Circle,  Polygon,PROVIDER_GOOGLE} from 'react-native-maps'
import * as Location from 'expo-location';
import * as turf from '@turf/turf';
// import {Ionicons} from '@expo/vector-icons'
import {ref, onValue} from 'firebase/database'
import { db } from '../../firebaseConfig';

// let areacolor = "rgba(100, 200, 200, 0.5)";


export default function FarmScreen() {
   
   const [coordinates , setCoordinates] = useState([]); 
   const [currentLocation, setCurrentLocation] = useState({latitude: 20.77940, longitude:76.67873});
  //  const [currentLocation, setCurrentLocation] = useState({});
   const [area, setArea] = useState(0);
   const [areacolor, setAreacolor] = useState("rgba(100, 200, 200, 0.5)");
   

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
      //  console.log(newPosts[0].id);
      //  console.log(newPosts[0].latitude);
     })
   }, [])
 
  // console.log("Deep loaded success" + fetchData);
















  
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest});
      // console.log(location);
      setCurrentLocation({latitude:location.coords.latitude, longitude:location.coords.longitude});
    })();
  }, [currentLocation]);

  useEffect(()=>{
    if(coordinates.length === 4){
      // console.log(coordinates);
      const coordinatesArray = coordinates.map(coord => [coord.latitude, coord.longitude]);
      // console.log(coordinatesArray);
      coordinatesArray.push(coordinatesArray[0]);
      const polygon = turf.polygon([coordinatesArray]);
      // console.log(polygon);
      const calculatedArea = turf.area(polygon);
      // console.log(calculatedArea)
      setArea(calculatedArea);
    }

  }, [coordinates, areacolor])

  const saveBoundary = (coordinates) => { 
    console.log(coordinates);
    // setCoordinates(coordinates);
     setAreacolor("rgba(139, 226,139, 0.8)");
  }


  
  return (

    <View style={{flex:1, marginTop:40}}>
        <Text style={{fontSize:20, paddingLeft:20}}>Map your Field</Text>
       <TextInput placeholder="Enter your Location" style={{ padding:20,marginTop: 20,width:'100%',height:60, borderWidth:2, fontSize:20}}/>
       <MapView
        userInterfaceStyle='dark'
        mapType='hybrid'
        style={{ flex: 1, 
            height:80,
        }}
        
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 20.77940,
          longitude: 76.67873,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}


        onLongPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          
          // Only add a new coordinate if there are less than 4
          if (coordinates.length < 4) {
            setCoordinates([
              ...coordinates,
              { latitude, longitude },
            ]);
          }
        }}
      >
         {currentLocation && (
        <Marker
          coordinate={currentLocation}
          title="My Location"
        />
      )}

     { fetchData.length != 0  &&
      <Marker
      coordinate={{latitude:fetchData[0].latitude , longitude:fetchData[0].longitude}}
      >
         <Image source={require("../../assets/favicon.png")} style={{width:35, height:35}}/>
        

      </Marker>
      
       }
         {/* <Marker
        coordinate={{ latitude: 20.77940, longitude:76.67873 }}
        title="My Marker"
        description="Some description"
      />
       <Polygon
    coordinates={coordinates}
    fillColor="rgba(100, 200, 200, 0.5)"
    strokeColor="rgba(0, 0, 0, 1)"
    strokeWidth={2} */}

{coordinates.map((coordinate, index) => (
        // <Marker
        //   key={index}
        //   coordinate={coordinate}
        //   title={`Marker ${index + 1}`}
        //   description={`Latitude: ${coordinate.latitude}, Longitude: ${coordinate.longitude}`}
        // />
        <Circle
        key={index}
        center={coordinate}
        radius={7} // radius in meters
        strokeWidth={1}
        strokeColor={'#1a66ff'}
        fillColor={'yellow'}
      />
      ))}
      {coordinates.length === 4 && (
        <Polygon
          coordinates={coordinates}
          fillColor={areacolor}
          strokeColor="rgba(0, 0, 0, 1)"
          strokeWidth={2}
        />
      )}
  
      </MapView>
      {area!=0 && <Text style={{fontSize:19, paddingStart:20, padding:10}}>Area: {area * 0.00024711} acres</Text>}
      <View style={{padding:15, alignItems:'center'}}>
      {areacolor === "rgba(139, 226,139, 0.8)" ? <TouchableOpacity style={{height:30, width:'50%', backgroundColor:'skyblue'}}>
             <Text style={{fontSize:24}} >Confirm</Text>
       </TouchableOpacity> :  <TouchableOpacity style={{height:30, width:'50%', backgroundColor:'skyblue'}} onPress={()=>saveBoundary(coordinates)} >
             <Text style={{fontSize:24}} >Save Bondary</Text>
         </TouchableOpacity>
       
         
          } 
        </View>

      
     
    </View>
  )
}