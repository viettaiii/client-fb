import * as  actionTypes from '../constants/comment'; 
const initState = {
    comments : [],
    isLoading:true,
    isError:true
}
export const commentsReducer = (state = initState, action) => {
        switch(action.type) {
            case actionTypes.GET_COMMENTS_REQUEST :
                return {
                    isLoading:true,
                    comments:[]
                }
            case actionTypes.GET_COMMENTS_SUCCESS :
                return {
                    isLoading:false,
                    comments:action.payload
                }
            case actionTypes.GET_COMMENTS_FAIL :
                return {
                    isError:true,
                    comments:action.payload
                }
                case actionTypes.ADD_COMMENT :
                return {
                    ...state,
                    comments : [...state.comments , action.payload]
                }
                case actionTypes.DELETE_COMMENT :
                    return {
                        ...state,
                        comments : [...state.comments.filter(comment => comment.id !== action.payload.id)]
                    }
                case actionTypes.UPDATE_COMMENT :
                    const newItem = [];
                    state.comments.forEach(comment =>  {
                        if(comment.id === action.payload.id) {
                            newItem.push(comment);
                        }
                    });
                    newItem[0].desc = action.payload.desc || "";
                    return {
                        ...state,
                        comments : [...state.comments.filter(comment => (comment.id !== action.payload.id)) ,...newItem ]
                    }
            default :
            return state;
        }
}
