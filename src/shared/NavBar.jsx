import logo from "../assets/images/icons8-medicine-60.png";
import { Navbar, Dropdown } from "keep-react";
import { GrLogin, GrLogout } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import useAuth from './../Hooks/useAuth';

const NavBar = () => {
  const {user, logoutUser} = useAuth()
  const navItems = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "border-b-2 border-secondary bg-black/10 rounded-none px-2 py-2"
            : "hover:bg-black/10 py-2 px-2"
        }
      >
        Home
      </NavLink>
      <NavLink
        to={"/shop"}
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "border-b-2 border-secondary bg-black/10 rounded-none px-2 py-2"
            : "hover:bg-black/10 py-2 px-2"
        }
      >
        Shop
      </NavLink>
    </>
  );
  return (
    <div className="max-w-7xl mx-auto px-4 py-3 bg-primary text-white shadow-lg shadow-secondary/50 z-30">
      <Navbar fluid={true} className="bg-inherit ">
        <Navbar.Container className="flex items-center justify-between">
          <Navbar.Container className="flex items-center">
            <Navbar.Brand className="flex gap-1 items-center text-xl font-semibold">
              <img className="w-10" src={logo} alt="" />
              <p>
                Medi<span className="text-[#44adb0]">Shine</span>
              </p>
            </Navbar.Brand>
            {/* ==== Mobile === */}
            <Navbar.Collapse collapseType="sidebar">
              <Navbar.Container tag="ul" className="flex flex-col gap-5">
                <Navbar.Link linkName="Home" />
                <Navbar.Link linkName="Projects" />
              </Navbar.Container>
            </Navbar.Collapse>
          </Navbar.Container>

          {/* ===== PC ===== */}
          <Navbar.Container
            tag="ul"
            className="lg:flex hidden items-center justify-between gap-4 "
          >
            {navItems}
          </Navbar.Container>

          <Navbar.Container className="flex gap-2">
            {user ? (
              <Dropdown action={<img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="" />} actionClassName="border-none bg-inherit" className="bg-secondary border-none rounded-none shadow-lg shadow-secondary text-center">
                <div>
                  <div className="flex justify-center pb-3"><img className="w-16 h-16 rounded-full" src={user?.photoURL} alt="" /></div>
                  <p className="text-lg ">{user?.displayName} </p>
                  <div className="flex flex-col items-center justify-center">
                  <button className="bg-primary flex w-full justify-center items-center gap-3 px-5 py-2 text-sm mt-3 hover:scale-95 duration-300">Dashboard <MdDashboard className="text-xl" /> </button>

                  <button className="bg-primary flex w-full justify-center items-center gap-3 px-5 py-2 text-sm mt-3 hover:scale-95 duration-300">Update User <FaUserEdit className="text-xl" /> </button>
                  <button onClick={logoutUser} className="bg-primary flex w-full justify-center items-center gap-3 px-5 py-2 text-sm mt-3 hover:scale-95 duration-300">Logout <GrLogout className="text-xl" /> </button>
                  </div>
                </div>
              </Dropdown>
            ) : (
              <Link to={"/login"}>
                <button className="flex bg-secondary py-2 px-5 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300">
                  Join Us <GrLogin className="ml-3 text-xl" />
                </button>
              </Link>
            )}

            <Navbar.Toggle />
          </Navbar.Container>
        </Navbar.Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
