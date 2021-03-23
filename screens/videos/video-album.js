import React,{useState, useEffect} from 'react'
import {ScrollView,LogBox} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll"
import { Platform } from "react-native"
import {useSelector} from 'react-redux'
import VideoCard from '../../components/video-card'

const VideoAlbum=(props)=> {
    const [albums,setAlbums] = useState(null)
    const permission = useSelector(state => state.androidPermission.hasPermission)
    
    const getAlbums = async()=> {
        if (Platform.OS === "android" && !permission) {
          return
        }
      
        await CameraRoll.getAlbums({
            assetType: "Videos",
        })
        .then(r => {
            setAlbums(r)
            console.log(r)
          })
          .catch((err) => {
             //Error Loading Images
             console.log("error loading images",err)
          })
    }

    useEffect(() => {
        getAlbums()
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
    }, [])

    return (
        <ScrollView contentContainerStyle={{flexDirection:"row",justifyContent:"space-between",flexWrap:"wrap"}}>
            <VideoCard 
                onPress={()=> props.navigation.navigate("video-grid",{album:"All"})}
                title="All"
                album="All"
            />
            { albums ?
                albums.map((album,i)=>{
                    return( 
                        <VideoCard 
                        key={i}
                        onPress={()=> props.navigation.navigate("video-grid",{album:album.title})}
                        title={album.title}
                        album={album.title}
                        count={album.count}
                        />
                    )
                }) : null
            }
        </ScrollView> 
    )
}

export default VideoAlbum
