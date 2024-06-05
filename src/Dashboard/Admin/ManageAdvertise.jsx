import { GiCancel, GiConfirmed } from "react-icons/gi";
import useAdvertiseData from "../../Hooks/useAdvertiseData";
import Loader from "../../components/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ManageAdvertise = () => {
  const { data, isPending, refetch } = useAdvertiseData();
  const axiosPublic = useAxiosPublic();

  const hangdleApproval = (id, status) => {
    console.log(id, status);

    if (status === "pending" || status === "cancel") {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to approve this advertisement!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPublic
            .patch(`/advertisment/${id}`, { status: "approve" })
            .then((res) => {
              console.log(res.data);
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  title: "SuccessFull!",
                  text: "Your action has been saved.",
                  icon: "success",
                });
                refetch();
              }
            })
            .catch((err) => console.log(err));
        }
      });
    } else if (status === "approve") {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to cancel this approval",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPublic
            .patch(`/advertisment/${id}`, { status: "cancel" })
            .then((res) => {
              console.log(res.data);
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  title: "SuccessFull!",
                  text: "Your action has been saved.",
                  icon: "success",
                });
                refetch();
              }
            })
            .catch((err) => console.log(err));
        }
      });
    }
  };

  if (isPending) return <Loader></Loader>;
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
                <td className="px-3 py-2 font-medium">
                  <img className="w-16 h-12" src={medicine.photo} alt="" />
                </td>
                <td className="px-3 py-2 font-medium">
                  {medicine.medicienName}
                </td>
                <td className="px-3 py-2 ">{medicine.userEmail}</td>
                <td className="px-3 py-2">
                  {medicine.description.slice(0, 50)}...
                </td>
                <td className="px-3 py-2">
                  <div className="inline-block">
                    <div
                      onClick={() =>
                        hangdleApproval(medicine._id, medicine.status)
                      }
                      className={`flex gap-3 border-2 ${ medicine.status === "pending" && "border-orange-400"}
                      ${ medicine.status === "approve" && "border-green-400"}
                      ${ medicine.status === "cancel" && "border-red-400"}  p-2 text-gray-400 cursor-pointer hover:bg-white/70`}
                    >
                      <GiCancel
                        className={`text-xl ${
                          medicine.status === "cancel" && "text-red-500"
                        }`}
                      />
                      <GiConfirmed
                        className={`text-xl ${
                          medicine.status === "approve" && "text-green-500"
                        }`}
                      />
                    </div>
                  </div>
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
