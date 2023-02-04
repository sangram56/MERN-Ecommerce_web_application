import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";


const Cart = () => {
  const params = useParams();
  const Navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const removeCart = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const CheckOut = () => {
    Navigate("/shipping");
  };

  return (
    <>
      <MetaData title={`Your Cart`} />
      {cartItems.length !== 0 ? (
        <>
          <div className="container">
            <h4 className="text-center mt-2">Cart Items </h4>
            {cartItems &&
              cartItems.map((item) => (
                <>
                  <div className="row d-flex align-items-center justify-content-between cartrow2 text-center animate__animated animate__lightSpeedInLeft   ">
                    <div className="col-md-3 col-3 mx-auto">
                      <Link
                        to={`/product/${item.product}`}
                        className="cartlink"
                      >
                        <div className="cartimagecontainer mx-auto">
                          <img src={item.image} alt="" />
                          <div className="text-center">
                            <small>{item.name}</small>
                            <br />
                            <small>₹{item.price}</small>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="col-md-3 col-3 buttoncontainermain ">
                      <div className="row ">
                        <div className="buttoncontainer">
                          <div className="col-md-4 col-3">
                            <button
                              className=" btn  btn-sm neumorphin cartdecbutton "
                              onClick={() =>
                                decreaseQuantity(item.product, item.quantity)
                              }
                            >
                              <i class="fa-solid fa-minus"></i>
                            </button>
                          </div>
                          <div className="col-md-4 col-3  ">
                            <input
                              type="number"
                              value={item.quantity}
                              readOnly={true}
                              className="form-control text-center cartinput neumorphin ms-1 "
                            />
                          </div>
                          <div className="col-md-4 col-3">
                            <button
                              className=" btn btn-sm ms-4 neumorphin cartincbutton ms-3 "
                              onClick={() =>
                                increaseQuantity(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                            >
                              <i class="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className=" col-md-3 col-3 ">
                      <p className="mt-2 text-success">
                        subtotal
                        <br /> {`₹${item.price * item.quantity}`} <br />
                        <i
                          className="fa-solid fa-trash-can text-danger mt-3"
                          onClick={() => removeCart(item.product)}
                        ></i>
                      </p>
                    </div>
                  </div>
                </>
              ))}
          </div>

          <div className="container cartrow ">
            <div className="row  ">
              <div className="col-md-6 mb-3  d-flex align-items-center cartbutton    ">
                <h5 className=" text-success">
                  Total Amount :
                  {`₹${cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}`}
                </h5>
                <button
                  className="btn btn-outline-dark btn-sm neumorphin cartbutton2"
                  onClick={CheckOut}
                >
                  Proceed to checkout
                  <i className="fa-solid fa-arrow-right-from-bracket ms-2"></i>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container mt-5">
            <div className="row ">
              <div className="col-12 d-flex align-items-center justify-content-center flex-column">
                <img
                  src="/images/AnimatedGifs/notfound.gif"
                  alt=""
                  style={{ width: "200px" }}
                />
                <h4>Your Cart is Empty</h4>
              </div>
            </div>
          </div>
        </>
      )}
    
    </>
  );
};

export default Cart;
