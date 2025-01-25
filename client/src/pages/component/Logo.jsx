import { getLogoHome } from "@/store/home/logo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logo.png";
import { TypeAnimation } from "react-type-animation";
import { CircularProgress } from "@mui/material";

const Logo = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
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
      <div className="flex justify-center items-center py-8">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="main1">
      <main className="flex-grow container mx-auto flex items-center justify-center py-9">
        <div className="flex flex-col md:flex-row items-center bg-blue-800 my-6">
          <img
            src={logoToDisplay}
            alt="home_alt"
            className="logo-img w-full sm:w-1/4 px-4 mx-auto"
          />
          <div className="text-center md:text-left px-8 py-12">
            <h4 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white"></h4>
            <h2 className="heading text-lg sm:text-xl md:text-2xl font-semibold text-white mt-4">
              <TypeAnimation
                sequence={[
                  headingToDisplay,
                  2000,
                  "We Care for Your Smile",
                  2000,
                  "Visit Us for Complete Dental Solutions",
                  2000,
                ]}
                speed={50}
                wrapper="span"
                repeat={Infinity}
              />
            </h2>
            <a
              href="#viewservice"
              className="cta-btn inline-block px-4 py-2 bg-white text-blue-800 rounded-md mt-4"
            >
              View Services
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Logo;
