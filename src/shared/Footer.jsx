import { FaLocationDot } from "react-icons/fa6";
import logo from "../assets/images/icons8-medicine-60.png";
import { MdAttachEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaHeadset, FaShippingFast } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { IoShieldCheckmark } from "react-icons/io5";
const Footer = () => {
  return (
    <div className="relative text-white grid  grid-cols-3 md:h-[500px] h-[800px]">
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-10 h-full">
          <div>
            <div className="flex items-center gap-2">
              <img className="w-14" src={logo} alt="" />
              <p className="text-3xl font-semibold">
                Medi<span className="text-[#44adb0]">Shine</span>
              </p>
            </div>
            <p className="text-sm mt-4">
            Simplifying healthcare with a diverse range of medications and exclusive discounts, ensuring affordability and convenience for all your needs.
            </p>
            <p className="flex items-center gap-2 sm:mt-10 mt-6">
              <FaLocationDot className="text-[#44adb0] text-xl" /> Adanjee
              Nagar, Narayanganj.
            </p>
            <p className="flex items-center gap-2 sm:mt-10 mt-6">
              <MdAttachEmail className="text-[#44adb0] text-xl" />{" "}
              example@gmail.com
            </p>
          </div>

          <div className="flex justify-evenly">
            <div className="flex flex-col gap-7">
              <Link className="hover:underline">SPECIALS</Link>
              <Link className="hover:underline">NEW PRODUCTS</Link>
              <Link className="hover:underline">OUR STORES</Link>
              <Link className="hover:underline">CONTACT US</Link>
              <Link className="hover:underline">ABOUT US</Link>
              <Link className="hover:underline">HIPPING & DELIVERY</Link>
            </div>
            <div className="flex flex-col gap-7">
              <Link className="hover:underline">MY ORDERS</Link>
              <Link className="hover:underline">MY RETURNS</Link>
              <Link className="hover:underline">MY CREDIT SLIPS</Link>
              <Link className="hover:underline">MY ADDRESSES</Link>
              <Link className="hover:underline">MY PERSONAL INFO</Link>
            </div>
          </div>

          <div className="lg:inline-block hidden space-y-7">
            <div className="flex gap-4 ">
              <div>
                <p className="border-2 border-primary rounded-full p-2">
                  <GiReturnArrow className="text-3xl text-primary " />
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-2">RETURN & EXCHANGE</h3>
                <p className="text-sm">
                  You can return or exchange the item within 30 days
                </p>
              </div>
            </div>
            <div className="flex gap-4 ">
              <div>
                <p className="border-2 border-primary rounded-full p-2">
                  <IoShieldCheckmark className="text-3xl text-primary " />
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-2">100% QUALITY GUARANTEE</h3>
                <p className="text-sm">
                  No MOQ, Customize Production Acceptable
                </p>
              </div>
            </div>
            <div className="flex gap-4 ">
              <div>
                <p className="border-2 border-primary rounded-full p-2">
                  <FaShippingFast className="text-3xl text-primary " />
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-2">FREE DELIVERY</h3>
                <p className="text-sm">
                  Free delivery on orders of $200 and more
                </p>
              </div>
            </div>
            <div className="flex gap-4 ">
              <div>
                <p className="border-2 border-primary rounded-full p-2">
                  <FaHeadset className="text-3xl text-primary " />
                </p>
              </div>
              <div>
                <h3 className="text-xl mb-2">+3(800) 2345-6789</h3>
                <p className="text-sm">Round-the-clock free hotline (24/7)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary"></div>
      <div className="bg-secondary"></div>
      <div className="bg-[#44adb0]"></div>
      <p className="absolute bottom-8 w-full text-center">
        Copyright © 2024 - All right reserved
      </p>
    </div>
  );
};

export default Footer;
