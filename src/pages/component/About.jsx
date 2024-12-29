import { getAboutHome } from "@/store/home/about";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gsap } from "gsap";

const HomeAbout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAboutHome());

    gsap.from(".aboutContainer", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".aboutText h4", {
      opacity: 0,
      x: -50,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(".aboutText h3", {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.from(".aboutText p", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
      delay: 0.7,
      ease: "power3.out",
    });

    gsap.from(".aboutImage img", {
      opacity: 0,
      scale: 0.8,
      duration: 1.2,
      delay: 1,
      ease: "back.out(1.7)",
    });

    gsap.from(".aboutButton", {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      delay: 1.2,
      ease: "back.out(1.7)",
    });
  }, [dispatch]);

  const { heading, subheading, description1, description2, imageUrl } =
    useSelector((state) => state.about);

  return (
    <div id="about" className="main2 bg-blue-100 py-8 px-4 aboutContainer">
      <main className="flex-grow container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0 aboutText">
          <h4 className="text-blue-800 text-lg md:text-2xl font-bold">
            {heading}
          </h4>
          <h3 className="text-black italic text-lg">{subheading}</h3>
          <p className="text-black mt-4">{description1}</p>
          <p className="text-black mt-6">{description2}</p>

          <a
            href="/about"
            className="inline-block px-4 py-2 bg-blue-800 text-white rounded-md mt-6 aboutButton"
          >
            Read more about me
          </a>
        </div>
        <div className="md:w-1/3 aboutImage">
          <img src={imageUrl} alt="about" className="w-full h-full" />
        </div>
      </main>
    </div>
  );
};

export default HomeAbout;
