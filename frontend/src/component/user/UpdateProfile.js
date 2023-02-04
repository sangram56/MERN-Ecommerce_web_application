import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import Loading from "../layout/Loading";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/images/avatar.jpg");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("user profile updated ");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, user, isUpdated, error, navigate]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isAuthenticated ? (
            <>
              <MetaData title={`Update Profile`} />
              <div className="container mt-3">
                <div className="row justify-content-center">
                  <h4 className="updateuserheading text-center my-3">Update Your Profile </h4>
                  <div className="col-md-4 col-12 shadow-lg p-4 rounded-2 d-flex flex-column usercontainer">
                    <div className="signupimagecontainer mb-5 ">
                      <img src="/images/clogo.png" alt="" />
                    </div>
                    <form
                      encType="multipart/form-data"
                      onSubmit={updateProfileSubmit}
                    >
                      <div className="mb-2">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label fw-bold"
                        >
                          User Name :
                        </label>
                        <input
                          type="text"
                          placeholder="Name"
                          required
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="mb-2">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label fw-bold"
                        >
                          User Email :
                        </label>
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-2">
                        <div className="updateuserimagecontainer">
                          <img
                            src={avatarPreview}
                            alt="Avatar Preview"
                            className="updateavatar"
                          />
                        </div>
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={updateProfileDataChange}
                          className="form-control-sm"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-sm neumorphin  mt-3"
                      >
                        <i className="fa-solid fa-pen-to-square me-2"></i>{" "}
                        UpdateProfile
                      </button>
                    </form>
                    <button
                      className="btn btn-outline-dark btn-sm neumorphin  mt-5"
                      onClick={() => navigate("/account")}
                    >
                      <i class="fa-solid fa-arrow-left me-2"></i> Go Back To
                      Your Account
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default UpdateProfile;
