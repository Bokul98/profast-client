import React from "react";
import HowItWorksCard from "./HowItWorksCard";
import { FaTruckPickup, FaRoute, FaShippingFast, FaHeadset } from "react-icons/fa";

const steps = [
  {
    icon: FaTruckPickup,
    title: "Booking Pick & Drop",
    description: "Book your parcel pickup and drop easily with just a few clicks.",
  },
  {
    icon: FaRoute,
    title: "Parcel Collection",
    description: "Our agent collects your parcel directly from your doorstep.",
  },
  {
    icon: FaShippingFast,
    title: "Fast Delivery",
    description: "We ensure swift and safe delivery to your desired location.",
  },
  {
    icon: FaHeadset,
    title: "Customer Support",
    description: "24/7 customer support to help you track and manage parcels.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary mb-12 text-left">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <HowItWorksCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              className={
                index === 1 || index === 2
                  ? "relative lg:border-gray-300"
                  : ""
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;