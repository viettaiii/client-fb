import * as actionTypes from '../constants/post';
import httpsRequest from '../../api/axios';

export const getPosts =  () => async (dispatch) => {
    const headers = {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
       
    };
    try {
        dispatch({
            type: actionTypes.GET_POSTS_REQUEST,
        })
        const {data} = await httpsRequest.get('/api/posts' , {headers} );
        dispatch({
            type: actionTypes.GET_POSTS_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
        dispatch({
            type: actionTypes.GET_POSTS_FAIL,
        })
    }
}
export const addPost =  (inputs) => async (dispatch) => {
    try {
        const { data } = await  httpsRequest.post('/api/posts',inputs);
        console.log(data);
       dispatch({
        type:actionTypes.ADD_POST,
        payload : data
      })
    }
    catch(e) {
        console.log("Error",e);
    }
}
export const deletePost =  (postId) => async (dispatch) => {
    try {
         await  httpsRequest.delete('/api/posts/'+postId);
       dispatch({
        type:actionTypes.DELETE_POST,
        payload: {
            id : postId
        }
      })
    }
    catch(e) {
        console.log("Error",e);
    }
}
