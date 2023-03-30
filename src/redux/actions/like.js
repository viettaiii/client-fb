import * as actionTypes from '../constants/like';
import httpsRequest from '../../api/axios';
export const getLikes =  () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_LIKES_REQUEST,
        })
        const {data} = await httpsRequest.get('/api/likes');
        dispatch({
            type: actionTypes.GET_LIKES_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
        dispatch({
            type: actionTypes.GET_LIKES_FAIL,
        })
    }
}
export const addLike =  (inputs) => async (dispatch) => {
    try {
        const { data } = await  httpsRequest.post('/api/likes',inputs);
       dispatch({
        type:actionTypes.ADD_LIKE,
        payload : data
      })
     
    }
    catch(e) {
        console.log("Error",e);
    }
}

export const deleteLike =  (inputs) => async (dispatch) => {
    try {
        await httpsRequest.delete('/likes/'+ inputs.postId );
       dispatch({
        type:actionTypes.DELETE_LIKE,
        payload : {
            userId:inputs.userId,
            postId:inputs.postId
        }
      })
    }
    catch(e) {
        console.log("Error",e);
    }
}