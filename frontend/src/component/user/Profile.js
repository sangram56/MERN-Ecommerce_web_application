import React, { useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import Loading from "../layout/Loading";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigation = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isAuthenticated ? (
            <>
              <MetaData title={`Welcome ${user.name}`} />
              <div className="container  mt-4  ">
                <h5 className="profileheadingtext text-center my-3">
                  YourProfile{" "}
                </h5>
                <div className="row  justify-content-center  ">
                  <div className="col-md-4 col-12 shadow-lg rounded d-flex flex-column p-5 animate__animated animate__fadeInUp ">
                    <div className="profileimagecontainer mx-auto mb-3">
                      <img
                        src={user.avatar.url}
                        alt={user.name}
                        className="profileimage"
                      />
                    </div>
                    <div className="mx-auto mb-3">
                      <h6>UsersName : {user.name}</h6>
                    </div>
                    <div className="mx-auto mb-3">
                      <h6>UsersEmail : {user.email}</h6>
                    </div>
                    <div className="mx-auto mb-3">
                      <h6>JoinedOn : {String(user.createdAt).substr(0, 10)}</h6>
                    </div>
                    <div className="d-flex justify-content-around">
                      <button className="btn btn-light text-dark  neumorphin btn-sm">
                        <Link className="profilelink" to="/password/update">
                          Change Password
                        </Link>
                      </button>
                      <button className="btn btn-light text-dark  neumorphin btn-sm">
                        <Link className="profilelink" to="/me/update">
                          Edit Profile
                        </Link>
                      </button>
                    </div>
                    <button
                      className="btn btn-outline-dark btn-sm neumorphin  mt-5"
                      onClick={() => navigation("/")}
                    >
                      <i class="fa-solid fa-arrow-left me-2"></i>
                      Go Back To Home
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

export default Profile;
