import { View, Text, TextInput ,Button, TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import MapView, {Marker,Circle,  Polygon,PROVIDER_GOOGLE} from 'react-native-maps'
import * as Location from 'expo-location';
import * as turf from '@turf/turf';

// let areacolor = "rgba(100, 200, 200, 0.5)";


export default function FarmScreen() {
   
   const [coordinates , setCoordinates] = useState([]); 
   const [currentLocation, setCurrentLocation] = useState({});
   const [area, setArea] = useState(0);
   const [areacolor, setAreacolor] = useState("rgba(100, 200, 200, 0.5)");
   
  //  useEffect(() => {
  //   if (hasLocationPermission()) { 
  //     console.log(hasLocationPermission())
  //     // You need to implement this function to check for location permissions
  //     Geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setCurrentLocation({ latitude, longitude });
  //       },
  //       (error) => {
  //         // Handle error
  //       },
  //       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );
  //   }
  // }, []);
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setCurrentLocation({latitude:location.coords.latitude, longitude:location.coords.longitude});
    })();
  }, []);

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
     setAreacolor("#90ee90");
  }


  
  return (

    <View style={{flex:1, marginTop:40}}>
        <Text style={{fontSize:20, paddingLeft:20}}>Map your Field</Text>
       <TextInput placeholder="Enter your Location" style={{ padding:20,marginTop: 20,width:'100%',height:60, borderWidth:2, fontSize:20}}/>
       <MapView
        mapType='hybrid'
        style={{ flex: 1, 
            height:80,
        }}
        
        provider={PROVIDER_GOOGLE}
        showsUserLocation
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
      <Text>Area: {area} sq.mt</Text>
      <View style={{padding:15, alignItems:'center'}}>
      {areacolor === "#90ee90" ? <TouchableOpacity style={{height:30, width:'50%', backgroundColor:'skyblue'}}>
             <Text style={{fontSize:24}} >Confirm</Text>
       </TouchableOpacity> :  <TouchableOpacity style={{height:30, width:'50%', backgroundColor:'skyblue'}} onPress={()=>saveBoundary(coordinates)} >
             <Text style={{fontSize:24}} >Save Bondary</Text>
         </TouchableOpacity>
       
         
          } 
        </View>

      
     
    </View>
  )
}