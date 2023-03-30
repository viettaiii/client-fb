import * as actionTypes from '../constants/messenge';
import httpsRequest from '../../api/axios';
export const getMessages =  (conversationId) => async (dispatch) => {
    try { dispatch({
        type: actionTypes.GET_MESSENGES_REQUEST
    })
        const {data} = await httpsRequest.get('/api/messenges/' + conversationId);
        dispatch({
            type: actionTypes.GET_MESSENGES_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
       console.log("Get chats  failed");
    }
}
export const addMessage =  (inputs) => async (dispatch) => {
    try {
        const {data} = await httpsRequest.post('/api/messenges' ,inputs);
        dispatch({
            type: actionTypes.ADD_MESSENGE,
            payload:data 
        })
    }
    catch(e) {
       console.log("add new chat  failed");
    }
}
