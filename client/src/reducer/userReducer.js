import { LOGIN_USER_FAIL,LOGIN_USER_SUCCESS,LOGIN_USER_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAIL } from "../constants/userConstants"
import { REGISTER_USER_FAIL,REGISTER_USER_SUCCESS,REGISTER_USER_REQUEST,ADD_MESSAGE,CLEAR_ERRORS} from "../constants/userConstants"
import { GET_USER_DETAILS_FAIL,GET_USER_DETAILS_SUCCESS } from "../constants/userConstants"
export const userReducer = (state={user:{isAuthenticated:false}},action) => {
   switch(action.type){
    case LOGIN_USER_REQUEST:
    case REGISTER_USER_REQUEST:
       return {...state,
        loading:true,
        isAuthenticated:false
    }
    case LOGIN_USER_SUCCESS:
    case REGISTER_USER_SUCCESS:
        return {...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload.user,
            token:action.payload.token,
            messages:action.payload.user.messages
        }
    case LOGIN_USER_FAIL:
    case REGISTER_USER_FAIL:
        return {...state,
            loading:false,
            isAuthenticated:false,
            user:null,
            token:null,
            error:action.payload}
    case LOGOUT_SUCCESS:
        console.log("im in logout success reducer")
        return {
            ...state,
            loading:false,
            isAuthenticated: false,
            user : null,
            token:null,
        }
    case ADD_MESSAGE:
        return {
            ...state,
            messages:action.payload.messages
        }
    case LOGOUT_FAIL:
        return {
            ...state,
            error: action.payload
        }     
    case CLEAR_ERRORS:
        return {...state,error:null}
    default:
        return state;
   }
}
export const useDetailsReducer=(state={info:{}},action)=>{
    switch(action.type){
        case GET_USER_DETAILS_SUCCESS:
            console.log("im in success");
            console.log("payload",action.payload)
            return {...state,info:action.payload}
        case GET_USER_DETAILS_FAIL:
            return {...state,info:null}
        default:
            return state;
    }
}

