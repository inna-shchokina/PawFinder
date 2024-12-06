import { Link, NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { useUserAuth } from "../contexts/UserAuthContext";
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, handleLogout } = useUserAuth();
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <header className="relative header flex justify-start md:justify-between bg-[#FAFAF5] px-[4rem] py-10 items-center">
      <figure className="logo w-[16rem]">
        <Link to="/">
          <img src="/images/LogoBlack.png" alt="logo" />
        </Link>
      </figure>
      <nav className="navbar text-[1.6rem] ml-[2rem]  w-[50%] lg:w-[30%] font-semibold flex items-center">
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            <RxHamburgerMenu className="w-[3rem] h-[3rem]" />
          </button>
        </div>
        <ul className="navbar-list hidden lg:flex justify-between w-full">
          <li>
            <NavLink to="/about">About us</NavLink>
          </li>
          <li>
            <NavLink to="/pets">Find a pet</NavLink>
          </li>
          <li>
            <NavLink to="/shelters">Partners</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
        {isMenuOpen && (
          <ul className="navbar-list flex flex-col lg:hidden justify-between  gap-[1rem] absolute top-[100%] left-[2rem] w-[20rem] h-[20rem] p-[3rem] z-10 bg-[#FAFAF5] border-2 border-green">
            <button
              className="absolute top-[1rem] right-[1rem]"
              onClick={() => setIsMenuOpen(false)}
            >
              x
            </button>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/pets">Find a pet</Link>
            </li>
            <li>
              <Link to="/shelters">Partners</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        )}
      </nav>
      <div className="flex justify-between gap-[3.5rem] text-[1.4rem] md:text-[1.6rem] font-semibold items-center">
        {isAuthenticated ? (
          <Link to="/account">
            <h4 className="cursor-pointer">{user.fullName}</h4>
          </Link>
        ) : (
          <Link to="/login" className="login">
            Login
          </Link>
        )}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="btn signup bg-dark px-[3rem] py-[5px] text-white rounded-[2.5rem]"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/register"
            className="btn signup bg-dark text-center  w-[10rem] md:w-[inherit] md:px-[3rem] py-[5px] text-white rounded-[2.5rem]"
          >
            Sign up
          </Link>
        )}
      </div>
    </header>
  );
}

export default Navbar;
