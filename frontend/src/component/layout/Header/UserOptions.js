import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const UserOptions = ({ user }) => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  function logoutuser() {
    dispatch(logout());
    toast.success("successfully loggedOut");
    naviagte("/");
  }

  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="dropdown ">
              <button
                className="btn btn-outline-light dropdown-toggle "
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user.avatar.url}
                  alt="UserImage"
                  className="avatarimage"
                />
              </button>
              <ul
                className="dropdown-menu "
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to={"/cart"}>
                <small className="me-2">Cart  </small>
                    <i className="fa-solid useroptionicon fa-cart-shopping ">
                       {cartItems.length}
                    </i>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/orders/me"}>
                    <small className="me-2">Orders  </small>
                    <i className="fa-solid useroptionicon fa-box-archive"></i>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/account"}>
                  <small className="me-2">Profile  </small>
                    <i className="fa-solid useroptionicon fa-user"></i>
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={" "} onClick={logoutuser}>
                   <small className="me-2">Logout  </small>
                    <i className="fa-solid useroptionicon fa-right-from-bracket"></i>
                  </Link>
                </li>

                {user.role == "admin" ? (
                  <li>
                    <Link className="dropdown-item" to={"/admin/dashboard"}>
                   <small className="me-2">Dashboard </small>
                      <i className="fa-solid useroptionicon fa-gauge"></i>
                    </Link>
                  </li>
                ) : (
                  ""
                )} 
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOptions;
