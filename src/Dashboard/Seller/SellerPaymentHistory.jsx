import { FaEllipsisH } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import imag from "../../assets/images/pngwing.com (5).png";

const SellerPaymentHistory = () => {
  return (
    <div>
      <div className="flex justify-between bg-secondary py-2 px-7 text-white items-center">
        <p className="text-xl font-semibold ">Your Payment History</p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full p-6 text-left whitespace-nowrap">
          <colgroup>
            <col className="w-5" />
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-5" />
          </colgroup>
          <thead>
            <tr className="text-left bg-secondary/70 text-white">
              <th className="p-3">No.</th>
              <th className="p-3">Image</th>
              <th className="p-3 ">Medicine Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30">
            <tr>
              <td className="px-3 py-2 pl-4">1.</td>
              <td className="px-3 py-2">
                {" "}
                <img className="w-16 h-16" src={imag} alt="" />{" "}
              </td>
              <td className="px-3 py-2">
                <div>
                  <p>Maria Anders</p>
                  <small>medicine generic namge</small>
                </div>
              </td>
              <td className="px-3 py-2">Germany</td>
              <td className="px-3 py-2">Germany</td>
              <td className="px-3 py-2">
                <p className="flex gap-2 items-center text-green-500">
                  Completed <MdFileDownloadDone className="text-2xl" />
                </p>
              </td>
            </tr>
          </tbody>
          <tbody className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30">
            <tr>
              <td className="px-3 py-2 pl-4">1.</td>
              <td className="px-3 py-2">
                {" "}
                <img className="w-16 h-16" src={imag} alt="" />{" "}
              </td>
              <td className="px-3 py-2">
                <div>
                  <p>Maria Anders</p>
                  <small>medicine generic namge</small>
                </div>
              </td>
              <td className="px-3 py-2">Germany</td>
              <td className="px-3 py-2">Germany</td>
              <td className="px-3 py-2">
                <p className="flex gap-2 items-center text-orange-500">
                  Pending <FaEllipsisH className="text-xl" />
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerPaymentHistory;
