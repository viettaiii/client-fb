import {  useContext, useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// My imports
import Conversations from "../Conversations";
import Header from "../Header";
import Messenges from "../Messenges";
import { getMessages } from "../../redux/actions/messenge";
import "./messenger.scss";
import { SocketContext } from "../../context/socketContext";
import { useParams } from "react-router-dom";
function Messenger() {
  const params = useParams();
  const conversationId  = parseInt(params.conversationId);
  const {usersOn}= useContext(SocketContext);
  const dispatch = useDispatch();
  const [currentMess, setCurrentMess] = useState();
  const { messenges  } = useSelector((state) => state.messenges);
  useEffect(() => {
    dispatch(getMessages(conversationId));
  }, [conversationId]);
  return (
    <>
      <Header />
      <div className="messenger">
        <Conversations
          usersOn={usersOn}
          conversationId={parseInt(conversationId)}
          setCurrentMess={setCurrentMess}
          currentMess={currentMess && currentMess}
       
        />
        <Messenges
          conversationId={conversationId}
          messenges={messenges}
        />
        <div className="online">
            
        </div>
      </div>
    </>
  );
}

export default Messenger;
