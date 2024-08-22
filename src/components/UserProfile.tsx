"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdAlternateEmail } from "react-icons/md";
import { TiWorldOutline } from "react-icons/ti";
import { GoOrganization } from "react-icons/go";
import { FaUserTie } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { HiOutlinePencil } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";


function UserProfile({ data, onEditClick, onChangePassword }: any) {
  interface Account {
    name: string;
    image: string;
    email: string;
  }

  interface profile {
    Contact: string;
    Location: string;
    Address: string;
    Designation: string;
    CompanyType: string;
    CompanyAddress: string;
    CompanyEmail: string;
    skip: boolean;
  }

  const [details, setDetails] = useState(true);
  const [CompDetails, setCompDetails] = useState(true);
  const [Account, setAccount] = useState(false);
  const [profile, setProfile] = useState<profile | null>(data.profile);
  const [skipped, setSkipped] = useState(data.profile);
  const [AccountDetails, setAccountDetails] = useState<Account | null>(
    data.account
  );
  const [Image, setImage] = useState(data.account.image);

  console.log(profile)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchProfile = async (userId: string) => {
  //     try {
  //       const response = await fetch("/api/get-user?userId=" + userId);
  //       const data = await response.json();

  //       if (response.status === 404) {
  //         window.location.href = `/user/${userId}?verified=true`;
  //       }

  //       if (data.success) {
  //         setProfile(data.profile);
  //         setAccountDetails(data.account);
  //         setImage(
  //           data.account.image ||
  //             "https://cdn-icons-png.flaticon.com/512/4715/4715330.png"
  //         );

  //       } else {
  //         setError(data.msg);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile(userId);
  // }, [userId]);
  const router = useRouter();

  const handleLogout = () => {
    typeof window !== "undefined" && localStorage.clear();
    typeof window !== "undefined" && localStorage.removeItem("userId");
    router.push("/");
  };
  return (
    <>
      <div
        onClick={() => setAccount(!Account)}
        className=" w-full bg-primary1 py-4 px-4 rounded-md flex justify-between font-clarity items-center mb-4 md:hidden"
      >
        <div className="inline-flex gap-4">
          <FaRegUserCircle className="text-white text-xl" />
          <span className="text-white text-sm">Account </span>
        </div>
        <div className="text-white text-lg">
          <IoIosArrowDown />
        </div>
      </div>
      <div className="font-clarity border rounded-md shadow hidden md:block  ">
        <div className=" py-6 px-6 ">
          <div className="flex flex-col justify-center items-center">
            <Avatar>
              <AvatarImage src={Image} />
              <AvatarFallback>DI</AvatarFallback>
            </Avatar>

            <h3 className=" text-lg font-bold text-gray-900">
              {AccountDetails?.name || "Default Name"}
            </h3>
          </div>
          <div className="py-5">
            <div className=" flex justify-between items-center">
              <h3
                onClick={() => setDetails(!details)}
                className=" text-sm font-bold text-gray-900 flex gap-2 pr-5 items-center hover:cursor-pointer"
              >
                <MdOutlineKeyboardArrowDown />
                Details
              </h3>
              <button
                onClick={onEditClick}
                className="text-primary1 text-sm flex gap-2 pr-5"
              >
                <HiOutlinePencil />
                Edit{" "}
              </button>
            </div>
            <div className="w-fit">
              <ul
                className={`mt-2 space-y-2 transition-all duration-200 ${!details ? "hidden" : ""
                  }`}
              >
                <li className="grid grid-cols-1 pr-5">
                  {/* <MdAlternateEmail className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Email</p>
                  <p className=" text-sm text-gray-900">
                    {AccountDetails?.email}
                  </p>
                </li>
                
                <li className="grid grid-cols-1 pr-5">
                  {/* <MdAlternateEmail className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Designation</p>
                  <p className=" text-sm text-gray-900">
                    {profile?.Designation}
                  </p>
                </li>
              

               

                <li className="grid grid-cols-1 pr-5">
                  {/* <GoOrganization className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Contact</p>
                  <p className=" text-sm text-gray-900">{profile?.Contact}</p>
                </li>

                <li onClick={onChangePassword} className="hover:cursor-pointer pr-5">
                  {/* <GoOrganization className="text-primary1" /> */}
                  <button onClick={onChangePassword}>
                    <p className=" text-sm text-primary1">Change password</p>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="py-5">
            <div className=" flex justify-between items-center">
              <h3
                onClick={() => setCompDetails(!CompDetails)}
                className=" text-sm font-bold text-gray-900 flex gap-1 pr-5 items-center hover:cursor-pointer"
              >
                <MdOutlineKeyboardArrowDown />
                Organisation Details
              </h3>
              <button
                onClick={onEditClick}
                className="text-primary1 text-sm grid grid-cols-2 pr-5"
              >
                <HiOutlinePencil />
                Edit{" "}
              </button>
            </div>
            <div>
              <ul
                className={`mt-2 space-y-2 transition-all duration-200 ${!CompDetails ? "hidden" : ""
                  }`}
              >
                

                <li className="grid grid-cols-1 pr-5">
                  {/* <TiWorldOutline className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Location</p>
                  <p className=" text-sm text-gray-900">{profile?.Location}</p>
                </li>

                <li className="grid grid-cols-1 pr-5">
                  {/* <TiWorldOutline className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Type</p>
                  <p className=" text-sm text-gray-900">
                    {profile?.CompanyType}
                  </p>
                </li>

                <li className="grid grid-cols-1 pr-5">
                  {/* <GoOrganization className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Address</p>
                  <p className=" text-sm text-gray-900">
                    {profile?.CompanyAddress}
                  </p>
                </li>

                <li className="grid grid-cols-1 pr-5">
                  {/* <GoOrganization className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500"> Email</p>
                  <p className=" text-sm text-gray-900">
                    {profile?.CompanyEmail}
                  </p>
                </li>

                <li className="grid grid-cols-1 pr-5">
                  {/* <GoOrganization className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Address</p>
                  <p className=" text-sm text-gray-900">{profile?.Address}</p>
                </li>

                {skipped === "skipped" && (
                  <li className="bg-red-100 px-4 py-2 rounded-md">
                  <span className="text-red-500 text-sm">Your Profile is not completed</span>
              </li>
                )}

                <li>
                  <Link href={"/directory"}>

                    <button className=" flex w-full gap-2 rounded-lg  px-4 py-2 bg-primary2 text-sm font-medium text-primary1 items-center">
                      <FaStar />
                      Add Review
                    </button></Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className=" flex w-full gap-2 rounded-lg  px-4 py-2 bg-primary1 text-sm font-medium text-white items-center"
                  >
                    <CiLogout />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`font-clarity border rounded-md shadow md:hidden ${Account ? "block" : "hidden"
          }`}
      >
        <div className=" py-6 px-6 ">
          <div className="flex flex-col justify-center items-center">
            <Avatar>
              <AvatarImage src={AccountDetails?.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3 className=" text-lg font-bold text-gray-900">
              {AccountDetails?.name}
            </h3>
            <p className=" text-sm text-slate-500">{AccountDetails?.email}</p>
          </div>
          <div className="py-5">
            <div className=" flex justify-between items-center">
              <h3
                onClick={() => setDetails(!details)}
                className=" text-sm font-bold text-gray-900 flex gap-2 pr-5 items-center hover:cursor-pointer"
              >
                <MdOutlineKeyboardArrowDown />
                Details
              </h3>
              <button
                onClick={onEditClick}
                className="text-primary1 text-sm flex gap-2 pr-5"
              >
                <HiOutlinePencil />
                Edit{" "}
              </button>
            </div>
            <div>
              <ul
                className={`mt-2 space-y-2 transition-all duration-200 ${!details ? "hidden" : ""
                  }`}
              >
                <li className="grid grid-cols-1 pr-5">
                  {/* <MdAlternateEmail className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Email</p>
                  <p className=" text-sm text-gray-900">
                    {AccountDetails?.email}
                  </p>
                </li>

                <li className="grid grid-cols-1 pr-5">
                  {/* <MdAlternateEmail className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Designation</p>
                  <p className=" text-sm text-gray-900">
                    {profile?.Designation}
                  </p>
                </li>

                
                <li className="grid grid-cols-1 pr-5">
                  {/* <GoOrganization className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Contact</p>
                  <p className=" text-sm text-gray-900">{profile?.Contact}</p>
                </li>

                <li onClick={onChangePassword} className="hover:cursor-pointer pr-5">
                  {/* <GoOrganization className="text-primary1" /> */}

                  <button >
                    <p className=" text-sm text-primary1">Change password</p>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="py-5">
            <div className=" flex justify-between items-center">
              <h3
                onClick={() => setCompDetails(!CompDetails)}
                className=" text-sm font-bold text-gray-900 flex gap-2 pr-5 items-center hover:cursor-pointer"
              >
                <MdOutlineKeyboardArrowDown />
                Organisation Details
              </h3>
              <button
                onClick={onEditClick}
                className="text-primary1 text-sm grid grid-cols-1 pr-5"
              >
                <HiOutlinePencil />
                Edit{" "}
              </button>
            </div>
            <div>
              <ul
                className={`mt-2 space-y-2 transition-all duration-200 ${!CompDetails ? "hidden" : ""
                  }`}
              >
                

                <li className="grid grid-cols-1 pr-5">
                  {/* <TiWorldOutline className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Location</p>
                  <p className=" text-sm text-gray-900">{profile?.Location}</p>
                </li>

                <li className="grid grid-cols-1 pr-5">
                  {/* <GoOrganization className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Address</p>
                  <p className=" text-sm text-gray-900">{profile?.Address}</p>
                </li>


                <li className="grid grid-cols-1 pr-5">
                  {/* <TiWorldOutline className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Type</p>
                  <p className=" text-sm text-gray-900">
                    {profile?.CompanyType}
                  </p>
                </li>

                <li className="grid grid-cols-1 pr-5">
                  {/* <GoOrganization className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500">Address</p>
                  <p className=" text-sm text-gray-900">
                    {profile?.CompanyAddress}
                  </p>
                </li>

                <li className="grid grid-cols-1 pr-5">
                  {/* <GoOrganization className="text-primary1" /> */}
                  <p className=" text-sm text-slate-500"> Email</p>
                  <p className=" text-sm text-gray-900">
                    {profile?.CompanyEmail}
                  </p>
                </li>

                <li>
                  <Link href={"/directory"}>
                    {" "}
                    <button className=" flex w-full gap-2 rounded-lg  px-4 py-2 bg-primary2 text-sm font-medium text-primary1 items-center">
                      <FaStar />
                      Add Review
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className=" flex w-full gap-2 rounded-lg  px-4 py-2 bg-primary1 text-sm font-medium text-white items-center"
                  >
                    <CiLogout />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
