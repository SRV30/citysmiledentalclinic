import React from 'react';
import { Calendar, Award, UserCheck, HeartPulse } from 'lucide-react';

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
      title: "Certified Dental Clinic",
      description: "Fully accredited healthcare facility with high standards."
    },
    {
      id: 3,
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      title: "Implantology Specialist",
      description: "Advanced expertise in modern dental implant procedures."
    },
    {
      id: 4,
      icon: <HeartPulse className="w-8 h-8 text-blue-600" />,
      title: "Patient-Centered Care",
      description: "Focused on your comfort and long-term oral health."
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="group relative bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:border-blue-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/5"
        >
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>

          <div className="relative z-10 w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:bg-blue-600">
            <span className="transition-colors duration-300 group-hover:text-white">
              {React.cloneElement(card.icon, {
                className: `w-8 h-8 transition-colors duration-300 group-hover:text-white`
              })}
            </span>
          </div>

          <h3 className="relative z-10 text-lg font-bold text-slate-900 mb-2">
            {card.title}
          </h3>

          <p className="relative z-10 text-sm text-slate-500 leading-relaxed">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TrustCards;
