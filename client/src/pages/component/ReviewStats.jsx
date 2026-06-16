import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, Heart, Award } from 'lucide-react';

const ReviewStats = ({ testimonials }) => {
  // Logic calculations
  const totalReviews = testimonials.length;
  const avgRating = totalReviews > 0
    ? (testimonials.reduce((sum, item) => sum + item.rating, 0) / totalReviews).toFixed(1)
    : "5.0";
  const featuredCount = testimonials.filter(t => t.isFeatured).length;
  const satisfactionRate = totalReviews > 0
    ? Math.round((testimonials.filter(t => t.rating >= 4).length / totalReviews) * 100)
    : 100;

  const stats = [
    {
      id: 1,
      label: "Average Rating",
      value: `${avgRating}/5`,
      icon: <Star className="w-6 h-6 text-amber-500 fill-yellow-400" />,
      description: "Based on patient feedback"
    },
    {
      id: 2,
      label: "Total Reviews",
      value: totalReviews,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      description: "Verified experiences"
    },
    {
      id: 3,
      label: "Satisfaction",
      value: `${satisfactionRate}%`,
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      description: "Patient happiness rate"
    },
    {
      id: 4,
      label: "Featured",
      value: featuredCount,
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      description: "Top success stories"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 lg:mb-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      role="region"
      aria-label="Patient review statistics"
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.id}
          variants={itemVariants}
          className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl transition-all duration-500 ring-1 ring-slate-100 group-hover:ring-transparent">
            {stat.icon}
          </div>

          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-widest">
              {stat.label}
            </p>
            <p className="text-[10px] md:text-xs text-slate-400 font-medium hidden sm:block">
              {stat.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ReviewStats;
