import { updateAboutHome } from "@/store/home/about";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminHomeAbout = () => {
  const dispatch = useDispatch();
  const { heading, subheading, description1, description2, imageUrl, loading } =
    useSelector((state) => state.about);

  const [formData, setFormData] = useState({
    heading,
    subheading,
    description1,
    description2,
    imageUrl,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateAboutHome(formData));
    toast.success("About content updated successfully!");
  };

  return (
    <div className="container mx-auto py-10 min-h-screen flex justify-center items-center">
      <div className="form-container bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h2 className="text-4xl font-semibold text-indigo-600 mb-6 text-center">
          Edit About Home Content
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Heading"
            name="heading"
            value={formData.heading}
            onChange={handleChange}
            className="px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Subheading"
            name="subheading"
            value={formData.subheading}
            onChange={handleChange}
            className="px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
          <textarea
            placeholder="Description 1"
            rows="4"
            name="description1"
            value={formData.description1}
            onChange={handleChange}
            className="px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          ></textarea>
          <textarea
            placeholder="Description 2"
            rows="4"
            name="description2"
            value={formData.description2}
            onChange={handleChange}
            className="px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          ></textarea>
          <input
            type="text"
            placeholder="Image URL"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-indigo-600 text-white py-3 px-5 rounded-md mt-4 hover:bg-indigo-700 transition-colors duration-300 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminHomeAbout;
