import { MdLibraryAdd } from "react-icons/md";

const ManageMedicines = () => {
  return (
    <div>
      <div className="flex justify-between bg-secondary py-2 px-7 text-white items-center">
        <p className="text-xl font-semibold ">Manage Your Medicines</p>
        <div>
          <button className="flex gap-2 items-center bg-primary py-2 px-5 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300">
            Add Medicien <MdLibraryAdd className="text-xl" />{" "}
          </button>
        </div>
      </div>

      <div className=" mt-6 overflow-x-auto">
        <table className="w-full">
          <tr className="text-start bg-secondary/70 text-white">
            <th  className="text-start py-3 pl-4">Company</th>
            <th  className="text-start py-3 ">Contact</th>
            <th  className="text-start py-3 pr-4">Country</th>
          </tr>
          <tr className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30">
            <td className="py-2 pl-4">Alfreds Futterkiste</td>
            <td className="py-2">Maria Anders</td>
            <td className="py-2 pr-4">Germany</td>
          </tr>
          <tr className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30">
            <td className="py-2 pl-4">Alfreds Futterkiste</td>
            <td className="py-2">Maria Anders</td>
            <td className="py-2 pr-4">Germany</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default ManageMedicines;
