import React from 'react'
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const Home = (props)=>{

    return(
        <View style={styles.root}>
            <View style={{flexDirection:"column",justifyContent: "center"}}>
                <TouchableOpacity activeOpacity={0.6} onPress={()=> props.navigation.navigate("video-albums")}>
                    <View style={styles.container}>
                    <Icon name='youtube' size={50} color="white" />
                    <Text style={{color:"white"}}> Videos</Text>
                        <Image />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={()=> props.navigation.navigate("image-albums")}>
                    <View style={styles.container}>
                            <Icon name='image' size={50} color="white" />
                            <Text style={{color:"white"}}> Images</Text>
                            <Image />
                    </View>
                </TouchableOpacity>
                <View style={styles.container}>
                <Icon name='music' size={50} color="white"  />
                <Text style={{color:"white"}}> Music</Text>
                    <Image />
                </View>
                <View style={styles.container}>
                <Icon name='meditation' size={50} color="white"  />
                <Text style={{color:"white"}}> Meditation</Text>
                    <Image />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        flexDirection:"row",
        flexWrap: "wrap",
        justifyContent: "center",
        height:height
    },
    container:{
        width: width*0.8,
        height: height*0.2,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F862C2",
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
    }
})

export default Home