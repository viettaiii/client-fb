import * as actionTypes from '../constants/friend';
import httpsRequest from '../../api/axios';
export const getUserFriends =  (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_USER_FRIENDS_REQUEST,
        })
        const {data} = await httpsRequest.get('/api/friends?id='+id);
            dispatch({
            type: actionTypes.GET_USER_FRIENDS_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
        dispatch({
            type: actionTypes.GET_USER_FRIENDS_FAIL,
        })
    }
}
export const getUserOthers =  (id) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_USER_OTHERS_REQUEST,
        })
        const {data} = await httpsRequest.get('/api/friends/others?id='+id);
        dispatch({
            type: actionTypes.GET_USER_OTHERS_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
        dispatch({
            type: actionTypes.GET_USER_OTHERS_FAIL,
        })
    }
}

export const addUserFriend =  (inputs) => async (dispatch) => {
    try {
        const {data} = await httpsRequest.post("/api/friends",   inputs);
         await dispatch({
            type: actionTypes.DELETE_USER_OTHER,
            payload: {id : data.id }
        })
         dispatch({
            type: actionTypes.ADD_USER_FRIEND,
            payload:data 
        })
    }
    catch(e) {
        console.log(e);
    }
}