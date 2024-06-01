import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar";


const Root = () => {
    return (
        <div>
            <div  className="fixed w-full z-50 top-0">
            <NavBar ></NavBar>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;