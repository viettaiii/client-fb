import * as  actionTypes from '../constants/friend'; 
const initUserFriends = {
    userFriends : [],
    isLoading:true,
    isError:true
}
export const userFriendsReducer= (state = initUserFriends , action) => {
        switch(action.type) {
            case actionTypes.GET_USER_FRIENDS_REQUEST :
                return {
                    isLoading:true,
                    userFriends:[]
                }
            case actionTypes.GET_USER_FRIENDS_SUCCESS:
                return {
                    isLoading:false,
                    userFriends:action.payload
                }
            case actionTypes.GET_USER_FRIENDS_FAIL :
                return {
                    isError:true,
                    userFriends:[]
                }
                case actionTypes.ADD_USER_FRIEND:
                    return {
                        ...state,
                        userFriends:[...state.userFriends , action.payload]
                    }
            default :
            return state;
        }
}

const initUserOthers = {
    userOthers : [],
    isLoading:true,
    isError:true
}
export const userOthersReducer= (state = initUserOthers , action) => {
    switch(action.type) {
        case actionTypes.GET_USER_OTHERS_REQUEST :
            return {
                isLoading:true,
                userOthers:[]
            }
        case actionTypes.GET_USER_OTHERS_SUCCESS:
            return {
                isLoading:false,
                userOthers:action.payload
            }
        case actionTypes.GET_USER_OTHERS_FAIL :
            return {
                isError:true,
                userOthers:[]
            }

            case actionTypes.DELETE_USER_OTHER :
                console.log(action.payload.id);
            return {
                ...state,
                userOthers:[...state.userOthers.filter(userO => userO.id !== action.payload.id)]
            }
        default :
        return state;
    }
}