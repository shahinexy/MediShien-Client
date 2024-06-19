import { Helmet } from "react-helmet";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { GoDotFill } from "react-icons/go";
import { useRef, useState } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { FaFileDownload } from "react-icons/fa";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [filterDate, setFilterDate] = useState('')

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["payments", filterDate],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?filter=${filterDate}`);
      return res.data;
    },
  });

  const tableRef = useRef(null);

  const handleSubmit = e =>{
    e.preventDefault()
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;
    const dates = [startDate, endDate]
    console.log(dates);
    setFilterDate(dates)
  }

  if (isPending) return <Loader></Loader>;
  if (isError) console.log(error.message);
  return (
    <div>
      <Helmet>
        <title>Sales Report</title>
      </Helmet>
      <div className="flex justify-between bg-secondary py-2 px-2 text-white items-center">
        <p className="text-xl font-semibold ">Payment Management</p>

        <DownloadTableExcel
        filename="Sales Report"
        sheet="Salse"
        currentTableRef={tableRef.current}
      >
        <button className="flex sm:gap-2 items-center bg-primary py-2 sm:px-5 px-2 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300"> Export excel <FaFileDownload /> </button>
      </DownloadTableExcel>
      </div>

      <div>
        <form onSubmit={handleSubmit} className="flex gap-3 mt-6">
          <div>
          <input className="mr-3 py-2" type="date" name="startDate" required/>
          To 
          <input className="ml-3 py-2" type="date" name="endDate" required/>
          </div>
          <button className="bg-secondary px-4 py-2 text-white">Filter</button>
        </form>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table
          ref={tableRef}
          className="w-full p-6 text-left whitespace-nowrap"
        >
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
          ))}
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
