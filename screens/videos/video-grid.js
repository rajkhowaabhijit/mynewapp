import React,{useState, useEffect} from 'react'
import { StyleSheet, Image,View, Dimensions, FlatList, TouchableOpacity, Text } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll"
import { Platform } from "react-native"
import {useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const width = Dimensions.get('window').width
const size = width*0.3
const spacing = 3

const VideosGrid =(props)=> {
    const {album} = props.route.params
    const [photos,setPhotos] = useState(null)
    const permission = useSelector(state => state.androidPermission.hasPermission)
      
    const getPicture = async()=> {

        if (Platform.OS === "android" && !permission) {
          return
        }
        album==="All" ? 
            CameraRoll.getPhotos({
                first: 3000,
                assetType: "Videos",
                include: [
                    'playableDuration'
                ]
            })
            .then(r => {
                setPhotos(r.edges)
                console.log(photos[0])  
            })
            .catch((err) => {
                //Error Loading Images
                console.log("error loading images",err)
            })
        :
            CameraRoll.getPhotos({
                first: 3000,
                assetType: "Videos",
                groupName: album, 
                include: [
                    'playableDuration' 
                ]
            })
            .then(r => {
                setPhotos(r.edges)
                console.log(photos[0]) 
            })
            .catch((err) => {
                //Error Loading Images
                console.log("error loading images",err)
            })
    }

    const duration = (sec)=>{
        const second = Math.floor(sec%60)
        let minute = Math.floor(sec/60)
        const hour = Math.floor(minute/(60))
        if(hour>0){
            minute=minute%60
        }

       return `${hour}.${minute}.${second}`
    }

    useEffect(() => {
        getPicture()
    }, [])

    if(!photos){
        return null
    }
    
    return (
        <View style={styles.root}>
                <FlatList 
                    data={photos}
                    keyExtractor={item=> item.node.image.uri}
                    style={{height:size}}
                    numColumns={3}
                    renderItem={({item,index})=>{

                        return(
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.grid}
                                onPress={()=> props.navigation.navigate("images",{index,album})}
                            >
                                <Image style={styles.image} source={{uri:`${item.node.image.uri}`}} />
                                <View style={{width:size,height:size,backgroundColor:"#0004",position:"absolute",top:0,alignItems:"flex-end",flexDirection:"row",padding:10}}>
                                    <Icon name="play-circle-outline" size={18} color="white" />
                                    <Text style={{color:"#fff",marginLeft:5}}>{duration(item.node.image.playableDuration)}</Text>
                                    {
                                        console.log(duration(3925))
                                    }
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: "100%",
        width: "100%",
        // justifyContent: "flex-start",
        // alignItems: "center",
        backgroundColor:"#fff",
        flex:1,
        padding:spacing*3,
    },
    image:{
        height:size,
        width:size,
        resizeMode: "cover",
    },
    grid:{
        height:size,
        width:size,
        margin: spacing, 
    }
})

export default VideosGrid
