import React from "react";

const GetInTouchSection = () => {
  return (
    <div className="relative flex flex-col-reverse lg:flex-col xl:flex-row xl:justify-between w-full items-center lg:space-y-20 md:space-y-10 sm:space-y-10">
      <div className="text-center xl:text-left xl:w-1/2 xl:pl-56 order-2 lg:order-none">
        <h1 className="text-dark font-poppins font-black text-[30px] sm:text-[40px] lg:text-[60px] xl:mt-36 xl:text-[70px] 
        leading-[40px] xl:leading-[80px] whitespace-nowrap lg:whitespace-nowrap xl:whitespace-normal relative">
          GET IN TOUCH
          <img
            src="/images/paw_icon_green_main page.png"
            alt="Overlay"
            className="absolute hidden xl:block lg:-top-8 xl:-top-14 left-80 w-[70px] h-auto pointer-events-none"
          />
        </h1>
      </div>
      <div className="lg:w-1/2 flex justify-center lg:pr-[40px] xl:pr-[140px] order-1 lg:order-none">
        <img
          src="/images/Cat_contact_form.png"
          alt="Cat with mustache"
          className="w-[200px] sm:w-[250px] md:w-[250px] lg:w-[300px] xl:w-[300px] h-auto"
        />
      </div>
    </div>
  );
};

export default GetInTouchSection;
