import { logoutUser } from "@/store/auth-slice";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = ({ setScrollToSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
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
  };

  return (
    <header className="bg-black fixed p-4 hidden lg:block w-full top-0 z-50 text-white ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-3xl font-bold hover:text-blue-300 transition-all duration-300">City Smile Dental Clinic</div>
        <nav className="space-x-8 text-lg">
          <button
            onClick={() => handleNavigation("home")}
            className="hover:text-gray-400"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("about")}
            className="hover:text-gray-400"
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("services")}
            className="hover:text-gray-400"
          >
            View Services
          </button>
          <button
            onClick={() => handleNavigation("contact")}
            className="hover:text-gray-400"
          >
            Contact
          </button>

         

          {isAuthenticated ? (
            <button onClick={handleLogout} className="hover:text-gray-400">
              
            </button>
          ) : (
            <button
              onClick={() => navigate("/admin-login")}
              className="hover:text-gray-400"
            >
              Admin Login
            </button>
          )}
        </nav>
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
    </header>
  );
};

Header.propTypes = {
  setScrollToSection: PropTypes.func.isRequired,
};

export default Header;
