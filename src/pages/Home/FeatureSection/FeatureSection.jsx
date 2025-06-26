import React from "react";
import tracking from "../../../assets/live-tracking.png";
import delivery from "../../../assets/safe-delivery.png";
import support from "../../../assets/safe-delivery.png";

const features = [
  {
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: tracking,
  },
  {
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    image: delivery,
  },
  {
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    image: support,
  },
];

const FeatureSection = () => {
  return (
    <section className="py-12 bg-white w-full">
      <div className="w-full px-4 flex flex-col gap-8">
        {/* Section Title */}
        <h2 className="text-3xl font-extrabold text-primary text-center mb-6">
          Our Key Features
        </h2>

        {/* Feature Cards */}
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full flex flex-col md:flex-row items-center md:items-start bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-6"
          >
            {/* Left side: Image */}
            <img
              src={feature.image}
              alt={feature.title}
              className="w-28 h-28 object-contain md:mr-8 mb-4 md:mb-0"
            />

            {/* Right side: Text */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
