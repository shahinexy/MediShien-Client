import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/effect-fade';

import { Autoplay, EffectFade } from "swiper/modules";

// import useAdvertiseData from "../../../Hooks/useAdvertiseData";
import Loader from "../../../components/Loader";
import { PiBuildingsBold } from "react-icons/pi";
import { GiShoppingBag } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Slider = () => {
  const axiosPbulic = useAxiosPublic()
  const {data, isPending} = useQuery({
    queryKey: ['advertiseApproved'],
    queryFn: async () =>{
          const res = await axiosPbulic.get(`/advertisment/approved`)
          return res.data;
    }
  })

  if (isPending) return <Loader></Loader>;
  return (
    <div className="max-w-4xl mx-auto flex h-full justify-center items-center pt-10">
      <div className="w-full relative md:pb-10 pb-14">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect={'fade'}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper "
      >
        {data?.map((advertise) => (
          <SwiperSlide key={advertise._id}>
            <div className=" z-10 bg-[#c3edeb] flex md:flex-row flex-col-reverse  justify-center items-center md:gap-8 gap-2">
              <div className="md:w-1/2 md:text-start text-center ">
                <h2 className="text-3xl text-primary font-semibold mb-3">
                  {advertise.medicienName}
                </h2>
                <p className="sm:text-lg sm:px-0 px-3">{advertise.description.slice(0,200)}</p>
                <p className="text-base flex md:justify-start justify-center items-center gap-2 mt-2 font-medium">
                  <PiBuildingsBold className="text-2xl text-primary" />
                  {advertise.companyName}
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  className="md:w-full md:h-72 w-52 h-52"
                  src={advertise.photo}
                  alt=""
                />
              </div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
      <div className="absolute flex w-full md:justify-start justify-center z-20 bottom-0 left-0">
        <div className="inline-block">
        <Link to={'/shop'}>
        <button className="bg-primary hover:bg-[#44adb0] text-white text-lg flex w-full justify-center items-center gap-2 px-10 py-2  mt-3 hover:scale-95 duration-300"> <GiShoppingBag className="text-xl" /> Shop Now </button>
        </Link>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
