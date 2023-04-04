import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { UserContext } from "../context/authContext";
import { addFriendRequest, getFriendsRequest } from "../redux/actions/friendRequest";
import { addMessage } from "../redux/actions/messenge";

export function useSocket() {
  const { currentUser } = useContext(UserContext);
  const [arrivalMess, setArrivalMess] = useState(null);
  const [arrivalSuggestFriend , setArrivalSuggestFriend] = useState(null);
  const socket = useRef();
  const [usersOn, setUsersOn] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.current = io("ws://localhost:9111");
  }, []);
  useEffect(() => {
    if (arrivalMess) {
      dispatch(addMessage(arrivalMess));
      setArrivalMess(null);
    }
  }, [arrivalMess]);
  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;
    socket.current.emit("addUser", currentUser.id);
    socket.current.on("getUsers", (users) => {
      setUsersOn(users.map((u) => u.userId));
    });
  }, [currentUser]);
  const sendMessage = useCallback((data) => {
    socket.current.emit("sendMessage", {
      conversationId: data.conversationId,
      senderId: data.senderId,
      text: data.text,
      receiverId: data.receiverId,
    });
    dispatch(addMessage(data));
  }, []);
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMess({
        senderId: data.senderId,
        text: data.text,
        receiverId: data.receiverId,
        createdAt: Date.now(),
        conversationId: data.conversationId,
      });
    });
  }, []);
  const sendSuggestFriend = useCallback(({senderUserId,receiverUserId}) => {
    socket.current.emit("sendSuggestFriend", {senderUserId,receiverUserId});
    dispatch(addFriendRequest({senderUserId,receiverUserId}))
  }, []);
  useEffect(() => {
    socket.current.on("getSuggestFriend", ({senderUserId,receiverUserId}) => {
      setArrivalSuggestFriend({
        senderUserId,
        receiverUserId,
        createdAt:Date.now()
      })
    })
  },[])
  useEffect(() => {
    arrivalSuggestFriend && dispatch(getFriendsRequest());
    setArrivalSuggestFriend(null);
  },[arrivalSuggestFriend])

  return { usersOn, sendMessage, sendSuggestFriend  ,arrivalSuggestFriend};
}
