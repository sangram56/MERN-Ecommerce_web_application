import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";


const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigation = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigation(`/products/${keyword}`);
    } else {
      navigation("/products");
    }
  };

  return (
    <>
      <MetaData title="Search" />
      <div className="container search_container ">
        <button className="  mb-3 btn  btn-sm  mb-5">
          <Link to={"/"} style={{ textDecoration: "none", color: "black" }}>
            <i class="fa-solid fa-angles-left me-2"></i>
            Back To Home
          </Link>
        </button>

        <div className="row animate__animated  animate__fadeInUpBig ">
          <div className="col-12 col-md-12 col-lg-12">
            <form onSubmit={searchSubmitHandler}>
              <div className="input-group shadow-lg">
                <input
                  type="text"
                  placeholder="Search Products ..............."
                  onChange={(e) => setKeyword(e.target.value)}
                  className="form-control search_control"
                />
                <button type="submit" className="btn btn-outline-primary ">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default Search;
