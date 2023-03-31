import { Link } from "react-router-dom";
import Spinner from "../../components/Modal/Spinner";
import { useLogin } from "../../hooks/useLogin";
import "./login.scss";
function Login() {
  const {
    showSpinner,
    errPassword,
    errEmail,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useLogin();
  return (
    <div className="wrapper">
      <div className="wrapper__logo">
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
          alt=""
        />
      </div>
      <div className="login">
        <div className="login__header">
          <h3>Đăng nhập Facebook</h3>
          <span>Lướt facebook thả ga</span>
        </div>
        <form id="form-login" className="login__form" action="POST">
          <div className="login__form__control">
            <span>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errEmail && <span>{errEmail}</span>}
            </span>
          </div>
          <div className="login__form__control">
            <span>
              <input
                type="password"
                placeholder="Mật khẩu"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errPassword && <span>{errPassword}</span>}
            </span>
          </div>
          <span className="err-account"></span>
          <button onClick={handleSubmit}>Đăng nhập</button>
        </form>
        <Link to="/register" className="login__to-register">
          Bạn chưa có tài khoản ư?
        </Link>
      </div>
      {showSpinner && <Spinner />}
    </div>
  );
}

export default Login;
