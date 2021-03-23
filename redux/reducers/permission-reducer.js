import { CHECK_PERMISSION } from "../types/all-types"

const initialState = {
    hasPermission : false,
}

const PermissionReducer = (state=initialState,action)=>{
    switch(action.type){
        case CHECK_PERMISSION:
            return{
                hasPermission: action.payload,
            }
        default:
            return state
    }
}

export default PermissionReducer