import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";


const ProductCard = ({ product }) => {
  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <Link to={`/product/${product._id}`} className="ProductLink ">
        <div className="card cardcontainer  text-center mt-5 mb-5 productcardcontainer bg-transparent animate__animated animate__backInUp">
          <div className="imagecontainer p-3">
            <img
              src={product.images[0].url}
              alt={product.name}
              className="card-img-top mx-auto "
            />
          </div>
          <div className="card-body p-2 ">
            <div className="d-flex flex-column">
              <h6 className="card-title fs-6 "><small>{product.name}</small></h6>
              <p className="card-text fs-6"><small>Price:₹{product.price}</small></p>
              <div className="text-center ">
                <Rating {...options} />
              </div>
            </div>
          </div>
        </div>
      </Link>
  
    </>
  );
};

export default ProductCard;
