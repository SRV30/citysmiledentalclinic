import { updateHomeContact } from "@/store/home/homeContact";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AdminHomeContact = () => {
  const dispatch = useDispatch();
  const { contactInfo, success, error, loading } = useSelector(
    (state) => state.homeContact
  );

  const [formData, setFormData] = useState({
    phone: "",
    whatsappLink: "",
    hours1: "",
    hours2: "",
    hours3: "",
    hours4: "",
    hours5: "",
    hours6: "",
    hours7: "",
    address: "",
  });

  useEffect(() => {
    if (contactInfo) {
      setFormData({
        phone: contactInfo.phone,
        whatsappLink: contactInfo.whatsappLink,
        hours1: contactInfo.hours1,
        hours2: contactInfo.hours2,
        hours3: contactInfo.hours3,
        hours4: contactInfo.hours4,
        hours5: contactInfo.hours5,
        hours6: contactInfo.hours6,
        hours7: contactInfo.hours7,
        address: contactInfo.address,
      });
    }
  }, [contactInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(updateHomeContact(formData));
    toast.success("Contact information updated successfully!", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    if (success) {
      toast.success("Contact information updated successfully!", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (error) {
      toast.error("Failed to update contact information. Please try again.", {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <br />
      <h2 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
        Edit Contact Information
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg max-w-lg mx-auto"
      >
        <div className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-lg font-medium text-gray-700">
              Phone Number
            </span>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
          <label className="block">
            <span className="text-lg font-medium text-gray-700">
              WhatsApp Number
            </span>
            <input
              type="text"
              placeholder="WhatsApp"
              name="whatsappLink"
              value={formData.whatsappLink}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          {[
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ].map((day, index) => (
            <label key={index} className="block">
              <span className="text-lg font-medium text-gray-700">
                {day}:{" "}
                <span className="text-sm text-gray-500">
                  (e.g., 9:30 AM - 8:00 PM)
                </span>
              </span>
              <input
                type="text"
                placeholder={`${day} Hours`}
                name={`hours${index + 1}`}
                value={formData[`hours${index + 1}`]}
                onChange={handleChange}
                className="mt-2 block w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          ))}

          <label className="block">
            <span className="text-lg font-medium text-gray-700">Address</span>
            <textarea
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
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
    </div>
  );
};

export default AdminHomeContact;
