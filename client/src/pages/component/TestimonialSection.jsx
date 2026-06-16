import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPublicTestimonials } from '@/store/home/testimonial';
import { motion } from 'framer-motion';
import { Star, Quote, User } from 'lucide-react';
import ReviewStats from './ReviewStats';

const TestimonialSection = () => {
  const dispatch = useDispatch();
  const { testimonials, loading } = useSelector((state) => state.testimonial);

  useEffect(() => {
    dispatch(getPublicTestimonials());
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    }
  };

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="py-20 lg:py-32 bg-slate-50/50 overflow-hidden relative" aria-labelledby="testimonials-heading">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-100/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-100/30 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative">
        <header className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <ReviewStats testimonials={testimonials} />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-[0.2em] mb-6"
          >
            <Star className="w-3 h-3 fill-blue-600 text-blue-600" aria-hidden="true" /> Patient Success Stories
          </motion.div>
          <motion.h2
            id="testimonials-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            What our patients say about <span className="text-blue-600">City Smile</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl leading-relaxed"
          >
            Real experiences from people who trusted us with their smiles.
          </motion.p>
        </header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          role="list"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item._id}
              variants={cardVariants}
              role="listitem"
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="h-full bg-white/70 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.15)] group-hover:-translate-y-2 ring-1 ring-slate-900/5 group-hover:ring-blue-500/20">

                {/* Floating Quote Icon */}
                <div className="absolute top-8 right-8 text-blue-100 group-hover:text-blue-200 transition-colors duration-500">
                  <Quote size={48} strokeWidth={3} aria-hidden="true" />
                </div>

                <div className="relative z-10 h-full flex flex-col">
                  {/* Rating */}
                  <div className="flex gap-1 mb-8" aria-label={`${item.rating} star rating`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="flex-grow">
                    <p className="text-slate-600 text-lg leading-relaxed italic font-medium mb-8 line-clamp-6 group-hover:text-slate-900 transition-colors duration-500">
                      "{item.comment}"
                    </p>
                  </blockquote>

                  {/* Patient Info */}
                  <div className="flex items-center gap-4 pt-8 border-t border-slate-100">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 border border-slate-100 overflow-hidden flex-shrink-0 group-hover:ring-2 group-hover:ring-blue-500/30 transition-all duration-500">
                      {item.avatar ? (
                        <img src={item.avatar} alt={item.patientName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-blue-300">
                            <User size={28} />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                        {item.patientName}
                      </h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        Verified Patient
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
