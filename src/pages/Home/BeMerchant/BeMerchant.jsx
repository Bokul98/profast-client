import React from 'react';
import tracking from "../../../assets/location-merchant.png";
import merchantBg from '../../../assets/be-a-merchant-bg.png';

const BeMerchant = () => {
  return (
    <div
      data-aos="zoom-in-up"
      className="
        bg-[#03313D]
        rounded-4xl
        py-12 px-6
        md:py-16 md:px-10
        lg:py-20 lg:px-20
        relative overflow-hidden
      "
      style={{
        backgroundImage: `url(${merchantBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundSize: 'auto',
      }}
    >
      <div className="
        hero-content flex-col lg:flex-row-reverse
        items-center lg:items-center
        gap-8 lg:gap-16
      ">
        <img
          src={tracking}
          alt="Merchant Tracking"
          className="
            w-full max-w-xs
            md:max-w-sm
            rounded-lg shadow-2xl
            mb-8 lg:mb-0
          "
        />
        <div className="text-center lg:text-left text-white">
          <h1 className="
            text-3xl md:text-4xl lg:text-5xl
            font-bold
            mb-4
          ">
            Merchant and Customer Satisfaction is Our First Priority
          </h1>
          <p className="
            text-base md:text-lg lg:text-xl
            py-6
            leading-relaxed
            mb-8
          ">
            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
            <button className="
              btn bg-primary text-black
              rounded-full
              px-8 py-3
              hover:opacity-90 transition-opacity duration-300
              min-w-[180px]
            ">
              Become A Merchant
            </button>
            <button className="
              btn btn-outline border-2 border-primary text-primary
              rounded-full
              px-8 py-3
              hover:bg-primary hover:text-white
              transition-colors duration-300
              min-w-[180px]
            ">
              Become A Merchant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMerchant;
