
import { Toggle } from "keep-react";
import useAdvertiseData from "../../Hooks/useAdvertiseData";
import Loader from "../../components/Loader";
import { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const ManageAdvertise = () => {
    const {data, isPending} = useAdvertiseData()
    const [toggle, setToggle] = useState(false)


    if(isPending) return <Loader></Loader>
  return (
    <div>
      <div className="flex justify-between bg-secondary py-2 px-7 text-white items-center">
        <p className="text-xl font-semibold ">Manage Advertisement</p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full  text-left whitespace-nowrap">
          <thead>
            <tr className="text-left text-lg bg-secondary/70 text-white">
              <th className="p-3">No.</th>
              <th className="p-3 ">Image</th>
              <th className="p-3 ">Medicine Name</th>
              <th className="p-3">User Email</th>
              <th className="p-3">Description</th>
              <th className="p-3">Approval</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((medicine, idx) => (
              <tr
                key={medicine._id}
                className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30"
              >
                <td className="px-3 py-2 pl-4">{idx + 1}.</td>
                <td className="px-3 py-2 font-medium"><img className="w-16 h-12" src={medicine.photo} alt="" /></td>
                <td className="px-3 py-2 font-medium">{medicine.medicienName}</td>
                <td className="px-3 py-2 ">{medicine.userEmail}</td>
                <td className="px-3 py-2">{medicine.description.slice(0,50)}...</td>
                <td className="px-3 py-2">
                <Toggle className={toggle && 'bg-primary'} label="Slate" size="md" onChange={setToggle} />
                </td>
                <td className="px-3 py-2">
                <RiDeleteBin6Line
                    // onClick={() => handleDelete(category._id)}
                    className="text-3xl text-red-500 hover:text-red-700 cursor-pointer hover:scale-110 hover:rotate-3 duration-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAdvertise;
