import * as  actionTypes from '../constants/user'; 



const initUsers = {
    users : [],
}
export const usersReducer= (state = initUsers , action) => {
    switch(action.type) {
            case actionTypes.GET_USERS  :  
            return {
                users : action.payload
            }
        default :
        return state;
    }
}
const initUserProfile = {
    userProfile : {},
    isLoading:true,
    isError:true
}
export const userProfileReducer= (state = initUserProfile , action) => {
    switch(action.type) {
        case actionTypes.GET_USER_PROFILE_REQUEST :
            return {
                isLoading:true,
                userProfile : {},
            }
        case actionTypes.GET_USER_PROFILE_SUCCESS:
            return {
                isLoading:false,
                userProfile:action.payload
            }
        case actionTypes.GET_USER_PROFILE_FAIL :
            return {
                isError:true,
                userProfile : {},
            }
         case actionTypes.UPDATE_USER_PROFILE : 
         return {
            userProfile : action.payload,
         }
        default :
        return state;
    }

  

}