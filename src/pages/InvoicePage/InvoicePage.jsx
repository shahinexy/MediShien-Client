import { Helmet } from "react-helmet";
import logo from "../../assets/images/icons8-medicine-60.png";
import { GoDotFill } from "react-icons/go";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { usePDF } from "react-to-pdf";
import { FaPrint } from "react-icons/fa";

const InvoicePage = () => {
  const { toPDF, targetRef } = usePDF({ filename: "MediShine-Invoice.pdf" });
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userPayments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userPayments/${user.email}`);
      return res.data;
    },
  });
  
  if (isPending) return <Loader></Loader>;
  if (isError) console.log(error.message);
  console.log(data[data.length -1]);
  return (
    <div ref={targetRef} className="max-w-7xl mx-auto mt-28 mb-20">
      <Helmet>
        <title>Invoice</title>
      </Helmet>
      <div className="flex justify-between bg-secondary p-2 text-white items-center">
        <p className="text-xl font-semibold ">Your Payment Invoice</p>
        <div className="flex gap-1 items-center text-xl font-semibold">
          <img className="w-7" src={logo} alt="" />
          <p>
            Medi<span className="text-[#44adb0]">Shine</span>
          </p>
        </div>
        <button
          onClick={() => toPDF()}
          className="flex sm:gap-2 items-center bg-primary py-2 sm:px-5 px-2 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300"
        >
          Print PDF <FaPrint />
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
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

          <tbody>
              {data[data.length -1].medicineDatas.map((medicine, idx) => (
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
                  <td className="px-3 py-2">{data[data.length -1].transitionId}</td>
                  <td className="px-3 py-2">{medicine.quantity}</td>
                  <td className="px-3 py-2">
                    {medicine.discount > 0
                      ? medicine.quantity * medicine.discountPrice
                      : medicine.quantity * medicine.price}
                    $
                  </td>
                  <td className="px-3 py-2">
                    {new Date(data[data.length -1].date).toLocaleDateString('en-GB')}
                  </td>
                  <td
                    className={`px-3 py-2 flex gap-1 items-center ${
                      data[data.length -1].status === "pending"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    {data[data.length -1].status} <GoDotFill className="text-lg" />{" "}
                  </td>
                </tr>
              ))}
            </tbody>


          {/* {data?.map((paymentData, idx) => (
            <tbody key={paymentData._id}>
              {paymentData.medicineDatas.map((medicine) => (
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
          ))} */}
        </table>
      </div>
    </div>
  );
};

export default InvoicePage;
