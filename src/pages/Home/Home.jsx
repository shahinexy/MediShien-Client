import { Helmet } from "react-helmet";
import heroBg from "../../assets/images/—Slidesdocs—medical light blue_016efe7fdf.jpg";
import Slider from "./HomeComponents/Slider";
import Categories from "./HomeComponents/Categories";
import DiscountSection from "./HomeComponents/DiscountSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MediShine | Home</title>
      </Helmet>
      <div
        style={{ backgroundImage: `url(${heroBg})` }}
        className="w-full h-screen bg-no-repeat bg-cover"
      >
        <Slider> </Slider>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:my-36 my-20">
        <Categories></Categories>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:my-36 my-20">
        <DiscountSection></DiscountSection>
      </div>
    </div>
  );
};

export default Home;
