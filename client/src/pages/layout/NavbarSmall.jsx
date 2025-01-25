import { useState, useEffect, useRef } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ setScrollToSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const closeTimer = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const handleNavigation = (section) => {
    if (location.pathname !== "/") {
      setScrollToSection(section);
      navigate("/");
    } else {
      const targetSection = document.getElementById(section);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMenuOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.success("Logout Successful!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err || "Logout Failed!");
      });
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  useEffect(() => {
    if (menuOpen) {
      closeTimer.current = setTimeout(() => {
        setMenuOpen(false);
      }, 5000);
    }
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
    };
  }, [menuOpen]);

  return (
    <header className="bg-black p-4 fixed w-full top-0 z-50 text-white shadow-lg lg:hidden">
      <div className="container mx-auto flex justify-between items-center">
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none transition-all duration-300 transform hover:scale-125"
          >
            {menuOpen ? (
              <AiOutlineClose className="text-2xl" />
            ) : (
              <AiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>

        <div className="flex-grow text-center">
          <Link
            to="/"
            className="text-white text-2xl font-bold hover:text-blue-300 transition-all duration-300"
          >
            City Smile Dental Clinic
          </Link>
        </div>

        {isAuthenticated && (
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className={`text-white focus:outline-none transition-all duration-300 ${
                userMenuOpen ? "scale-125" : "scale-100"
              }`}
            >
              <FaUserCircle className="text-2xl" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r from-gray-700 to-blue-700 rounded-lg shadow-xl z-50">
                <ul className="text-white">
                  {user?.role === "admin" && (
                    <li>
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-white hover:bg-indigo-600"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/password/update"
                      className="block px-4 py-2 text-white hover:bg-indigo-600"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Update Password
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/me/update"
                      className="block px-4 py-2 text-white hover:bg-indigo-600"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-white hover:bg-indigo-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {menuOpen && (
        <nav className="from-gray-700 to-blue-700  shadow-md py-2 mt-2 rounded-lg">
          <ul className="space-y-2 px-4">
            <li>
              <button
                onClick={() => {
                  navigate("/");
                  setMenuOpen(false);
                }}
                className="w-full text-left py-2 px-3 text-lg hover:bg-gray-600 rounded-md transition-all duration-300"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("about")}
                className="w-full text-left py-2 px-3 text-lg hover:bg-gray-600 rounded-md transition-all duration-300"
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("services")}
                className="w-full text-left py-2 px-3 text-lg hover:bg-gray-600 rounded-md transition-all duration-300"
              >
                View Services
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("contact")}
                className="w-full text-left py-2 px-3 text-lg hover:bg-gray-600 rounded-md transition-all duration-300"
              >
                Contact
              </button>
            </li>
            <li>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-white hover:bg-indigo-600 border border-gray-400 rounded-lg transition-all duration-300"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/admin-login");
                    setMenuOpen(false);
                  }}
                  className="block px-4 py-2 text-white hover:bg-indigo-600 border border-gray-200 rounded-lg transition-all duration-300"
                >
                  Admin Login
                </button>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

Navbar.propTypes = {
  setScrollToSection: PropTypes.func.isRequired,
};

export default Navbar;
