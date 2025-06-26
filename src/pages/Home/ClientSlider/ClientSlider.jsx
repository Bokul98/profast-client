import React from "react";
import Marquee from "react-fast-marquee";

import amazon from "../../../assets/brands/amazon.png";
import amazonVector from "../../../assets/brands/amazon-vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import start from "../../../assets/brands/start.png";
import startPeople1 from "../../../assets/brands/start-people 1.png";

const logos = [
  amazon,
  amazonVector,
  casio,
  moonstar,
  randstad,
  start,
  startPeople1,
];

const ClientSlider = () => {
  return (
    <div className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-primary text-center mb-6">Trusted By Our Clients</h2>
        <Marquee
          gradient={false}
          speed={30}       // slower speed
          pauseOnHover={true}
          className="flex items-center"
        >
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`Client ${idx + 1}`}
              className="mx-8 object-contain h-4 sm:h-6 md:h-8 lg:h-10"
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default ClientSlider;
