import * as  actionTypes from '../constants/post'; 
const initState = {
    posts : [],
    isLoading:true,
    isError:true
}
export const postsReducer = (state = initState , action) => {
        switch(action.type) {
            case actionTypes.GET_POSTS_REQUEST :
                return {
                    isLoading:true,
                    posts:[]
                }
            case actionTypes.GET_POSTS_SUCCESS :
                return {
                    isLoading:false,
                    posts:action.payload
                }
            case actionTypes.GET_POSTS_FAIL :
                return {
                    isError:true,
                }
                case actionTypes.ADD_POST :
                return {
                    ...state,
                    posts : [...state.posts, action.payload],
                    isLoading:false
                }
                case actionTypes.DELETE_POST :
                return {
                    ...state,
                    posts :[...state.posts.filter(post => post.id !== action.payload.id)],
                    isLoading:false
                }
            default :
            return state;
        }
}
