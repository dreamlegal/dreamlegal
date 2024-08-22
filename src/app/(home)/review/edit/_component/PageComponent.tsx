"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CheckboxDemo from "./EditReviewForm";
import Loading from "@/components/Loading";

function EditReviewPage() {
  const searchParams = useSearchParams() || new URLSearchParams();
  const id = searchParams.get("id") || "";
  const [review, setReview] = useState<any>({});
  const [loadingReview, setLoadingReview] = useState<boolean>(true);
  const [loadingProduct, setLoadingProduct] = useState<boolean>(true);
  const [product, setProduct] = useState<any>({});

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch("/api/get-review-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setReview(data.review);
        console.log(data);
      } catch (error) {
        console.error("Error fetching review:", error);
      } finally {
        setLoadingReview(false);
      }
    };

    if (id) {
      fetchReview();
    }
  }, [id]);

  useEffect(() => {
    const fetchProduct = async (productId:any) => {
      try {
        
        if (!productId) {
          throw new Error("productId not given");
        }
        
        const response = await fetch("/api/get-product-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: productId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setProduct(data.product);
        console.log(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoadingProduct(false);
      }
    };

    if (review.productId) {
      fetchProduct(review.productId);
    } else {
      setLoadingProduct(false);
    }
  }, [review]);

  return (
    <div>
      {loadingReview ? (
        <Loading></Loading>
      ) : loadingProduct ? (
        <Loading></Loading>
      ) : (

        <div>
          <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-8 font-clarity">
            <div className="flex flex-col justify-between lg:flex-row gap-5 md:gap-12">
              <div className="  border  p-4 rounded-md w-full border-primary1/20 md:w-fit  h-fit">
                <p className="text-sm text-gray-500 mb-3">You are reviewing</p>
                <div className="flex gap-4 items-center mb-6 ">
                  <img
                    className="w-16 h-16 rounded-full"
                    src={product?.logoUrl}
                    alt={product?.name}
                  />
                  <div>
                    <h1 className="text-xl font-bold">{product?.name}</h1>
                    <p className="text-sm text-slate-500">
                      {product?.description}
                    </p>
                  </div>
                </div>
                <div className="ml-4">
                  <Link
                    className=" text-primary1  text-sm"
                    href={`/product/${product.id}`}
                  >
                    Back to product
                  </Link>
                </div>
              </div>
             {product?.id && <CheckboxDemo review={review} product={product} />}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditReviewPage;
