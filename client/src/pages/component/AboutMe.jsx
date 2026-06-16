import { useEffect, useState } from "react";
import { Award, UserCheck, CheckCircle, GraduationCap } from "lucide-react";
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
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50" aria-busy="true" aria-label="Loading profile">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full mb-6 ring-8 ring-blue-50"></div>
          <div className="h-4 w-40 bg-slate-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error || !about) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6" role="alert">
        <div className="text-center bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 max-w-md">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">!</div>
          <p className="text-slate-900 font-bold text-xl mb-6">{error || "Profile unavailable"}</p>
          <button
            onClick={() => dispatch(getAboutMe())}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 focus-visible:ring-4 focus-visible:ring-blue-500/50"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaData title={`Dr. Aditya Shivi | About Me | City Smile Dental Clinic`} />

      <div className="bg-slate-50/50 min-h-screen">
        {/* Profile Hero */}
        <section className="bg-white border-b border-slate-100 overflow-hidden relative" aria-labelledby="doctor-name">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform origin-top translate-x-1/2 pointer-events-none"></div>

          <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 lg:py-32 relative">
            <motion.div
              className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 xl:gap-24"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >

              {/* Profile Image Section */}
              <motion.div variants={fadeInUp} className="w-full lg:w-5/12 flex justify-center lg:justify-end">
                <div className="relative group max-w-sm md:max-w-md lg:max-w-none">
                  {/* Premium Ambient Glow */}
                  <div className="absolute -inset-6 bg-blue-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" aria-hidden="true"></div>

                  <div className="relative p-3 md:p-4 bg-white rounded-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 transition-transform duration-700 group-hover:scale-[1.03]">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-[6px] border-slate-50 shadow-inner">
                      <img
                        src={about.profilePicture}
                        alt={`Dr. Aditya Shivi - Specialist Dentist`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                      />
                    </div>
                  </div>

                  {/* Floating Trust Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute -bottom-4 right-4 md:bottom-12 md:-right-8 bg-white py-4 px-6 rounded-3xl shadow-2xl shadow-blue-900/10 border border-slate-100 flex items-center gap-4 animate-float ring-1 ring-slate-900/5"
                    aria-label="Verified Medical Professional Status"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-200">
                      <CheckCircle className="text-white w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-tight">Board Verified</p>
                      <p className="text-sm font-extrabold text-slate-900">Expert Dentist</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Profile Details Section */}
              <div className="w-full lg:w-7/12 text-center lg:text-left">
                <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                  <span className="h-1.5 w-12 bg-blue-600 rounded-full" aria-hidden="true"></span>
                  <span className="text-blue-600 font-bold uppercase tracking-[0.2em] text-xs">Medical Profile</span>
                </motion.div>

                <motion.h1
                  id="doctor-name"
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]"
                >
                  Dr. Aditya Shivi
                </motion.h1>

                <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
                  <div className="flex items-center gap-2 px-5 py-2 bg-blue-50 text-blue-700 rounded-2xl text-sm font-bold border border-blue-100 shadow-sm">
                    <GraduationCap className="w-4 h-4" /> BDS (MIDA) Delhi
                  </div>
                  <div className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-2xl text-sm font-bold border border-slate-800 shadow-sm">
                    <Award className="w-4 h-4" /> Implantologist
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-6 text-slate-600 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0">
                  <p className="font-semibold text-slate-900 leading-snug">
                    {about.experience1}
                  </p>
                  <p className="opacity-80">
                    {about.experience2}
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp}>
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

        {/* Indicators Section */}
        <section className="container mx-auto px-6 md:px-8 -mt-10 md:-mt-16 lg:-mt-20 relative z-20" aria-label="Professional Indicators">
          <TrustCards />
        </section>

        {/* Detailed Information Section */}
        <section className="container mx-auto px-6 md:px-8 py-20 md:py-32 lg:py-40">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">

              {/* Clinical Experience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                role="region"
                aria-labelledby="exp-heading"
              >
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-100">
                        <UserCheck className="w-6 h-6" />
                    </div>
                    <h2 id="exp-heading" className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Clinical Focus</h2>
                </div>

                <div className="space-y-10 relative before:absolute before:left-[1.35rem] before:top-4 before:bottom-4 before:w-px before:bg-slate-200">
                  {[about.experience3, about.experience4, about.experience5].filter(Boolean).map((exp, i) => (
                    <div key={i} className="relative pl-12 group">
                      <div className="absolute left-4 top-2.5 w-3 h-3 rounded-full border-[3px] border-white bg-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)] group-hover:scale-125 transition-transform"></div>
                      <p className="text-slate-600 text-lg md:text-xl leading-relaxed italic font-medium opacity-90">
                        "{exp}"
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                role="region"
                aria-labelledby="cert-heading"
              >
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-100">
                        <Award className="w-6 h-6" />
                    </div>
                    <h2 id="cert-heading" className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Accreditation</h2>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 group relative overflow-hidden ring-1 ring-slate-900/5">
                  <button
                    className="w-full relative overflow-hidden rounded-3xl bg-slate-50 aspect-[4/3] mb-8 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 group/preview"
                    onClick={() => setIsModalOpen(true)}
                    aria-label="View full registration certificate"
                  >
                    <img
                      src={about.registrationCertificate}
                      alt="Official Dental Registration Certificate"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-slate-900/5 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity">
                        <div className="px-6 py-3 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl text-slate-900 font-extrabold text-sm flex items-center gap-3 transform translate-y-4 group-hover/preview:translate-y-0 transition-all duration-500">
                            <CheckCircle className="text-blue-600 w-5 h-5" aria-hidden="true" /> Verify Document
                        </div>
                    </div>
                  </button>
                  <h4 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight">Professional Registration</h4>
                  <p className="text-slate-500 mb-8 leading-relaxed">Officially recognized and registered medical practitioner under the <span className="text-slate-900 font-bold">Dental Council of India</span>.</p>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold text-sm hover:bg-blue-600 hover:text-white transition-all duration-300 border border-slate-100 active:scale-95 focus-visible:ring-4 focus-visible:ring-blue-500/50"
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
