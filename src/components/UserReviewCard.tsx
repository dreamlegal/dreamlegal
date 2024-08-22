import React from "react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { TiStar } from "react-icons/ti";
import { HiOutlinePencil } from "react-icons/hi";
import { Rating } from "@mui/material";
import Link from "next/link";

function UserReviewCard({ review }: any) {
  return (
    <div className=" py-5 border-b">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={review?.product?.logoUrl} />
          <AvatarFallback>WB</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <h3 className=" text-sm text-gray-900 font-bold">{review?.product?.name}</h3>
          <span className=" text-xs text-slate-500">{review?.product?.category}</span>
        </div>

        <div className="flex items-start ml-auto">
         <Link href={`/review/edit?id=${review?.id}`}>
         <p className="flex gap-2 text-sm text-primary1">
            {" "}
            <HiOutlinePencil />
            Edit
          </p></Link>
        </div>
      </div>
      <p className=" text-sm text-slate-500 my-2">
        {review?.bestThing}
        {" "}
      </p>
      <div className="flex items-center gap-2">
        <Rating
         value={review?.functionality?.[0]?.rating}
         precision={0.5}
         readOnly
        ></Rating>
      </div>
    </div>
  );
}

export default UserReviewCard;
