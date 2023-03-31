import { Link, useNavigate } from "react-router-dom";

// My imports
import "./register.scss";

import ModelSuccess from "../../components/Modal/Success";
import { useRegister } from "../../hooks/useRegister";
function Register() {
  const {
    showSuccess,
    errFirstName,
    errLastName,
    errEmail,
    errPassword,
    handleChange,
    handleBlur,
    handleSubmit,
    handleClick ,
  } = useRegister();
  
  return (
    <div className="wrapper">
      <div className="wrapper__logo">
        <img
          src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
          alt=""
        />
      </div>
      <div className="register">
        <div className="register__header">
          <h3>Tạo tài khoản mới</h3>
          <span>Nhanh chóng và dễ dàng.</span>
        </div>
        <form id="form-register" className="register__form" action="POST">
          <div className="register__form__control ">
            <div>
              <span>
                {" "}
                <input
                  type="text"
                  placeholder="Họ"
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errFirstName && <span>{errFirstName}</span>}
              </span>
              <span>
                {" "}
                <input
                  type="text"
                  placeholder="Tên"
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errLastName && <span>{errLastName}</span>}
              </span>
            </div>
          </div>
          <div className="register__form__control">
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
          <div className="register__form__control">
            <span>
              <input
                type="password"
                placeholder="Mật khẩu mới"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errPassword && <span>{errPassword}</span>}
            </span>
          </div>
          <span className="err-account"></span>
          <button onClick={handleSubmit}>Đăng ký</button>
        </form>
        <Link to="/login" className="register__to-login ">
          Bạn đã có tài khoản ư?
        </Link>
      </div>
      {showSuccess && (
        <ModelSuccess
          handleClick={handleClick}
          message="OK bạn đã đăng kí thành công rồi đó"
        />
      )}
    </div>
  );
}

export default Register;
