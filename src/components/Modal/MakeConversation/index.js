import { forwardRef, useContext, useEffect, useRef } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../../../context/socketContext";
import { getUsers } from "../../../redux/actions/user";
import Avatar from "../../Avatar";
import "./make-conversation.scss";

const MakeConversation = forwardRef(({ setShowMakeConversation}, ref) => {
  const {usersOn}  = useContext(SocketContext);
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const MakeConversationRef = useRef();

  return (
    <div className="modal-make-conversation">
      <div className="make-conversation" ref={ref}>
        <h3>
          Danh sách người dùng trên facebook.{" "}
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
            .filter((user) => usersOn.includes(user.id))
            .map((user, i) => (
              <div key={i} className="make-conversation__list-users__user">
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
              <div key={i} className="make-conversation__list-users__user">
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
