import { FaMoneyCheckAlt, FaShippingFast } from "react-icons/fa";
import { HiSupport } from "react-icons/hi";

const FacilitySection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:py-40 grid lg:grid-cols-3 grid-cols-1 ">
      <div className="flex gap-4 bg-white sm:p-10 p-4">
        <div>
          <p className="border-2 border-secondary rounded-full p-3">
            <FaShippingFast className="text-4xl text-secondary " />
          </p>
        </div>
        <div>
          <h3 className="text-2xl mb-3 font-semibold">FREE SHIPPING</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            numquam sapiente asperiores aliquam saepe excepturi officiis fugiat
            eos labore dicta.
          </p>
        </div>
      </div>
      <div className="flex gap-4 bg-primary text-white sm:p-10 p-4 lg:-translate-y-16">
        <div>
          <p className="border-2 border-secondary rounded-full p-3">
            <FaMoneyCheckAlt className="text-4xl text-white " />
          </p>
        </div>
        <div>
          <h3 className="text-2xl mb-3 font-semibold">30 DAYS MONEY BACK GUARANTEED</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            numquam sapiente asperiores aliquam saepe excepturi officiis fugiat
            eos labore dicta.
          </p>
        </div>
      </div>
      <div className="flex gap-4 bg-white sm:p-10 p-4">
        <div>
          <p className="border-2 border-secondary rounded-full p-3">
            <HiSupport className="text-4xl text-secondary " />
          </p>
        </div>
        <div>
          <h3 className="text-2xl mb-3 font-semibold">1 YEAR FREE SUPPORT</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
            numquam sapiente asperiores aliquam saepe excepturi officiis fugiat
            eos labore dicta.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacilitySection;
