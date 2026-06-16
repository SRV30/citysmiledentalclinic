import React from 'react';
import { Phone, MessageSquare, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactActions = ({ phone, whatsapp, address }) => {
  const actions = [
    {
      id: 'call',
      title: 'Voice Call',
      subtitle: 'Talk to experts',
      icon: <Phone />,
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      link: `tel:${phone}`,
      description: phone,
      ariaLabel: `Call Dr. Aditya Shivi at ${phone}`
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Message now',
      icon: <MessageSquare />,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
      link: `https://wa.me/91${whatsapp}`,
      description: 'Quick response',
      ariaLabel: "Message us on WhatsApp for an instant response"
    },
    {
      id: 'location',
      title: 'Directions',
      subtitle: 'Our location',
      icon: <MapPin />,
      color: 'bg-slate-900',
      lightColor: 'bg-slate-50',
      textColor: 'text-slate-900',
      link: 'https://maps.app.goo.gl/YourMapLinkHere',
      description: 'View on Maps',
      ariaLabel: `Navigate to City Smile Dental Clinic location at ${address || 'our address'} on Google Maps`
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      role="list"
      aria-label="Contact options"
    >
      {actions.map((action) => (
        <motion.a
          key={action.id}
          href={action.link}
          target="_blank"
          rel="noreferrer"
          variants={itemVariants}
          role="listitem"
          aria-label={action.ariaLabel}
          className="group block bg-white rounded-3xl p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-300 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 active:scale-[0.98] relative overflow-hidden focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50"
        >
          {/* Refined Hover Background */}
          <div className={`absolute inset-0 ${action.color} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-[0.02]`} aria-hidden="true"></div>

          <div className="flex items-center justify-between mb-8">
            <div className={`w-14 h-14 rounded-2xl ${action.lightColor} ${action.textColor} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:${action.color} group-hover:text-white ring-1 ring-slate-100 group-hover:ring-transparent`} aria-hidden="true">
              {React.cloneElement(action.icon, { strokeWidth: 2, className: "w-6 h-6" })}
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300" aria-hidden="true">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-1.5">
              {action.subtitle}
            </p>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1.5 tracking-tight">
              {action.title}
            </h3>
            <p className="text-sm font-medium text-slate-500 group-hover:text-slate-800 transition-colors line-clamp-1">
              {action.description}
            </p>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default ContactActions;
