import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, clearError } from "../../store/auth-slice/createUser";
import { toast } from "react-toastify";
import { gsap } from "gsap";

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.createUser);

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
    <div className="form-container bg-gray-400 rounded-lg shadow-xl p-8 max-w-lg mx-auto mt-20 mb-20">
      <h2 className="text-3xl font-semibold text-white mb-6 text-center">
        Create User
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>
        <div>
          <label htmlFor="role" className="text-white">
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
