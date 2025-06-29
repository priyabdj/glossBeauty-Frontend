import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  const features = [
    {
      title: "Quality Assurance",
      description:
        "We meticulously select and vet each product to ensure it meets our stringent quality standards.",
    },
    {
      title: "Convenience",
      description:
        "With our user-friendly interface and hassle-free ordering process, shopping has never been easier.",
    },
    {
      title: "Exceptional Customer Service",
      description:
        "Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.",
    },
  ];

  return (
    <div className="text-gray-700 pb-14">
      {/* ABOUT US TITLE */}
      <div className="text-center pt-10 border-t border-gray-200">
        <Title text1="ABOUT" text2="US" />
      </div>

  
      <div className="my-12 px-4 sm:px-8 lg:px-20 flex flex-col lg:flex-row gap-10 items-center">
    
        <div className="w-full lg:w-1/2">
          <img
            src={assets.about2}
            alt="About Gloss Beauty"
            className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-md"
          />
        </div>

  
        <div className="w-full lg:w-1/2 flex flex-col gap-5 text-[15px] text-gray-600 leading-relaxed">
          <p>
            Gloss Beauty was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            At Gloss Beauty, we believe that beauty should be accessible,
            empowering, and rooted in self-care. Our carefully curated collection
            of skincare, haircare, and makeup essentials is designed to celebrate
            every skin type and tone.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to home essentials, we offer an
            extensive collection sourced from trusted brands and suppliers.
          </p>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-1">Our Mission</h3>
            <p>
              Our mission at Gloss Garden is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a seamless
              shopping experience that exceeds expectations — from browsing and
              ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="text-center text-xl pb-4">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      {/* FEATURES BLOCK */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-20 mb-16">
        {features.map((item, index) => (
          <div
            key={index}
            className="border px-6 py-8 rounded-md text-center shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-start min-h-[220px] bg-white"
          >
            <b className="text-lg text-gray-800">{item.title}:</b>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <NewsletterBox />
    </div>
  );
};

export default About;
