// src/Testimonial/TestimonialCard.jsx
import React from 'react';

const TestimonialCard = ({ quote, name, title, avatarSrc, isActive = false }) => {
  return (
    <div
      className={`
        bg-white p-8 rounded-2xl shadow-md flex-shrink-0
        transition-all duration-500 ease-in-out transform
        ${isActive ? 'opacity-100 scale-100 shadow-xl border border-primary' : 'opacity-50 scale-95'}
        w-[85%] sm:w-[50%] lg:w-[33.33%] snap-center
      `}
    >
      <div className="text-7xl text-gray-200 font-serif mb-4">
        &ldquo;
      </div>
      <p className="text-gray-700 text-lg mb-6">{quote}</p>
      <div className="flex items-center mt-6 pt-4 border-t border-gray-200">
        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden flex-shrink-0">
          {avatarSrc ? (
            <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500 text-xl font-bold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
