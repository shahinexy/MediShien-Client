import img from '../../../assets/images/pngwing.com (4).png'
const CategoriCard = () => {
    return (
        <div className="flex justify-center text-center border p-7 py-10 shadow-inner group shadow-secondary cursor-pointer">
            <div>
            <img className='w-52 group-hover:rotate-12 group-hover:scale-110 duration-500' src={img} alt="" /> 
            <h3 className='text-primary text-2xl font-medium mt-7 group-hover:underline'>Tis is title for this </h3>
            </div>

        </div>
    );
};

export default CategoriCard;