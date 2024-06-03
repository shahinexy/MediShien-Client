import { MdLibraryAdd } from "react-icons/md";

import { useState } from "react";
import { Button, Modal } from "keep-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const ManageMedicines = () => {
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const { register, handleSubmit } = useForm();

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
          const discountPrice = data.price - (data.price * (data.discount / 100))
          const price = parseFloat(data.price)
          const discount = parseFloat(data.discount)
          const medicienInfo = { ...data, photo: photoUrl, discountPrice, price, discount, userEmail: user.email }
          console.log(medicienInfo);

          axiosPublic.post('/medicines', medicienInfo)
          .then(res => {
            if(res.data.insertedId){
                alert('success')
            }
          })
          .catch(err => console.log(err))
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="flex justify-between bg-secondary py-2 px-7 text-white items-center">
        <p className="text-xl font-semibold ">Manage Your Medicines</p>
        <div>
          {/* ======= Modal ====== */}
          <Button
            onClick={openModal}
            className="flex gap-2 items-center bg-primary py-2 px-5 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300"
          >
            Add Medicien <MdLibraryAdd className="text-xl" />
          </Button>
          <Modal isOpen={isOpen} onClose={closeModal}>
            <Modal.Body className="lg:w-1/3 sm:w-4/6 w-full rounded-none text-white bg-secondary border-2 border-gray-400 shadow-lg shadow-primary p-0">
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
                            {...register("categori")}
                            className="border-white w-full border-2 rounded-none bg-secondary text-base outline-none py-2 text-center"
                          >
                            <option value="tablet">tablet</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <p className=" mb-1">Select Company</p>
                          <select
                            {...register("company")}
                            className="border-white w-full border-2 rounded-none bg-secondary text-base outline-none py-2 text-center"
                          >
                            <option value="tablet">company</option>
                          </select>
                        </div>
                        <div className="w-full">
                          <p className=" mb-1">Mass Unit</p>
                          <select
                            {...register("massUnit")}
                            className="border-white w-full border-2 rounded-none bg-secondary text-base outline-none py-2 text-center"
                          >
                            <option value="Mg">Mg</option>
                            <option value="Ml">Ml</option>
                          </select>
                        </div>
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
                          <p className=" mb-1">Discount %</p>
                          <input
                            {...register("discount")}
                            className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                            type="number"
                            placeholder="name"
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

      <div className=" mt-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-start bg-secondary/70 text-white">
              <th className="text-start py-3 pl-4">Company</th>
              <th className="text-start py-3 ">Contact</th>
              <th className="text-start py-3 pr-4">Country</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMedicines;
