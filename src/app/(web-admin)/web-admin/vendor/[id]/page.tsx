"use client";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md';

function Page({ params }: { params: { id: string } }) {

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const userId = params.id;
  const [loading, setLoading] = useState<boolean | null>(true);
  const router = useRouter();
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
    name: "",
    email: "",
    
  });

  useEffect(() => {
    // Fetch user details when component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/company-info?id=${userId}`);
        const result = await response.json();

        if (result.success && result.profile) {
          setFormData({
            ...result.profile,
            name: result.account.name,
            email: result.account.email,
             // Set editing mode to true if profile is found

          });
          if (result.account && result.account.image) {
            setLogoPreview(result.account.image);

          }
          setLoading(false);
        } else {
          console.error("Error fetching user profile:", result.msg);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };


  const handleEditSubmit = async (e: any) => {
    e.preventDefault();
  

    try {
      const res = await fetch("/api/edit-company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, vendorId: userId }),
      });

      const result = await res.json();
      if (result.success) {
        console.log("Form data submitted:", result.profile);
        
        // Redirect to a success page or handle success

        router.push("/web-admin/");

        // Optionally, reset the form data to the updated profile data
        setFormData(result.profile);
        
      } else {
        console.error("Error:", result.msg);
        
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      
    }
  };

  const handleSelectChange = (value: any) => {
    setFormData({ ...formData, TeamSize: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <div className="w-full px-6 py-4 border-b rounded-md">
        <span className="text-primary1">
            <Link href={"/web-admin/"}>
            Back to Dashboard</Link>
        </span>
      </div>
       <>
          <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity">
            
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
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                     
                  />
                </div>

                <div>
                  <Label className=" text-slate-600" htmlFor="companyName">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                     
                  />
                </div>

                <div>
                  <Label className=" text-slate-600" htmlFor="companyName">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                     
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
                     
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="overview">
                    Overview
                  </Label>
                  <Textarea
                    id="overview"
                    value={formData.overview}
                    onChange={handleChange}
                     
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="yearFounded">
                    Year Founded
                  </Label>
                  <Input
                    id="yearFounded"
                    value={formData.yearFounded}
                    onChange={handleChange}
                     
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="headQuaters">
                    Headquarters
                  </Label>
                  <Input
                    id="headQuaters"
                    value={formData.headQuaters}
                    onChange={handleChange}
                     
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="NameOfFounders">
                    Name Of Founders
                  </Label>
                  <Input
                    id="NameOfFounders"
                    value={formData.NameOfFounders}
                    onChange={handleChange}
                     
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
                     
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="founderVision">
                    Founder Vision
                  </Label>
                  <Input
                    id="founderVision"
                    value={formData.founderVision}
                    onChange={handleChange}
                     
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="regionServed">
                    Region Served
                  </Label>
                  <Input
                    id="regionServed"
                    value={formData.regionServed}
                    onChange={handleChange}
                     
                  />
                </div>
                <div>
                  <Label className=" text-slate-600" htmlFor="TeamSize">
                    Team Size
                  </Label>
                  <Select onValueChange={handleSelectChange}  >
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
    </div>
  )
}

export default Page
