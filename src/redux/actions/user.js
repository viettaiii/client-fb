import * as actionTypes from '../constants/user';
import httpsRequest from '../../api/axios';

export const getUserProfile =  (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_USER_PROFILE_REQUEST,
        })
        const {data} = await httpsRequest.get("/api/users/find/" + id);
        dispatch({
            type: actionTypes.GET_USER_PROFILE_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
        dispatch({
            type: actionTypes.GET_USER_PROFILE_FAIL,
        })
    }
}

export const getUsers = () => async (dispatch) => {
    try {
        const {data} = await httpsRequest.get("/api/users");
        dispatch({
            type : actionTypes.GET_USERS,
            payload : data
        })
    }catch(e) {
        console.log(e);
    }
}

export const updateUser =  (inputs) => async (dispatch) => {
    try {
        const {data} = await httpsRequest.patch("/api/users/update",   inputs);
        dispatch({
            type: actionTypes.GET_USER_PROFILE_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
        console.log(e);
    }
}



