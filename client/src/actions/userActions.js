import { LOGIN_USER_REQUEST, LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS } from "../constants/userConstants";
import { REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, REGISTER_USER_REQUEST, CLEAR_ERRORS } from "../constants/userConstants"
import { GET_USER_DETAILS_FAIL, GET_USER_DETAILS_SUCCESS } from "../constants/userConstants";
import axios from "axios";
export const login = (email, password) => async (dispatch) => {
    try {
        console.log("email", email);
        console.log("password", password);
        dispatch({
            type: LOGIN_USER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post("http://localhost:3001/users/login", { email, password }, config);
        console.log("data", data);
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log("error", error);
        console.log("error", error.response.data.errMessage);
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const register = (userData) => async (dispatch) => {
    console.log("im in register");
    console.log("userdata", userData);
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post("http://localhost:3001/users/register", userData, config)
        console.log("registerdata", data);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log("error", error.response);
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//logout user
export const logoutUser = () => async (dispatch) => {
    console.log("im in load user");
    try {
        dispatch({
            type: LOGOUT_SUCCESS
        })
    } catch (error) {
        console.log("logouterrpr", error);
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const getUserDetails = (details) => (dispatch) => {
    console.log("action", details);
    try {
        dispatch({
            type: GET_USER_DETAILS_SUCCESS,
            payload: details
        })
    } catch (error) {
        dispatch({
            type: GET_USER_DETAILS_FAIL,
            payload: error
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}


