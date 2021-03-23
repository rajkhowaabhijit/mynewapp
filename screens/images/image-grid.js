import React,{useState, useEffect} from 'react'
import { StyleSheet, Image,View, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll"
import { Platform } from "react-native"
import {useSelector} from 'react-redux'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const size = width*0.3
const spacing = 3

const ImagesGrid =(props)=> {
    const {album} = props.route.params
    const [photos,setPhotos] = useState(null)
    const [activeIndex,setActiveIndex] = useState(0)
    const permission = useSelector(state => state.androidPermission.hasPermission)
      
    const getPicture = async()=> {

        if (Platform.OS === "android" && !permission) {
          return
        }
        album==="All" ? 
            CameraRoll.getPhotos({
                first: 3000,
                assetType: "Photos",
            })
            .then(r => {
                setPhotos(r.edges)
            })
            .catch((err) => {
                //Error Loading Images
                console.log("error loading images",err)
            })
        :
            CameraRoll.getPhotos({
                first: 3000,
                assetType: "Photos",
                groupName: album,
            })
            .then(r => {
                setPhotos(r.edges)
            })
            .catch((err) => {
                //Error Loading Images
                console.log("error loading images",err)
            })
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
                        console.log(index)
                        return(
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.grid}
                                onPress={()=> props.navigation.navigate("images",{index,album})}
                            >
                                <Image style={styles.image} source={{uri:`${item.node.image.uri}`}} />
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

export default ImagesGrid
