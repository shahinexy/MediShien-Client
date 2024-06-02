import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import logo from "../assets/images/icons8-medicine-60.png";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="flex gap-9">
      <div className="fixed w-64 h-screen bg-primary text-white px-4">
        <div className="flex flex-col items-center justify-center mt-3 border-b border-secondary pb-5">
          <img
            className="w-20 h-20 rounded-full mb-3"
            src={user?.photoURL}
            alt=""
          />
          <p className="text-xl mb-1">{user?.displayName}</p>
          <p className="text-sm">{user?.email}</p>
          <div className="flex w-full justify-evenly text-3xl mt-4">
            <Link>
              <FaFacebook></FaFacebook>
            </Link>
            <Link>
              <FaTwitter></FaTwitter>
            </Link>
            <Link>
              <FaInstagram></FaInstagram>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-64 px-4"></div>

      <div className="w-full">
        <div className="fixed w-full grid grid-cols-3 bg-primary py-3 px-10 items-center text-white">
          <div className="">
            <div className="flex items-center gap-2">
              <img className="w-12" src={logo} alt="" />
              <p className="text-2xl text-white font-semibold">
                Medi<span className="text-[#44adb0]">Shine</span>
              </p>
            </div>
          </div>
          <h3 className=" text-2xl font-semibold">
            DASHBOARD
          </h3>
        </div>


      </div>
    </div>
  );
};

export default Dashboard;
