import HomePage from "@/pages/HomePage";
import Image from "next/image";

import MainHomeComponent from "@/pages/MainHomeComponent";
import "./globals.css";
import MainHomePage from "@/components/MainHomePage";
import LandingPage from "@/components/landingPage/LandingPage";
export default async function Home() {

  // return <MainHomeComponent/>;
  // return <MainHomePage/>
  return <LandingPage/>
}
