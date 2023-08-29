import { Link } from "react-router-dom";
import WhiteLogo from "../../components/Logo/WhiteLogo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/auth/authApiSlice";
import { toastAlert } from "../../utils/toast";
import { setMessageEmpty } from "../../features/auth/authSlice";
import { sweetAlertBasic } from "../../utils/sweetAlert";

const Register = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!input.name || !input.email || !input.password || !input.cpassword) {
      toastAlert("All fields are required", "warning");
    } else {
      if (input.password !== input.cpassword) {
        toastAlert("Password not match", "error");
      } else {
        dispatch(
          createUser({
            name: input.name,
            auth: input.email,
            password: input.password,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (error) {
      toastAlert(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      sweetAlertBasic({ title: "Success", msg: message });
      setInput({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
      dispatch(setMessageEmpty());
    }
  }, [error, message]);

  return (
    <div className="main-wrapper login-body">
      <div className="login-wrapper">
        <div className="container">
          <div className="loginbox">
            <div className="login-left">
              <WhiteLogo />
            </div>
            <div className="login-right">
              <div className="login-right-wrap">
                <h1>Register</h1>
                <p className="account-subtitle">Access to our dashboard</p>

                <form onSubmit={handleSubmitForm}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={handleChange}
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      value={input.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="password"
                      value={input.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="cpassword"
                      value={input.cpassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="form-group mb-0">
                    <button className="btn btn-primary btn-block" type="submit">
                      Register
                    </button>
                  </div>
                </form>

                <div className="login-or">
                  <span className="or-line"></span>
                  <span className="span-or">or</span>
                </div>

                <div className="social-login">
                  <span>Register with</span>
                  <a href="#" className="facebook">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#" className="google">
                    <i className="fa fa-google"></i>
                  </a>
                </div>

                <div className="text-center dont-have">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
