import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import ClientSlider from '../ClientSlider/ClientSlider';
import FeatureSection from '../FeatureSection/FeatureSection';
import BeMerchant from '../BeMerchant/BeMerchant';
import HowItWorks from '../HowItWorks/HowItWorks';
import CustomerTestimonials from '../Testimonial/CustomerTestimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <ClientSlider></ClientSlider>
            <FeatureSection></FeatureSection>
            <BeMerchant></BeMerchant>
            <CustomerTestimonials></CustomerTestimonials>
        </div>
    );
};

export default Home;