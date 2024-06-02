import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const ReviewSlider = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide >
          <div className="lg:w-7/12 mx-auto border-x border-b border-gray-400 shadow-xl">
          <div className=" border-t-4 border-primary sm:p-7 p-3 space-y-4">
            <FaQuoteLeft className="sm:text-5xl text-4xl text-secondary" />
            <div className="sm:px-16 px-4">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                minus consectetur ipsa at aut nulla aliquid aspernatur sint
                optio ut? Dolores minus consectetur ipsa at aut nulla aliquid
                aspernatur sint optio ut?
              </p>
              <div className="flex gap-3 items-center mt-7">
                <img className="w-12 h-12 rounded-full" src="" alt="" />
                <div>
                  <p className="text-lg font-medium">reivewar Name</p>
                  <small>Adammje nagar, Narayanganj</small>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <FaQuoteRight className="sm:text-5xl text-4xl text-secondary" />
            </div>
          </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
