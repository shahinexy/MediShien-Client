import { Button } from "keep-react";
import { IoBagCheckSharp } from "react-icons/io5";

const CartPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-32 mb-20">
      <div className="flex items-center justify-between py-2 bg-secondary px-4 text-white">
        <p className="text-xl font-semibold">Review Your Cart Items</p>

        <Button className="flex sm:gap-2 items-center bg-primary py-2 sm:px-5 px-2 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300">
          CheckOut <IoBagCheckSharp className="text-xl" /> 
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
