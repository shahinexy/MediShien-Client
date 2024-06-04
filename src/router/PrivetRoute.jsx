import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Skeleton from './../components/Skeleton';

const PrivetRoute = ({ children }) => {
  const { user, loader } = useAuth();
  const location = useLocation();

  if (loader) {
    return <Skeleton></Skeleton>;
  }

  if (user) {
    return children;
  }
  return <Navigate to={"/login"} state={location.pathname}></Navigate>;
};

export default PrivetRoute;
