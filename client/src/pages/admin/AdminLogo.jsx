import { updateLogoHome } from "@/store/home/logo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogo = () => {
  const dispatch = useDispatch();
  const { logoUrl, heading, subheading, loading } = useSelector(
    (state) => state.home
  );
  const [formData, setFormData] = useState({ logoUrl, heading, subheading });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.logoUrl || !formData.heading) {
      toast.error("Please fill in all required fields");
      return;
    }
    dispatch(updateLogoHome(formData));
    toast.success("Homepage content updated successfully!");
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <br />
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
        Edit Homepage Content
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto"
      >
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-lg font-medium text-gray-700">Logo URL</span>
            <input
              type="text"
              placeholder="Logo URL"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-lg font-medium text-gray-700">Heading</span>
            <input
              type="text"
              placeholder="Heading"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              required
              className="mt-2 block w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-lg font-medium text-gray-700">
              Subheading
            </span>
            <input
              type="text"
              placeholder="Subheading (optional)"
              name="subheading"
              value={formData.subheading}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AdminLogo;
