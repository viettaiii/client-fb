import { forwardRef, useContext, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  addConversation,
  getConversations,
} from "../../../redux/actions/conversation";
import { UserContext } from "../../../context/authContext";
import { SocketContext } from "../../../context/socketContext";
import { getUsers } from "../../../redux/actions/user";
import Avatar from "../../Avatar";
import "./make-conversation.scss";
import {  useNavigate } from "react-router-dom";
import { routesPublic } from "../../../config/routes";
import { StoreContext } from "../../../context/storeContext";
const MakeConversation = forwardRef(({ setShowMakeConversation }, ref) => {
  const { usersOn } = useContext(SocketContext);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const {conversations ,users} = useContext(StoreContext);
  const dispatch = useDispatch();
  const handleAddConversation = (userId) => {
    const isCheck = conversations.some(
      (c) => c.userId_1 === parseInt(userId) || c.userId_2 === parseInt(userId)
    );
    if (isCheck) {
      alert("Người dùng đã có cuộc hội thuộc với bạn rồi");
      return;
    }
    dispatch(addConversation(userId));
    navigate(routesPublic.messenger + "/" + (parseInt(conversations[conversations.length - 1].id) + 1));
  };
  return (
    <div className="modal-make-conversation">
      <div className="make-conversation" ref={ref}>
        <h3>
          Hãy chọn người bạn mà muốn nhắn tin.
          <span
            className="make-conversation__close"
            onClick={() => setShowMakeConversation(false)}
          >
            <AiOutlineCloseCircle />
          </span>
        </h3>
        <h5>Đang hoạt động</h5>
        <div className="make-conversation__list-users">
          {users
            .filter((user) => usersOn.includes(user.id) && user.id !== parseInt(currentUser.id))
            .map((user, i) => (
              <div
                key={i}
                className="make-conversation__list-users__user"
                onClick={() => handleAddConversation(user.id)}
              >
                <span className="make-conversation__list-users__user__avatar">
                  <Avatar image={user.profilePic} alt={user.firstName} />
                  {usersOn.includes(user.id) ? (
                    <small className="online" />
                  ) : (
                    <small className="offline" />
                  )}
                </span>
                <div className="make-conversation__list-users__user__info">
                  <span>{user.firstName + " " + user.lastName}</span>
                  {usersOn.includes(user.id) ? (
                    <small className="online">Online</small>
                  ) : (
                    <small className="offline">Offline</small>
                  )}
                </div>
              </div>
            ))}
        </div>
        <h5>Đã ngưng hoạt động</h5>
        <div className="make-conversation__list-users">
          {users
            .filter((user) => !usersOn.includes(user.id))
            .map((user, i) => (
              <div
                key={i}
                className="make-conversation__list-users__user"
                onClick={() => handleAddConversation(user.id)}
              >
                <span className="make-conversation__list-users__user__avatar">
                  <Avatar image={user.profilePic} alt={user.firstName} />
                  {usersOn.includes(user.id) ? (
                    <small className="online" />
                  ) : (
                    <small className="offline" />
                  )}
                </span>
                <div className="make-conversation__list-users__user__info">
                  <span>{user.firstName + " " + user.lastName}</span>
                  {usersOn.includes(user.id) ? (
                    <small className="online">Online</small>
                  ) : (
                    <small className="offline">Offline</small>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});
export default MakeConversation;
