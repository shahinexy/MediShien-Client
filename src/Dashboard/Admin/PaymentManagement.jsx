import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../components/Loader";
import { GoDotFill } from "react-icons/go";
import { FcApproval } from "react-icons/fc";
import { FaCheck } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments`);
      return res.data;
    },
  });

  const handleStatus = (id, status) => {
    if (status === "paid") return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/payments/${id}`, { status: "paid" })
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Updated!",
                text: "Your file has been updated.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  if (isPending) return <Loader></Loader>;
  if (isError) console.log(error.message);
  return (
    <div>
      <Helmet>
        <title>Payment Management</title>
      </Helmet>
      <div className="flex justify-between bg-secondary py-2 px-2 text-white items-center">
        <p className="text-xl font-semibold ">Payment Management</p>
      </div>

      <div className="mt-6 mb-16 overflow-x-auto">
        <table className="w-full p-6 text-left whitespace-nowrap">
          <thead>
            <tr className="text-left bg-secondary/70 text-white">
              <th className="p-3">No.</th>
              <th className="p-3">Name</th>
              <th className="p-3 ">Email</th>
              <th className="p-3">Transaction Id</th>
              <th className="p-3">Item</th>
              <th className="p-3">Total Price</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Accept</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((paymentData, idx) => (
              <tr
                key={paymentData._id}
                className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30"
              >
                <td className="px-3 py-2 pl-4">{idx + 1}.</td>
                <td className="px-3 py-2 font-medium">
                  {paymentData.UserName}
                </td>
                <td className="px-3 py-2">{paymentData.userEmail}</td>
                <td className="px-3 py-2">{paymentData.transitionId}</td>
                <td className="px-3 py-2">{paymentData.medicineDatas.length}</td>
                <td className="px-3 py-2">{paymentData.price}</td>
                <td className="px-3 py-2">{new Date(paymentData.date).toLocaleDateString('en-GB')}</td>
                <td className={`px-3 py-2`}>
                  <div
                    className={`flex gap-1 items-center ${
                      paymentData.status === "pending"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    {paymentData.status} <GoDotFill className="text-lg" />
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div
                    onClick={() =>
                      handleStatus(paymentData._id, paymentData.status)
                    }
                    className="flex justify-center hover:bg-secondary py-2 cursor-pointer"
                  >
                    {paymentData.status === "pending" ? (
                      <FaCheck className="text-gray-400 text-lg" />
                    ) : (
                      <FcApproval className="text-2xl " />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
