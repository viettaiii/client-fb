import * as  actionTypes from '../constants/friendRequest'; 
const initFriendsRequest = {
    friendsRequest : [],
    isLoading:true,
    isError:true
}
export const userFriendsRequest= (state = initFriendsRequest , action) => {
        switch(action.type) {
            case actionTypes.GET_FRIENDS_REQUEST_REQUEST :
                return {
                    isLoading:true,
                    friendsRequest:[]
                }
            case actionTypes.GET_FRIENDS_REQUEST_SUCCESS:
                return {
                    isLoading:false,
                    friendsRequest:action.payload
                }
            case actionTypes.GET_FRIENDS_REQUEST_FAIL :
                return {
                    isError:true,
                    friendsRequest:[]
                }
                case actionTypes.ADD_FRIEND_REQUEST :
                return {
                    ...state,
                    friendsRequest:[...state.friendsRequest , action.payload]
                }
                case actionTypes.DELETE_FRIEND_REQUEST :
                    const ss = state.friendsRequest.filter(fq => fq.senderUserId !== action.payload.senderUserId && fq.receiverUserId !== action.payload.receiverUserId);
                    console.log(ss);
                    return {
                        ...state,
                        friendsRequest:[...state.friendsRequest.filter(fq => fq.senderUserId !== action.payload.senderUserId && fq.receiverUserId !== action.payload.receiverUserId)]
                }
            default :
            return state;
        }
}
