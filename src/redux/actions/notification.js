import * as actionTypes from '../constants/notification';
import httpsRequest from '../../api/axios';
export const getNotifications =  () => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.GET_NOTIFICATIONS_REQUEST,
        })
        const {data} = await httpsRequest.get('/api/notifications');
        dispatch({
            type: actionTypes.GET_NOTIFICATIONS_SUCCESS,
            payload:data 
        })
    }
    catch(e) {
        dispatch({
            type: actionTypes.GET_NOTIFICATIONS_FAIL,
        })
    }
}


export const addNotification =  (inputs) => async (dispatch) => {
    try {
   
        const {data} = await httpsRequest.post('/api/notifications' ,inputs);
        dispatch({
            type: actionTypes.ADD_NOTIFICATION,
            payload:data 
        })
    }
    catch(e) {
       console.log("ADD ADD_NOTIFICATION  failed");
    }
}

