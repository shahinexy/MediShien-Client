import img from '../../../assets/images/pngwing.com (4).png'

const AdvertisementCard = () => {
    return (
        <div className="flex sm:flex-row flex-col-reverse gap-3 items-center border border-secondary shadow-lg shadow-primary p-5">
            <div className='sm:w-8/12'>
                <p className='text-2xl font-semibold text-primary mb-2'>Title Of Medicine</p>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati velit, ipsa facilis eius praesentium iste voluptas ad, quas nihil beatae in cum? Officiis eaque accusamus ullam iure natus iste atque?</p>
            </div>
            <div className='sm:w-4/12 flex items-center'>
                <img className='md:w-full w-52' src={img} alt="" />
            </div>
        </div>
    );
};

export default AdvertisementCard;