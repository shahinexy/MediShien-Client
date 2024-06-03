import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivetRoute = ({children}) => {
    const {user} = useAuth()
    const location = useLocation()

    if(user){
        return children;
    }
    return <Navigate to={'/login'} state={location.pathname}></Navigate>;
};

export default PrivetRoute;