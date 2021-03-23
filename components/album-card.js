import React,{useState} from 'react'
import {TouchableOpacity,ImageBackground,Text,Dimensions,View} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll"

const width = Dimensions.get('window').width
const size = width*0.4
const spacing = 18

const AlbumCard =(props)=> {
    const [image,setImage] = useState(null)

    const backgroundPhotos = (album)=>{
        album==="All" ? 
            CameraRoll.getPhotos({
                first: 1,
                assetType: "Photos",
            })
            .then(r => {
                setImage(r.edges[0].node.image.uri)
                // console.log(image) 

            })
            .catch((err) => {
                //Error Loading Images
                console.log("error loading images",err)
            })
        :
            CameraRoll.getPhotos({
                first: 1,
                assetType: "Photos",
                groupName:album
            })
            .then(r => {
                setImage(r.edges[0].node.image.uri)
                // console.log(image) 

            })
            .catch((err) => {
                //Error Loading Images
                console.log("error loading images",err)
        }) 
    }
    return (
        <TouchableOpacity 
        activeOpacity={0.6}
        onPress={props.onPress}
        style={{justifyContent:"center",width:size,height:size,borderRadius:10,margin:spacing}}>
            {backgroundPhotos(props.album)}
            {image ? (
                <ImageBackground source={{uri:`${image}`}} style={{flex:1,resizeMode:"cover",justifyContent:"center",}} imageStyle={{borderRadius:10,}}> 
                    <View style={{flex:1,backgroundColor:"#0009",borderRadius:10,justifyContent:"center"}}>
                        <Text style={{alignSelf:"center",color:"#fff"}}>{props.title}</Text>
                        <Text style={{alignSelf:"center",color:"#fff"}}>{props.count}</Text>
                    </View>
                </ImageBackground> 
            ): null}
        </TouchableOpacity> 
    )
}

export default AlbumCard