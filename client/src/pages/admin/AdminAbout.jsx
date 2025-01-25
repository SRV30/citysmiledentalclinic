import { getAboutMe, updateAboutMe } from "@/store/extra/aboutMe";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminAbout = () => {
  const [aboutData, setAboutData] = useState({
    profilePicture: "",
    name: "",
    qualifications: "",
    experience1: "",
    experience2: "",
    experience3: "",
    experience4: "",
    experience5: "",
    phone: "",
    whatsapp: "",
    registrationCertificate: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAboutMe());
  }, [dispatch]);

  const aboutFetch = useSelector((state) => state.about);
  const { loading, error, about } = aboutFetch;

  useEffect(() => {
    if (about) {
      setAboutData({
        profilePicture: about.profilePicture,
        name: about.name,
        qualifications: about.qualifications,
        experience1: about.experience1,
        experience2: about.experience2,
        experience3: about.experience3,
        experience4: about.experience4,
        experience5: about.experience5,
        phone: about.phone,
        whatsapp: about.whatsapp,
        registrationCertificate: about.registrationCertificate,
      });
    }
  }, [about]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Updated Successfully!");
    dispatch(updateAboutMe(aboutData));
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="container mx-auto my-10 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          Edit About Page
        </h2>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Picture
              </label>
              <input
                type="text"
                id="profilePicture"
                name="profilePicture"
                value={aboutData.profilePicture}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={aboutData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="qualifications"
                className="block text-sm font-medium text-gray-700"
              >
                Qualifications
              </label>
              <input
                type="text"
                id="qualifications"
                name="qualifications"
                value={aboutData.qualifications}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="experience1"
                className="block text-sm font-medium text-gray-700"
              >
                experience1
              </label>
              <input
                type="text"
                id="experience1"
                name="experience1"
                value={aboutData.experience1}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="experience2"
                className="block text-sm font-medium text-gray-700"
              >
                experience2
              </label>
              <input
                type="text"
                id="experience2"
                name="experience2"
                value={aboutData.experience2}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="experience3"
                className="block text-sm font-medium text-gray-700"
              >
                experience3
              </label>
              <input
                type="text"
                id="experience3"
                name="experience3"
                value={aboutData.experience3}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="experience4"
                className="block text-sm font-medium text-gray-700"
              >
                experience4
              </label>
              <input
                type="text"
                id="experience4"
                name="experience4"
                value={aboutData.experience4}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="experience5"
                className="block text-sm font-medium text-gray-700"
              >
                experience5
              </label>
              <input
                type="text"
                id="experience5"
                name="experience5"
                value={aboutData.experience5}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={aboutData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="whatsapp"
                className="block text-sm font-medium text-gray-700"
              >
                WhatsApp
              </label>
              <input
                type="text"
                id="whatsapp"
                name="whatsapp"
                value={aboutData.whatsapp}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="registrationCertificate"
                className="block text-sm font-medium text-gray-700"
              >
                Registration Certificate URL
              </label>
              <input
                type="text"
                id="registrationCertificate"
                name="registrationCertificate"
                value={aboutData.registrationCertificate}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminAbout;
