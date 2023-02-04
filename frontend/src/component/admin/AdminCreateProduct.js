import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { NEW_PRODUCT_RESET } from "../../constants/productConstant";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["laptop", "mobile", "camera"];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    //array.from create copy of a array
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title={`Add Product`} />
      <div className="container my-2">
        <div>
          <button className="btn mb-2 btn-sm ">
            <Link
              to={"/admin/dashboard"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <i class="fa-solid fa-angles-left me-2"></i>
              Back To Dashboard
            </Link>
          </button>
        </div>
        <h5 className="text-center mb-3"></h5>
        <div className="row justify-content-center">
          <div className="col-md-6 col-12 p-4 shadow-lg rounded-2 d-flex flex-column animate__animated animate__backInUp ">
            <div className="signupimagecontainer mb-5 ">
              <img src="/images/clogo.png" alt="" />
            </div>
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <div>
                <input
                  type="text"
                  placeholder="Enter Product Name ...."
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control mb-3"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Enter Product Price ...."
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control mb-3"
                />
              </div>

              <div>
                <select
                  className="form-control mb-3"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Enter Product Stock ...."
                  required
                  onChange={(e) => setStock(e.target.value)}
                  className="form-control mb-3"
                />
              </div>

              <div>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                  className="form-control-sm mb-3"
                />
              </div>

              <div>
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product Preview"
                    style={{ width: "100px" }}
                  />
                ))}
              </div>

              <div>
                <textarea
                  placeholder="Enter Product Description ....."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="3"
                  className="form-control mb-3"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-sm neumorphin"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  CreateProduct <i className="fa-solid fa-plus ms-2"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
