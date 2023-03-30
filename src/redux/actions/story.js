import * as actionTypes from '../constants/story';
import httpsRequest from '../../api/axios';
export const getStories =  () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_STORIES_REQUEST,
        })
        const {data} = await httpsRequest.get('/api/stories');
        dispatch({
            type: actionTypes.GET_STORIES_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
        dispatch({
            type: actionTypes.GET_STORIES_FAIL,
        })
    }
}
export const addStory =  (inputs) => async (dispatch) => {
    try {
        const { data } = await  httpsRequest.post('/api/stories',inputs);
       dispatch({
        type:actionTypes.ADD_STORY,
        payload : data
      })
    }
    catch(e) {
        console.log("Error",e);
    }
}
export const deleteStory =  (id) => async (dispatch) => {
    try {
         await  httpsRequest.delete('/api/stories/?id='+id);
       dispatch({
        type:actionTypes.DELETE_STORY,
        payload: {
            id : id
        }
      })
    }
    catch(e) {
        console.log("Error",e);
    }
}
