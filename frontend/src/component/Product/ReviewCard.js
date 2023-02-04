import React from "react";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";

const ReviewCard = ({ review }) => {
  const options = {
    size: "small",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center flex-column text-center reviewtext">
        <p style={{ marginBottom: "-1px" }}>{review.name}</p>
        <Rating {...options} />
        <br />
        <p style={{ marginTop: "-20px" }}>{review.comment}</p>
      </div>
    </>
  );
};

export default ReviewCard;
