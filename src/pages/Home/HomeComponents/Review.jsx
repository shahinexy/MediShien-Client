import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import ReviewSlider from "./ReviewSlider";

const Review = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <div className="flex justify-end">
        <SectionTitle title={"What our cient say"}></SectionTitle>
      </div>

      <div className="flex justify-center">
          <div className="max-w-3xl border-x border-b border-gray-400 shadow-xl">
          <ReviewSlider></ReviewSlider>
          </div>
      </div>
    </div>
  );
};

export default Review;
