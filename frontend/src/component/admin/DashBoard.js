import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { getAdminProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";
import MetaData from "../layout/MetaData";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "TotalAmount"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["rgb(67, 219, 224"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <MetaData title={`Admin Dashboard`} />
      <h4 className="text-center mb-5 mt-2 ">
        Admin DashBoard
      </h4>
      <hr />

      <div className="container-fluid  ">
        <div className="row ">
          <div className="col-md-2 col-12 mt-5  ">
            <h5 className="my-5 mylink">
              <Link className="dashboardlink" to={"/admin/products"}>
                <i className="me-2 fa-solid fa-circle-info"></i>
                Products Details
              </Link>
            </h5>

            <h5 className="my-5 mylink">
              <Link className="dashboardlink" to={"/admin/product"}>
                <i className="me-2 fa-solid fa-circle-plus"></i>
                Create product
              </Link>
            </h5>

            <h5 className="my-5 mylink">
              <Link className="dashboardlink" to={"/admin/orders"}>
                <i className="me-2 fa-solid fa-truck"></i>
                Orders
              </Link>
            </h5>

            <h5 className="my-5 mylink">
              <Link className="dashboardlink" to={"/admin/users"}>
                <i className="me-2 fa-solid fa-users"></i>
                Users
              </Link>
            </h5>
          </div>

          <div className="col-md-10">

            <div className="row adminsublink d-flex align-items-center justify-content-evenly">
              <div className="col-md-4 col-3 ">
                <Link
                  className="dashboardlink text-center  admintextcolor"
                  to={"/admin/products"}
                >
                  <p>
                    Total Products <br /> {products && products.length}
                  </p>
                </Link>
              </div>
              <div className="col-md-4 col-3 ">
                <Link
                  className="dashboardlink text-center  admintextcolor"
                  to={"/admin/orders"}
                >
                  <p>
                    Total Orders <br /> {orders && orders.length}
                  </p>
                </Link>
              </div>
              <div className="col-md-4 col-3">
                <Link
                  className="dashboardlink text-center  admintextcolor "
                  to={"/admin/users"}
                >
                  <p>
                    Total Users <br /> {users && users.length}
                  </p>
                </Link>
              </div>
            </div>

            <div className="row reactchart">
              <div className="col-md-12 col-12">
                <Line data={lineState} />
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </>
  );
};

export default DashBoard;
