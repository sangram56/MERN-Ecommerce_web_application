import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getAdminProduct,
  clearErrors,
} from "../../actions/productAction";
import Loading from "../layout/Loading";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";
import { toast } from "react-toastify";
import ReadMoreReact from "read-more-react";
import MetaData from "../layout/MetaData";

const ProductsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, products, loading } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    // navigate("/admin/products");
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
      toast.success("Product Deleted Successfully");

      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, isDeleted]);

  return (
    <>
      <MetaData title={`All Products`} />

      <div className="container my-3 productlistcontainer">
        <div>
          <button className="btn  mb-5 btn-sm ">
            <Link
              to={"/admin/dashboard"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <i class="fa-solid fa-angles-left me-2"></i>
              Back To Dashboard
            </Link>
          </button>
        </div>
        <div className="row">
          {products.map((item) => (
            <>
              <div className="col-md-4 col-6 productlistcard  animate__animated animate__backInUp">
                <div className="card text-center  mt-5 mb-5 border-0">
                  <div className="imagecontainer p-2">
                    <img
                      src={item.images[0].url}
                      className="card-img-top mx-auto "
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h6 className="card-title">{item.name}</h6>
                    <h6 className="card-title">₹{item.price}</h6>
                    <small className="card-text">
                      <div className="d-inline">
                        <ReadMoreReact
                          text={item.description}
                          readMoreText="...ReadMore"
                          min={50}
                          ideal={60}
                          max={70}
                          readMoreText={
                            <i class="fa-solid fa-ellipsis text-primary readmore ">
                              <small className="readmore ms-1">ReadMore</small>
                            </i>
                          }
                        />
                      </div>
                    </small>
                  </div>

                  <div className="d-flex justify-content-around">
                    <button className="btn neumorphin btn-sm">
                      <Link
                        to={`/admin/product/${item._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <i className="fa-solid fa-pen-to-square ">
                          <small className="ms-2 adminproductlistbutton">Update</small>
                        </i>
                      </Link>
                    </button>

                    <br />
                    <button
                      className="btn btn-outline-danger neumorphin btn-sm"
                      onClick={() => deleteProductHandler(`${item._id}`)}
                    >
                      <i className="fa-solid fa-trash ">
                        <small className="ms-2 adminproductlistbutton">Delete</small>
                      </i>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
