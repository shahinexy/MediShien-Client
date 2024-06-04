import { FaHome, FaUser, FaUserFriends, FaWallet } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/icons8-medicine-60.png";
import { PiShoppingCartFill, PiTelevisionSimpleFill } from "react-icons/pi";
import { GrLogout } from "react-icons/gr";
import { RiMedicineBottleFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";

import { Navbar } from "keep-react";
import { GiShoppingBag } from "react-icons/gi";
import { MdCategory } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { SiGooglehome } from "react-icons/si";

const Dashboard = () => {
  const { user, logoutUser } = useAuth();
  const axisoPublic = useAxiosPublic();

  const { data: currentUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axisoPublic.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="flex gap-9">
      <div className="fixed lg:inline-block hidden w-64 h-screen bg-primary text-white px-4">
        {/* ===== User Info ===== */}
        <div className="flex flex-col items-center justify-center mt-3 border-b border-secondary pb-5">
          <img
            className="w-20 h-20 rounded-full mb-3"
            src={user?.photoURL}
            alt=""
          />
          <p className="text-xl mb-1">{user?.displayName}</p>
          <p className="text-sm">{user?.email}</p>

          <div className="flex w-full justify-evenly text-2xl mt-4">
            <Link to={"/"}>
              <FaHome />
            </Link>
            <Link to={"/shop"}>
              <GiShoppingBag />
            </Link>
            <Link>
              <PiShoppingCartFill />
            </Link>
          </div>
        </div>

        {/* ========== Admin menu ====== */}
        {currentUser?.userRole === "admin" && (
          <div className="px-2 mt-5 space-y-1 border-b border-secondary pb-12">
            <NavLink
              to={"/dashboard/userProfile"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-3">
                <FaUser className="text-lg" /> User Profiel
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/adminHome"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-3">
                <SiGooglehome className="text-xl" /> Admin Home
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/manageUser"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-2">
                <FaUserFriends className="text-2xl" /> Manage User
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/manageCategory"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-2">
                <MdCategory className="text-2xl" /> Manage Category
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/paymentManagement"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 pl-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-3 whitespace-nowrap ">
                <FaWallet className="text-lg" /> Payment management
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/salesReport"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-2">
                <TbReportSearch className="text-2xl" /> Sales Report
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/manageAdvertise"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-2">
                <PiTelevisionSimpleFill className="text-2xl" /> Manage Advertise
              </p>
            </NavLink>
          </div>
        )}

        {/* ====== Seller menu =====  */}
        {currentUser?.userRole === "seller" && (
          <div className="px-2 mt-5 space-y-1 border-b border-secondary pb-12">
            <NavLink
              to={"/dashboard/userProfile"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-3">
                <FaUser className="text-lg" /> User Profiel
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/manageMedicines"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-3">
                <RiMedicineBottleFill className="text-xl" /> Manage Medicines
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/sellerPaymentHistory"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-3">
                <FaWallet className="text-lg" /> Payment History
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/sellerAdvertisement"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-3">
                <PiTelevisionSimpleFill className="text-2xl" /> Advertisement
              </p>
            </NavLink>
          </div>
        )}

        {/* ====== User menu =====  */}
        {currentUser?.userRole === "user" && (
          <div className="px-2 mt-5 space-y-1 border-b border-secondary pb-12">
            <NavLink
              to={"/dashboard/userProfile"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-3">
                <FaUser className="text-lg" /> User Profiel
              </p>
            </NavLink>
            <NavLink
              to={"/dashboard/paymentHistory"}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                  : " hover:bg-black/10 py-1 px-2 w-full inline-block"
              }
            >
              <p className="flex items-center gap-3">
                <FaWallet className="text-lg" /> Payment History
              </p>
            </NavLink>
          </div>
        )}

        {/* ====== All user menu ===== */}
        <div className="px-2 mt-5 space-y-1">
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                : " hover:bg-black/10 py-1 px-2 w-full inline-block"
            }
          >
            <p className="flex items-center gap-3">
              <FaHome className="text-2xl" /> Home
            </p>
          </NavLink>
          <NavLink
            to={"/shop"}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? " bg-black/20 rounded-none px-2 py-1 w-full inline-block"
                : " hover:bg-black/10 py-1 px-2 w-full inline-block"
            }
          >
            <p className="flex items-center gap-3">
              <GiShoppingBag className="text-2xl" /> Shop
            </p>
          </NavLink>
        </div>

        <div
          onClick={logoutUser}
          className="absolute bottom-0 left-0 w-full flex gap-4 items-center justify-center text-center py-3 bg-secondary hover:bg-black/30 cursor-pointer font-medium"
        >
          Log Out <GrLogout className="text-lg font-bold" />
        </div>
      </div>

      <div className="lg:inline-block hidden w-64 px-4"></div>

      <div className="w-full">
        <div className="fixed w-full grid lg:grid-cols-3 grid-cols-2 bg-primary py-2 lg:px-10 items-center text-white">
          <div className="flex items-center">
            <div>
              <Navbar className="bg-inherit p-3">
                <Navbar.Container className="flex items-center justify-between">
                  <Navbar.Collapse collapseType="sidebar">
                    <Navbar.Container tag="ul" className="flex flex-col gap-5">
                      <Navbar.Link linkName="Home" />
                      <Navbar.Link linkName="Projects" />
                      <Navbar.Link linkName="Blogs" />
                      <Navbar.Link linkName="News" />
                      <Navbar.Link linkName="Resources" />
                    </Navbar.Container>
                  </Navbar.Collapse>

                  <Navbar.Toggle className="bg-white sm:p-2 p-0" />
                </Navbar.Container>
              </Navbar>
            </div>
            <div className="flex items-center sm:gap-2">
              <img className="sm:w-12 w-7" src={logo} alt="" />
              <p className="sm:text-2xl text-lg text-white font-semibold">
                Medi<span className="text-[#44adb0]">Shine</span>
              </p>
            </div>
          </div>
          <h3 className="sm:text-2xl text-base sm:text-start text-end font-semibold pr-3">
            DASHBOARD
          </h3>
        </div>

        <div className=" mt-32 sm:mx-20 mx-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
