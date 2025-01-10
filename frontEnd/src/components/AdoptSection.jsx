function AdoptSection() {
  return (
    <section className="mt-[20rem]">
<div className="flex flex-col items-center gap-[1rem] lg:flex-row w-full lg:w-[80%] xl:w-[70%] 2xl:w-[70%] max-w-[105rem] mx-auto justify-between">
<div className=" relative">
          <h2 className="text-[8rem] lg:text-[9rem] font-black uppercase leading-tight">
            How
            <br /> To
            <br /> Adopt
          </h2>
          <figure className="absolute  bottom-0 left-[30rem] xl:bottom-[5rem] xl:right-[-5rem] w-[9rem]">
            <img src="/images/paw_icon_red_mainpage.png" alt="Green Paw" />
          </figure>
        </div>
        <div className="w-[45rem] flex flex-col gap-[3rem]">
          <div className="bg-light py-[2rem] px-[2rem] flex items-center gap-[2rem] rounded-[1rem]">
            <figure className="w-[10rem]">
              <img src="/images/Check_circle_main page_green.png" alt="check" />
            </figure>
            <p className="text-[1.6rem]">
            Sign in to your account and complete a detailed questionnaire to help us match you with the right companion.
            </p>
          </div>
          <div className="bg-light py-[2rem] px-[2rem] flex items-center gap-[2rem] rounded-[1rem]">
            <figure className="w-[10rem]">
              <img src="/images/Check_circle_main page_green.png" alt="check" />
            </figure>
            <p className="text-[1.6rem]">
            Find your perfect pet by reviewing profiles with photos, traits, and AI-powered compatibility recommendations.
            </p>
          </div>
          <div className="bg-light py-[2rem] px-[2rem] flex items-center gap-[2rem] rounded-[1rem]">
            <figure className="w-[10rem]">
              <img src="/images/Check_circle_main page_green.png" alt="check" />
            </figure>
            <p className="text-[1.6rem]">
            Submit your adoption application on this site and wait to be contacted by the shelter for further steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdoptSection;
