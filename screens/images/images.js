import React,{useState, useEffect} from 'react'
import { StyleSheet, Image,View, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll"
import { Platform } from "react-native"
import {useSelector} from 'react-redux'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const ThumbnailSize = 80
const ThumbnailSpacing = 10

const Images =(props)=> {
    const {album,index} = props.route.params
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
        // StatusBar.setHidden(true)
        getPicture()
    }, [])

    // const scrollToActiveIndex = (index)=>{
    //     setActiveIndex(index)
    //     topRef?.current?.scrollToOffset({
    //         offset: index*width,
    //         animate: true,
    //     })
    //     if(index*(ThumbnailSize+ThumbnailSpacing)- ThumbnailSize/2 > width/2){
    //         thumbRef?.current?.scrollToOffset({
    //             offset: index*(ThumbnailSize+ThumbnailSpacing)-width/2 + ThumbnailSize/2,
    //             animate: true,
    //         })
    //     } 
    //     else{
    //         thumbRef?.current?.scrollToOffset({
    //             offset:0,
    //             animate: true,
    //         })
    //     }
    // }

    // const topRef = useRef()
    // const thumbRef = useRef()

    if(!photos){
        return null
    }
    
    return (
        <View style={styles.root}>
                <FlatList 
                    // ref={topRef}
                    data={photos}
                    keyExtractor={item=> item.node.image.uri}
                    horizontal
                    pagingEnabled
                    // onMomentumScrollEnd={ev =>{
                    //     scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
                    // }}
                    style={{height:height}}
                    showsHorizontalScrollIndicator={false}
                    getItemLayout={(data, index) => (
                        {length: width, offset: width * index, index}
                      )}
                    initialScrollIndex={index}
                    renderItem={({item})=>{
                        return(
                            <Image style={styles.image} source={{uri:`${item.node.image.uri}`}} />
                        )
                    }}
                />
                {/* <FlatList 
                    data={photos}
                    ref={thumbRef}
                    keyExtractor={item=> item.node.image.uri}
                    horizontal
                    style={{position: "absolute",bottom: ThumbnailSize,}}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: ThumbnailSpacing}}
                    renderItem={({item,index})=>{
                        return(
                        <TouchableOpacity
                            onPress={()=> scrollToActiveIndex(index)}
                            activeOpacity={0.7}
                        >
                            <Image style={[styles.thumbnail,{borderColor: activeIndex===index? "#fff":"transparent"}]} 
                            source={{uri:`${item.node.image.uri}`}} />
                        </TouchableOpacity>
                        )
                    }}
                /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#000",
        flex:1,
    },
    image:{
        height:height,
        width:width,
        // margin: 20,
        resizeMode: "center",
    },
    thumbnail:{
        width: ThumbnailSize,
        height: ThumbnailSize,
        borderRadius:12,
        marginRight: ThumbnailSpacing,
        resizeMode: "cover",
        borderWidth: 2,
    }
})

export default Images
