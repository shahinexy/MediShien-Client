import { Button } from 'keep-react';
import error from '../../../assets/images/20602777_6325255.svg'
import { Link } from 'react-router-dom';
const ErrorPage = () => {
    return (
        <div className="flex flex-col gap-7 w-full h-screen justify-center items-center ">
            <div className='text-center'>
                <img className='w-96' src={error} alt="" />
            </div>
            <p className='sm:text-4xl text-2xl font-semibold text-primary'>Page Not Found!!</p>
                <Link to={'/'}>
                <Button className="bg-secondary rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300">Back To Home</Button>
                </Link>
        </div>
    );
};

export default ErrorPage;