import axios from "axios";
import { Button, Modal } from "keep-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { PropTypes } from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const UpdateMedicine = ({ medicine, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  // ====== modal =====
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    _id,
    medicienName,
    genericName,
    category,
    company,
    price,
    description,
    discount,
    massUnit,
    photo,
  } = medicine;

  // ==== categories data =====
  const { data: categoryData } = useQuery({
    queryKey: ["medicineCategory"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicineCategory");
      return res.data;
    },
  });

  // ====== handle update ========
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    let photoUrl = photo;
    const photoFile = { image: data.photo[0] };

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGEBB_SECRET_KEY
        }`,
        photoFile,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        photoUrl = res.data.data.display_url;
      }
    } catch (err) {
      console.log(err);
    }

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

    try {
      const res = await axiosSecure.patch(`/medicine/${_id}`, medicienInfo);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "SuccessFull",
          text: "Your Medisine Has Been Saved.",
          icon: "success",
        });
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button onClick={openModal} className="inline-block p-0">
        <FaEdit className="text-3xl text-primary hover:text-secondary cursor-pointer hover:scale-110 hover:rotate-3 duration-500" />
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Body className="lg:w-3/6 sm:w-4/6 w-full rounded-none text-white bg-secondary border-2 border-gray-400 shadow-lg shadow-primary p-0 my-20 pt-20">
          <div className="shadow-inner shadow-primary space-y-3 p-7">
            <Modal.Content className="">
              <div className="!mb-6">
                <h3 className="mb-5 text-2xl font-medium ">
                  Update Medicien Details
                </h3>

                {/* ==== Form ==== */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <p className=" mb-1">Medicien Name</p>
                    <input
                      {...register("medicienName")}
                      className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                      type="text"
                      placeholder="name"
                      defaultValue={medicienName}
                      required
                    />
                  </div>
                  <div>
                    <p className=" mb-1">Generic Name</p>
                    <input
                      {...register("genericName")}
                      className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                      type="text"
                      placeholder="name"
                      defaultValue={genericName}
                      required
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
                      defaultValue={description}
                      required
                    ></textarea>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-full">
                      <p className=" mb-1">Select Categori</p>
                      <select
                        {...register("category")}
                        className="border-white w-full border-2 rounded-none bg-secondary text-base outline-none py-2 text-center"
                        defaultValue={category}
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
                        defaultValue={company}
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
                      defaultValue={massUnit}
                      required
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
                        defaultValue={price}
                        required
                      />
                    </div>
                    <div className="w-full">
                      <p className=" mb-1">Discount (%)</p>
                      <input
                        {...register("discount")}
                        className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                        type="number"
                        placeholder="name"
                        defaultValue={discount}
                      />
                    </div>
                  </div>

                  <div>
                    <button className="btn w-full text-xl text-forth font-semibold rounded-none border-2 border-forth bg-inherit mt-6 py-2 hover:scale-95 duration-300">
                      Update
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
  );
};

UpdateMedicine.propTypes = {
  medicine: PropTypes.object,
  refetch: PropTypes.func,
};

export default UpdateMedicine;
