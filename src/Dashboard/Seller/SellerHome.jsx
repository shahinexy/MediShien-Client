import { FaMoneyCheckAlt } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { MdOutlinePendingActions } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";

const SellerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["sellerPayment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sellerPayments/${user.email}`);
      return res.data;
    },
  });

  if (isPending) return <Loader></Loader>;

  const filtarPaidData = data?.map((item) => {
    if (item.status === "paid") {
      return item.medicineDatas.filter((item) => {
        return item.userEmail?.includes(user.email);
      });
    }
    return [];
  });

  const medicines = filtarPaidData?.flat(2);

  const paidTotal = medicines?.reduce((acc, medicine) =>{
    if (medicine.discount > 0) {
      return acc + medicine.discountPrice * medicine.quantity;
    } else {
      return acc + medicine.price * medicine.quantity;
    }
  }, 0)


  const filtarPendingData = data?.map((item) => {
    if (item.status === "pending") {
      return item.medicineDatas.filter((item) => {
        return item.userEmail?.includes(user.email);
      });
    }
    return [];
  });
  const pendingMedicine = filtarPendingData?.flat(2)

  const pendingTotal = pendingMedicine?.reduce((acc, medicine) =>{
    if (medicine.discount > 0) {
      return acc + medicine.discountPrice * medicine.quantity;
    } else {
      return acc + medicine.price * medicine.quantity;
    }
  }, 0)
  

  if (isError) console.log(error.message);
  return (
    <div>
        <Helmet>
        <title>Seller Home</title>
      </Helmet>
      <div className="flex justify-between bg-secondary p-2 text-white items-center">
        <p className="text-xl font-semibold ">Hi Welcome Back</p>
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-10 gap-5 justify-between mt-7">
        <div className="flex gap-4 items-center bg-primary p-8 text-white">
          <div>
            <GiWallet className="text-4xl " />
          </div>
          <div>
            <p className="text-2xl font-medium">{paidTotal + pendingTotal.toFixed(2)}$</p>
            <p className="text-xl">Revenue</p>
          </div>
        </div>
        <div className="flex gap-4 items-center bg-secondary p-8 text-white">
          <div>
            <FaMoneyCheckAlt className="text-4xl " />
          </div>
          <div>
            <p className="text-2xl font-medium">{paidTotal.toFixed(2)}$</p>
            <p className="text-xl">Total Paid</p>
          </div>
        </div>
        <div className="flex gap-4 items-center bg-[#44adb0] p-8 text-white">
          <div>
            <MdOutlinePendingActions className="text-4xl " />
          </div>
          <div>
            <p className="text-2xl font-medium">{pendingTotal.toFixed(2)}$</p>
            <p className="text-xl">Total Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
