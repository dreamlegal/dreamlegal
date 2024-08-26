"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { HiOutlinePencil } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { MdEdit, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

interface Profile {
  companyName: string;
  website: string;
  yearFounded: string;
  headQuaters: string;
  NameOfFounders: string;
  contact: string;
  founderVision: string;
  regionServed: string;
  TeamSize: string;
  Awards: string;
  PointOfContactName: string;
  PointOfContactPhone: string;
  PointOfContactDesignation: string;
  overview: string;
}

import { z } from "zod";

const profileSchema = z.object({
  companyName: z.string().min(1, "Company Name is required"),
  website: z.string().url("Invalid website URL"),
  yearFounded: z.string().length(4, "Year Founded must be 4 digits"),
  NameOfFounders: z.string().min(1, "Name of Founders is required"),
  contact: z.string().regex(/^\d{10}$/, "Contact must be a 10-digit number"),
  Awards: z.string().optional(),
  PointOfContactName: z.string().min(1, "Point of Contact Name is required"),
  PointOfContactPhone: z
    .string()
    .regex(/^\d{10}$/, "Phone must be a 10-digit number"),
  PointOfContactDesignation: z.string().min(1, "Designation is required"),
});

function VendorProfile({
  verified,
  getProfile,
}: {
  verified: boolean;
  getProfile: any;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [details, setDetails] = useState(true);
  const [CompDetails, setCompDetails] = useState(true);
  const [Account, setAccount] = useState(false);
  const [verify, setVerified] = useState(verified);
  const [open, setOpen] = useState(verified ? true : false);
  const [vendorId, setVendorId] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(getProfile);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const storedVendorId = localStorage.getItem("vendorId");
    if (storedVendorId) {
      setVendorId(storedVendorId);
    }
  }, []);

  useEffect(() => {
    if (vendorId) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/company-info?id=${vendorId}`);
          const data = await response.json();
          setProfile(data.profile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    } else {
      const storedVendorId = localStorage.getItem("vendorId");
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `/api/company-info?id=${storedVendorId}`
          );
          const data = await response.json();
          setProfile(data.profile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }
  }, [vendorId]);

  useEffect(() => {
    if (profile) {
      setFormData({
        companyName: profile.companyName,
        website: profile.website,
        yearFounded: profile.yearFounded,
        headQuaters: profile.headQuaters,
        NameOfFounders: profile.NameOfFounders,
        contact: profile.contact,
        founderVision: profile.founderVision,
        regionServed: profile.regionServed,
        TeamSize: profile.TeamSize,
        Awards: profile.Awards,
        overview: profile.overview,
        PointOfContactName: profile.PointOfContactName,
        PointOfContactPhone: profile.PointOfContactPhone,
        PointOfContactDesignation: profile.PointOfContactDesignation,
      });
    }
  }, [profile]);

  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    yearFounded: "",
    headQuaters: "",
    NameOfFounders: "",
    contact: "",
    founderVision: "",
    regionServed: "",
    TeamSize: "",
    Awards: "",
    overview: "",
    PointOfContactName: "",
    PointOfContactPhone: "",
    PointOfContactDesignation: "",
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;

    // Restrict length for contact, yearFounded, and Point Of Contact Phone
    if (id === "contact" && value.length > 10) {
      return; // Prevent further input
    }
    if (id === "yearFounded" && value.length > 4) {
      return; // Prevent further input
    }
    if (id === "PointOfContactPhone" && value.length > 10) {
      return; // Prevent further input
    }

    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!vendorId) {
      console.error("Vendor ID is missing.");
      return;
    }

    // Validate form data against the profileSchema
    const validationResult = profileSchema.safeParse(formData);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.reduce((acc, error) => {
        acc[error.path[0]] = error.message;
        return acc;
      }, {} as Record<string, string>);
      setErrors(errors);
      console.error("Validation errors:", errors);
      return; // Stop submission if validation fails
    }

    try {
      const res = await fetch("/api/company-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, vendorId }),
      });

      const result = await res.json();
      if (result.success) {
        console.log("Form data submitted:", result.profile);
        setOpen(false);

        // Redirect to a success page or handle success
        window.location.href = "/vendor";
      } else {
        console.error("Error:", result.msg);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setOpen(false);
    }
  };

  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
    if (!vendorId) {
      console.error("Vendor ID is missing.");
      return;
    }

    try {
      const res = await fetch("/api/edit-company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, vendorId }),
      });

      const result = await res.json();
      if (result.success) {
        console.log("Form data submitted:", result.profile);
        setOpen(false);
        // Redirect to a success page or handle success
        setProfile(result.profile);

        // Optionally, reset the form data to the updated profile data
        setFormData(result.profile);
        setIsEditing(false);
      } else {
        console.error("Error:", result.msg);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setOpen(false);
    }
  };

  const handleSelectChange = (value: any) => {
    setFormData({ ...formData, TeamSize: value });
  };

  const handlelogout = () => {
    localStorage.removeItem("vendorId");
    router.push("/");
  };

  const handleChangeSelect = (e: any) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  return (
    <>
      {profile && open === false && isEditing === false ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <>
              <div className="font-clarity border rounded-md shadow  md:block">
                <div className=" py-6 px-6 ">
                  <div className="py-5">
                    <div className=" flex justify-between items-center">
                      <h3
                        onClick={() => setDetails(!details)}
                        className=" text-sm font-bold text-gray-900 flex gap-2 pr-5 items-center hover:cursor-pointer"
                      >
                        <MdOutlineKeyboardArrowDown />
                        Company Details
                      </h3>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-primary1 text-sm flex gap-2 pr-5"
                      >
                        <HiOutlinePencil />
                        Edit{" "}
                      </button>
                    </div>
                    <div>
                      <ul
                        className={`mt-2 space-y-2 transition-all duration-200 ${
                          !details ? "hidden" : ""
                        }`}
                      >
                        <li className="grid grid-cols-2 pr-5">
                          {/* <MdAlternateEmail className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">
                            Company Name
                          </p>
                          <p className=" text-sm text-gray-900">
                            {profile.companyName}
                          </p>
                        </li>
                        <li className="grid grid-cols-2 pr-5">
                          {/* <MdAlternateEmail className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">Website</p>
                          <p className=" text-sm text-gray-900">
                            {profile.website}
                          </p>
                        </li>

                        <li className="grid grid-cols-2 pr-5">
                          {/* <TiWorldOutline className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">Location</p>
                          <p className=" text-sm text-gray-900">
                            {profile.headQuaters}
                          </p>
                        </li>

                        <li className="grid grid-cols-2 pr-5">
                          {/* <GoOrganization className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">
                            Year Founded
                          </p>
                          <p className=" text-sm text-gray-900">
                            {profile.yearFounded}
                          </p>
                        </li>

                        <li className="grid grid-cols-2 pr-5">
                          {/* <GoOrganization className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">Contact</p>
                          <p className=" text-sm text-gray-900">
                            {profile.contact}
                          </p>
                        </li>

                        <li className="grid grid-cols-2 pr-5">
                          {/* <GoOrganization className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">
                            Name of Founders
                          </p>
                          <p className=" text-sm text-gray-900">
                            {profile.NameOfFounders}
                          </p>
                        </li>

                        <li className="grid grid-cols-2 pr-5">
                          {/* <GoOrganization className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">Team</p>
                          <p className=" text-sm text-gray-900">
                            {profile.TeamSize}
                          </p>
                        </li>
                        <li className="grid grid-cols-2 pr-5">
                          {/* <GoOrganization className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">Awards </p>
                          <p className=" text-sm text-gray-900">
                            {profile.Awards}
                          </p>
                        </li>
                        <li className="hover:cursor-pointer pr-5">
                          {/* <GoOrganization className="text-primary1" /> */}

                          <p className=" text-sm text-primary1">
                            Change password
                          </p>
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
                        Point of Contact
                      </h3>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-primary1 text-sm grid grid-cols-2 pr-5"
                      >
                        <HiOutlinePencil />
                        Edit{" "}
                      </button>
                    </div>
                    <div>
                      <ul
                        className={`mt-2 space-y-2 transition-all duration-200 ${
                          !CompDetails ? "hidden" : ""
                        }`}
                      >
                        <li className="grid grid-cols-2 pr-5">
                          {/* <MdAlternateEmail className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">Name</p>
                          <p className=" text-sm text-gray-900">
                            {profile.PointOfContactName}
                          </p>
                        </li>

                        <li className="grid grid-cols-2 pr-5">
                          {/* <MdAlternateEmail className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">Phone</p>
                          <p className=" text-sm text-gray-900">
                            {profile.PointOfContactPhone}
                          </p>
                        </li>

                        <li className="grid grid-cols-2 pr-5">
                          {/* <MdAlternateEmail className="text-primary1" /> */}
                          <p className=" text-sm text-slate-500">Designation</p>
                          <p className=" text-sm text-gray-900">
                            {profile.PointOfContactDesignation}
                          </p>
                        </li>

                        <li></li>
                        <li>
                          <button
                            onClick={handlelogout}
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
          </div>
        </div>
      ) : null}

      {open ? (
        <>
          <div className="font-clarity">
            <h2 className=" text-lg font-bold flex gap-4 items-center">
              <span className="text-primary1 text-xl">
                <TbListDetails />
              </span>
              Complete your Vendor Profile
            </h2>
            <span className=" text-sm text-gray-500">
              Please fill the following details to Complete your Vendor Profile
            </span>
            <div className=" px-5 py-4  rounded-md border shadow-sm w-full md:w-2/3">
              <form onSubmit={handleSubmit} className=" w-full px-4 ">
                <div className=" mt-4">
                  <Label className=" text-slate-600" htmlFor="companyName">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="website">
                    Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="yearFounded">
                    Year Founded
                  </Label>
                  <Input
                    type="number"
                    id="yearFounded"
                    value={formData.yearFounded}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="headQuaters">
                    Headquarters
                  </Label>
                  <select
                    name="headQuaters"
                    value={formData.headQuaters}
                    onChange={handleChangeSelect}
                    className="w-full p-2 border border-gray-300 rounded text-gray-600"
                  >
                    <option value="" className="text-gray-400">
                      Select Country
                    </option>
                    {countries.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="NameOfFounders">
                    Name Of Founders
                  </Label>
                  <Input
                    id="NameOfFounders"
                    value={formData.NameOfFounders}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="contact">
                    Contact
                  </Label>
                  <Input
                    id="contact"
                    type="number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label className=" text-slate-600" htmlFor="TeamSize">
                    Team Size
                  </Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Team Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Team Size</SelectLabel>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="1-20">1-20</SelectItem>
                        <SelectItem value="20-50">20-50</SelectItem>
                        <SelectItem value="50-200">50-200</SelectItem>
                        <SelectItem value="200-500">200-500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="Awards">
                    Awards
                  </Label>
                  <Input
                    id="Awards"
                    value={formData.Awards}
                    onChange={handleChange}
                    required
                  />
                </div>
                <hr className="my-4" />
                <h3 className="text-lg font-bold text-gray-900">
                  Point Of Contact
                </h3>
                <div>
                  <Label
                    className=" text-slate-600"
                    htmlFor="PointOfContactName"
                  >
                    Point Of Contact Name
                  </Label>
                  <Input
                    id="PointOfContactName"
                    value={formData.PointOfContactName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label
                    className=" text-slate-600"
                    htmlFor="PointOfContactPhone"
                  >
                    Point Of Contact Phone
                  </Label>
                  <Input
                    id="PointOfContactPhone"
                    value={formData.PointOfContactPhone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label
                    className=" text-slate-600"
                    htmlFor="PointOfContactDesignation"
                  >
                    Point Of Contact Designation
                  </Label>
                  <Input
                    id="PointOfContactDesignation"
                    value={formData.PointOfContactDesignation}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  type="submit"
                  className="my-4 w-2/3 rounded-lg bg-primary1"
                >
                  Save
                </Button>
              </form>
            </div>
          </div>
        </>
      ) : null}

      {isEditing && (
        <>
          <div className=" font-clarity">
            <h2 className=" text-lg font-bold flex gap-4 items-center mb-4">
              <span className="text-primary1 text-xl">
                <MdEdit />
              </span>
              Edit Profile
            </h2>
            <div className=" px-5 py-4  rounded-md border shadow-sm w-full md:w-2/3">
              <form className="px-4" onSubmit={handleEditSubmit}>
                <h3 className=" font-bold text-gray-700 mt-2">
                  Edit Company Details
                </h3>

                <div>
                  <Label className=" text-slate-600" htmlFor="companyName">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="website">
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label className=" text-slate-600" htmlFor="yearFounded">
                    Year Founded
                  </Label>
                  <Input
                    type="number"
                    id="yearFounded"
                    value={formData.yearFounded}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="headQuaters">
                    Headquarters
                  </Label>
                  <select
                    name="headQuaters"
                    value={formData.headQuaters}
                    onChange={handleChangeSelect}
                    className="w-full p-2 border border-gray-300 rounded text-gray-600"
                  >
                    <option value="" className="text-gray-400">
                      Select Country
                    </option>
                    {countries.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="NameOfFounders">
                    Name Of Founders
                  </Label>
                  <Input
                    id="NameOfFounders"
                    value={formData.NameOfFounders}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="contact">
                    Contact
                  </Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label className=" text-slate-600" htmlFor="TeamSize">
                    Team Size
                  </Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Team Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Team Size</SelectLabel>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="1-20">1-20</SelectItem>
                        <SelectItem value="20-50">20-50</SelectItem>
                        <SelectItem value="50-200">50-200</SelectItem>
                        <SelectItem value="200-500">200-500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="Awards">
                    Awards
                  </Label>
                  <Input
                    id="Awards"
                    value={formData.Awards}
                    onChange={handleChange}
                    required
                  />
                </div>
                <hr className="my-4" />
                <h3 className=" font-bold text-gray-700 mt-4">
                  Point Of Contact
                </h3>
                <div>
                  <Label
                    className=" text-slate-600"
                    htmlFor="PointOfContactName"
                  >
                    Point Of Contact Name
                  </Label>
                  <Input
                    id="PointOfContactName"
                    value={formData.PointOfContactName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label
                    className=" text-slate-600"
                    htmlFor="PointOfContactPhone"
                  >
                    Point Of Contact Phone
                  </Label>
                  <Input
                    id="PointOfContactPhone"
                    value={formData.PointOfContactPhone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label
                    className=" text-slate-600"
                    htmlFor="PointOfContactDesignation"
                  >
                    Point Of Contact Designation
                  </Label>
                  <Input
                    id="PointOfContactDesignation"
                    value={formData.PointOfContactDesignation}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleEditSubmit}
                  className="my-4 bg-primary1 w-2/3 text-white rounded-lg py-2 px-4"
                >
                  Save Edit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default VendorProfile;
