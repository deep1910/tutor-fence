import { View, Text, Image, Modal, FlatList, StyleSheet, TouchableOpacity , Button} from 'react-native'
import React, { useState } from 'react'
import {Ionicons} from '@expo/vector-icons'


export default function MapmyfarmScreen({navigation}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const data = ['Java', 'JavaScript', 'Python', 'C++', 'Ruby'];

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            setSelectedValue(item);
            setModalVisible(false);
        }}>
            <Text style={{marginBottom:5, fontSize:20, color:'yellow'}}>{item}</Text>
        </TouchableOpacity>
    );




    return (
        <View style={{ marginTop: 40 }}>
            <View style={{ padding: 20, alignItems: 'center', borderWidth: 1, marginHorizontal: 20 }} >

                <Image style={{ height: 100, width: 100, marginBottom: 10 }}
                    source={{ uri: "https://th.bing.com/th/id/OIP.G0TZQE-WfrNupua_JJeB6QHaFj?rs=1&pid=ImgDetMain" }} />
                <Text style={{ marginBottom: 10, fontSize: 20 }}>Measure my field</Text>
                <Text style={{ marginBottom: 20 }}>Calculate your field size accurately</Text>
                <View style={{ display: "flex" }}>
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            presentationStyle="overFullScreen"
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalView}>
                                    <Text style={{fontSize:20, color:'white' , marginBottom:20}}>Select Field</Text>
                                    <FlatList
                                        style={{marginBottom:20, }}
                                        data={data}
                                        renderItem={renderItem}
                                        keyExtractor={item => item}
                                    />
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <View style={{display:'flex', gap:10, flexDirection:'row',marginBottom: 30, alignItems:'center'}}>
                                            <Ionicons name="add" size={24}  color="white"/>
                                            <Text style={{fontSize:20, color:'white'}}>Add Field</Text>
                                        </View>
                                    </TouchableOpacity>    
                                </View>
                            </View>
                        </Modal>
                        <TouchableOpacity style={{ display: 'flex',gap:9,flexDirection:'row', borderWidth: 2, paddingHorizontal: 50, paddingVertical: 20, alignItems:'center' }} onPress={() => setModalVisible(true)}>
                            <Text>Select the Field</Text>
                            <Ionicons name="caret-down-outline" />
                        </TouchableOpacity>

                        {selectedValue && 
                        <View style={{marginTop:20, alignItems:'center'}}>
                               <Text style={{fontSize:20, marginBottom:10}}>{selectedValue}</Text>
                               <Button title="Measure" onPress={() => navigation.navigate('FarmScreen')} />
                         </View>}
                    </View>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    // container: {
    //     //   flex:1,
    //     // justifyContent: 'center',
    //     alignItems: 'center',
    //     margin: 10,
    //     borderWidth: 1,
    //     borderRadius: 3,
    //     borderColor: 'black',


    //     //   opacity:1
    //     height: 600,
    // },
    modalView: {
        backgroundColor: "grey",
        width: '100%',
        height: 'auto',
        // backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft:30,
        paddingTop:10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height:'auto'
    },


}
)