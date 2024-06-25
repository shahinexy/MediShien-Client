import { GiWallet } from "react-icons/gi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { Helmet } from "react-helmet";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure()
    const {data, isPending} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async()=>{
            const  res = await axiosSecure.get('/admin-stats')
            return res.data;
        }
    })

    if(isPending) return <Loader></Loader>
  return (
    <div>
          <Helmet>
        <title>Admin Home</title>
      </Helmet>
      <div className="flex justify-between bg-secondary p-2 text-white items-center">
        <p className="text-xl font-semibold ">Hi Welcome Back</p>
      </div>

      <div className="grid grid-cols-3 gap-10 justify-between mt-7">
            <div className="flex gap-4 items-center bg-primary p-8 text-white">
                <div>
                    <GiWallet className="text-4xl " />
                </div>
                <div>
                    <p className="text-2xl font-medium">{data.revenue}$</p>
                    <p className="text-xl">Revenue</p>
                </div>
            </div>
            <div className="flex gap-4 items-center bg-secondary p-8 text-white">
                <div>
                    <FaMoneyCheckAlt className="text-4xl " />
                </div>
                <div>
                    <p className="text-2xl font-medium">{data.totalPaid}$</p>
                    <p className="text-xl">Total Paid</p>
                </div>
            </div>
            <div className="flex gap-4 items-center bg-[#44adb0] p-8 text-white">
                <div>
                    <MdOutlinePendingActions className="text-4xl " />
                </div>
                <div>
                    <p className="text-2xl font-medium">{data.TotalPending}$</p>
                    <p className="text-xl">Total Pending</p>
                </div>
            </div>
      </div>
    </div>
  );
};

export default AdminHome;
