import logo from '../assets/images/icons8-medicine-60.png'
import { Navbar, Button } from "keep-react";
import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
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
            <Navbar.Brand className='flex gap-1 items-center text-xl font-semibold'>
                <img className='w-10' src={logo} alt="" />
                <p>Medi<span className='text-[#44adb0]'>Shine</span></p></Navbar.Brand>
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
            
            <Link to={'/login'}>
            <Button className="bg-secondary rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300">Join Us</Button>
            </Link>
            <Navbar.Toggle />
          </Navbar.Container>
        </Navbar.Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
