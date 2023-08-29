import { Link, useNavigate } from "react-router-dom";
import WhiteLogo from "../../components/Logo/WhiteLogo";
import { useEffect, useState } from "react";
import { toastAlert } from "../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authApiSlice";
import { setMessageEmpty } from "../../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, message, user } = useSelector((state) => state.auth);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (!input.email || !input.password) {
      toastAlert("All fields are required", "warning");
    } else {
      dispatch(loginUser({ auth: input.email, password: input.password }));
    }
  };

  useEffect(() => {
    if (error) {
      toastAlert(error, "error");
      dispatch(setMessageEmpty());
    }
    if (message) {
      toastAlert(message, "success");
      setInput({
        email: "",
        password: "",
      });
      dispatch(setMessageEmpty());
    }
    if (user) {
      navigate("/");
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
                <h1>Login</h1>
                <p className="account-subtitle">Access to our dashboard</p>

                <form onSubmit={handleSubmitForm}>
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
                    <button className="btn btn-primary btn-block" type="submit">
                      Login
                    </button>
                  </div>
                </form>

                <div className="text-center forgotpass">
                  <Link to="/forgot">Forgot Password?</Link>
                </div>
                <div className="login-or">
                  <span className="or-line"></span>
                  <span className="span-or">or</span>
                </div>

                <div className="social-login">
                  <span>Login with</span>
                  <a href="#" className="facebook">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#" className="google">
                    <i className="fa fa-google"></i>
                  </a>
                </div>

                <div className="text-center dont-have">
                  Don’t have an account? <Link to="/register">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
