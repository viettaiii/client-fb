import * as  actionTypes from '../constants/messenge'; 


const initMessenges = {
    messenges : [],
    isLoading: true
}
export const chatsReducer= (state = initMessenges , action) => {
    switch(action.type) {
        case actionTypes.GET_MESSENGES_REQUEST :
            return {
                isLoading: true,
                messenges : [],
            }
        case actionTypes.GET_MESSENGES_SUCCESS :
            return {
                isLoading: false,
                messenges : action.payload,
            }
        case actionTypes.ADD_MESSENGE :
            return {
                messenges : [...state.messenges,action.payload]
            }
        default :
        return state;
    }

}