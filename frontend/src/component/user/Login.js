import React, { useState, useEffect } from "react";
import { login, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Login = () => {
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.info(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated]);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(LoginEmail, LoginPassword));
    // navigate("/");
  };

  return (
    <>
      <MetaData title={`Login Page`} />
      <div className="container my-5 ">
        <div className="row justify-content-center ">
          <div className="col-md-6 col-12 shadow-lg p-5 usercontainer  animate__animated animate__fadeInUp">
            <div className="signupimagecontainer mb-5 ">
              <img src="/images/clogo.png" alt="" />
            </div>
            <form onSubmit={loginSubmit}>
              <div className="mb-5">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={LoginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter Your Email ....."
                  required={true}
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={LoginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter Your Password ....."
                  required={true}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn  btn-sm neumorphin"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
