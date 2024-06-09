import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import img from "../../../assets/images/pngwing.com (5).png";
import { Link } from "react-router-dom";

import { Autoplay } from "swiper/modules";
import { MdDiscount } from "react-icons/md";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader";

const DiscountSlider = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["discountMedicine"],
    queryFn: async () => {
      const res = await axiosPublic.get("/discountMedicines");
      return res.data;
    },
  });

  if (isPending) return <Loader></Loader>;
  if (isError) console.log(error.message);
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 60,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {data.map((medicine) => (
          <SwiperSlide
            key={medicine._id}
            className="relative"
          >
            <span className="absolute top-2 right-2">
              <MdDiscount className="text-4xl text-primary" />
            </span>
            <Link>
              <div className=" text-center border border-secondary/20 p-3">
                <img className="w-40 h-40 mx-auto p-7" src={medicine.photo} alt="" />
                <h3 className="text-xl font-semibold">{medicine?.medicienName}</h3>
                <p className="text-sm">{medicine?.genericName} </p>
                <div className="flex justify-center gap-3 text-xl font-semibold pt-2 border-t-2 border-secondary/50">
                  <p className="line-through pb-3">{medicine?.price}$</p>
                  <div className="border border-secondary rotate-[30deg]"></div>
                  <p className="text-primary pt-2 text-2xl">{medicine?.discountPrice.toFixed(2)}$</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountSlider;
