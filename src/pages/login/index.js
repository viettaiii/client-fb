import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import httpsRequest from "../../api/axios";
import Spinner from "../../components/Modal/Spinner";
import { UserContext } from "../../context/authContext";
import "./login.scss";
function Login() {
  const { login } = useContext(UserContext);
  const [showSpinner, setShowSpinner] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const handleChange = (e) => {
    const el = document.querySelector(".err-account");
    el.textContent = "";
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    e.target.style.border = "1px solid rgba(128, 128, 128, 0.679)";
    setErrEmail("");
    setErrPassword("");
  };
  const handleBlur = (e) => {
    switch (e.target.name) {
      case "email":
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const check = re.test(inputs[e.target.name]);
        if (check) break;
        setErrEmail("Email mà bạn đã đăng ký trước đó kìa , hông nhớ hả !");
        e.target.style.border = "1px solid red";
        break;
      case "password":
        if (inputs[e.target.name].length < 6) {
          if (!inputs[e.target.name]) {
            setErrPassword("Ờ kìa nhập mật khẩu đi chứ !");
            e.target.style.border = "1px solid red";
          } else {
            setErrPassword("Mật khẩu của bạn đâu có ngắn vậy đâu");
            e.target.style.border = "1px solid red";
          }
        }
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const el = document.querySelector(".err-account");
    if (!inputs.email || (!inputs.password && !errEmail && errPassword)) {
      el.textContent = "Bạn phải đăng nhập mới vào được !";
      return;
    }
    if (inputs.email && inputs.password) {
      try {
        const { data } = await httpsRequest.post("/api/auth/login", inputs);
        if (data) {
          setShowSpinner(true);
          setTimeout(() => {
            setShowSpinner(false);
            setErrEmail("");
            setErrPassword("");
            el.textContent = "";
            login(data.info);
            navigate("/");
          }, 3 * 1000);
        }
      } catch (e) {
        if (inputs.password.length >= 6)
          el.textContent = e.response.data.message;
      }
    }
  };
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
