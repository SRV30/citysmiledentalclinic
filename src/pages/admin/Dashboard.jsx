import { Link } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";

const Dashboard = () => {
  useEffect(() => {
    gsap.from(".dashboard-card", {
      opacity: 0,
      scale: 0.8,
      y: 50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="container mx-auto px-6 py-12 mt-7 mb-7">
      <h2 className="text-5xl font-extrabold text-center mb-12 text-blue-600 tracking-wide">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
        <Link
          to="/admin/users"
          className="dashboard-card bg-white hover:to-blue-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">View All Users</h3>
        </Link>
        <Link
          to="/admin/create/user"
          className="dashboard-card bg-white hover:to-indigo-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Create New User</h3>
        </Link>
        <Link
          to="/admin/contact"
          className="dashboard-card bg-white hover:to-green-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">View Get in Touch</h3>
        </Link>
        <Link
          to="/admin/photo"
          className="dashboard-card bg-white hover:to-purple-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Upload Clinic Photo</h3>
        </Link>
        <Link
          to="/admin/about"
          className="dashboard-card bg-white hover:to-pink-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Update About Section</h3>
        </Link>
        <Link
          to="/admin/services"
          className="dashboard-card bg-white hover:to-yellow-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Create & Delete Services</h3>
        </Link>
        <Link
          to="/admin/logo"
          className="dashboard-card bg-white hover:to-red-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Update Home Logo Section</h3>
        </Link>
        <Link
          to="/admin/home/about"
          className="dashboard-card bg-white hover:from-teal-600 hover:to-teal-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Update Home About Section</h3>
        </Link>
        <Link
          to="/admin/home/contact"
          className="dashboard-card bg-white hover:to-indigo-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Update Home Contact Section</h3>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
