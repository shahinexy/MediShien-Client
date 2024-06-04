import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Modal } from "keep-react";
import { MdLibraryAdd } from "react-icons/md";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { RiDeleteBin6Line } from "react-icons/ri";

const ManageCategory = () => {
  const axiosPublic = useAxiosPublic();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const { data, isPending, refetch } = useQuery({
    queryKey: ["manageCategory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicineCategory");
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const photoFile = { image: data.photo[0] };
    axios
      .post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGEBB_SECRET_KEY
        }`,
        photoFile,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          const photoUrl = res.data.data.display_url;
          const categoryInfo = { ...data, photo: photoUrl };
          console.log(categoryInfo);

          axiosPublic
            .post("/medicineCategory", categoryInfo)
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  icon: "success",
                  title: "Medicine category has been saved",
                  showConfirmButton: false,
                  timer: 1500,
                });
                reset();
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/medicineCategory/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch()
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  if (isPending) return <Loader></Loader>;
  return (
    <div>
      <div className="flex justify-between bg-secondary py-2 sm:px-7 px-2 text-white items-center">
        <p className="text-xl font-semibold ">Manage Category</p>
        <div>
          {/* ======= Modal ====== */}
          <Button
            onClick={openModal}
            className="flex sm:gap-2 items-center bg-primary py-2 sm:px-5 px-2 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300"
          >
            Add Category <MdLibraryAdd className="text-xl" />
          </Button>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <Modal.Body className="lg:w-1/3 sm:w-4/6 w-full rounded-none text-white bg-secondary border-2 border-gray-400 shadow-lg shadow-primary p-0 my-20 ">
              <div className="shadow-inner shadow-primary space-y-3 p-7">
                <Modal.Content className="">
                  <div className="!mb-6">
                    <h3 className="mb-5 text-2xl font-medium ">
                      Category Details
                    </h3>

                    {/* ==== Form ==== */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div>
                        <p className=" mb-1">Category Name</p>
                        <input
                          {...register("categoryName")}
                          className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                          type="text"
                          placeholder="name"
                          required
                        />
                      </div>
                      <div className="w-full">
                        <p className="mb-1">Categroy Photo</p>
                        <input
                          {...register("photo")}
                          className="w-full p-[6px] border-l-[5px] border-primary bg-white text-primary"
                          type="file"
                          required
                        />
                      </div>

                      <div>
                        <button className="btn w-full text-xl text-forth font-semibold rounded-none border-2 border-forth bg-inherit mt-6 py-2 hover:scale-95 duration-300">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </Modal.Content>
                <Modal.Footer className="flex justify-end">
                  <Button
                    onClick={closeModal}
                    size="sm"
                    variant="outline"
                    color="secondary"
                    className="rounded-none text-primary font-semibold"
                  >
                    Cancel
                  </Button>
                </Modal.Footer>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-6 overflow-x-auto">
        <table className="w-full  text-left whitespace-nowrap">
          <thead>
            <tr className="text-left text-lg bg-secondary/70 text-white">
              <th className="p-3">No.</th>
              <th className="p-3">Category Image</th>
              <th className="p-3 ">Category Name</th>
              <th className="p-3 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category, idx) => (
              <tr
                key={category._id}
                className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30"
              >
                <td className="px-3 py-2 pl-4">{idx + 1}.</td>
                <td className="px-3 py-2 font-medium">
                  <img className="w-24 h-20" src={category.photo} alt="" />
                </td>
                <td className="px-3 py-2 font-medium">{category.categoryName}</td>
                <td className="px-3 py-2 ">
                  <RiDeleteBin6Line
                    onClick={() => handleDelete(category._id)}
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

export default ManageCategory;
