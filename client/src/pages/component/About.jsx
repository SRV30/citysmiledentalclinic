import { getAboutHome } from "@/store/home/about";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronRight, FaStar } from "react-icons/fa";
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (loading) return null;

  return (
    <section id="about" className="bg-white py-12 md:py-20 lg:py-32 overflow-hidden">
      <motion.div
        className="container mx-auto px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 xl:gap-24">

          {/* Section 1: Content */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-4 md:mb-6"
            >
              <FaStar className="text-[10px]" /> Welcome to City Smile
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight max-w-2xl mx-auto lg:mx-0"
            >
              {heading || "Excellence in Dental Care for Your Family"}
            </motion.h2>

            <motion.h3
              variants={itemVariants}
              className="text-lg md:text-xl font-semibold text-blue-600 mb-6 md:mb-8 italic"
            >
              {subheading || "Led by Dr. Aditya Shivi"}
            </motion.h3>

            <div className="space-y-4 md:space-y-6 text-slate-600 text-base md:text-lg leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto lg:mx-0">
              <motion.p variants={itemVariants}>
                {description1 || "City Smile Dental Clinic has been known for its unparalleled commitment to patient satisfaction. We believe in providing premium quality treatment at an affordable price."}
              </motion.p>
              <motion.p variants={itemVariants}>
                {description2 || "We aim to make Motihari a 100% oral disease-free city in the coming years, by educating people and providing them with the best treatment they need."}
              </motion.p>
            </div>

            <motion.div variants={itemVariants}>
              <a
                href="/about"
                className="group inline-flex items-center gap-3 px-6 md:px-8 py-3.5 md:py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                Learn More About Me
                <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Section 2: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

              <div className="relative z-10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-4 md:border-8 border-white">
                <img
                  src={imageUrl}
                  alt="City Smile Dental Clinic"
                  className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[5/4] xl:aspect-auto"
                />

                {/* Stats Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl border border-white/20"
                >
                  <div className="flex justify-between items-center text-center">
                    <div className="flex-1">
                      <p className="text-xl md:text-3xl font-bold text-slate-900">100%</p>
                      <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-tighter">Satisfaction</p>
                    </div>
                    <div className="h-8 md:h-10 w-px bg-slate-200"></div>
                    <div className="flex-1">
                      <p className="text-xl md:text-3xl font-bold text-slate-900">Premium</p>
                      <p className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-tighter">Quality Care</p>
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
