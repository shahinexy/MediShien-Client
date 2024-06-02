
import SectionTitle from "../../../components/SectionTitle";
import ReviewSlider from "./ReviewSlider";

const Review = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 ">
      <div className="flex justify-end">
        <SectionTitle title={"What our cient say"}></SectionTitle>
      </div>

      <ReviewSlider></ReviewSlider>
    </div>
  );
};

export default Review;
