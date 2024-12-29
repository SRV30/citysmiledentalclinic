import { useEffect } from "react";
import { IoIosCall, IoIosPhotos } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAboutMe } from "@/store/extra/aboutMe";
import { gsap } from "gsap";

const AboutMe = () => {
  const dispatch = useDispatch();
  const aboutFetch = useSelector((state) => state.aboutMe);
  const { loading, error, about } = aboutFetch;

  useEffect(() => {
    dispatch(getAboutMe());
  }, [dispatch]);

  useEffect(() => {
    if (about) {
     
      gsap.from(".about-header", {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".about-info p", {
        opacity: 0,
        y: 20,
        stagger: 0.3,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });

      gsap.from(".contact-info a", {
        opacity: 0,
        y: 20,
        stagger: 0.3,
        duration: 1,
        delay: 1.5,
        ease: "power3.out",
      });

      gsap.from(".about-button", {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        delay: 2,
        ease: "back.out(1.7)",
      });

      gsap.from(".about-image", {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        delay: 2,
        ease: "back.out(1.7)",
      });
    }
  }, [about]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !about) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <MetaData title="About Me | City Smile Dental Clinic" />
      <div className="bg-blue-100 min-h-screen">
        <div className="container my-5 py-8">
          <div className="flex items-center justify-center flex-col">
            <h3 className="about-header text-4xl font-bold mb-4 text-blue-600 py-4">
              {about.name}
            </h3>

            <img
              src={about.profilePicture}
              alt="Profile"
              className={
                "profile-picture rounded-full w-52 h-52 mb-4 hover:opacity-80 transition-opacity duration-300 ease-in-out "
              }
            />

            <h4 className="text-xl font-semibold text-blue-800">
              {about.qualifications}
            </h4>

            <div className="about-info mb-4">
              <p>{about.experience1}</p>
              <p>{about.experience2}</p>
              <p>{about.experience3}</p>
              <p>{about.experience4}</p>
              <p>{about.experience5}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="contact-info flex items-center mb-4">
                <IoIosCall className="mr-2 text-blue-600" />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`tel:${about.phone}`}
                  className="text-blue-600 hover:text-blue-900 transition-colors duration-300 ease-in-out"
                >
                  {about.phone}
                </a>
              </div>

              <div className="contact-info flex items-center mb-4">
                <FaWhatsapp className="mr-2 text-green-500" />
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/91${about.whatsapp}`}
                  className="text-green-500 hover:text-green-700 transition-colors duration-300 ease-in-out"
                >
                  {about.whatsapp}
                </a>
              </div>
            </div>

            <div className="flex items-center mb-4">
              <p className="mr-2 text-blue-700">Certificate of Registration:</p>
              <a
                href={about.registrationCertificate}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400"
              >
                View in full
              </a>
            </div>

            <div className="about-image flex justify-center">
              <img
                id="registration"
                src={about.registrationCertificate}
                alt="Certificate of Registration"
                className="w-64 h-auto hover:opacity-80 transition-opacity duration-300 ease-in-out transform hover:scale-150"
              />
            </div>

            <div className="about-button flex justify-center bg-white p-6 rounded-lg shadow-md mb-8 my-20">
              <IoIosPhotos className="mr-2 text-blue-600" />
              <a
                href="/photo"
                className="text-blue-600 hover:text-blue-900 transition-colors duration-300 ease-in-out"
              >
                Photo Gallery
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
