import React, { useEffect, useState } from "react";

// COMPONENTS
import HeroSection from "../components/Home/HeroSection";
import Marquee from "../components/Home/Marquee";
import Categories from "../components/Home/Categories";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import FlashSale from "../components/Home/FlashSale";
import Newsletter from "../components/Home/Newsletter";

// LOADER
import PageLoader from "../components/ui/PageLoader";

// API
import { getProduct } from "../Api/GetApi";

function Home() {
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct();

        setTimeout(() => {
          setProduct(Array.isArray(data) ? data : []);
          setLoader(false);
        }, 800);
      } catch (error) {
        console.log(error);

        setTimeout(() => {
          setProduct([]);
          setLoader(false);
        }, 800);
      }
    };

    fetchData();
  }, []);

  if (loader) {
    return <PageLoader />;
  }

  return (
    <>
      <HeroSection product={product} />
      <Marquee />
      <Categories product={product} />
      <FeaturedProducts product={product} />
      <FlashSale />
      <Newsletter />
    </>
  );
}

export default Home;