import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { Dropdown } from "keep-react";
import { IoMdArrowDropdown } from "react-icons/io";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure()
  const { data, isPending, refetch } = useQuery({
    queryKey: ["manageUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allUsers", {
        headers:{
          authorization : `Bearer ${localStorage.getItem('access-token')}`
        }
      });
      return res.data;
    },
  });

  const handleRole = (id, userRole) => {
    console.log(id, userRole);
    axiosSecure
      .patch(`/users/${id}`, { userRole })
      .then((res) => {
        console.log(res.data);
        refetch();
        Swal.fire({
          icon: "success",
          title: "User role has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  if (isPending) return <Loader></Loader>;
  return (
    <div>
      <div className="flex justify-between bg-secondary py-2 px-7 text-white items-center">
        <p className="text-xl font-semibold ">User Management</p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full  text-left whitespace-nowrap">
          <thead>
            <tr className="text-left text-lg bg-secondary/70 text-white">
              <th className="p-3">No.</th>
              <th className="p-3 ">User Name</th>
              <th className="p-3">User Email</th>
              <th className="p-3">User Role</th>
              <th className="p-3">Set Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, idx) => (
              <tr
                key={user._id}
                className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30"
              >
                <td className="px-3 py-2 pl-4">{idx + 1}.</td>
                <td className="px-3 py-2 font-medium">{user.userName}</td>
                <td className="px-3 py-2 ">{user.userEmail}</td>
                <td className="px-3 py-2">{user.userRole}</td>
                <td className="px-3 py-2">
                  {user.userRole === "admin" ? (
                    <p className="text-green-500 font-semibold p-2">Admin</p>
                  ) : (
                    <Dropdown
                      action={
                        <div className="flex items-center gap-2 text-sm w-20 justify-center">
                          {user.userRole} <IoMdArrowDropdown />
                        </div>
                      }
                      actionClassName="rounded-none border border-primary bg-inherit text-primary font-semibold"
                      className="rounded-none bg-secondary w-40"
                    >
                      <Dropdown.List>
                        <Dropdown.Item
                          onClick={() => handleRole(user._id, "user")}
                          className="text-black text-sm border-b border-white rounded-none"
                        >
                          User
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleRole(user._id, "seller")}
                          className="text-black text-sm rounded-none"
                        >
                          Seller
                        </Dropdown.Item>
                      </Dropdown.List>
                    </Dropdown>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
