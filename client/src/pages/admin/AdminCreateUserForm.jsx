import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, clearError } from "../../store/auth-slice/createUser";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.createUser);

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createUser(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    gsap.from(".form-container", { opacity: 0, y: -30, duration: 1 });
  }, []);

  return (
    <div className="form-container rounded-lg shadow-xl p-8 max-w-lg mx-auto mt-20 mb-20">
      <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
        Create User
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="text-black">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-black">
            Password
          </label>
          <div className="flex gap-2">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className=""
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="role" className="text-black">
            Role
          </label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
