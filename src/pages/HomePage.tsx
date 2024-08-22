import CuratedCollection from "@/components/CuratedCollection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import HomeBlog from "@/components/HomeBlog";
import HomeCta from "@/components/HomeCta";
import HomeHero from "@/components/HomeHero";
import HomeProduct from "@/components/HomeProduct";
import { Testomonial } from "@/components/animated-ui/Testimonial";

function HomePage() {
  return (
    <div>
      <HomeHero />
      <HomeProduct  />
      <Testomonial />
      <CuratedCollection /> 
      {/* <HomeCta /> */}
      <HomeBlog />
    </div>
  );
}

export default HomePage;
