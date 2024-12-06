import { Link } from "react-router-dom";

const AboutUsSection = () => (
  <section
    className="aboutSection  container mx-auto px-[4rem] lg:px-[12rem] flex 
    flex-col justify-center lg:flex-row items-center mt-20 sm:mt-20 lg:mt-40 md:mt-40 xl:mt-40 mb-16 md:mb-40 lg:mb-40 
    xl:mb-40 sm:mb-16 gap-8"
  >
    <div className="flex-1 order-1 md:order-none text-center md:text-left xl:max-w-[450px] 2xl:max-w-[600px]">
      <h1
        className="text-dark font-black font-poppins uppercase leading-[20px] sm:leading-[20px] md:leading-[40px] 
        lg:leading-[50px] xl:leading-[50px] 2xl:leading-[60px] text-[3rem]  md:text-[4rem]  2xl:text-[5rem] mb-8"
      >
        PawFinder - <br /> Your Pet Awaits
      </h1>
      <p
        className="text-dark text-[1.6rem] lg:text-[1.8rem] 
        mb-2 sm:mb-2 md:mb-6 lg:mb-6 xl:mb-6 text-justify"
      >
        Your trusted platform for finding pets across shelters in Germany.
        Browse animals from various shelters, explore detailed profiles, and let
        our AI match you with the perfect companion. With PawFinder, you can
        easily apply for adoption and connect with shelters to give a pet a
        loving home!
      </p>
    </div>

    <div className="order-2 md:order-none">
      <Link to="/pets?type=dog" className="w-[fit-content]">
        <img
          src="/images/dog_pic_about_us.png"
          alt="Dog"
          className="w-[45rem] h-auto transform rotate-0 md:rotate-6 lg:rotate-6 xl:rotate-6  sm:ml-56"
        />
      </Link>
    </div>
  </section>
);

export default AboutUsSection;
