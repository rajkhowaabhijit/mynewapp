import React,{useState, useEffect} from 'react'
import {ScrollView,LogBox} from 'react-native'
import CameraRoll from "@react-native-community/cameraroll"
import { Platform } from "react-native"
import {useSelector} from 'react-redux'
import AlbumCard from '../../components/album-card'

const ImageAlbums=(props)=> {
    const [albums,setAlbums] = useState(null)
    const permission = useSelector(state => state.androidPermission.hasPermission)
    
    const getAlbums = async()=> {
        if (Platform.OS === "android" && !permission) {
          return
        }
      
        await CameraRoll.getAlbums({
            assetType: "Photos",
        })
        .then(r => {
            setAlbums(r)
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
            <AlbumCard 
                onPress={()=> props.navigation.navigate("image-grid",{album:"All"})}
                title="All"
                album="All"
            />
            { albums ?
                albums.map((album,i)=>{
                    return( 
                        <AlbumCard 
                        key={i}
                        onPress={()=> props.navigation.navigate("image-grid",{album:album.title})}
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

export default ImageAlbums
