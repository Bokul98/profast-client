// src/sections/CustomerTestimonials.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import TestimonialCard from '../Testimonial/TestimonialCard';
import customer from '../../../assets/customer-top.png'; // adjust this path if needed
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const testimonials = [
  {
    quote: 'Posture Pro has genuinely transformed my daily comfort. My back pain has significantly reduced, and I feel more energetic throughout the day!',
    name: 'Rasel Ahamed',
    title: 'CTO',
    avatarSrc: customer,
  },
  {
    quote: 'The gentle alignment from this product is remarkable. As a designer, I spend hours at my desk, and this has made a huge difference in my posture.',
    name: 'Awlad Hossin',
    title: 'Senior Product Designer',
    avatarSrc: customer,
  },
  {
    quote: 'Absolutely essential for anyone working long hours! My posture has never been better, and I feel a noticeable improvement in my overall well-being.',
    name: 'Nasir Uddin',
    title: 'CEO',
    avatarSrc: customer,
  },
  {
    quote: 'I was skeptical at first, but after a week, the results are undeniable. My shoulder tension is gone, and I can breathe much deeper now.',
    name: 'Fatema Begum',
    title: 'Yoga Instructor',
    avatarSrc: customer,
  },
  {
    quote: 'This product is a game-changer! From delivery speed to product quality, everything exceeded my expectations.',
    name: 'Md. Shahin',
    title: 'Project Manager',
    avatarSrc: customer,
  },
  // Add more as needed...
];

const CustomerTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const scrollToCard = useCallback((index) => {
    if (carouselRef.current && carouselRef.current.children[index]) {
      setCurrentIndex(index);
      const card = carouselRef.current.children[index];
      const carouselWidth = carouselRef.current.offsetWidth;
      const cardWidth = card.offsetWidth;
      const scrollLeft = card.offsetLeft - (carouselWidth / 2) + (cardWidth / 2);
      carouselRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, []);

  const nextSlide = () => {
    const newIndex = Math.min(currentIndex + 1, testimonials.length - 1);
    scrollToCard(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToCard(newIndex);
  };

  useEffect(() => {
    scrollToCard(currentIndex);
  }, [currentIndex, scrollToCard]);

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-12">
          <img src={customer} alt="Customer" className="w-48 h-auto" />
        </div>
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 text-center mb-4">
          What our customers are saying
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 pb-4 no-scrollbar"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
              avatarSrc={testimonial.avatarSrc}
              isActive={index === currentIndex}
            />
          ))}
        </div>

        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiArrowLeft size={24} />
          </button>
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary w-4' : 'bg-gray-400'}`}
              ></button>
            ))}
          </div>
          <button
            onClick={nextSlide}
            disabled={currentIndex === testimonials.length - 1}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-primary text-white hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiArrowRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
