import { Helmet } from "react-helmet";
import Slider from "./HomeComponents/Slider";
import Categories from "./HomeComponents/Categories";
import DiscountSection from "./HomeComponents/DiscountSection";
import FacilitySection from "./HomeComponents/FacilitySection";
// import heroBg from "../../assets/images/—Slidesdocs—medical light blue_016efe7fdf.jpg";
import sectionbg from '../../assets/images/Free-Medicine-Background-1024x576.jpg'
import review from '../../assets/images/1685488950_en-idei-club-p-medical-background-dizain-pinterest-2.jpg'
import Review from "./HomeComponents/Review";
import HeroSection from "./HomeComponents/HeroSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>MediShine | Home</title>
      </Helmet>
      <div
        className="w-full h-screen bg-[#c3edeb]"
      >
        {/* <Slider> </Slider> */}
        <HeroSection></HeroSection>
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

      <div
        style={{ backgroundImage: `url(${review})` }}
        className="bg-fixed bg-no-repeat bg-cover bg-center py-16 sm:my-36 my-20"
      >
        <Review></Review>
      </div>
    </div>
  );
};

export default Home;
