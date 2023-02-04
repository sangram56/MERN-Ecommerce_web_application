import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import store from "../../../Store";
import { loadUser } from "../../../actions/userAction";
import UserOptions from "./UserOptions";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    store.dispatch(loadUser());
  }, [dispatch]);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <>
      <nav className="navbar navbar-expand-lg linearcolor sticky-top  ">
        <div className="container">
          <Link className="navbar-brand brandtext fw-bold" to={"/"}>
            BuySure
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto me-5  ">
              <li className="nav-item">
                <Link className="nav-link  " aria-current="page" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={"/products"}>
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={"/signup"}>
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to={"/login"}>
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to={"/search"}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </Link>
              </li>

              {isAuthenticated && <UserOptions user={user} />}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
