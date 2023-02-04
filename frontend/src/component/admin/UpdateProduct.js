import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProduct, getProductDetails } from "../../actions/productAction";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstant";
import Loading from "../layout/Loading";
import MetaData from "../layout/MetaData";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { error, product } = useSelector((state) => state.productDetails);
  const { loading, isUpdated } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["laptop", "mobile", "camera"];

  const productId = params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }

    if (isUpdated) {
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, isUpdated, productId, product]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
    toast.success("Product Updated Succesfully")
    navigate('/admin/products')
  
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`Product Update`} />
          <div className="container my-3">
          <div>
                <button className="btn neumorphin mb-2 btn-sm ">
                  <Link
                    to={"/admin/products"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <i class="fa-solid fa-angles-left me-2"></i>
                    Back To Products
                  </Link>
                </button>
              </div>
            <div className="row justify-content-center">
              <div className="col-md-6 col-12 shadow-lg d-flex flex-column p-4">
                <div className="signupimagecontainer mb-5 ">
                  <img src="/images/clogo.png" alt="" />
                </div>
                <form
                  className="createProductForm"
                  encType="multipart/form-data"
                  onSubmit={updateProductSubmitHandler}
                >
                  <div>
                    <label
                      for="exampleFormControlInput1"
                      className="form-label fw-bold"
                    >
                      Product Name{" "}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control mb-3"
                    />
                  </div>
                  <div>
                    <label
                      for="exampleFormControlInput1"
                      className="form-label fw-bold"
                    >
                      Product Price{" "}
                    </label>
                    <input
                      type="number"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      className="form-control mb-3"
                    />
                  </div>

                  <div>
                    <label
                      for="exampleFormControlInput1"
                      className="form-label fw-bold"
                    >
                      Choose Category
                    </label>
                    <select
                      className="form-select mb-3"
                      value={category}
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
                    <label
                      for="exampleFormControlInput1"
                      className="form-label fw-bold"
                    >
                      Product Stock
                    </label>
                    <input
                      type="number"
                      required
                      onChange={(e) => setStock(e.target.value)}
                      value={Stock}
                      className="form-control mb-3"
                    />
                  </div>

                  <div i>
                    {oldImages &&
                      oldImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt="Old Product Preview"
                          style={{ width: "100px" }}
                        />
                      ))}
                  </div>
                  <div>
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProductImagesChange}
                      multiple
                      className="form-control"
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
                    <label
                      for="exampleFormControlInput1"
                      className="form-label fw-bold  mt-3"
                    >
                      Product Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      cols="30"
                      rows="3"
                      className="form-control "
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading ? true : false}
                    className="btn btn-sm neumorphin fw-bold mt-5"
                  >
                    Update Product{" "}
                    <i className="fa-solid fa-pen-to-square ms-2"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
