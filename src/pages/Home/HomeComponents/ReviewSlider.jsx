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
        <SwiperSlide>
          <div className="lg:w-7/12 mx-auto border-x border-b border-gray-400 shadow-xl">
          <div className=" border-t-4 border-primary sm:p-7 p-3 space-y-4">
            <FaQuoteLeft className="sm:text-5xl text-4xl text-secondary" />
            <div className="sm:px-16 px-4">
              <p>
              This site has become my go-to for all my medical needs. The prices are unbeatable, especially with the special discounts. Plus, the website is easy to navigate, and the delivery is always quick and reliable. The convenience and reliability keep me coming back.
              </p>
              <div className="flex gap-3 items-center mt-7">
                <img className="w-12 h-12 rounded-full" src="" alt="" />
                <div>
                  <p className="text-lg font-medium">Jakariya Shekh</p>
                  <small>Demra, Dhaka</small>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <FaQuoteRight className="sm:text-5xl text-4xl text-secondary" />
            </div>
          </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="lg:w-7/12 mx-auto border-x border-b border-gray-400 shadow-xl">
          <div className=" border-t-4 border-primary sm:p-7 p-3 space-y-4">
            <FaQuoteLeft className="sm:text-5xl text-4xl text-secondary" />
            <div className="sm:px-16 px-4">
              <p>
              Great experience from start to finish. The variety of medicines available is impressive, and the special discounts make it even better. Customer support was very helpful with my queries, and my order arrived promptly. It's a lifesaver for my family's healthcare needs.
              </p>
              <div className="flex gap-3 items-center mt-7">
                <img className="w-12 h-12 rounded-full" src="" alt="" />
                <div>
                  <p className="text-lg font-medium">James K</p>
                  <small>Mirpur-20, Dhaka</small>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <FaQuoteRight className="sm:text-5xl text-4xl text-secondary" />
            </div>
          </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="lg:w-7/12 mx-auto border-x border-b border-gray-400 shadow-xl">
          <div className=" border-t-4 border-primary sm:p-7 p-3 space-y-4">
            <FaQuoteLeft className="sm:text-5xl text-4xl text-secondary" />
            <div className="sm:px-16 px-4">
              <p>
              I've been using this site for a few months now, and I'm very impressed with the range of products and the savings from the special discounts. The ordering process is simple and straightforward, and the medicines always arrive on time. I appreciate the detailed product descriptions provided.
              </p>
              <div className="flex gap-3 items-center mt-7">
                <img className="w-12 h-12 rounded-full" src="" alt="" />
                <div>
                  <p className="text-lg font-medium">Emily Rehman</p>
                  <small>Gajipur</small>
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
