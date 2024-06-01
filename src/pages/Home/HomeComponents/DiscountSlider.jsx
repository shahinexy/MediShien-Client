import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import img from '../../../assets/images/pngwing.com (5).png'
import { Link } from 'react-router-dom';

import { Autoplay } from 'swiper/modules';
import { MdDiscount } from 'react-icons/md';

const DiscountSlider = () => {
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
        <SwiperSlide className='relative shadow-lg shadow-secondary'>
          <span className='absolute top-2 right-2'> <MdDiscount className='text-4xl text-primary'  /> </span>
          <Link>
          <div className='space-y-2 text-center border-2 border-white shadow-inner shadow-secondary p-3'>
            <img className='w-full h-48' src={img} alt="" />
            <h3 className='text-xl font-semibold'>Name of this medicien</h3>
            <p className='text-sm'>Lorem, ipsum dolor sit amet </p>
            <div className='flex justify-center gap-3 text-xl font-semibold pt-2 border-t-2 border-secondary/50'>
              <p className='line-through pb-3'>120$</p>
              <div className='border border-secondary rotate-[30deg]'></div>
              <p className='text-primary pt-2 text-2xl'>80$</p>
            </div>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className='relative shadow-lg shadow-secondary'>
          <span className='absolute top-2 right-2'> <MdDiscount className='text-4xl text-primary'  /> </span>
          <Link>
          <div className='space-y-2 text-center border-2 border-white shadow-inner shadow-secondary p-3'>
            <img className='w-full h-48' src={img} alt="" />
            <h3 className='text-xl font-semibold'>Name of this medicien</h3>
            <p className='text-sm'>Lorem, ipsum dolor sit amet </p>
            <div className='flex justify-center gap-3 text-xl font-semibold pt-2 border-t-2 border-secondary/50'>
              <p className='line-through pb-3'>120$</p>
              <div className='border border-secondary rotate-[30deg]'></div>
              <p className='text-primary pt-2 text-2xl'>80$</p>
            </div>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className='relative shadow-lg shadow-secondary'>
          <span className='absolute top-2 right-2'> <MdDiscount className='text-4xl text-primary'  /> </span>
          <Link>
          <div className='space-y-2 text-center border-2 border-white shadow-inner shadow-secondary p-3'>
            <img className='w-full h-48' src={img} alt="" />
            <h3 className='text-xl font-semibold'>Name of this medicien</h3>
            <p className='text-sm'>Lorem, ipsum dolor sit amet </p>
            <div className='flex justify-center gap-3 text-xl font-semibold pt-2 border-t-2 border-secondary/50'>
              <p className='line-through pb-3'>120$</p>
              <div className='border border-secondary rotate-[30deg]'></div>
              <p className='text-primary pt-2 text-2xl'>80$</p>
            </div>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className='relative shadow-lg shadow-secondary'>
          <span className='absolute top-2 right-2'> <MdDiscount className='text-4xl text-primary'  /> </span>
          <Link>
          <div className='space-y-2 text-center border-2 border-white shadow-inner shadow-secondary p-3'>
            <img className='w-full h-48' src={img} alt="" />
            <h3 className='text-xl font-semibold'>Name of this medicien</h3>
            <p className='text-sm'>Lorem, ipsum dolor sit amet </p>
            <div className='flex justify-center gap-3 text-xl font-semibold pt-2 border-t-2 border-secondary/50'>
              <p className='line-through pb-3'>120$</p>
              <div className='border border-secondary rotate-[30deg]'></div>
              <p className='text-primary pt-2 text-2xl'>80$</p>
            </div>
          </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide className='relative shadow-lg shadow-secondary'>
          <span className='absolute top-2 right-2'> <MdDiscount className='text-4xl text-primary'  /> </span>
          <Link>
          <div className='space-y-2 text-center border-2 border-white shadow-inner shadow-secondary p-3'>
            <img className='w-full h-48' src={img} alt="" />
            <h3 className='text-xl font-semibold'>Name of this medicien</h3>
            <p className='text-sm'>Lorem, ipsum dolor sit amet </p>
            <div className='flex justify-center gap-3 text-xl font-semibold pt-2 border-t-2 border-secondary/50'>
              <p className='line-through pb-3'>120$</p>
              <div className='border border-secondary rotate-[30deg]'></div>
              <p className='text-primary pt-2 text-2xl'>80$</p>
            </div>
          </div>
          </Link>
        </SwiperSlide>
      </Swiper>
        </div>
    );
};

export default DiscountSlider;