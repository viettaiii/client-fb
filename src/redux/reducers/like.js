import * as  actionTypes from '../constants/like'; 
const initState = {
    likes : [],
    isLoading:true,
    isError:true
}
export const likesReducer = (state = initState , action) => {
        switch(action.type) {
            case actionTypes.GET_LIKES_REQUEST :
                return {
                    isLoading:true,
                    likes:[]
                }
            case actionTypes.GET_LIKES_SUCCESS :
                return {
                    isLoading:false,
                    likes:action.payload
                }
            case actionTypes.GET_LIKES_FAIL :
                return {
                    isError:true,
                    likes:action.payload
                }
                case actionTypes.ADD_LIKE:
                return {
                    ...state,
                    likes : [...state.likes , action.payload],
                    isLoading:false,
                }
                case actionTypes.DELETE_LIKE:
                return {
                    ...state,
                    likes : [...state.likes.filter(like => (!(like.userId === action.payload.userId && like.postId === action.payload.postId)))],
                    isLoading:false,
                }
            default :
            return state;
        }
}
