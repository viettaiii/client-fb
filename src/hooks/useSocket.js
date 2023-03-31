import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { UserContext } from "../context/authContext";
import { addMessage } from "../redux/actions/messenge";

export function useSocket() {
  const { currentUser } = useContext(UserContext);
  const [arrivalMess, setArrivalMess] = useState(null);
  const socket = useRef();
  const [usersOn, setUsersOn] = useState([]);
  const dispatch = useDispatch();
  function handleSendMessage(data) {
    socket.current.emit("sendMessage", {
      conversationId: data.conversationId,
      senderId: data.senderId,
      text: data.text,
      receiverId: data.receiverId,
    });
  }
  useEffect(() => {
    socket.current = io("ws://localhost:9111");
  }, []);
  useEffect(() => {
    socket.current.emit("addUser", currentUser.id);
    socket.current.on("getUsers", (users) => {
      setUsersOn(users.map((u) => u.userId));
    });
  }, [currentUser]);
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
  useEffect(() => {
    if (arrivalMess) {
      if (usersOn.includes(arrivalMess.receiverId)) {
        dispatch(addMessage(arrivalMess));
        setArrivalMess(null);
      }
    }
  }, [arrivalMess]);

  return [usersOn, handleSendMessage];
}
