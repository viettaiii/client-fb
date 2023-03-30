import * as  actionTypes from '../constants/conversation'; 


const initConversations = {
    conversations : [],
    isLoading: true
}
export const conversationsReducer= (state = initConversations , action) => {
    switch(action.type) {
        case actionTypes.GET_CONVERSATIONS_REQUEST :
            return {
                isLoading: true,
                conversations : [],
            }
        case actionTypes.GET_CONVERSATIONS_SUCCESS :
            return {
                isLoading: false,
                conversations : action.payload,
            }
       
        default :
        return state;
    }

}