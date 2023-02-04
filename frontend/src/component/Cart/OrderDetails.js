import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails, myOrders } from "../../actions/orderAction";
// import OrderData from "./OrderData";
import Loading from "../layout/Loading";
import MetaData from "../layout/MetaData";


const OrderDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const { user, isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getOrderDetails(params.id));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isAuthenticated ? (
            <>
              <MetaData title={`Order Details`} />
              <div className="container">
                <div className="row">
                  <div className="col-md-4 col-12">
                    <h6>PaymentMode : </h6>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>

                    <h6>TotaPrice With Tax and Shippingcharges:</h6>
                    <span>₹{order.totalPrice}</span>

                    <h6>ItemsPrice</h6>
                    <span>₹{order.itemsPrice}</span>

                    <h6>OrderStatus :</h6>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>

                  <div className="col-md-4 col-12">
                    <h4>ShippingInfo : </h4>
                    <h6>Adress : {order.shippingInfo.address}</h6>
                    <h6>state :{order.shippingInfo.state}</h6>
                    <h6>city : {order.shippingInfo.city}</h6>
                    <h6>MobileNo : {order.shippingInfo.phoneNo}</h6>
                  </div>

                  <div className="col-md-4 col-12">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
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

export default OrderDetails;
