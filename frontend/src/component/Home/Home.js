import React, { useEffect } from "react";
import { getProduct, clearErrors } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../layout/Loading";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../layout/Footer";

const Home = () => {
  const navigate = useNavigate();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  // console.log(products)

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  const productcheckout = () => {
    navigate("/products");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="BuySure" />

          {/* hero section start */}
          <div className="container herocontainer shadow-lg ">
            <div className="row d-flex  align-items-center justify-content-around">
              <div className="col-lg-6 col-md-6 col-6 ps-5">
                <h1 className="herotext">
                  Hello ! what would <br></br> you like to buy
                </h1>
                <p className="herosubtext">
                  search between millons of products from hundred different
                  online shops our price comparison service help you to find the
                  best deal in the market .
                </p>
                <button className="btn herobtn mt-3">
                  <Link to={`/products`} className="btnLink">
                    Our Products
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Link>{" "}
                </button>
              </div>

              <div className="col-lg-6 col-md-6 col-6">
                <img
                  src="./images/heroimage.png"
                  alt="heroimage"
                  className="heroimage ml-3"
                />
              </div>
            </div>
          </div>

          {/* hero section ends */}

          {/* details container start */}

          <div className="container detailscontainer mt-5 ">
            <div className="row  ">
              <div className="col-md-4 col-12 ">
                <div class="card detailscard text-center bg-light shadow-lg">
                  <i class=" detailsicon fa-solid fa-truck"></i>
                  <div class="card-body">
                    <h6 class="card-title">Fast Delivery</h6>
                    <p class="card-text">
                      <small>
                        {" "}
                        Don’t worry, our team of ninjas will go out fighting to
                        deliver your package on time.
                      </small>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-12">
                <div class="card detailscard text-center bg-light shadow-lg">
                  <i class=" detailsicon fa-solid fa-arrow-right-arrow-left"></i>
                  <div class="card-body">
                    <h6 class="card-title">Easy Return</h6>
                    <p class="card-text">
                      <small>
                        {" "}
                        If for any reason Clients are not satisfied with an
                        order, the items can be returned Easily
                      </small>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-12">
                <div class="card detailscard text-center bg-light shadow-lg">
                  <i class=" detailsicon fa-solid fa-headset"></i>
                  <div class="card-body">
                    <h6 class="card-title">24x7 Support</h6>
                    <p class="card-text">
                      <small>
                        {" "}
                        We are open 24x7 for solve the queries our customer
                        faced
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* details container end */}

          {/* product card */}
          <div className="container homecontainer  ">
            <div className="row ">
              <h6 className="newlylaunchtext ">Featured Products</h6>

              {products &&
                products.map((product) => {
                  return (
                    <div className="col-md-3 col-6 ">
                      <ProductCard key={product._id} product={product} />
                    </div>
                  );
                })}
            </div>
          </div>

          {/* produc  card ends */}

          {/* payment methods start */}

          {/* <div className="container paycontainer  ">
            <div className="row p-5 rounded-2 paycontainerrow ms-5  ">
              <h2 className="text-center fw-bold newlylaunchtext mb-5 ">
                Using Convinient Methods
              </h2>
              <div className="col-md-3 col-6">
                <div className="payimage shadow-lg">
                  <img src="./images/paytm.png" />
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="payimage shadow-lg">
                  <img src="./images/phonepay.png" />
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="payimage shadow-lg">
                  <img src="./images/visa.png" />
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="payimage shadow-lg">
                  <img src="./images/mastercard.png" />
                </div>
              </div>
            </div>
          </div> */}
          {/* payment methods ends */}

          {/* checkout latest product */}
          <div className="container latestcontainer border rounded-3 shadow-lg">
            <div className="row d-flex  text-center align-items-center justify-content-center p-4  ">
              <div className="col-lg-12 col-md-12 col-12">
                <h1>Incrediable collections waiting for you !</h1>

                <button className="btn chekoutbtn  mt-3">
                  <Link to={`/products`} className="checkoutlink">
                    Checkout Now
                    <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Link>{" "}
                </button>
              </div>
            </div>
          </div>
          {/* checkout latest prodct ends */}
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
