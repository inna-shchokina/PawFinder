import { Link } from "react-router-dom";

function Hero({ blur }) {
  return (
    <section
      className={`${blur ? "sectionBlur" : ""} relative heroSection my-[5rem]`}
    >
      <div className="heroSection-text flex flex-col gap-[3rem] w-[10%] -mt-20 mx-auto justify-between items-center">
        <figure>
          <img
            src="/images/paw_icon_red_mainpage.png"
            className="w-[6rem]"
            alt="Cat Paw"
          />
        </figure>
        <h1 className="text-dark text-[7rem] md:text-[9rem] font-black text-center uppercase leading-tight">
          Find Your Friend
        </h1>
        <Link
          to="/pets"
          className="btn bg-[#8D9E29] text-white font-medium  text-[16px] px-[4rem] py-[1rem] w-[20rem] rounded-[5rem] hover:text-green hover:bg-dark text-center"
        >
          Get Started
        </Link>
      </div>
      <div className="gifContainer gifContainer1 w-[11rem] h-[13rem] lg:w-[13rem] lg:h-[15rem] left-[15%] md:left-[25%]  2xl:left-[25%] top-0"></div>
      <div className="gifContainer gifContainer2 w-[11rem] h-[13rem] lg:w-[13rem] lg:h-[15rem] left-[5%] md:left-[15%] 2xl:left-[20%] top-[35%]"></div>
      <div className="gifContainer gifContainer3 w-[11rem] h-[13rem] lg:w-[13rem] lg:h-[15rem] left-[15%] md:left-[25%]  2xl:left-[25%]  bottom-0"></div>
      <div className="gifContainer gifContainer4 w-[11rem] h-[13rem] lg:w-[13rem] lg:h-[15rem] right-[15%] md:right-[25%] 2xl:right-[25%] top-0"></div>
      <div className="gifContainer gifContainer5 w-[11rem] h-[13rem] lg:w-[13rem] lg:h-[15rem] right-[5%] md:right-[15%] 2xl:right-[20%] top-[35%]"></div>
      <div className="gifContainer gifContainer6 w-[11rem] h-[13rem] lg:w-[13rem] lg:h-[15rem] right-[15%] md:right-[25%] 2xl:right-[25%] bottom-0"></div>
    </section>
  );
}

export default Hero;
