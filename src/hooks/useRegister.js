import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpsRequest from "../api/axios";

export function useRegister() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate("/login");
  };
  const [errFirstName, setErrFirstName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errSubmit, setErrSubmit] = useState(true);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    e.target.style.border = "1px solid rgba(128, 128, 128, 0.679)";
    setErrFirstName("");
    setErrLastName("");
    setErrEmail("");
    setErrPassword("");
    setErrSubmit(false);
  };

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "firstName":
        if (inputs[e.target.name]) break;
        setErrFirstName("Tên của bạn là gì");
        e.target.style.border = "1px solid red";
        setErrSubmit(true);
        break;
      case "lastName":
        if (inputs[e.target.name]) break;
        setErrLastName("Họ của bạn là gì");
        e.target.style.border = "1px solid red";
        setErrSubmit(true);
        break;
      case "email":
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const check = re.test(inputs[e.target.name]);
        if (check) break;
        setErrEmail("Yêu cầu là phải là email");
        e.target.style.border = "1px solid red";
        setErrSubmit(true);
        break;
      case "password":
        if (inputs[e.target.name].length >= 6) break;
        setErrPassword(
          "Mật khẩu có tối thiểu 6 chữ số bao gồm số,chữ cái và dấu câu (như ! và & )"
        );
        e.target.style.border = "1px solid red";
        setErrSubmit(true);
        break;
      default:
        setErrSubmit(false);
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.email ||
      inputs.password ||
      !inputs.firstName ||
      !inputs.lastName
    ) {
      if (!errSubmit) {
        try {
          const { data } = await httpsRequest.post(
            "/api/auth/register",
            inputs
          );
          if (data) {
            setErrFirstName("");
            setErrLastName("");
            setErrEmail("");
            setErrPassword("");
            setShowSuccess(true);
          }
        } catch (e) {
          const el = document.querySelector(".err-account");
          el.textContent = e.response.data.message;
        }
      }
    }
  };

  return {
    showSuccess,
    errFirstName,
    errLastName,
    errEmail,
    errPassword,
    inputs,
    handleChange,
    handleBlur,
    handleSubmit,
    handleClick,
  };
}
