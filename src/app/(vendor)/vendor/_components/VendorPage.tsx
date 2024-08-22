"use client";
import VendorDashboardPage from "@/pages/VendorDashboardPage";
import { useEffect, useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Loading from "@/components/Loading";
import { Suspense } from "react";

function VendorPage() {
  const searchParams = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [vendorId, setVendorId] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const getVendorId = typeof window !== "undefined" ? localStorage.getItem("vendorId") : null;


  useEffect(() => {
    if (searchParams) {
      const search = Boolean(searchParams.get("verified"));
      setVerified(search);
    
    }

 

    if (!getVendorId) {
      router.push("/sign-in");
    } else {
      setVendorId(getVendorId);
    }

    setLoading(false);
  }, [searchParams, router]);


  useEffect(() => {
    if (vendorId ){
      const fetchProfile = async () => {
        try {
          const response = await fetch(`/api/company-info?id=${vendorId}`);
          const data = await response.json();
          if (data.success === false && !verified) {
            window.location.href =("/vendor?verified=true");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }
  }, [vendorId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <VendorDashboardPage verified={verified} />
    </div>
  );
}

export default VendorPage;
