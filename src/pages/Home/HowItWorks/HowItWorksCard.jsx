import React from "react";

const HowItWorksCard = ({ icon, title, description, className = "" }) => {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="mb-4 text-primary text-5xl flex items-start justify-start">
        {typeof icon === "function" ? (
          // If icon is a React component
          React.createElement(icon)
        ) : (
          // If icon is an image URL
          <img src={icon} alt={title} className="w-14 h-14 object-contain" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-base">{description}</p>
    </div>
  );
};

export default HowItWorksCard;
