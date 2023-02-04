import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <>
       <MetaData title={`Order Success`} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 col-12 d-flex align-items-center justify-content-center flex-column">
            <img
              src="/images/AnimatedGifs/check.gif"
              alt=""
              style={{ width: "200px" }}
            />
            <h3 className="fw-bold placeordertext">Order Placed Sucessfully</h3>
            <button
              className="btn btn-outline-success mt-5 btn-sm neumorphin fw-bold"
              onClick={() => navigate("/orders/me")}
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default OrderSuccess;
