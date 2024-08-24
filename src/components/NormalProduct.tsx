import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
} from "next-share";


function NormalProduct({
  id,
  image,
  title,
  description,
  category,
  product,
 
}: any) {
  const userId =
    typeof window !== "undefined" && localStorage.getItem("userId");
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Fetch initial bookmark status if needed
    // This can be an API call to check if the product is already bookmarked by the user
  }, []);

  useEffect(() => {
    const checkBookmark = async () => {
      if (!userId) return;

      try {
        const response = await fetch("/api/check-bookmark", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, productId: id }),
        });

        if (response.ok) {
          const result = await response.json();
          setIsBookmarked(result.isBookmarked);
        }
      } catch (error) {
        console.error("Error checking bookmark", error);
      }
    };

    checkBookmark();
  }, [userId, id]);
  const userCategories = [
    {
      name: "Law firms",
      icon: "/lawfirmicon.svg",
    },
    {
      name: "Individual Practitioner",
      icon: "/prac.svg",
    },
    {
      name: "Government departments",
      icon: "/govdepticon.svg",
    },
    {
      name: "Startups",
      icon: "/startupicon.svg",
    },
    {
      name: "Enterprises",
      icon: "/enterpriceicon.svg",
    },
    {
      name: "Judiciary",
      icon: "/judge1.svg",
    },
  ];

  const handleBookmarkClick = async () => {
    if (!userId) {
      alert("Please log in to bookmark products");
      return;
    }

    try {
      const response = await fetch("/api/save-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId: id }),
      });

      if (response.ok) {
        const result = await response.json();
        setIsBookmarked(!isBookmarked);
        alert(result.message);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error("Error bookmarking product", error);
      alert("Failed to bookmark product");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard: ", error);
      });
  };

  const userCategoryIcons = product.userCategory
    .map((userCat: any) => {
      const categoryObj = userCategories.find((cat) => cat.name === userCat);
      return categoryObj ? categoryObj : null;
    })
    .filter(Boolean); // Filter out null values

  const industries = product.industry;
  const isOdd = industries.length % 2 !== 0;


 
  

 const [ratings, setRatings] = useState({
    overallRating: 0,
    message: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatings = async (id: any) => {
      try {
        const response = await fetch("/api/cal-review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data rating", data);

        // Update the state with the fetched data
        if (data.message === "No reviews found for this product") {
          setRatings({ overallRating: 0, message: "No reviews found for this product" });
        } else {
          setRatings(data);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (product && product.id) {
      fetchRatings(product.id);
    } else {
      setLoading(false);
      setError("Product ID is missing.");
    }
  }, [product]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const { overallRating } = ratings;

  // Round the overall rating
  const roundedOverallRating = (overallRating ?? 0).toFixed(1);


  

  



  return (
    <div className="w-full px-10 py-7  rounded-xl border  font-clarity bg-gray-50 border-gray-300 shadow-md">
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex gap-4 items-center">
          <img
            src={image}
            className="w-14 h-14 rounded-full shadow-blue-50 shadow-sm"
            alt=""
          />
          <div className="flex flex-col gap-1 ml-1">
            <div>
              <h3 className="font-bold text-base">{title}</h3>
            </div>
            <div className="px-2 py-1 bg-primary2 rounded-full">
              {" "}
              <span className="text-xs text-primary1 font-bold">
                {category}
              </span>
            </div>
          </div>
        </div>
        <div className=" hidden md:block md:ml-auto">
          <div className="md:ml-auto mt-4 md:mt-0 flex gap-4 items-center">
            <div>
              <Link
                href={`/product/${product.slug}`}
                className="flex gap-2 items-center bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all w-fit  hover:bg-primary2 hover:text-primary1 hover:border-primary1 rounded-full hover:gap-4"
              >
                View
                <IoIosArrowRoundForward className="text-xl" />
              </Link>
            </div>

            <div
              className="flex gap-2 text-slate-800 text-lg items-center "
              onClick={handleBookmarkClick}
            >
              {/* Bookemark button */}{" "}
              <FaBookmark
                className={
                  isBookmarked
                    ? "text-primary1"
                    : "text-gray-300 hover:text-primary1 cursor-pointer transition-all duration-200"
                }
              />{" "}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex gap-2 text-slate-800 text-lg items-center">
                  {" "}
                  <FiShare2 />{" "}
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share link</DialogTitle>
                  <DialogDescription>
                    Anyone who has this link will be able to view this.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="link" className="sr-only">
                      Link
                    </Label>
                    <Input
                      id="link"
                      defaultValue={`https://www.dreamlegal.in/product/${product.slug}`}
                      readOnly
                    />
                  </div>
                  <div className="">
                    <Button
                      variant="outline"
                      onClick={() =>
                        copyToClipboard(
                          `https://www.dreamlegal.in/product/${product.slug}`
                        )
                      }
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <div>
                    <FacebookShareButton
                      url={`https://www.dreamlegal.in/product/${product.slug}`}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </div>
                  <div>
                    <TwitterShareButton
                      url={`https://www.dreamlegal.in/product/${product.slug}`}
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </div>
                  <div>
                    <WhatsappShareButton
                      url={`https://www.dreamlegal.in/product/${product.slug}`}
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </div>
                  <div>
                    <LinkedinShareButton
                      url={`https://www.dreamlegal.in/product/${product.slug}`}
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </div>
                  <div>
                    <RedditShareButton
                      url={`https://www.dreamlegal.in/product/${product.slug}`}
                    >
                      <RedditIcon size={32} round />
                    </RedditShareButton>
                  </div>
                  <div>
                    <TelegramShareButton
                      url={`https://www.dreamlegal.in/product/${product.slug}`}
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div></div>
      </div>
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs text-slate-400 mt-4 mb-1">Overview</div>
          <div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="text-xs text-slate-400 mt-4 mb-1">Users</div>
        <div className="flex flex-col sm:flex-row sm:justify-between">

          <div className="flex gap-2 overflow-x-auto sm:flex-row sm:overflow-visible">
            {userCategoryIcons.map((userCategory: any, index: number) => (
              <div
                key={userCategory.name}
                className="relative group flex gap-2 items-center bg-primary2 rounded-md p-2"
              >
                <img
                  src={userCategory.icon}
                  alt={userCategory.name}
                  className="w-6 h-6"
                />
                <div className="hidden group-hover:block text-[10px] font-clarity font-bold transition-all duration-200 cursor-pointer">
                  {userCategory.name}
                </div>
              </div>
            ))}
          </div>

          
          <div className="flex flex-col sm:flex-row sm:gap-5 mt-4 sm:mt-0">
            <div className="text-xs text-slate-400 mb-1">
              <p className="text-sm text-gray-600">Team Members</p>
              <p>1</p>
            </div>
            <div className="text-xs text-slate-400 mb-1">
              <p className="text-sm text-gray-600">Average Adoption Time</p>
              <p>{product.avgTimeAdoption}</p>
            </div>
            <div className="text-xs text-slate-400 mb-1 flex flex-col">
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-[#FDB52A] text-[17px]">
                {roundedOverallRating}
                <span className="text-[12px]">/5</span>
              </p>
            </div>
          </div>
        </div>

       
      </div>

      
      <div className=" block md:hidden">
        <div className="md:ml-auto mt-4 md:mt-0 flex gap-4 items-center">
          <div>
            <Link
              href={`/product/${product.slug}`}
              className="flex gap-2 items-center bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all w-fit  hover:bg-primary2 hover:text-primary1 hover:border-primary1 rounded-full hover:gap-4"
            >
              View
              <IoIosArrowRoundForward className="text-xl" />
            </Link>
          </div>

          <div
            className="flex gap-2 text-slate-800 text-lg items-center "
            onClick={handleBookmarkClick}
          >
            {/* Bookemark button */}{" "}
            <FaBookmark
              className={
                isBookmarked
                  ? "text-primary1"
                  : "text-gray-300 hover:text-primary1 cursor-pointer transition-all duration-200"
              }
            />{" "}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex gap-2 text-slate-800 text-lg items-center">
                {" "}
                <FiShare2 />{" "}
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input
                    id="link"
                    defaultValue={`https://www.dreamlegal.in/product/${product.slug}`}
                    readOnly
                  />
                  <div className="">
                    <Button
                      variant="outline"
                      onClick={() =>
                        copyToClipboard(
                          `https://www.dreamlegal.in/product/${product.slug}`
                        )
                      }
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <div>
                  <FacebookShareButton
                    url={`https://www.dreamlegal.in/product/${product.slug}`}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>
                <div>
                  <TwitterShareButton
                    url={`https://www.dreamlegal.in/product/${product.slug}`}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
                <div>
                  <WhatsappShareButton
                    url={`https://www.dreamlegal.in/product/${product.slug}`}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
                <div>
                  <LinkedinShareButton
                    url={`https://www.dreamlegal.in/product/${product.slug}`}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
                <div>
                  <RedditShareButton
                    url={`https://www.dreamlegal.in/product/${product.slug}`}
                  >
                    <RedditIcon size={32} round />
                  </RedditShareButton>
                </div>
                <div>
                  <TelegramShareButton
                    url={`https://www.dreamlegal.in/product/${product.slug}`}
                  >
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default NormalProduct;
