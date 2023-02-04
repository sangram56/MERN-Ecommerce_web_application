import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Header from "./component/layout/Header/Header";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import Signup from "./component/user/Signup";
import Login from "./component/user/Login";
import Profile from "./component/user/Profile.js";
import UpdateProfile from "./component/user/UpdateProfile.js";
import UpdatePassword from "./component/user/UpdatePassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping";
import Order from "./component/Cart/Order.js";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import ViewOrder from "./component/Cart/ViewOrder.js";
import OrderDetails from "./component/Cart/OrderDetails.js";
import DashBoard from "./component/admin/DashBoard.js";
import ProductsList from "./component/admin/ProductsList.js";
import AdminCreateProduct from "./component/admin/AdminCreateProduct.js";
import PNF from "./component/layout/PNF.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import Orders from "./component/admin/Orders.js";
import UpdateOrder from "./component/admin/UpdateOrder.js";
import Users from "./component/admin/Users.js";



const App = () => {
  //for stripe
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    <Header />;
  }, []);

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header />

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route path="/process/payment" element={<Payment />} />
            </Routes>
          </Elements>
        )}

        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          closeOnClick
          pauseOnHover
        />

        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/product/:id"} element={<ProductDetails />} />
          <Route path={"/products/:keyword"} element={<Products />} />
          <Route path={"/products"} element={<Products />} />
          <Route path={"/search"} element={<Search />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/account"} element={<Profile />} />
          <Route path={"/me/update"} element={<UpdateProfile />} />
          <Route path={"/password/update"} element={<UpdatePassword />} />
          <Route path={"/cart"} element={<Cart />} />
          <Route path={"/shipping"} element={<Shipping />} />
          <Route path={"/order/confirm"} element={<Order />} />
          <Route path={"/success"} element={<OrderSuccess />} />
          <Route path={"/orders/me"} element={<ViewOrder />} />
          <Route path={"/orders/:id"} element={<OrderDetails />} />
          <Route path={"/admin/dashboard"} element={<DashBoard />} />
          <Route path={"/admin/products"} element={<ProductsList />} />
          <Route path={"/admin/product"} element={<AdminCreateProduct />} />
          <Route path={"/admin/product/:id"} element={<UpdateProduct />} />
          <Route path={"/admin/orders"} element={<Orders />} />
          <Route path={"/admin/orders/:id"} element={<UpdateOrder />} />
          <Route path={"/admin/users"} element={<Users />} />
          {/* <Route path={"/*"} element={<PNF />} /> */}
        </Routes>
       
      </BrowserRouter>
    </>
  );
};

export default App;
