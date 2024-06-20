import { Helmet } from "react-helmet";
import useAuth from "./../Hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserProfile = () => {
  const { user, updateUser, refetch } = useAuth();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const photoFile = { image: data.photo[0] };
    const name = data.userName
    console.log(name, photoFile);
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
          updateUser(name, photoUrl)
            .then(() => refetch())
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Helmet>
        <title>Dashboard User Prifile</title>
      </Helmet>
      <div className="flex justify-between bg-secondary p-2 text-white items-center">
        <p className="text-xl font-semibold ">Your Profile</p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 grid-cols-1 my-10 text-white">
        <div className="bg-primary p-7 flex flex-col justify-center items-center">
          <div>
            <img
              className="rounded-full w-36 h-36"
              src={user.photoURL}
              alt=""
            />
          </div>
          <p className="text-3xl mt-5">{user.displayName}</p>
          <p>{user.email}</p>
        </div>
        <div className="bg-secondary p-7">
          <div className="flex justify-end">
            <FaEdit className="text-2xl" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-3">
              <p className="font-medium mb-1">User Photo</p>
              <input
                {...register("photo")}
                className="w-full p-[6px] bg-black/20 border border-dashed border-white outline-none"
                type="file"
                required
              />
            </div>

            <div className="mt-3">
              <p className="font-medium mb-1">User Name</p>
              <input
                {...register("userName")}
                type="text"
                className="px-3 py-2 w-full bg-black/20 border-l-4 border-white outline-none"
                placeholder="name"
                defaultValue={user.displayName}
              />
            </div>

            <div className="mt-3">
              <p className="font-medium mb-1">User Email</p>
              <input
                type="text"
                className="px-3 py-2 w-full bg-black/10 border-l-4 border-white outline-none"
                placeholder="name"
                defaultValue={user.email}
                disabled
              />
            </div>

            <div>
              <button className="btn w-full text-xl text-forth font-semibold rounded-none border-2 border-forth bg-inherit mt-6 py-2 hover:scale-95 duration-300">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
