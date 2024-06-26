import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../components/Loader";
import { GoDotFill } from "react-icons/go";

const SellerPaymentHistory = () => {
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
  if (isError) console.log(error.message);
  return (
    <div>
      <Helmet>
        <title>Seller Payment History</title>
      </Helmet>
      <div className="flex justify-between bg-secondary p-2 text-white items-center">
        <p className="text-xl font-semibold ">Your Payment History</p>
      </div>

      <div className="mt-6 mb-16 overflow-x-auto">
        <table className="w-full p-6 text-left whitespace-nowrap">
          <thead>
            <tr className="text-left bg-secondary/70 text-white">
              <th className="p-3">No.</th>
              <th className="p-3">Medicine Name</th>
              <th className="p-3 ">User Email</th>
              <th className="p-3 ">Seller Email</th>
              <th className="p-3">Transaction Id</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          {data?.map((paymentData, idx) => (
            <tbody key={idx}>
              {paymentData.medicineDatas
                .filter((item) => {
                  return item.userEmail === user.email;
                })
                .map((medicine) => (
                  <tr
                    key={medicine.id}
                    className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30"
                  >
                    <td className="px-3 py-2 pl-4">{idx + 1}.</td>
                    <td className="px-3 py-2 font-medium">
                      {medicine.medicienName}
                    </td>
                    <td className="px-3 py-2">{medicine.buyerEmail}</td>
                    <td className="px-3 py-2">{medicine.userEmail}</td>
                    <td className="px-3 py-2">{paymentData.transitionId}</td>
                    <td className="px-3 py-2">{medicine.quantity}</td>
                    <td className="px-3 py-2">
                      {medicine.discount > 0
                        ? medicine.quantity * medicine.discountPrice
                        : medicine.quantity * medicine.price}
                      $
                    </td>
                    <td className="px-3 py-2">
                      {new Date(paymentData.date).toLocaleDateString('en-GB')}
                    </td>
                    <td
                      className={`px-3 py-2 flex gap-1 items-center ${
                        paymentData.status === "pending"
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                    >
                      {paymentData.status} <GoDotFill className="text-lg" />{" "}
                    </td>
                  </tr>
                ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default SellerPaymentHistory;
