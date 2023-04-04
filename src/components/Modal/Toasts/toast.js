import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routesPublic } from "../../../config/routes";
import { getConversations } from "../../../redux/actions/conversation";
import Avatar from "../../Avatar";

function Toast({ toast, type }) {
  const navigate = useNavigate();
  const {conversations} = useSelector(state => state.conversations);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConversations());
  },[])
  const handleToPage = () => {
    switch (toast.type) {
      case type.SUGGEST_FRIEND:
        // toast.id : id ở đây chính là userId của người gửi cái notification;
        navigate(routesPublic.profile + toast.id)
        break;
      case type.ARRIVAL_MESS:
        const conversation = conversations.find(c => c.userId_1 === toast.id || c.userId_2 === toast.id );
        navigate(routesPublic.messenger + "/"+conversation.id);
        break;
      default:
        break;
    }
  };
  return (
    <div
      to={routesPublic.profile + "/" + toast.id}
      className="toast d-block"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      onClick={handleToPage}
    >
      <div className="toast-header">
        <span className="toast-header__avatar me-2">
          <Avatar image={toast.profilePic} alt="" />
        </span>
        <strong className="me-auto fs-2">
          {toast.firstName + " " + toast.lastName}
        </strong>
        <small className="fs-5">{moment(toast.createdAt).fromNow("mm")}</small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body fs-5">
        {toast.firstName + " " + toast.lastName + " , " + toast.text}
      </div>
    </div>
  );
}

export default Toast;
