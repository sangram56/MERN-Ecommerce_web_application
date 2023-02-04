import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        // viewed in stripe payment page
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        toast.error(result.error);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
          // localStorage.removeItem("cartItems");
        } else {
          toast.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  return (
    <>
      <MetaData title={`Payment Page`} />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4 col-12  shadow-lg rounded-4 p-4 animate__animated animate__fadeInUp">
            <h5>CardInfo</h5>
            <form action="" onSubmit={(e) => submitHandle(e)}>
              <div className="my-2">
                <i className="fa-solid fa-id-card"></i>
                <div className="border border-1 p-1 rounded-2">
                  <CardNumberElement />
                </div>
              </div>

              <div className="my-2">
                <i className="fa-solid fa-calendar-days"></i>
                <div className="border border-1 p-1 rounded-2">
                  <CardExpiryElement />
                </div>
              </div>

              <div className="my-2">
                <i className="fa-solid fa-key"></i>
                <div className="border border-1 p-1 rounded-2">
                  <CardCvcElement />
                </div>
              </div>

              <input
                type="submit"
                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className="form-control my-3 neumorphin fw-bold"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
