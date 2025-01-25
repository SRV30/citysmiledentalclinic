import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white text-center">
      {/* Animated Unauthorized Icon */}
      <div className="relative">
        <div className="text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400 drop-shadow-lg">
          401
        </div>
        <p className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-black text-lg font-semibold px-4 py-2 rounded-full shadow-lg animate-bounce">
          Unauthorized
        </p>
      </div>

      {/* Error Message */}
      <p className="text-2xl font-semibold mt-6 animate-fade-in">
        You do not have permission to access this page.
      </p>
      <p className="text-gray-400 mt-3 animate-fade-in-slow">
        Please log in with the appropriate credentials or contact your administrator.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex space-x-4">
        <Link to="/login">
          <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-yellow-400 text-black rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl hover:from-red-600 hover:to-yellow-500">
            Login
          </button>
        </Link>
        <Link to="/">
          <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl">
            Go Back Home
          </button>
        </Link>
      </div>

      {/* Floating Icons for Additional Style */}
      <div className="absolute bottom-10 flex space-x-4 animate-float">
        <div className="w-10 h-10 bg-red-500 rounded-full shadow-lg"></div>
        <div className="w-8 h-8 bg-yellow-400 rounded-full shadow-lg"></div>
        <div className="w-6 h-6 bg-red-300 rounded-full shadow-lg"></div>
        <div className="w-12 h-12 bg-yellow-500 rounded-full shadow-lg"></div>
      </div>
    </div>
  );
};

export default Unauthorized;
