import HomePage from "@/pages/HomePage";
import Image from "next/image";
import MainHomePage from "@/pages/MainHomePage";
import MainTechVendorHomePage from "./HomaPageComponents/MainTechVendorHomePage";

export default async function Home() {
  // const data = await getData();
  // return <HomePage ></HomePage>;
  return <MainTechVendorHomePage></MainTechVendorHomePage>;
}
