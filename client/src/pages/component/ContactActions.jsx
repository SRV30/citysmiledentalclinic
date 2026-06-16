import React from 'react';
import { Phone, MessageSquare, MapPin, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactActions = ({ phone, whatsapp, address }) => {
  const actions = [
    {
      id: 'call',
      title: 'Call Now',
      subtitle: 'Talk to our experts',
      icon: <Phone className="w-5 h-5 md:w-6 md:h-6" />,
      color: 'bg-blue-600',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      link: `tel:${phone}`,
      description: phone
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      subtitle: 'Chat with us',
      icon: <MessageSquare className="w-5 h-5 md:w-6 md:h-6" />,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
      link: `https://wa.me/91${whatsapp}`,
      description: 'Instant response'
    },
    {
      id: 'location',
      title: 'Location',
      subtitle: 'Visit our clinic',
      icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
      color: 'bg-slate-900',
      lightColor: 'bg-slate-100',
      textColor: 'text-slate-900',
      link: 'https://maps.app.goo.gl/YourMapLinkHere',
      description: address || 'View on Maps'
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

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {actions.map((action) => (
        <motion.a
          key={action.id}
          href={action.link}
          target="_blank"
          rel="noreferrer"
          variants={itemVariants}
          className="group block bg-white rounded-2xl p-5 md:p-6 shadow-xl shadow-slate-200/50 border border-slate-100 transition-all duration-300 hover:border-transparent hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] relative overflow-hidden"
        >
          {/* Hover Color Slide */}
          <div className={`absolute inset-0 ${action.color} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out opacity-[0.03]`}></div>

          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${action.lightColor} ${action.textColor} flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:${action.color} group-hover:text-white`}>
              {action.icon}
            </div>
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-900 transition-colors">
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </div>
          </div>

          <div className="text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              {action.subtitle}
            </p>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1.5 md:mb-2">
              {action.title}
            </h3>
            <p className="text-xs md:text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors line-clamp-1">
              {action.description}
            </p>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default ContactActions;
