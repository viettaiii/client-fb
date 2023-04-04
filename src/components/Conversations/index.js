import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routesPublic } from "../../config/routes";
import Conversation from "./Conversation";
import "./conversations.scss";
function Conversations({conversationId,usersOn}) {
  const { conversations } = useSelector((state) => state.conversations);
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
          <Link to={routesPublic.messenger + "/" + c.id} >
          <Conversation usersOn={usersOn} active={conversationId && c.id === conversationId} conversation={c} key={i} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Conversations;
