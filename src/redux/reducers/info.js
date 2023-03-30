import * as  actionTypes from '../constants/info'; 


const initUserInfo = {
    userInfo : {},
}
export const userInfoReducer= (state = initUserInfo , action) => {
    switch(action.type) {
        case actionTypes.GET_INFO :
            return {
                userInfo : action.payload,
            }
       
        default :
        return state;
    }

}