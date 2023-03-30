import * as actionTypes from '../constants/comment';
import httpsRequest from '../../api/axios';
export const getComments =  () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_COMMENTS_REQUEST,
        })
        const {data} = await httpsRequest.get('/api/comments');
        dispatch({
            type: actionTypes.GET_COMMENTS_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
        dispatch({
            type: actionTypes.GET_COMMENTS_FAIL,
        })
    }
}
export const addComment =  (inputs) => async (dispatch) => {
    try {
        const { data } = await  httpsRequest.post('/api/comments',inputs);
       dispatch({
        type:actionTypes.ADD_COMMENT,
        payload : data
      })
    }
    catch(e) {
        console.log("Error",e);
    }
}
export const deleteComment =  (id) => async (dispatch) => {
    try {
       await  httpsRequest.delete('/api/comments/'+id);
       dispatch({
        type:actionTypes.DELETE_COMMENT,
        payload : {id:id}
      })
    }
    catch(e) {
        console.log("Error",e);
    }
}
export const updateComment =  (desc,id) => async (dispatch) => {
    try {
        await  httpsRequest.put('/api/comments/' , {desc,id});
       dispatch({
        type:actionTypes.UPDATE_COMMENT,
        payload : {desc,id}
      })
    }
    catch(e) {
        console.log("Error",e);
    }
}