import { getAboutHome } from "@/store/home/about";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";

const HomeAbout = () => {
  const dispatch = useDispatch();
  const { heading, subheading, description1, description2, imageUrl, loading } =
    useSelector((state) => state.about);

  useEffect(() => {
    dispatch(getAboutHome());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.610, 0.355, 1.000],
      },
    },
  };

  if (loading) return null;

  return (
    <section id="about" className="bg-white py-16 md:py-24 lg:py-32 overflow-hidden border-b border-slate-50" aria-labelledby="about-heading">
      <motion.div
        className="container mx-auto px-6 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 xl:gap-28">

          {/* Section 1: Content */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/50 border border-blue-100 text-blue-700 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-6"
            >
              <Star className="w-3 h-3 fill-blue-600 text-blue-600" aria-hidden="true" /> Excellence in care
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={itemVariants}
              className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1] tracking-tight max-w-2xl mx-auto lg:mx-0"
            >
              {heading || "Advanced Dental Care for Your Family"}
            </motion.h2>

            <motion.h3
              variants={itemVariants}
              className="text-lg md:text-xl font-medium text-slate-500 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Dedicated professional care led by <span className="text-blue-600 font-bold">{subheading || "Dr. Aditya Shivi"}</span>
            </motion.h3>

            <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0">
              <motion.p variants={itemVariants}>
                {description1 || "City Smile Dental Clinic is recognized for its unparalleled commitment to patient excellence and oral health innovation. We provide premium quality treatments using state-of-the-art technology."}
              </motion.p>
              <motion.p variants={itemVariants}>
                {description2 || "Our vision is to build a community free from oral disease through dedicated patient education and world-class dental solutions tailored to your unique needs."}
              </motion.p>
            </div>

            <motion.div variants={itemVariants}>
              <a
                href="/about"
                className="group inline-flex items-center gap-4 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all duration-300 shadow-2xl shadow-slate-200 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50"
                aria-label={`Read professional profile of ${subheading || 'Dr. Aditya Shivi'}`}
              >
                Professional Profile
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </a>
            </motion.div>
          </div>

          {/* Section 2: Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Refined Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60" aria-hidden="true"></div>

              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(8,112,184,0.15)] border-8 border-white ring-1 ring-slate-100">
                <img
                  src={imageUrl}
                  alt="City Smile Dental Clinic Facility"
                  className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[5/4] xl:aspect-auto transform hover:scale-105 transition-transform duration-1000"
                />

                {/* Refined Stats Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 ring-1 ring-slate-900/5"
                >
                  <div className="flex justify-between items-center text-center divide-x divide-slate-100">
                    <div className="flex-1 px-2">
                      <p className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">100%</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Satisfaction</p>
                    </div>
                    <div className="flex-1 px-2">
                      <p className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Tier 1</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Quality Care</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default HomeAbout;
