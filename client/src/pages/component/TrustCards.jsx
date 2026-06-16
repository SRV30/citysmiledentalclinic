import React from 'react';
import { Calendar, Award, UserCheck, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustCards = () => {
  const cards = [
    {
      id: 1,
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "Since 2022",
      description: "Providing consistent excellence in dental care."
    },
    {
      id: 2,
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Certified Clinic",
      description: "Fully accredited healthcare facility with high standards."
    },
    {
      id: 3,
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      title: "Specialist Care",
      description: "Advanced expertise in modern dental implant procedures."
    },
    {
      id: 4,
      icon: <HeartPulse className="w-8 h-8 text-blue-600" />,
      title: "Patient Focused",
      description: "Focused on your comfort and long-term oral health."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      role="list"
      aria-label="Clinic trust indicators"
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          variants={cardVariants}
          role="listitem"
          className="group relative bg-white p-6 md:p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:border-blue-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/5 active:scale-[0.98]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" aria-hidden="true"></div>

          <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 md:mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-blue-600" aria-hidden="true">
            <span className="transition-colors duration-300 group-hover:text-white scale-90 md:scale-100">
              {React.cloneElement(card.icon, {
                className: `w-8 h-8 transition-colors duration-300 group-hover:text-white`
              })}
            </span>
          </div>

          <h3 className="relative z-10 text-base md:text-lg font-bold text-slate-900 mb-2">
            {card.title}
          </h3>

          <p className="relative z-10 text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-3">
            {card.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TrustCards;
