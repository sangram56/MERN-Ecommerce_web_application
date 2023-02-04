import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrderDetails, updateOrder } from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import Loading from "../layout/Loading";
import MetaData from "../layout/MetaData";

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { isUpdated } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");
  const orderSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(params.id, myForm));
  };
  useEffect(() => {
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(params.id));
  }, [dispatch, isUpdated]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`Order Update`} />
          <div className="container mt-5">
           <div>
           <button className="btn neumorphin mb-5 btn-sm ">
                  <Link
                    to={"/admin/orders"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <i class="fa-solid fa-angles-left me-2"></i>
                    Back To Orders
                  </Link>
                </button>
           </div>
            <div className="row justify-content-center">
              <div className="col-md-4 col-12 text-center shadow-lg rounded-2 p-4">
                <div className="signupimagecontainer mb-5 ">
                  <img src="/images/logoimage.png" alt="" />
                </div>
                <form action="" onSubmit={orderSubmit}>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Update Status </option>
                    {order.orderStatus === "Processing" ? (
                      <option value="Shipped">Shipped</option>
                    ) : (
                      ""
                    )}
                    {order.orderStatus == "Shipped" ? (
                      <option value="Delivered">Deliverd</option>
                    ) : (
                      ""
                    )}
                  </select>

                  <button className="btn neumorphin mt-5 btn-sm" type="submit">
                    Update Order
                  </button>
                </form>

                <div>
                
              </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateOrder;
