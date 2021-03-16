import React from 'react'
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native'

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const Home = ()=>{
    return(
        <View style={styles.root}>
            <View style={{flexDirection:"column",justifyContent: "center"}}>
                <View style={styles.container}>
                <Text style={{color:"white"}}> Videos</Text>
                    <Image />
                </View>
                <View style={styles.container}>
                <Text style={{color:"white"}}> Images</Text>
                    <Image />
                </View>
                <View style={styles.container}>
                <Text style={{color:"white"}}> Music</Text>
                    <Image />
                </View>
                <View style={styles.container}>
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