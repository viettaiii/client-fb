import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { UserContext } from "../context/authContext";
import { addUserFriend } from "../redux/actions/friend";
import {
  addFriendRequest,
  deleteFriendRequest,
  getFriendsRequest,
} from "../redux/actions/friendRequest";
import { addLike } from "../redux/actions/like";
import { addMessage } from "../redux/actions/messenge";
export function useSocket() {
  const { socket, usersOn } = useConnect();
  const { arrivalLike, sendLike } = useLike(socket);
  const { sendMessage, arrivalMess } = useMessage(socket);
  const {
    sendSuggestFriend,
    arrivalSuggestFriend,
    confirmFriend,
    arrivalConfrimFriend,
  } = useSendSuggestFriend(socket);

  return {
    usersOn,
    sendMessage,
    sendSuggestFriend,
    arrivalSuggestFriend,
    arrivalMess,
    confirmFriend,
    arrivalConfrimFriend,
    arrivalLike,
    sendLike,
  };
}

// hadnle like

const useLike = (socket) => {
  const [arrivalLike, setArrivalLike] = useState(null);
  const dispatch = useDispatch();
  //senderId , receiverId , postId
  const sendLike = useCallback(async (values) => {
    socket.current.emit("sendLike", (values));
    await dispatch(addLike(values));
  }, []);
  useEffect(() => {
    socket.current.on("getLike", (data) => {
      setArrivalLike({
        senderId: data.senderId,
        receiverId: data.receiverId,
        createdAt: Date.now(),
        postId: data.postId,
      });
    });
  }, []);

  useEffect(() => {
    if(arrivalLike) {
     
      dispatch(addLike({postId :arrivalLike.postId , senderId : arrivalLike.senderId  }));
    }
  }, [arrivalLike]);
  return { arrivalLike, sendLike };
};

// handle send suggest add friend and confirm friend ;
const useSendSuggestFriend = (socket) => {
  const [arrivalSuggestFriend, setArrivalSuggestFriend] = useState(null);
  const [arrivalConfrimFriend, setArrivalConfrimFriend] = useState(null);
  const dispatch = useDispatch();
  const sendSuggestFriend = useCallback(({ senderId, receiverId }) => {
    socket.current.emit("sendSuggestFriend", { senderId, receiverId });
    dispatch(addFriendRequest({ senderId, receiverId }));
  }, []);

  // send suggestion add friend
  useEffect(() => {
    socket.current.on("getSuggestFriend", ({ senderId, receiverId }) => {
      setArrivalSuggestFriend({
        senderId,
        receiverId,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalSuggestFriend && dispatch(getFriendsRequest());
    setArrivalSuggestFriend(null);
  }, [arrivalSuggestFriend]);
  // confrim add friend
  const confirmFriend = useCallback(async (inputs) => {
    socket.current.emit("sendConfirmAddFriend", {
      senderId: inputs.userId_1,
      receiverId: inputs.userId_2,
    });
    await dispatch(
      addUserFriend({ userId_1: inputs.userId_1, userId_2: inputs.userId_2 })
    );
    await dispatch(
      deleteFriendRequest({
        senderId: inputs.userId_2,
        receiverId: inputs.userId_1,
      })
    );
  }, []);
  useEffect(() => {
    socket.current.on("getConfirmAddFriend", (inputs) => {
      setArrivalConfrimFriend({
        senderId: inputs.senderId,
        receiverId: inputs.receiverId,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    setArrivalConfrimFriend(null);
  }, [arrivalConfrimFriend]);
  return {
    sendSuggestFriend,
    arrivalSuggestFriend,
    confirmFriend,
    arrivalConfrimFriend,
  };
};

// Handle send message and receive message when user send one message to ;
const useMessage = (socket) => {
  const [arrivalMess, setArrivalMess] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (arrivalMess) {
      dispatch(addMessage(arrivalMess));
      setArrivalMess(null);
    }
  }, [arrivalMess]);
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
  // End
  return { sendMessage, arrivalMess };
};

/// handlle connecting to server and users connected
const useConnect = () => {
  const [usersOn, setUsersOn] = useState([]);
  const { currentUser } = useContext(UserContext);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:9111");
  }, []);
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

  return { socket, usersOn };
};
