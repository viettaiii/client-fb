import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./error-message.scss";

const ErrorMesssage = forwardRef(({ message, setShowError }, ref) => {
  return (
    <div className="error-message">
      <span ref={ref}>
        {message}
        <button onClick={() => setShowError(false)}>
          Nhấn vào tôi để <b>THOÁT</b> nào bạn tui
        </button>
      </span>
    </div>
  );
});

ErrorMesssage.propTypes = {
    message : PropTypes.string,
    setShowError : PropTypes.func
}
export default ErrorMesssage;
