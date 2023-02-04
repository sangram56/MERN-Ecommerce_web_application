import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstant";
import Loading from "../layout/Loading";
import MetaData from "../layout/MetaData";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, orders, loading } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`All Orders`} />
          {orders.length !== 0 ? (
            <>
              <div className="container my-4">
                <div className="my-3">
                  <button className="btn mb-5 btn-sm ">
                    <Link
                      to={"/admin/dashboard"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <i class="fa-solid fa-angles-left me-2"></i>
                      Back To Dashboard
                    </Link>
                  </button>
                </div>
                <div className="row ordertable">
                  <table class="table-responsive table-striped table-bordered table-sm text-center  animate__animated  animate__fadeIn ">
                    <thead>
                      <tr>
                        <th scope="col">SL.NO</th>
                        <th scope="col">OrderID</th>
                        <th scope="col">Products</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Item Names</th>
                        <th scope="col">Delete Order</th>
                        <th scope="col">Update Order</th>
                      </tr>
                    </thead>

                    <tbody>
                      {orders.map((item, key) => (
                        <>
                          {item ? (
                            <>
                              <tr className="">
                                <td scope="col ">{key + 1}</td>
                                <td scope="col">{item._id}</td>
                                <td scope="col">{item.orderItems.length}</td>
                                <td scope="col">{item.totalPrice}</td>
                                <td scope="col">{item.orderStatus}</td>
                                <td scope="col">
                                  {item.orderItems.map((items) => (
                                    <>
                                      <td>ProductName : {items.name}</td>
                                      <br />
                                    </>
                                  ))}
                                </td>

                                <td scope="col">
                                  <button
                                    className="btn btn-danger neumorphin"
                                    onClick={() =>
                                      deleteOrderHandler(`${item._id}`)
                                    }
                                  >
                                    <i
                                      className="fa-solid fa-trash-can"
                                      style={{ color: "red" }}
                                    ></i>
                                  </button>
                                </td>
                                <td scope="col">
                                  {item.orderStatus === "Delivered" ? (
                                    ""
                                  ) : (
                                    <button className="btn btn-danger neumorphin">
                                      <Link to={`/admin/orders/${item._id}`}>
                                        <i
                                          className="fa-solid fa-pen-to-square"
                                          style={{ color: "red" }}
                                        ></i>
                                      </Link>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <h4> ""</h4>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
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
          )}
        </>
      )}
    </>
  );
};

export default Orders;
