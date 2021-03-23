import {createStore,applyMiddleware} from 'redux'
import { PermissionsAndroid } from "react-native"

import checkPermission from '../action/check-permission'
import rootReducer from '../reducers'

const hasAndroidPermission = ()=>{
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    return async function(dispatch){
        const hasPermission = await PermissionsAndroid.check(permission)
        dispatch(checkPermission(hasPermission))
    }
}


const thunk = require('redux-thunk').default
const store = createStore(rootReducer,applyMiddleware(thunk))

store.subscribe(()=> console.log(store.getState()))
store.dispatch(hasAndroidPermission())
export default store