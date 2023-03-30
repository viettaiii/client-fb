import * as actionTypes from '../constants/friendRequest';
import httpsRequest from '../../api/axios';
export const getFriendsRequest =  () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_FRIENDS_REQUEST_REQUEST,
        })
        const {data} = await httpsRequest.get('/api/friends-request');
            dispatch({
            type: actionTypes.GET_FRIENDS_REQUEST_SUCCESS,
            payload:data
        })
    }
    catch(e) {
        dispatch({
            type: actionTypes.GET_FRIENDS_REQUEST_FAIL,
        })
    }
}

export const addFriendRequest =  (receiverUserId) => async (dispatch) => {
    try {
       const {data} =   await  httpsRequest.post('/api/friends-request' , {receiverUserId});
       dispatch({
        type:actionTypes.ADD_FRIEND_REQUEST,
        payload: data
      })
    }
    catch(e) {
        console.log("Error",e);
    }
}

export const deleteFriendRequest =  ({receiverUserId , senderUserId}) => async (dispatch) => {
    try {
       await  httpsRequest.delete('/api/friends-request ' , {data : {senderUserId , receiverUserId}});
       dispatch({
        type:actionTypes.DELETE_FRIEND_REQUEST,
        payload: {receiverUserId , senderUserId}
      })
    }
    catch(e) {
        console.log("Error",e);
    }
}
