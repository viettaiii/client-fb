import * as actionTypes from "../constants/friendRequest";
const initFriendsRequest = {
  friendsRequest: [],
  isLoading: true,
  isError: true,
  sending:null
};
export const userFriendsRequest = (state = initFriendsRequest, action) => {
  switch (action.type) {
    case actionTypes.GET_FRIENDS_REQUEST_REQUEST:
      return {
        isLoading: true,
        friendsRequest: [],
      };
    case actionTypes.GET_FRIENDS_REQUEST_SUCCESS:
      return {
        isLoading: false,
        friendsRequest: action.payload,
      };
    case actionTypes.GET_FRIENDS_REQUEST_FAIL:
      return {
        isError: true,
        friendsRequest: [],
      };
    case actionTypes.ADD_FRIEND_REQUEST:
      return {
        ...state,
        sending:true,
        friendsRequest: [...state.friendsRequest, action.payload],
      };
    case actionTypes.DELETE_FRIEND_REQUEST:
      return {
        ...state,
        friendsRequest: [
          ...state.friendsRequest.filter(
            (fq) =>
              fq.senderUserId !== action.payload.senderUserId &&
              fq.receiverUserId !== action.payload.receiverUserId
          ),
        ],
      };

    case actionTypes.RECEIVER_FRIEND_REQUEST:
        return {
            sending:false,
            friendsRequest : [...state.friendsRequest]
        }
    default:
      return state;
  }
};
