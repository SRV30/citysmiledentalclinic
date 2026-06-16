import { useEffect, useState } from "react";
import { FaCertificate, FaUserMd } from "react-icons/fa";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getAboutMe } from "@/store/extra/aboutMe";
import TrustCards from "./TrustCards";
import ContactActions from "./ContactActions";
import CertificateModal from "./CertificateModal";
import { motion } from "framer-motion";

const AboutMe = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, error, about } = useSelector((state) => state.aboutMe);

  useEffect(() => {
    dispatch(getAboutMe());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

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
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-100 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-24">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-20"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >

              {/* Photo Section */}
              <motion.div variants={fadeInUp} className="w-full lg:w-5/12 flex justify-center">
                <div className="relative group max-w-sm md:max-w-md lg:max-w-none">
                  <div className="absolute -inset-4 bg-blue-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="relative p-2.5 md:p-3 bg-white rounded-full shadow-2xl shadow-blue-900/10 border border-slate-100 transition-transform duration-500 group-hover:scale-[1.02]">
                    <div className="w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-slate-50">
                      <img
                        src={about.profilePicture}
                        alt={about.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                      />
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white py-2.5 px-4 md:py-3 md:px-5 rounded-2xl shadow-xl shadow-blue-900/10 border border-slate-50 hidden sm:flex items-center gap-3 animate-float"
                  >
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                      <FaCertificate className="text-white text-sm md:text-lg" />
                    </div>
                    <div>
                      <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-tight">Medical Board</p>
                      <p className="text-xs md:text-sm font-extrabold text-slate-900">Verified Expert</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Info Section */}
              <div className="w-full lg:w-7/12 text-center lg:text-left">
                <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-2 mb-4 md:mb-6">
                  <span className="h-1 w-8 md:w-12 bg-blue-600 rounded-full"></span>
                  <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px] md:text-xs">Professional Profile</span>
                </motion.div>

                <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                  Dr. Aditya Shivi
                </motion.h1>

                <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-2 md:gap-3 mb-6 md:mb-8">
                  <span className="px-3 py-1 md:px-4 md:py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs md:text-sm font-bold border border-blue-100">
                    BDS (MIDA) Delhi
                  </span>
                  <span className="px-3 py-1 md:px-4 md:py-1.5 bg-slate-50 text-slate-700 rounded-full text-xs md:text-sm font-bold border border-slate-200">
                    Implantologist
                  </span>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-4 md:space-y-6 text-slate-600 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0">
                  <p className="font-medium text-slate-800">
                    {about.experience1}
                  </p>
                  <p>
                    {about.experience2}
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="pt-2">
                  <ContactActions
                    phone={about.phone}
                    whatsapp={about.whatsapp}
                    address={about.address}
                  />
                </motion.div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* Trust Cards Section */}
        <section className="container mx-auto px-4 md:px-6 -mt-8 md:-mt-12 lg:-mt-16 relative z-20">
          <TrustCards />
        </section>

        {/* Details Section */}
        <section className="container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm md:text-base">
                    <FaUserMd />
                  </span>
                  Clinical Experience
                </h2>
                <div className="space-y-6 md:space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                  {[about.experience3, about.experience4, about.experience5].filter(Boolean).map((exp, i) => (
                    <div key={i} className="relative pl-8">
                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white bg-blue-600 shadow-sm"></div>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed italic">
                        "{exp}"
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm md:text-base">
                    <FaCertificate />
                  </span>
                  Certifications
                </h2>
                <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-100 shadow-sm group">
                  <div className="relative overflow-hidden rounded-xl bg-slate-100 aspect-[4/3] mb-4 md:mb-6 cursor-pointer" onClick={() => setIsModalOpen(true)}>
                    <img
                      src={about.registrationCertificate}
                      alt="Medical Registration"
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="px-4 py-2 md:px-5 md:py-2.5 bg-white/95 backdrop-blur shadow-xl rounded-xl text-slate-900 font-bold text-xs md:text-sm flex items-center gap-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                            <FaCertificate className="text-blue-600" /> View Full Certificate
                        </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Dental Registration</h4>
                  <p className="text-xs md:text-sm text-slate-500 mb-4">Registered medical practitioner under the Dental Council of India.</p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-600 font-bold text-xs md:text-sm hover:underline flex items-center gap-1 active:scale-95 transition-transform"
                  >
                    Verify Credentials
                  </button>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <CertificateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={about.registrationCertificate}
          title="Registration Certificate - Dental Council"
        />
      </div>
    </>
  );
};

export default AboutMe;
