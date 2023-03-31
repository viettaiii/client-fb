import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpsRequest from "../api/axios";
import { UserContext } from "../context/authContext";

export function useLogin() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [showSpinner, setShowSpinner] = useState(false);
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

  return {showSpinner , errPassword , errEmail ,handleChange , handleBlur , handleSubmit }
}
