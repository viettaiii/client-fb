import * as actionTypes from '../constants/info';
import httpsRequest from '../../api/axios';
export const getUserInfo =  (userId) => async (dispatch) => {
    try {
     
        const {data} = await httpsRequest.get('/api/infos/find/'+userId);
        dispatch({
            type: actionTypes.GET_INFO,
            payload:data 
        })
    }
    catch(e) {
       console.log("Get user info failed");
    }
}

