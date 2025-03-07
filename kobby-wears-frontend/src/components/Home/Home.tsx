import Carousel from "./Carousel";
import FeaturedProducts from "./FeaturedProducts";
import IntroProucts from "./Intro-Proucts";
import ProductsSection from "../ProductSection/Products-Section";
import TrendBanner from "./TrendBanner";

const Home = () => {
  return (
    <div>
      <Carousel />
      <IntroProucts />
      <FeaturedProducts />
      <TrendBanner />
      <ProductsSection />
    </div>
  );
};

export default Home;
