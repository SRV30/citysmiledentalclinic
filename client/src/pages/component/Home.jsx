import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Logo from "./Logo";
import MetaData from "../layout/MetaData";
import HomeAbout from "./About";
import ViewService from "./Service";
import HomeContact from "./Contact";
import GetInTouch from "./GetInTouch";
import { gsap } from "gsap";

const HomePage = ({ scrollToSection }) => {
  const { sectionId } = useParams();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (scrollToSection || sectionId) {
      const targetSection = document.getElementById(
        scrollToSection || sectionId
      );
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    }

    gsap.from(".home-section", {
      opacity: 0,
      y: 50,
      stagger: 0.5,
      duration: 1,
      ease: "power3.out",
    });

    setLoaded(true);
  }, [scrollToSection, sectionId]);

  return (
    <>
      <MetaData title="Home | City Smile Dental Clinic" />
      <div id="home" className="min-h-screen flex flex-col">
        <Logo />

        <section id="about" className="home-section">
          <HomeAbout />
        </section>

        <section id="services" className="home-section">
          <ViewService />
        </section>

        <section id="contact" className="home-section">
          <HomeContact />
          <GetInTouch />
        </section>
      </div>
    </>
  );
};

HomePage.propTypes = {
  scrollToSection: PropTypes.string,
};

export default HomePage;
