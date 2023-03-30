import * as actionTypes from '../constants/conversation';
import httpsRequest from '../../api/axios';
export const getConversations =  () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_CONVERSATIONS_REQUEST
        })
        const {data} = await httpsRequest.get('/api/conversations');
        dispatch({
            type: actionTypes.GET_CONVERSATIONS_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
       console.log("Get conversations  failed");
    }
}

