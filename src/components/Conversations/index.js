import { useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { routesPublic } from "../../config/routes";
import { StoreContext } from "../../context/storeContext";
import SpinnerEllipsis from "../Modal/SpinnerEllipsis";
import Conversation from "./Conversation";
import "./conversations.scss";
function Conversations({conversationId,usersOn}) {
  const {  conversations } = useContext(StoreContext);
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
        {!conversations ?<SpinnerEllipsis/> : conversations.map((c, i) => (
          <Link to={routesPublic.messenger + "/" + c.id} >
          <Conversation usersOn={usersOn} active={conversationId && c.id === conversationId} conversation={c} key={i} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Conversations;
