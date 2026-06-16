import { getAboutHome } from "@/store/home/about";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";
import { FaChevronRight, FaStar } from "react-icons/fa";

const HomeAbout = () => {
  const dispatch = useDispatch();
  const { heading, subheading, description1, description2, imageUrl, loading } =
    useSelector((state) => state.about);

  useEffect(() => {
    dispatch(getAboutHome());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      gsap.from(".home-about-animate", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".home-about-image", {
        opacity: 0,
        x: 50,
        duration: 1.2,
        delay: 0.5,
        ease: "power2.out",
      });
    }
  }, [loading]);

  if (loading) return null;

  return (
    <section id="about" className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">

          {/* Section 1: Content */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs uppercase tracking-widest mb-6 home-about-animate">
              <FaStar className="text-[10px]" /> Welcome to City Smile
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight home-about-animate">
              {heading || "Excellence in Dental Care for Your Family"}
            </h2>

            <h3 className="text-xl font-semibold text-blue-600 mb-8 italic home-about-animate">
              {subheading || "Led by Dr. Aditya Shivi"}
            </h3>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-10 home-about-animate">
              <p>
                {description1 || "City Smile Dental Clinic has been known for its unparalleled commitment to patient satisfaction. We believe in providing premium quality treatment at an affordable price."}
              </p>
              <p>
                {description2 || "We aim to make Motihari a 100% oral disease-free city in the coming years, by educating people and providing them with the best treatment they need."}
              </p>
            </div>

            <div className="home-about-animate">
              <a
                href="/about"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 hover:-translate-y-1"
              >
                Learn More About Me
                <FaChevronRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Section 2: Image */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 home-about-image">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/20 border-8 border-white">
                <img
                  src={imageUrl}
                  alt="City Smile Dental Clinic"
                  className="w-full h-auto object-cover aspect-[4/3] lg:aspect-auto"
                />

                {/* Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold text-slate-900">100%</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Patient Satisfaction</p>
                    </div>
                    <div className="h-10 w-px bg-slate-200"></div>
                    <div>
                      <p className="text-3xl font-bold text-slate-900">Premium</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Quality Treatment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
