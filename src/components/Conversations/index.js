import { AiOutlineSearch } from "react-icons/ai";
import Conversation from "./Conversation";
import "./conversations.scss";
function Conversations({ conversations, currentMess  ,setCurrentMess ,usersOn}) {
  return (
    <div className="conversations">
      <div className="conversations__top">
        <h3>Chat</h3>
        <div className="conversations__top__search">
          <AiOutlineSearch />
          <input type="text" placeholder="Tìm kiếm trên Messenger" />
        </div>
      </div>
      <div className="conversations__bottom">
        {conversations.length > 0 &&  conversations.map((c, i) => (
          <div onClick={() => setCurrentMess(c)}>
          <Conversation usersOn={usersOn} active={currentMess && c.id === currentMess.id} conversation={c} key={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Conversations;
