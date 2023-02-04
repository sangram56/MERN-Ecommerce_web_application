import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, clearErrors } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.info(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, dispatch, clearErrors, isAuthenticated]);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { email, password, name } = user;
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("./images/avatar.jpg");

  const changeText = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  return (
    <div>
      <MetaData title={`SignUp Page`} />

      <div className="container my-4   ">
        <div className="row justify-content-center ">
          <div className="col-md-6 col-12 shadow-lg p-3 usercontainer animate__animated animate__fadeInUp  ">
            <div className="signupimagecontainer mb-5 ">
              <img src="/images/clogo.png" alt="" />
            </div>
            <form
              action=""
              onSubmit={registerSubmit}
              encType="multipart/form-data"
            >
              <div className="form-group mb-5  ">
                <input
                  type="text"
                  className="form-control bg-transparent   "
                  name="name"
                  autoComplete="off"
                  value={name}
                  onChange={changeText}
                  placeholder="Enter your Name ...... "
                  required={true}
                />
              </div>
              <div className="form-group mb-5  ">
                <input
                  type="email"
                  className="form-control bg-transparent   "
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={changeText}
                  placeholder="Enter your Eamil ...... "
                />
              </div>
              <div className="form-group mb-5  ">
                <input
                  type="password"
                  className="form-control bg-transparent  "
                  name="password"
                  autoComplete="off"
                  value={password}
                  onChange={changeText}
                  placeholder="Enter your password ..... "
                  required={true}
                />
              </div>

              <div className="form-group mb-5  ">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  style={{ width: "30px" }}
                />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={changeText}
                  className="form-control-sm"
                  required={true}
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-sm neumorphin"
                >
                  SignUp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
