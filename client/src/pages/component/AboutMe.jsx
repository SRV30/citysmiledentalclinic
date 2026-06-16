import { useEffect } from "react";
import { IoIosCall } from "react-icons/io";
import { FaWhatsapp, FaCertificate, FaUserMd } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAboutMe } from "@/store/extra/aboutMe";
import { gsap } from "gsap";
import TrustCards from "./TrustCards";
import ContactActions from "./ContactActions";

const AboutMe = () => {
  const dispatch = useDispatch();
  const { loading, error, about } = useSelector((state) => state.aboutMe);

  useEffect(() => {
    dispatch(getAboutMe());
  }, [dispatch]);

  useEffect(() => {
    if (about) {
      gsap.from(".animate-up", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".trust-card", {
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
      });
    }
  }, [about]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !about) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-red-100">
          <p className="text-red-500 font-medium mb-4">{error || "Failed to load doctor information"}</p>
          <button
            onClick={() => dispatch(getAboutMe())}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaData title={`Dr. Aditya Shivi | About Me | City Smile Dental Clinic`} />

      <div className="bg-slate-50 min-h-screen">
        {/* Hero Section: Doctor Photo & Info */}
        <section className="bg-white border-b border-slate-100 overflow-hidden">
          <div className="container mx-auto px-4 py-12 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

              {/* Section 1: Doctor Photo */}
              <div className="w-full lg:w-5/12 animate-up flex justify-center">
                <div className="relative group">
                  {/* Ambient Glow Effect */}
                  <div className="absolute -inset-4 bg-blue-200/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Circular Image Container */}
                  <div className="relative p-3 bg-white rounded-full shadow-2xl shadow-blue-900/10 border border-slate-100 transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-slate-50">
                      <img
                        src={about.profilePicture}
                        alt={about.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                      />
                    </div>
                  </div>

                  {/* Floating Trust Badge */}
                  <div className="absolute bottom-6 right-6 bg-white py-3 px-5 rounded-2xl shadow-xl shadow-blue-900/10 border border-slate-50 hidden md:flex items-center gap-3 animate-float">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                      <FaCertificate className="text-white text-lg" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Medical Board</p>
                      <p className="text-sm font-extrabold text-slate-900">Verified Expert</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Doctor Information */}
              <div className="w-full lg:w-7/12 animate-up">
                <div className="flex items-center gap-2 mb-6">
                  <span className="h-1 w-12 bg-blue-600 rounded-full"></span>
                  <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Professional Profile</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                  Dr. Aditya Shivi
                </h1>

                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100">
                    BDS (MIDA) Delhi
                  </span>
                  <span className="px-4 py-1.5 bg-slate-50 text-slate-700 rounded-full text-sm font-bold border border-slate-200">
                    Implantologist
                  </span>
                </div>

                <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-10 max-w-2xl">
                  <p className="font-medium text-slate-800">
                    {about.experience1}
                  </p>
                  <p>
                    {about.experience2}
                  </p>
                </div>

                <div className="mt-8">
                  <ContactActions
                    phone={about.phone}
                    whatsapp={about.whatsapp}
                    address={about.address}
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Trust Cards Section */}
        <section className="container mx-auto px-4 -mt-12 lg:-mt-16 relative z-20">
          <div className="trust-card">
            <TrustCards />
          </div>
        </section>

        {/* Additional Experience & Registration */}
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">

              <div className="animate-up">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-base">
                    <FaUserMd />
                  </span>
                  Clinical Experience
                </h2>
                <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {[about.experience3, about.experience4, about.experience5].filter(Boolean).map((exp, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white bg-blue-600 shadow-sm"></div>
                      <p className="text-slate-600 leading-relaxed italic">
                        "{exp}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-up">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-base">
                    <FaCertificate />
                  </span>
                  Certifications
                </h2>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm group">
                  <div className="relative overflow-hidden rounded-xl bg-slate-900 aspect-video mb-6">
                    <img
                      src={about.registrationCertificate}
                      alt="Medical Registration"
                      className="w-full h-full object-contain opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={about.registrationCertificate}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-2 bg-white text-slate-900 rounded-lg font-bold text-sm shadow-xl"
                      >
                        View Full Certificate
                      </a>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Dental Registration</h4>
                  <p className="text-sm text-slate-500 mb-4">Officially registered medical practitioner under the dental council of India.</p>
                  <a
                    href={about.registrationCertificate}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1"
                  >
                    Verify Credentials
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutMe;
