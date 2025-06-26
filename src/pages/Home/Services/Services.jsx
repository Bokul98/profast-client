import React from 'react';
import { 
  FaShippingFast, 
  FaGlobeAsia, 
  FaWarehouse, 
  FaMoneyBillWave, 
  FaBuilding, 
  FaUndoAlt 
} from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;

  return (
    <div 
      className="
        flex flex-col items-center justify-center
        text-center
        p-6 rounded-lg shadow-md
        transition-colors duration-300
        bg-white hover:bg-[#CAE974]
      "
    >
      <Icon className="text-4xl text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const services = [
  {
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    icon: FaShippingFast
  },
  {
    title: "Nationwide Delivery",
    description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: FaGlobeAsia
  },
  {
    title: "Fulfillment Solution",
    description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: FaWarehouse
  },
  {
    title: "Cash on Home Delivery",
    description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: FaMoneyBillWave
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description: "Customized corporate services which includes warehouse and inventory management support.",
    icon: FaBuilding
  },
  {
    title: "Parcel Return",
    description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: FaUndoAlt
  }
];

const Services = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-4">Our Services</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              service={service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
