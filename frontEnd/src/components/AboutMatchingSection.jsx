import React from "react";
import { Link } from "react-router-dom";

const AboutMatchingSection = () => (
  <section
    className="container mx-auto px-[4rem] lg:px-[12rem] flex 
    flex-col md:flex-row items-center mt-20 md:mt-40 lg:mt-40 xl:mt-40 sm:mt-20 mb-20 sm:mb-20 md:mb-44 
    lg:mb-44 xl:mb-44 gap-8"
  >
    <div className="flex-1 order-1 sm:order-1 md:order-2 text-center sm:text-center md:text-right xl:max-w-[450px] 2xl:max-w-[600px]">
      <h2
        className="text-dark font-black font-poppins uppercase leading-[20px] sm:leading-[20px] 
        md:leading-[40px] lg:leading-[50px] xl:leading-[50px] 2xl:leading-[60px] 
        text-[3rem]  md:text-[4rem]  2xl:text-[5rem] mb-8 text-left"
      >
        MATCHING SYSTEM
        <br /> FINDS your PET
      </h2>
      <p
        className="text-dark text-[1.6rem] lg:text-[1.8rem] 
      mb-2 sm:mb-2 md:mb-6 lg:mb-6 xl:mb-6 text-justify"
      >
        Our advanced matching system helps you find the ideal pet quickly and
        effortlessly. By analyzing your preferences and responses, we use
        technology to match you with pets whose needs and traits align with
        yours. With detailed shelter data, our system fosters meaningful
        connections, giving you and your future pet the best chance at a happy
        life!
      </p>
    </div>

    <div className="flex-1 flex justify-center order-2 sm:order-2 md:order-1">
      <Link to="/pets?type=cat">
        <img
          src="/images/cat_pic_about_us.png"
          alt="Cat"
          className="w-[400px] md:w-[400px] lg:w-[400px] xl:w-[430px] 2xl:w-[450px] h-auto transform rotate-0 md:-rotate-6 lg:-rotate-6 xl:-rotate-6 mr-56"
        />
      </Link>
    </div>
  </section>
);

export default AboutMatchingSection;
