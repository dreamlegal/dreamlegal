import React from "react";
import ProductAllReviewProgressbar from "./ProductAllReviewProgressbar";
import AllReview from "./AllReview";

function ProductReview({ product }: any) {
  return (
    <div>
      <ProductAllReviewProgressbar product={product} />
      <AllReview product={product} />
    </div>
  );
}

export default ProductReview;
