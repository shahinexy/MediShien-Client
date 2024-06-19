import Slider from "./Slider";
import doctor from "../../../assets/images/doctor.png";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-7 md:px-20 h-full items-center">
      <div className="flex flex-col justify-center items-center">
        <img className="w-96" src={doctor} alt="" />
        <h3 className="text-center text-2xl  font-medium mt-5">
          We Provide <span className="text-3xl text-primary">
          <Typewriter
            words={['Health Advice', '30 Day Money Back Guaranteed', 'Free Shipping', '1 Year Free Support']}
            loop={false}
            cursor
            cursorStyle='_'
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1000}
          />
          </span>
        </h3>
      </div>
      <div>
        <Slider></Slider>
      </div>
    </div>
  );
};

export default HeroSection;
