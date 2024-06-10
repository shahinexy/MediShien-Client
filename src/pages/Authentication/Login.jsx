import { useContext, useState } from "react";
import { authContext } from "../../AuthProvider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import icon1 from "../../assets/images/pngwing.com (1).png";
import icon2 from "../../assets/images/pngwing.com (3).png";
import GoogleLoginBtn from "../../components/GoogleLoginBtn";

const Login = () => {
  const [showHide, setShowHide] = useState(true);
  const [passType, setPassType] = useState(true);
  const { loginUser } = useContext(authContext);

  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    loginUser(data.email, data.pass)
      .then((res) => {
        if (res) {
          toast.success("Login Successfull");
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message.split("/")[1].replaceAll(")", ""));
      });
  };

  const handleShowHide = () => {
    setShowHide(!showHide);
    setPassType(!passType);
  };

  return (
    <div className="md:pt-10 pt-20 flex lg:flex-row flex-col justify-cente items-center md:gap-10 gap-4">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="lg:w-4/12">
        <img src={icon1} alt="" />
      </div>
      <div className="xl:w-1/3 md:w-2/3 p-8 m-0 bg-secondary/50 mx-auto md:my-20 my-6 border-2 shadow-lg shadow-secondary">
        <h1 className="text-3xl font-bold text-center mb-8">Login Now</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <p className="font-semibold mb-1">Email</p>
            <input
              {...register("email")}
              className="w-full p-2 border-l-4 border-secondary outline-none"
              type="email"
              placeholder="email"
            />
          </div>
          <div className="relative">
            <p className="font-semibold mb-1">Password</p>
            <input
              {...register("pass")}
              className="w-full p-2 border-l-4 border-secondary outline-none"
              type={passType ? "password" : "text"}
              placeholder="password"
            />
            {/* pass show and hide  */}
            <span
              onClick={handleShowHide}
              className="absolute bottom-0 right-0 text-primary cursor-pointer p-3"
            >
              {showHide ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>
          <div>
            <button className="btn w-full text-xl text-forth font-semibold rounded-none border-2 border-forth bg-inherit mt-6 py-2 hover:scale-95 duration-300">
              Login
            </button>
          </div>
          <p>
            Don't have an account?{" "}
            <Link to={"/register"} className="font-bold underline text-primary">
              Register
            </Link>
          </p>
        </form>
        <GoogleLoginBtn></GoogleLoginBtn>
      </div>
      <div className="lg:w-4/12">
        <img src={icon2} alt="" />
      </div>
    </div>
  );
};

export default Login;
