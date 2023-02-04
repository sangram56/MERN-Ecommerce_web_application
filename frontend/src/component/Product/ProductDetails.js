import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductDetails,
  newReview,
  clearErrors,
} from "../../actions/productAction";
import Loading from "../layout/Loading";
import ReviewCard from "./ReviewCard.js";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import Rating from "@mui/material/Rating";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstant";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const options = {
    size: "medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      toast.warning("please signup/login to Add the product to cart ");
    } else {
      dispatch(addItemsToCart(params.id, quantity));

      toast.success("item added to cart ");
      navigate("/cart");
    }
  };

  const submitReviewToggle = () => {
    if (!isAuthenticated) {
      toast.warning("please signup/login to submit the  review");
    } else {
      open ? setOpen(false) : setOpen(true);
    }
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, error, reviewError, success]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product.name} -- BuySure`} />
          <div className="container ">
            <div className="row d-flex align-items-center justify-content-around ">
              <h6 className="customertext fw-bold">{product.name}</h6>
              <div className="col col-md-6 col-12 text-center detailimagecontainer mt-4 ">
                {product.images &&
                  product.images.map((item) => <img src={item.url} />)}
                <div className="text-center">
                  <Rating {...options} />
                </div>
              </div>

              <div className="col col-md-6 col-12  productdetailstext  mt-5 pt-5">
                <p><small>Product : {product.name}</small></p>
                <hr className="producthr" />
                <p><small>ID : {product._id}</small></p>
                <p><small>Price:₹{product.price}</small></p>
                <p>
                  <small> Status :</small>
              
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>

                <p className="description">
                 <small> Description: {product.description}</small>
                </p>

                <div className="row  ">
                  {product.Stock < 1 ? (
                    <> </>
                  ) : (
                    <>
                      <div className="buttoncontainer">
                        <div className="col-md-4">
                          <button
                            className=" btn btn-sm neumorphin decreasebutton"
                            onClick={decreaseQuantity}
                          >
                            <i class="fa-solid fa-minus"></i>
                          </button>
                        </div>
                        <div className="col-md-4">
                          <input
                            type="number"
                            value={quantity}
                            readOnly={true}
                            className="form-control text-center cartinput neumorphin"
                          />
                        </div>
                        <div className="col-md-4">
                          <button
                            className=" btn btn-sm ms-4 neumorphin increasebutton "
                            onClick={increaseQuantity}
                          >
                            <i class="fa-solid fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="d-flex align-items-center  mt-3">
                  <button
                    className=" btn shadow-lg btn-sm neumorphin"
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                    <i className="fa-solid fa-cart-arrow-down ms-1"></i>
                  </button>

                  <button
                    className=" btn neumorphin btn-sm ms-3"
                    onClick={submitReviewToggle}
                  >
                    SubmitReview<i className="fa-solid fa-pen ms-1"></i>
                  </button>
                </div>

                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className="submitDialog">
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      value={rating}
                      size="large"
                    />

                    <textarea
                      className="submitDialogTextArea"
                      cols="30"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="container my-5">
            <div className="row mt-5">
              <h6 className="customertext"><small>Customer Reviews :</small></h6>
              {product.reviews && product.reviews[0] ? (
                <div>
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <div className="col-6 col-md-3 shadow-lg rounded-3 p-1 overflow-auto mt-2">
                        <ReviewCard key={review._id} review={review} />
                      </div>
                    ))}
                </div>
              ) : (
                <p className="fw-bold text-warning">***No Reviews***</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
