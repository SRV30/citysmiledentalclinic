import React from 'react';
import { Calendar, ShieldCheck, UserCog, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustCards = () => {
  const cards = [
    {
      id: 1,
      icon: <Calendar />,
      title: "Since 2022",
      description: "Delivering consistent excellence in patient care."
    },
    {
      id: 2,
      icon: <ShieldCheck />,
      title: "Certified Clinic",
      description: "Fully accredited facility with elite medical standards."
    },
    {
      id: 3,
      icon: <UserCog />,
      title: "Specialist Care",
      description: "Advanced expertise in complex dental procedures."
    },
    {
      id: 4,
      icon: <HeartPulse />,
      title: "Patient Focused",
      description: "Dedicated to your comfort and long-term health."
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      role="list"
      aria-label="Clinic Trust Indicators"
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          variants={cardVariants}
          role="listitem"
          className="group relative bg-white p-8 rounded-[2rem] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center transition-all duration-500 hover:border-blue-200 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.12)] active:scale-[0.98]"
        >
          {/* Accent Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" aria-hidden="true"></div>

          <div className="relative z-10 w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-blue-600 ring-1 ring-slate-100 group-hover:ring-blue-500 shadow-sm group-hover:shadow-xl group-hover:shadow-blue-100">
            <span className="text-slate-600 transition-colors duration-500 group-hover:text-white">
              {React.cloneElement(card.icon, {
                strokeWidth: 2,
                className: "w-7 h-7"
              })}
            </span>
          </div>

          <h3 className="relative z-10 text-lg font-extrabold text-slate-900 mb-2 tracking-tight">
            {card.title}
          </h3>

          <p className="relative z-10 text-sm font-medium text-slate-500 leading-relaxed px-2">
            {card.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TrustCards;
