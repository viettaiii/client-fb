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

export const addConversation =  (userId) => async (dispatch) => {
    try {
   
        const {data} = await httpsRequest.post('/api/conversations?userId='+userId);
        dispatch({
            type: actionTypes.ADD_CONVERSATION,
            payload:data 
        })
    }
    catch(e) {
       console.log("add conversations  failed");
    }
}

