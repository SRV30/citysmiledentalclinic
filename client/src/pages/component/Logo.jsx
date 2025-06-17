import { getLogoHome } from "@/store/home/logo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { TypeAnimation } from "react-type-animation";
import { CircularProgress } from "@mui/material";

const Logo = () => {
  const dispatch = useDispatch();

  const { logoUrl, heading, subheading, loading, error } = useSelector(
    (state) => state.home
  );

  useEffect(() => {
    dispatch(getLogoHome());
  }, [dispatch]);

  const logoToDisplay = logoUrl || logo;
  const headingToDisplay =
    heading || "A Super Multi Speciality Family Dental Care Center";

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gradient-to-br from-blue-900 to-blue-700">
        <div className="text-center">
          <CircularProgress sx={{ color: 'white' }} size={48} />
          <p className="text-white mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-red-100 to-red-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-4">
          <div className="text-red-600 text-xl font-semibold mb-2">
            Oops! Something went wrong
          </div>
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <section className="hero-section bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          <div className="flex-shrink-0 w-full lg:w-auto max-w-sm">
            <div className="relative group">
              <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <img
                src={logoToDisplay}
                alt="Dental Care Center Logo"
                className="relative w-full h-auto max-w-xs mx-auto lg:max-w-sm rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
                Welcome to Our
                <span className="block text-blue-200">Dental Care Center</span>
              </h1>
            </div>

            <div className="mb-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-medium text-blue-100 min-h-[2.5rem] flex items-center justify-center lg:justify-start">
                <TypeAnimation
                  sequence={[
                    headingToDisplay,
                    2000,
                    "We Care for Your Smile",
                    2000,
                    "Visit Us for Complete Dental Solutions",
                    2000,
                    "Professional & Compassionate Care",
                    2000,
                  ]}
                  speed={50}
                  wrapper="span"
                  repeat={Infinity}
                  className="inline-block"
                />
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#viewservice"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-blue-800 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-blue-50"
              >
                <span className="relative z-10">View Our Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold text-lg rounded-xl hover:bg-white hover:text-blue-800 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>

            {subheading && (
              <div className="mt-6 text-blue-200 text-sm lg:text-base opacity-90">
                {subheading}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-16 lg:h-24"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            fillOpacity="0.1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,133.3C1248,107,1344,53,1392,26.7L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Logo;
