import HomePage from "@/pages/HomePage";
import Image from "next/image";

import MainHomeComponent from "@/pages/MainHomeComponent";
import "./globals.css";
import MainHomePage from "@/components/MainHomePage";
import LandingPage from "@/components/landingPage/LandingPage";
import DirectoryLanding from "@/components/landingPage/two"
export default async function Home() {
  return (
    <>
      {/* <LandingPage/> */}
      <DirectoryLanding/>
    </>
  );
}
export const metadata = {
  title: 'Home - Premier Legal Tech Directory & Strategy Company is DreamLegal.',
  description: 'DreamLegal is a leading legal technology marketplace and strategy firm. the best answers and tactical direction for legal teams in digital transformation',
}
