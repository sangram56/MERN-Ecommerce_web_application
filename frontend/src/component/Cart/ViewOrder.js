import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails, myOrders } from "../../actions/orderAction";
// import OrderData from "./OrderData";
import Loading from "../layout/Loading";
import MetaData from "../layout/MetaData";

const ViewOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  // console.log(orders)

  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {isAuthenticated ? (
            <>
              <MetaData title={`Your Orders`} />
              <h4 className="ms-5 mt-3 ">Your Orders</h4>
              {orders.length !== 0 ? (
                <>
                  <div className="container ">
                    {orders.map((items) => {
                      return (
                        <>
                          <div className="row shadow-sm m-5 d-flex align-items-center justify-content-center p-3 rounded-2  animate__animated animate__flipInX ">
                            <div className="col-md-4 col-12 ">
                              <p className="fw-bold">Id : {items._id}</p>
                              {items.orderItems.map((item) => (
                                <>
                                  <div className="row">
                                    <div className="col-md-4 col-4">
                                      <img
                                        src={item.image}
                                        alt=""
                                        style={{ width: "30px" }}
                                      />
                                    </div>
                                    <small> {item.name}</small>
                                  </div>
                                </>
                              ))}
                            </div>

                            <div className="col-md-4 col-12">
                              <h6 className="fw-bold">
                                Price : ₹{items.totalPrice}
                              </h6>
                            </div>

                            <div className="col-md-4 col-12">
                              <h6 className="fw-bold text-success">
                                Status :{items.orderStatus}
                              </h6>
                            </div>
                          </div>
                        </>
                      );
                    })}

                    <div className="my-3">
                      <button className="btn neumorphin mb-3 btn-sm fw-bold">
                        <Link
                          to={"/"}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <i class="fa-solid fa-angles-left me-2"></i>
                          Back To Home
                        </Link>
                      </button>
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
                        <h4>No Orders Yet</h4>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default ViewOrder;
