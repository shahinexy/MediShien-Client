import logo from "../assets/images/icons8-medicine-60.png";
import cart from "../assets/images/cart.png";
import { Navbar, Dropdown } from "keep-react";
import { GrLogin, GrLogout } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle, FaUserEdit } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import useAuth from "./../Hooks/useAuth";

const NavBar = () => {
  const { user, logoutUser } = useAuth();
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
    <div className="max-w-7xl mx-auto md:px-4 md:py-3 bg-primary text-white shadow-lg shadow-secondary/50 z-30">
      <Navbar fluid={false} className="bg-inherit px-1 py-2">
        <Navbar.Container className="flex items-center justify-between">
          <Navbar.Container className="flex items-center">
            <Navbar.Brand className="flex">
            <Navbar.Toggle className="bg-secondary p-1"/>
              <Link to={'/'} className="flex gap-1 items-center text-xl font-semibold">
              <img className="md:w-10 w-7" src={logo} alt="" />
              <p>
                Medi<span className="text-[#44adb0]">Shine</span>
              </p>
              </Link>
            </Navbar.Brand>
            {/* ==== Mobile === */}
            <Navbar.Collapse collapseType="sidebar" className="bg-primary">
              <Navbar.Container tag="ul" className="flex flex-col gap-1">
              {navItems}
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
            <Link to={"/cart"} className="relative pr-2 mr-5">
              <img className="sm:w-10 w-8" src={cart} alt="" />
              <small className="absolute px-1 top-0 right-0 bg-white rounded-full text-primary font-semibold">
                +2
              </small>
            </Link>

            {/* <div className="sm:flex hidden items-center md:mx-5">
              <select className="bg-inherit border p-1 outline-none" name="" id="">
                <option className="bg-primary" value="">
                  ENG
                </option>
                <option className="bg-primary" value="">
                  BAN
                </option>
              </select>
            </div> */}

            {user ? (
              <Dropdown
                action={
                  user?.photoURL ? (
                    <img
                      className="sm:w-12 w-10 sm:h-12 h-10 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                  ) : (
                    <FaUserCircle className="sm:text-5xl text-4xl text-white" />
                  )
                }
                actionClassName="border-none bg-inherit p-0"
                className="bg-secondary border-none rounded-none shadow-lg shadow-secondary text-center"
              >
                <div>
                  <div className="flex justify-center pb-3">
                    <img
                      className="w-16 h-16 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                  </div>
                  <p className="text-lg ">{user?.displayName} </p>
                  <div className="flex flex-col items-center justify-center">

                    <Link to={"/dashboard/userProfile"} className="w-full outline-none">
                      <button className="bg-primary flex w-full justify-center items-center gap-3 px-5 py-2 text-sm mt-3 hover:scale-95 duration-300">
                        Dashboard <MdDashboard className="text-xl" />{" "}
                      </button>
                    </Link>

                    <Link to={'/dashboard/userProfile'}  className="w-full">
                      <button className="bg-primary flex w-full justify-center items-center gap-3 px-5 py-2 text-sm mt-3 hover:scale-95 duration-300">
                        Update User <FaUserEdit className="text-xl" />{" "}
                      </button>
                    </Link>

                    <button
                      onClick={logoutUser}
                      className="bg-primary flex w-full justify-center items-center gap-3 px-5 py-2 text-sm mt-3 hover:scale-95 duration-300"
                    >
                      Log Out <GrLogout className="text-xl" />{" "}
                    </button>
                  </div>
                </div>
              </Dropdown>
            ) : (
              <Link to={"/login"}>
                <button className="flex sm:text-base text-sm bg-secondary py-2 sm:px-5 px-2 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300">
                  Join Us <GrLogin className="ml-3 text-xl" />
                </button>
              </Link>
            )}

            
          </Navbar.Container>
        </Navbar.Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
