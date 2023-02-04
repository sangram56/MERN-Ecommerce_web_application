import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import Loading from "../layout/Loading";
import MetaData from "../layout/MetaData";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Password  Updated Successfully");

      navigation("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated]);

  if (isUpdated) {
    navigation("/account");
    dispatch({
      type: UPDATE_PASSWORD_RESET,
    });
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`Update Password`} />
          <div className="container mt-3">
            <div className="row justify-content-center">
              <h5 className="chnagepasswordheading text-center my-3">ChangePassword </h5>
              <div className="col-md-4 col-12 shadow-lg p-3 rounded-2 d-flex flex-column justify-content-center usercontainer">
                <div className="signupimagecontainer mb-5 ">
                  <img src="/images/clogo.png" alt="" />
                </div>
                <form
                  className="updatePasswordForm"
                  onSubmit={updatePasswordSubmit}
                >
                  <div className="loginPassword">
                    <input
                      type="password"
                      placeholder="Old Password ...."
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="form-control mb-3"
                    />
                  </div>

                  <div className="loginPassword">
                    <input
                      type="password"
                      placeholder="New Password ...."
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="form-control mb-3"
                    />
                  </div>
                  <div className="loginPassword">
                    <input
                      type="password"
                      placeholder="Confirm Password ...."
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control mb-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-sm neumorphin mt-3 "
                  >
                    <i className="fa-solid fa-pen-to-square me-2"></i>
                    change Password
                  </button>
                </form>

                <button
                  className="btn btn-outline-dark btn-sm neumorphin  mt-5"
                  onClick={() => navigation("/account")}
                >
                <i class="fa-solid fa-arrow-left me-2"></i>
                  Go Back To Your Account
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
