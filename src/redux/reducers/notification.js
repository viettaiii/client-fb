import * as  actionTypes from '../constants/notification'; 


const initNotifications = {
    notifications : [],
    isLoading: null,
    isError:null
}
export const notificationsReducer= (state = initNotifications , action) => {
    switch(action.type) {
        case actionTypes.GET_NOTIFICATIONS_REQUEST :
            return {
                isLoading: true,
                notifications : [],
            }
        case actionTypes.GET_NOTIFICATIONS_SUCCESS :
            return {
                isLoading: false,
                notifications : action.payload,
            }
        case actionTypes.GET_NOTIFICATIONS_FAIL :
            return {
                isLoading: true,
                notifications : []
            }
       
        case actionTypes.ADD_NOTIFICATION :
            return {
                ...state,
                notifications : [ action.payload ,...state.notifications]
            }
       
        default :
        return state;
    }

}