import { Link } from "react-router-dom";
import { routesPublic } from "../../../config/routes";
import Avatar from "../../Avatar";

function Toast({userId, text , name , createdAt , image}) {
  return (
    <Link to={routesPublic.profile+"/"+userId}
      className="toast d-block"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <span className="toast-header__avatar me-2">
            <Avatar image={image} alt=""/>
        </span>
        <strong className="me-auto">{name}</strong>
        <small>{createdAt}</small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">{text}</div>
    </Link>
  );
}

export default Toast;
