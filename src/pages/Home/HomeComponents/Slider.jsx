import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

import slider from '../../../assets/images/pngwing.com (5).png'
import slider2 from '../../../assets/images/pngwing.com (4).png'

const Slider = () => {
    return (
        <div className='flex md:w-7/12 w-11/12 h-full mx-auto justify-center items-center pt-10'>
            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className='z-10 flex md:flex-row flex-col-reverse h-screen  justify-center items-center md:gap-8 gap-2'>
                <div className='md:w-1/2 md:text-start text-center '>
                    <h2 className='text-3xl text-primary font-semibold mb-3'>Medicine Name</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse perferendis quaerat odio dolorum repellendus asperiores. quaerat odio dolorum repellendus asperiores.</p>
                </div>
                <div className='md:w-1/2'>
                    <img className='md:w-full md:h-full w-52 h-52' src={slider} alt="" />
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='z-10 flex md:flex-row flex-col-reverse h-screen  justify-center items-center md:gap-8 gap-2'>
                <div className='md:w-1/2 md:text-start text-center '>
                    <h2 className='text-3xl text-primary font-semibold mb-3'>Medicine Name</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse perferendis quaerat odio dolorum repellendus asperiores. quaerat odio dolorum repellendus asperiores.</p>
                </div>
                <div className='md:w-1/2'>
                    <img className='md:w-full md:h-full w-52 h-52' src={slider2} alt="" />
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
        </div>
    );
};

export default Slider;