import * as  actionTypes from '../constants/story'; 
const initState = {
    stories : [],
    isLoading:true,
    isError:true
}
export const storiesReducer = (state = initState , action) => {
        switch(action.type) {
            case actionTypes.GET_STORIES_REQUEST :
                return {
                    isLoading:true,
                    stories:[]
                }
            case actionTypes.GET_STORIES_SUCCESS :
                return {
                    isLoading:false,
                    stories:action.payload
                }
            case actionTypes.GET_STORIES_FAIL :
                return {
                    isError:true,
                    stories:[]
                }
                case actionTypes.ADD_STORY :
                return {
                    ...state,
                    stories : [...state.stories, action.payload],
                    isLoading:false
                }
                case actionTypes.DELETE_STORY :
                return {
                    ...state,
                    stories :[...state.stories.filter(story => story.id !== action.payload.id)],
                    isLoading:false
                }
            default :
            return state;
        }
}
