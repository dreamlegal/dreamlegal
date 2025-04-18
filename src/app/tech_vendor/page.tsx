import HomePage from "@/pages/HomePage";
import Image from "next/image";
import MainHomePage from "@/pages/MainHomePage";
import MainTechVendorHomePage from "./HomaPageComponents/MainTechVendorHomePage";

export default async function Home() {
  // const data = await getData();
  // return <HomePage ></HomePage>;
  return <MainTechVendorHomePage></MainTechVendorHomePage>;
}

export const metadata = {
  title: 'Tech vendor - Providing Improved Legal Solutions by Working with Vendors',
  description: 'Gain access to innovative legal remedies. Our vendor partnerships foster creativity and provide exceptional outcomes for your legal requirements.',
};