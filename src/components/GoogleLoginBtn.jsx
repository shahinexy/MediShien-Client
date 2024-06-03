import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import google from "../assets/images/google-icon.png";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const GoogleLoginBtn = () => {
  const { googleLogin } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  // handle google login
  const handleGoogleLogin = () => {
    googleLogin()
      .then((res) => {
        if (res) {
          const user = {
            userName: res.user?.displayName,
            userEmail: res.user?.email,
            userRole: "user",
          };
          axiosPublic
            .post("/users", user)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));

          toast.success("Login Successfull");
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex gap-3">
      <button
        onClick={handleGoogleLogin}
        className="btn flex justify-center items-center flex-1 text-xl font-semibold rounded-none border-2 bg-inherit mt-6 hover:scale-95 duration-300"
      >
        <img className="w-16" src={google} alt="" /> Login
      </button>
    </div>
  );
};

export default GoogleLoginBtn;
