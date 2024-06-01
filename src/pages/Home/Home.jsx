import { Helmet } from "react-helmet";
import heroBg from "../../assets/images/—Slidesdocs—medical light blue_016efe7fdf.jpg";
import Slider from "./HomeComponents/Slider";

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
    </div>
  );
};

export default Home;
