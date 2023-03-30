import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

// My imports
import Conversations from "../Conversations";
import { getConversations } from "../../redux/actions/conversation";
import Header from "../Header";
import Messenges from "../Messenges";
import { getMessages } from "../../redux/actions/messenge";
import "./messenger.scss";
import { UserContext } from "../../context/authContext";

function Messenger() {
  const dispatch = useDispatch();
  const [currentMess, setCurrentMess] = useState();
  const [usersOn, setUsersOn] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { conversations } = useSelector((state) => state.conversations);
  const { messenges } = useSelector((state) => state.messenges);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("ws://localhost:9111");
  }, []);
  useEffect(() => {
    socket.current.on("getUsers", (users) => {
      setUsersOn(users);
    });
  }, [currentUser]);
  useEffect(() => {
    dispatch(getConversations());
    conversations.length > 0 &&
      dispatch(getMessages(conversations[0].id));
  }, []);
 
  useEffect(() => {
    if (!currentMess) setCurrentMess(conversations[0]);
    currentMess && dispatch(getMessages(currentMess.id));
  }, [conversations, currentMess]);

  return (
    <>
      <Header />
      <div className="messenger">
        <Conversations
          usersOn={usersOn}
          setCurrentMess={setCurrentMess}
          currentMess={currentMess && currentMess}
          conversations={conversations}
        />
        <Messenges
          usersOn={usersOn}
          currentMess={currentMess}
          messenges={messenges}
        />
        <div className="online"></div>
      </div>
    </>
  );
}

export default Messenger;
