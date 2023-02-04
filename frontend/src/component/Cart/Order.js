import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const Payment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <MetaData title={`Your Orders`} />
          <div className="container-fluid my-3 ">
            <h4 className="text-center mb-5">Order Details </h4>
            <div className="row p-2 ">
              <div className="col-md-4 col-12 ">
                <h6 className="fw-bold">Shipping Details : </h6>
                <p>Name: {user.name}</p>
                <p>Phone: {shippingInfo.phoneNo}</p>
                <p>Address: {address}</p>
              </div>

              <div className="col-md-4 col-12 ps-5  cartitems ">
                <h6 className="fw-bold">Your Cart Items : </h6>

                {cartItems &&
                  cartItems.map((item) => (
                    <div key={item.product}>
                      <img
                        src={item.image}
                        alt="Product"
                        style={{ width: "50px" }}
                      />
                      <Link
                        to={`/product/${item.product}`}
                        className="orderlink"
                      >
                        {item.name}
                      </Link>

                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>

              <div className="col-md-4 col-12 ps-5 cartorder">
                <h6 className="fw-bold">Order Summary :</h6>
                <div>
                  <div>
                    <p>Subtotal: ₹{subtotal}</p>
                  </div>
                  <div>
                    <p>Shipping Charges: ₹{shippingCharges}</p>
                  </div>
                  <div>
                    <p>GST: ₹{tax}</p>
                  </div>
                </div>

                <div className="orderSummaryTotal">
                  <p>
                    <b>Total: ₹{totalPrice}</b>
                  </p>
                </div>

                <button
                  onClick={Payment}
                  className="btn btn-outline-success neumorphin"
                >
                  Proceed To Payment <i class="fa-solid fa-angles-right"></i>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ConfirmOrder;
