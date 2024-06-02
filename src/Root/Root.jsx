import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar";
import Footer from "../shared/Footer";


const Root = () => {
    return (
        <div>
            <div  className="fixed w-full z-50 top-0">
            <NavBar ></NavBar>
            </div>
            <Outlet></Outlet>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Root;