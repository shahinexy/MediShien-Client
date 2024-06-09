import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import icon1 from "../../assets/images/pngwing.com (2).png";
import icon2 from "../../assets/images/pngwing.com.png";
import useAuth from "./../../Hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import GoogleLoginBtn from "../../components/GoogleLoginBtn";
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const Register = () => {
  const { createUser, updateUser, refetch } = useAuth();
  const axiosPublic = useAxiosPublic()
  const [showHide, setShowHide] = useState(true);
  const [passType, setPassType] = useState(true);
  const navegate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(data.pass)) {
      return toast.error(
        "Password requires 1 lowercase, 1 uppercase, and min 6 characters."
      );
    }

    const photoFile = { image: data.photo[0] };
    const name = data.name;
    createUser(data.email, data.pass)
      .then((res) => {
        toast.success("Register Successfull");
        navegate("/");


        // --- TODO: if user didn't give image have to fixed
        const user = {userName: data.name, userEmail: data.email, userRole: data.role}
        axiosPublic.post('/users', user)
        .then(res =>console.log(res.data))
        .catch(err => console.log(err))

        if (res) {
          axios
            .post(
              `https://api.imgbb.com/1/upload?key=${
                import.meta.env.VITE_IMAGEBB_SECRET_KEY
              }`
,
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
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message.split("/")[1].replaceAll(")", ""));
      });
  };

  //handle show hide icon
  const handleShowHide = () => {
    setShowHide(!showHide);
    setPassType(!passType);
  };

  return (
    <div className="md:pt-10 pt-20 flex md:flex-row flex-col justify-cente items-center md:gap-10 gap-4">
      <Helmet>
        <title>Legister</title>
      </Helmet>
      <div className="lg:w-4/12">
        <img src={icon1} alt="" />
      </div>
      <div className="lg:w-4/12 p-8 bg-secondary/50 mx-auto md:my-20 my-6 border-2 shadow-lg shadow-secondary">
        <h1 className="text-3xl font-bold text-center mb-8">Register Now</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <p className="font-semibold mb-1">Name</p>
            <input
              {...register("name")}
              className="w-full p-2 border-l-4 border-secondary outline-none"
              type="text"
              placeholder="name"
              required
            />
          </div>
          <div>
            <p className="font-semibold mb-1">Email</p>
            <input
              {...register("email")}
              className="w-full p-2 border-l-4 border-secondary outline-none"
              type="email"
              placeholder="email"
              required
            />
          </div>
          <div className="relative">
            <p className="font-semibold mb-1">Password</p>
            <input
              {...register("pass")}
              className="w-full p-2 border-l-4 border-secondary outline-none"
              type={passType ? "password" : "text"}
              placeholder="password"
              required
            />
            {/* pass show and hide  */}
            <span
              onClick={handleShowHide}
              className="absolute bottom-0 right-0 text-primary cursor-pointer p-3"
            >
              {showHide ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <p className="font-semibold mb-1">Photo</p>
              <input
                {...register("photo")}
                className="w-full p-[6px] border-l-4 border-secondary bg-[#ffffff] outline-none"
                type="file"
                required
              />
            </div>
            <div className="w-1/2">
              <p className="font-semibold mb-1">Role</p>
              <select
              {...register("role")}
                className="w-full p-[10px] border-l-4 border-secondary bg-[#ffffff] outline-none"
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </div>

          <div>
            <button className="btn w-full text-xl text-forth font-semibold rounded-none border-2 border-forth bg-inherit mt-6 py-2 hover:scale-95 duration-300">
              Register
            </button>
          </div>
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="font-bold underline text-primary">
              Login
            </Link>
          </p>
        </form>
        <GoogleLoginBtn></GoogleLoginBtn>
      </div>
      <div className="lg:w-4/12">
        <img className="md:w-6/12" src={icon2} alt="" />
      </div>
    </div>
  );
};

export default Register;
