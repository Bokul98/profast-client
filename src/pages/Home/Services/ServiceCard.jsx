import React from 'react';

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
      <div className="text-primary text-4xl mb-4">
        <Icon />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ServiceCard;
