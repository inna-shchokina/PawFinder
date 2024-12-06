import { Link, NavLink } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
function Footer() {
  return (
    <footer className="bg-dark flex flex-col gap-[5rem] justify-center items-center py-[5rem] w-full">
      <figure className="w-[16rem]">
        <Link to="/">
          <img src="/images/LogoGreen.png" alt="logo" />
        </Link>
      </figure>
      <nav className="navbar text-[1.6rem] font-semibold text-white">
        <ul className="navbar-list flex justify-between  gap-[3.5rem]">
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
      </nav>
      <div className="flex gap-[3rem] items-center">
        <Link>
          <FaFacebookF className="footer-icon text-[1.6rem] text-white hover:text-green" />
        </Link>
        <Link>
          <FaInstagram className="footer-icon text-[2.4rem] text-white  hover:text-green" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
