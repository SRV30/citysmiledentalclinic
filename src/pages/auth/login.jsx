import { Fragment, useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/auth-slice";
import { gsap } from "gsap";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      toast.success("Login successful!");
      navigate(redirect);
    }

    gsap.from(".login-form", { opacity: 0, y: -30, duration: 1 });
    gsap.from(".login-button", { opacity: 0, delay: 0.5, y: 20, duration: 1 });
    gsap.from(".login-icon", { opacity: 0, scale: 0.5, duration: 1 });
  }, [dispatch, error, isAuthenticated, navigate, redirect]);

  return (
    <Fragment>
      <MetaData title="Admin Login | City Smile Dental Clinic" />
      <section className="min-h-screen flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md login-form">
          <div className="flex justify-center mb-6">
            <CgProfile className="login-icon text-blue-500 text-6xl" />
          </div>
          <form className="space-y-6" onSubmit={loginSubmit}>
            <div className="flex justify-center space-x-4 mb-6">
              <p className="text-blue-500 border-b-2 border-blue-500">
                Admin Login
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <span
                    className="cursor-pointer"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <IoEyeOff /> : <IoEye />}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mb-4">
              <Link to="/password/forgot" className="text-blue-500 text-sm">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className={`w-full login-button ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white py-2 px-4 rounded-md`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
