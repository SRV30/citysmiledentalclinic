import { getUserDetails } from "@/store/auth-slice/userDetails";
import {
  clearError,
  resetUpdate,
  updateProfile,
} from "../../store/auth-slice/profile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileState = useSelector((state) => state.profile);
  const { user, loading } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = { name, email };
    dispatch(updateProfile(userData));
  };

  useEffect(() => {
    // GSAP animations
    gsap.from(".updateProfile form", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(".updateProfile h2", {
      opacity: 0,
      x: -50,
      duration: 1.2,
      ease: "power4.out",
    });

    if (user) {
      setName(user.name);
      setEmail(user.email);
    }

    if (profileState.error) {
      toast.error(profileState.error);
      dispatch(clearError());
    }

    if (profileState.isUpdated) {
      toast.success("Profile updated successfully");
      dispatch(getUserDetails());
      dispatch(resetUpdate());
    }
  }, [dispatch, profileState, user, navigate]);

  return (
    <div className="updateProfile flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md transform transition-all hover:scale-105"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center animate__animated animate__fadeIn">
          Update Profile
        </h2>
        <div className="mb-6">
          <label
            className="block text-lg font-medium text-gray-700 mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-lg font-medium text-gray-700 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-5 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
          }`}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
