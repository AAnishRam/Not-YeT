import React from "react";
import FadeInSection from "./FadeInSection";
import AboutUs from "./AboutUs";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Hero from "./Hero";
import Navbar from "./Navbar";
import SignIn from "../SignIn/SignIn";

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <FadeInSection>
          <Hero />
        </FadeInSection>
        <FadeInSection>
          <Services />
        </FadeInSection>
        <FadeInSection>
          <AboutUs />
        </FadeInSection>
        <FadeInSection>
          <Testimonials />
        </FadeInSection>
        <FadeInSection>
          <Contact />
        </FadeInSection>
      </div>
    </div>
  );
};

export default App;
