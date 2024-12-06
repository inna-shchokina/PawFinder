import React from "react";

const GetInTouchSection = () => {
  return (
    <div className="relative flex flex-col-reverse lg:flex-col xl:flex-row xl:justify-between w-full items-center 
    lg:space-y-10 xl:space-y-10 md:space-y-10 sm:space-y-10">
      <div className="text-center xl:text-left xl:w-1/2 xl:pl-56 order-2 lg:order-none">
        <h1 className="text-dark font-poppins font-black text-[30px] sm:text-[40px] lg:text-[50px] xl:mt-10 
        xl:text-[70px] leading-[40px] xl:leading-[80px] whitespace-nowrap lg:whitespace-nowrap xl:whitespace-normal relative 
        ml-0 sm:ml-0 md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-48">
          GET IN TOUCH
          <img
            src="/images/paw_icon_green_main page.png"
            alt="Overlay"
            className="absolute block left-48 -top-10 lg:block xl:block md:-top-14 md:left-64 sm:-top-14 sm:left-64 
            lg:-top-16 lg:left-80 xl:-top-14 xl:left-[200px] sm:w-[50px] md:w-[50px] xl:w-[70px] lg:w-[60px] w-[40px] 
            h-auto pointer-events-none"
          />
        </h1>
      </div>
      <div className="lg:w-1/2 flex justify-center lg:pr-[40px] xl:pr-[140px] order-1 lg:order-none">
        <img
          src="/images/Cat_contact_form.png"
          alt="Cat with mustache"
          className="w-[200px] sm:w-[250px] md:w-[250px] lg:w-[300px] xl:w-[300px] 2xl:mr-36 h-auto"
        />
      </div>
    </div>
  );
};

export default GetInTouchSection;
