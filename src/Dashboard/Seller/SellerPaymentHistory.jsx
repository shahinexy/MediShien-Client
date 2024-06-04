import { FaEllipsisH } from "react-icons/fa";
import { MdFileDownloadDone } from "react-icons/md";
import imag from "../../assets/images/pngwing.com (5).png";

const SellerPaymentHistory = () => {
  return (
    <div>
      <div className="flex justify-between bg-secondary py-2 px-7 text-white items-center">
        <p className="text-xl font-semibold ">Your Payment History</p>
      </div>

      <div className=" mt-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-start bg-secondary/70 text-white">
              <th className="text-start py-3 pl-4">No.</th>
              <th className="text-start py-3">Image</th>
              <th className="text-start py-3 ">Medicine Name</th>
              <th className="text-start py-3 pr-4">Quantity</th>
              <th className="text-start py-3 pr-4">Price</th>
              <th className="text-start py-3 pr-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30">
              <td className="py-2 pl-4">1.</td>
              <td className="py-2">
                {" "}
                <img className="w-16 h-16" src={imag} alt="" />{" "}
              </td>
              <td className="py-2">
                <div>
                  <p>Maria Anders</p>
                  <small>medicine generic namge</small>
                </div>
              </td>
              <td className="py-2 pr-4">Germany</td>
              <td className="py-2 pr-4">Germany</td>
              <td className="py-2 pr-4">
                <p className="flex gap-2 items-center text-green-500">
                  Completed <MdFileDownloadDone className="text-2xl" />
                </p>
              </td>
            </tr>
            <tr className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30">
              <td className="py-2 pl-4">2.</td>
              <td className="py-2">
                <img className="w-16 h-16" src={imag} alt="" />
              </td>
              <td className="py-2">
              <div>
                  <p>Maria Anders</p>
                  <small>medicine generic namge</small>
                </div>
              </td>
              <td className="py-2 pr-4">Germany</td>
              <td className="py-2 pr-4">Germany</td>
              <td className="py-2 pr-4">
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
