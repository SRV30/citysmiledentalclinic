import { Link } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";

const Footer = () => {
  const footerStyle = {
    background: "black",
    color: "white",
    textAlign: "center",
    padding: "1rem",
    position: "relative",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    margin: "0 1rem",
  };

  const separatorStyle = {
    color: "white",
    margin: "0 0.5rem",
  };

  useEffect(() => {
    gsap.from(".footer-text", {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".footer-link", {
      opacity: 0,
      x: -20,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".footer-separator", {
      opacity: 0,
      x: 20,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <footer style={footerStyle}>
      <p className="footer-text">
        &copy; {new Date().getFullYear()} City Smile Dental Clinic
      </p>
      <nav>
        <Link to="/about" className="footer-link" style={linkStyle}>
          About
        </Link>
        <span className="footer-separator" style={separatorStyle}>
          |
        </span>
        <Link to="/photo" className="footer-link" style={linkStyle}>
          Photo Library
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
