import { Button } from "keep-react";
import { IoBagCheckSharp } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import CartItem from "./CartComponents/CartItem";

const CartPage = () => {
  const axiosSecure = useAxiosSecure()
  const {data, isPending, isError, error} = useQuery({
    queryKey: ['cartItem'],
    queryFn: async ()=>{
      const res = await axiosSecure.get('/cartItem')
      return res.data
    }
  })

  if(isPending) return <Loader></Loader>
  if(isError) return error
  return (
    <div className="max-w-7xl mx-auto mt-32 mb-20 px-4">
      <div className="flex items-center justify-between py-2 bg-secondary px-4 text-white">
        <p className="text-xl font-semibold">Review Your Cart Items</p>

        <Button className="flex sm:gap-2 items-center bg-primary py-2 sm:px-5 px-2 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300">
          CheckOut <IoBagCheckSharp className="text-xl" /> 
        </Button>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-7 mt-7 mb-14">
        {
          data?.map(medicine => <CartItem key={medicine._id} medicine={medicine}></CartItem>)
        }
      </div>
    </div>
  );
};

export default CartPage;
