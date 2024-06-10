import { Button } from "keep-react";
import { IoBagCheckSharp } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import CartItem from "./CartComponents/CartItem";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const CartPage = () => {
  const axiosSecure = useAxiosSecure();
  const [grandTotal, setGrandTotal] = useState(0);
  const { data, isPending, isError, error, refetch } = useCart();

  const handleAllDelete = (data) => {
    const allIds = data.map((data) => data._id);
    console.log(allIds);

    Swal.fire({
      title: "Are you sure?",
      text: "You want to clear all of this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Clear All",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post(`/cartItem/deleteAll`, allIds)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const total = (data) => {
    const totalPrice = data.reduce((acc, medicine) => {
      if (medicine.discount > 0) {
        return acc + medicine.discountPrice * medicine.quantity;
      } else {
        return acc + medicine.price * medicine.quantity;
      }
    }, 0);
    return totalPrice;
  };

  useEffect(() => {
    if (data) {
      setGrandTotal(total(data));
    }
  }, [data]);

  if (isPending) return <Loader></Loader>;
  if (isError) return error;
  return (
    <div className="max-w-7xl mx-auto mt-28 mb-20">
      <Helmet>
        <title>Your Carts</title>
      </Helmet>
      <div className="flex items-center justify-between py-2 bg-secondary px-4 text-white">
        <p className="text-xl font-semibold">Review Your Cart Items</p>

        <Link to={"/checkOut"}>
          <Button className="flex sm:gap-2 items-center bg-primary py-2 sm:px-5 px-2 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300">
            CheckOut <IoBagCheckSharp className="text-xl" />
          </Button>
        </Link>
      </div>

      <div className="flex justify-between items-center mt-7">
        <button
          onClick={() => handleAllDelete(data)}
          className="flex sm:gap-2 items-center text-white bg-primary py-2 sm:px-5 px-2 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300"
        >
          Clear All
        </button>
        <p className="text-xl font-medium">
          Grant Total: {grandTotal?.toFixed(2)}$
        </p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-7 mt-3 mb-14">
        {data?.map((medicine) => (
          <CartItem
            key={medicine._id}
            medicine={medicine}
            refetch={refetch}
          ></CartItem>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
