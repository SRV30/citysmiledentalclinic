import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createService, getService, deleteService } from "@/store/home/service";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { CircularProgress } from "@mui/material";

const AdminService = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getService());

    gsap.from(".service-form", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".service-list", {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
      stagger: 0.2,
    });
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(createService({ title, image, alt, description }));

    setTitle("");
    setImage("");
    setAlt("");
    setDescription("");

    toast.success("Service added successfully");
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Invalid service ID");
      window.location.reload();
      return;
    }

    await dispatch(deleteService(id));
    toast.success("Service deleted successfully");
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="container mx-auto py-10 mt-7">
      <h2 className="text-4xl font-extrabold text-blue-900 mb-10 text-center tracking-wide">
        Manage Services
      </h2>

      <form
        onSubmit={handleSubmit}
        className="service-form max-w-lg mx-auto p-8  shadow-lg rounded-xl border border-blue-300"
      >
        <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
          Add New Service
        </h3>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="alt"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Alt Text
            </label>
            <input
              type="text"
              id="alt"
              placeholder="Enter alt text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold shadow-lg"
          >
            Add Service
          </button>
        </div>
      </form>

      <h2 className="text-3xl font-semibold text-blue-900 mt-12 mb-8 text-center">
        Existing Services
      </h2>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="space-y-6">
          {services.length > 0 ? (
            <ul className="space-y-6">
              {services.map((service) => (
                <li
                  key={service._id}
                  className="service-list flex items-center justify-between py-6 px-8 bg-white shadow-lg rounded-lg border border-gray-200 transition duration-300 hover:shadow-xl hover:scale-105"
                >
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">
                      {service.title}
                    </h3>
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-24 h-24 object-cover mt-2 rounded-lg"
                    />
                    <p className="text-gray-600 mt-2">{service.description}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No services available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminService;
