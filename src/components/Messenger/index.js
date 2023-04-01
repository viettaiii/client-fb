import {  useContext, useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// My imports
import Conversations from "../Conversations";
import { getConversations } from "../../redux/actions/conversation";
import Header from "../Header";
import Messenges from "../Messenges";
import { getMessages } from "../../redux/actions/messenge";
import "./messenger.scss";
import { SocketContext } from "../../context/socketContext";
function Messenger() {
  const {usersOn}= useContext(SocketContext);
  const dispatch = useDispatch();
  const [currentMess, setCurrentMess] = useState();
  const { conversations } = useSelector((state) => state.conversations);
  const { messenges } = useSelector((state) => state.messenges);
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
          currentMess={currentMess}
          messenges={messenges}
        />
        <div className="online"></div>
      </div>
    </>
  );
}

export default Messenger;
