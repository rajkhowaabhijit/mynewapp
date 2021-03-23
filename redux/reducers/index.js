import { combineReducers } from "redux"
import PermissionReducer from "./permission-reducer"

const rootReducer = combineReducers({
    androidPermission: PermissionReducer,
})

export default rootReducer