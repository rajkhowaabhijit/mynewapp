import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {Provider} from 'react-redux'

import Home from './screens/home'
import Images from './screens/images/images'
import store from './redux/store'
import ImageAlbums from './screens/images/image-albums'
import VideoAlbum from './screens/videos/video-album'
import ImagesGrid from './screens/images/image-grid'
import VideosGrid from './screens/videos/video-grid'

const Stack = createStackNavigator()


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen name="loading" component={Loading} options={{headerShown:false}} />
          <Stack.Screen name="welcome" component={Welcome} options={{headerShown:false}} />
          <Stack.Screen name="signin" component={Signin} options={{headerShown:false}} />
          <Stack.Screen name="signup" component={Signup} options={{headerShown:false}} initialParams={{ socialEmail: "" }} /> */}
          <Stack.Screen name="home" component={Home} options={{headerShown:false}} />
          <Stack.Screen name="images" component={Images} options={{headerShown:false}} />
          <Stack.Screen name="image-albums" component={ImageAlbums} options={{headerShown:false}} />
          <Stack.Screen name="image-grid" component={ImagesGrid} options={{headerShown:false}} />
          <Stack.Screen name="video-albums" component={VideoAlbum} options={{headerShown:false}} />
          <Stack.Screen name="video-grid" component={VideosGrid} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>         
    </Provider>
  )
}

export default App
