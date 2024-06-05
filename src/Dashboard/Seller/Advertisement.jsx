import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import AdvertisementCard from "./SellerComponents/AdvertisementCard";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Modal } from "keep-react";
import { MdLibraryAdd } from "react-icons/md";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader";

const Advertisement = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  // ====== get advertisement data =======
  const { data, isPending, refetch } = useQuery({
    queryKey: ["advertisment"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/advertisment/email/${user.email}`);
      return res.data;
    },
  });
  // ====== handle form submition ====
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
          const advertiseInfo = {
            ...data,
            photo: photoUrl,
            userEmail: user.email,
            status: 'pending'
          };
          console.log(advertiseInfo);

          axiosPublic
            .post("/advertisment", advertiseInfo)
            .then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                    title: "Adverstisement Apply Succes",
                    text: "Wait for Admin approval",
                    icon: "success"
                  });
                  reset()
                  refetch()
              }
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => console.log(error));
  };

  if (isPending) return <Loader></Loader>;

  return (
    <div>
      <div className="flex justify-between bg-secondary py-2 sm:px-7 px-2 text-white items-center">
        <p className="text-xl font-semibold ">Your Advertisement</p>

        <div>
          {/* ======= Modal ====== */}
          <Button
            onClick={openModal}
            className="flex sm:gap-2 sm:text-base text-sm items-center bg-primary py-2 sm:px-5 px-2 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300 "
          >
            Apply Advertisement <MdLibraryAdd className="text-xl" />
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
                          required
                        />
                      </div>
                      <div>
                        <p className=" mb-1">Company Name</p>
                        <input
                          {...register("companyName")}
                          className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                          type="text"
                          placeholder="name"
                          required
                        />
                      </div>

                      <div className="w-full">
                        <p className="mb-1">Photo</p>
                        <input
                          {...register("photo")}
                          className="w-full p-[6px] border-l-[5px] border-primary bg-white text-primary"
                          type="file"
                          required
                        />
                      </div>

                      <div>
                        <p className=" mb-1">Description</p>
                        <textarea
                          {...register("description")}
                          rows={2}
                          placeholder="description"
                          className="w-full p-2 border-l-[5px] border-primary text-primary outline-none"
                          required
                        ></textarea>
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

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-7 gap-6">
        {
          data?.map(advertise => <AdvertisementCard key={advertise._id} data={advertise}></AdvertisementCard>)
        }
      </div>
    </div>
  );
};

export default Advertisement;
