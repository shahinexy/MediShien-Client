import { MdLibraryAdd } from "react-icons/md";

import { useState } from "react";
import { Button, Modal } from "keep-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "./../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import MedicineDetails from "../../components/MedicineDetails";
import UpdateMedicine from "./UpdateMedicine";

const ManageMedicines = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // ===== get medicine data ====
  const { data, isPending, refetch } = useQuery({
    queryKey: ["medicineData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/medicines/email/${user.email}`);
      return res.data;
    },
  });

  // ==== get category data ===
  const { data: categoryData } = useQuery({
    queryKey: ["medicineCategory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicineCategory");
      return res.data;
    },
  });

  // ===== handle form submition ====
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
          const discountPrice = data.price - data.price * (data.discount / 100);
          const price = parseFloat(data.price);
          const discount = parseFloat(data.discount);
          const medicienInfo = {
            ...data,
            photo: photoUrl,
            discountPrice,
            price,
            discount,
            userEmail: user.email,
          };
          console.log(medicienInfo);

          axiosSecure
            .post("/medicines", medicienInfo)
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "SuccessFull",
                  text: "Your Medisine Has Been Saved.",
                  icon: "success",
                });
                refetch();
                reset();
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => console.log(error));
  };

  // ======== Handle Delete =====
  const handleDelete = (id) => {
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
        axiosSecure
          .delete(`/medicines/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  if (isPending) return <Loader></Loader>;
  return (
    <div>
      <Helmet>
        <title>Manage Medicines</title>
      </Helmet>
      <div className="flex justify-between bg-secondary py-2 px-2 text-white items-center">
        <p className="text-xl font-semibold ">Manage Your Medicines</p>
        <div>
          {/* ======= Modal ====== */}
          <Button
            onClick={openModal}
            className="flex sm:gap-2 items-center bg-primary py-2 sm:px-5 px-2 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300"
          >
            Add Medicien <MdLibraryAdd className="text-xl" />
          </Button>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <Modal.Body className="lg:w-3/6 sm:w-4/6 w-full rounded-none text-white bg-secondary border-2 border-gray-400 shadow-lg shadow-primary p-0 my-20 pt-20">
              <div className="shadow-inner shadow-primary space-y-3 p-7">
                <Modal.Content className="">
                  <div className="!mb-6">
                    <h3 className="mb-5 text-2xl font-medium ">
                      Medicien Details
                    </h3>

                    {/* ==== Form ==== */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div>
                        <p className=" mb-1">Medicien Name</p>
                        <input
                          {...register("medicienName")}
                          className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                          type="text"
                          placeholder="name"
                        />
                      </div>
                      <div>
                        <p className=" mb-1">Generic Name</p>
                        <input
                          {...register("genericName")}
                          className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                          type="text"
                          placeholder="name"
                        />
                      </div>

                      <div className="w-full">
                        <p className="mb-1">Photo</p>
                        <input
                          {...register("photo")}
                          className="w-full p-[6px] border-l-[5px] border-primary bg-white text-primary"
                          type="file"
                        />
                      </div>

                      <div>
                        <p className=" mb-1">Description</p>
                        <textarea
                          {...register("description")}
                          rows={2}
                          placeholder="description"
                          className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                        ></textarea>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-full">
                          <p className=" mb-1">Select Categori</p>
                          <select
                            {...register("category")}
                            className="border-white w-full border-2 rounded-none bg-secondary text-base outline-none py-2 text-center"
                          >
                            {categoryData?.map((category) => (
                              <option
                                key={category._id}
                                value={category.categoryName}
                              >
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="w-full">
                          <p className=" mb-1">Select Company</p>
                          <select
                            {...register("company")}
                            className="border-white w-full border-2 rounded-none bg-secondary text-base outline-none py-2 text-center"
                          >
                            <option value="Square Pharmaceuticals">
                              Square Pharmaceuticals
                            </option>
                            <option value="Incepta Pharmaceuticals">
                              Incepta Pharmaceuticals
                            </option>
                            <option value="Beximco Pharmaceuticals">
                              Beximco Pharmaceuticals
                            </option>
                            <option value="Orion Pharma Ltd">
                              Orion Pharma Ltd
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="w-full">
                        <p className=" mb-1">Mass Unit (Mg, Ml)</p>
                        <input
                          {...register("massUnit")}
                          className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                          type="text"
                          placeholder="name"
                        />
                      </div>

                      <div className="flex gap-3">
                        <div className="w-full">
                          <p className=" mb-1">Per Unit Price</p>
                          <input
                            {...register("price")}
                            className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                            type="number"
                            placeholder="price"
                          />
                        </div>
                        <div className="w-full">
                          <p className=" mb-1">Discount (%)</p>
                          <input
                            {...register("discount")}
                            className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                            type="number"
                            placeholder="name"
                            defaultValue={0}
                          />
                        </div>
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

      <div className="mt-6 mb-16 overflow-x-auto">
        <table className="w-full p-6 text-left whitespace-nowrap">
          <thead>
            <tr className="text-left bg-secondary/70 text-white">
              <th className="p-3">No.</th>
              <th className="p-3">Image</th>
              <th className="p-3 ">Medicine Name</th>
              <th className="p-3">Description</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">View</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((medicine, idx) => (
              <tr
                key={medicine._id}
                className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30"
              >
                <td className="px-3 py-2 pl-4">{idx + 1}.</td>
                <td className="px-3 py-2">
                  <img className="w-16 h-16" src={medicine.photo} alt="" />{" "}
                </td>
                <td className="px-3 py-2">
                  <div>
                    <p className="font-medium">{medicine.medicienName}</p>
                    <small>{medicine.genericName}</small>
                  </div>
                </td>
                <td className="px-3 py-2">
                  {medicine.description.slice(0, 50)}...
                </td>
                <td className="px-3 py-2">{medicine.category}</td>
                <td className="px-3 py-2">{medicine.price}</td>
                <td className="px-3 py-2">
                  <div className="flex justify-center items-center">
                    <div className="inline-block mt-2">
                      <MedicineDetails medicine={medicine}></MedicineDetails>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                <div className="flex justify-center items-center">
                    <div className="inline-block">
                      <UpdateMedicine medicine={medicine} refetch={refetch}></UpdateMedicine>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div className="flex justify-center items-center">
                    <div className="inline-block mx-auto">
                      <RiDeleteBin6Line
                        onClick={() => handleDelete(medicine._id)}
                        className="text-3xl text-red-500 hover:text-red-700 cursor-pointer hover:scale-110 hover:rotate-3 duration-500"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMedicines;
