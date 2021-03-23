import { CHECK_PERMISSION } from "../types/all-types"

const checkPermission = (permission)=>{
    return{
        type: CHECK_PERMISSION,
        payload: permission,
    }
}

export default checkPermission