import React from "react";
import AboutUsSection from "../components/AboutUsSection";
import AboutStatistics from "../components/AboutStatistics";
import AboutMatchingSection from "../components/AboutMatchingSection";
import ScrollAnimation from "react-animate-on-scroll";

const About = () => (
  <div className="min-h-screen flex flex-col justify-between">
    <main>
      <AboutUsSection />

      <AboutStatistics />
      <ScrollAnimation animateIn="fadeIn" duration={3} delay={150}>
        <AboutMatchingSection />
      </ScrollAnimation>
    </main>
  </div>
);
export default About;
