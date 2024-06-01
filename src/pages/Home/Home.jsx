import { Helmet } from "react-helmet";
import Slider from "./HomeComponents/Slider";
import Categories from "./HomeComponents/Categories";
import DiscountSection from "./HomeComponents/DiscountSection";
import heroBg from "../../assets/images/—Slidesdocs—medical light blue_016efe7fdf.jpg";
import sectionbg from '../../assets/images/Free-Medicine-Background-1024x576.jpg'
import FacilitySection from "./HomeComponents/FacilitySection";

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
      <div style={{ backgroundImage: `url(${sectionbg})` }}
        className="bg-fixed w-full  bg-no-repeat bg-cover">
          <FacilitySection></FacilitySection>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:my-36 my-20">
        <DiscountSection></DiscountSection>
      </div>
    </div>
  );
};

export default Home;
