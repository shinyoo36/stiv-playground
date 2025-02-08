import { useState, useEffect, useRef } from "react";
import Header from "@/components/main/header";
import Footer from "@/components/main/footer";
import MouseTrail from "@/components/main/mouse";
import XShape from "@/components/main/xShape";
import Tes from "@/components/main/tes";
import Foto from "@/components/main/foto";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import About from "@/components/main/about";
import Contact from "@/components/main/contact";


export default function Home() {
  const baseColors = [
    "#ff0000", "#fd0071", "#e700b0", "#c03adb", "#8b6de7",
    "#4490d7", "#00a5c6", "#00b7bb", "#00c6a7", "#00d189",
    "#00d562", "#30d128"
  ];

  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);

  const [gradientRotate, setGradientRotate] = useState("");
  const [gradient, setGradient] = useState("");
  const [activeSection, setActiveSection] = useState("home"); 
  const [fadeOut, setFadeOut] = useState(false);
  const [homeSectionVisible, setHomeSectionVisible] = useState(true); 
  const [aboutSectionVisible, setAboutSectionVisible] = useState(false);
  const [contactSectionVisible, setContactSectionVisible] = useState(false);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!loading && firstLoad) {
      setTimeout(() => {

        document.dispatchEvent(
          new CustomEvent("setSpeechText", {
            detail: {
              text: "Welcome!",
              text2: "What would you like to see?",
            },
          })
        );
      }, 500);
      setFirstLoad(false);
    }
  }, [loading, firstLoad]);

  useEffect(() => {
    if (!loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log("Observed:", entry.target.id, "Is Visible:", entry.isIntersecting);
  
            if (entry.target.id === "about") {
              setAboutSectionVisible(entry.isIntersecting);
            } else if (entry.target.id === "contact") {
              setContactSectionVisible(entry.isIntersecting);
            }
          });
        },
        { threshold: 0.1 }
      );
  
      if (aboutRef.current) observer.observe(aboutRef.current);
      if (contactRef.current) observer.observe(contactRef.current);
  
      return () => {
        if (aboutRef.current) observer.unobserve(aboutRef.current);
        if (contactRef.current) observer.unobserve(contactRef.current);
      };
    }
  }, [loading]);
  
  
  useEffect(() => {
  if (!loading) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log("Observed:", entry.target.id, "Is Visible:", entry.isIntersecting);

          if (entry.isIntersecting) {
            switch (entry.target.id) {
              case "home":
                setActiveSection("home");
                setHomeSectionVisible(true);
                document.dispatchEvent(
                  new CustomEvent("setSpeechText", {
                    detail: {
                      text: "Welcome!",
                      text2: "What Would you like to see?",
                    },
                  })
                );
                break;

              case "about":
                setActiveSection("about");
                setAboutSectionVisible(true);
                document.dispatchEvent(
                  new CustomEvent("setSpeechText", {
                    detail: {
                      text: "Let's move on to about me section!",
                      text2: "There are only 6 things here at the moment... 🫠",
                    },
                  })
                );
                break;

              case "contact":
                setActiveSection("contact");
                setContactSectionVisible(true);
                document.dispatchEvent(
                  new CustomEvent("setSpeechText", {
                    detail: {
                      text: "Let's see how to contact me!",
                      text2: "I hope we can make great things together! 😀",
                    },
                  })
                );
                break;
            }
          } else {
            if (entry.target.id === "home") {
              setHomeSectionVisible(false);
            } else if (entry.target.id === "about") {
              setAboutSectionVisible(false);
            } else if (entry.target.id === "contact") {
              setContactSectionVisible(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (homeRef.current) observer.observe(homeRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => {
      if (homeRef.current) observer.unobserve(homeRef.current);
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }
}, [loading]);


  const handleScrollToHome = () => {
    setFadeOut(true);
    setTimeout(() => {
      const homeSection = document.getElementById("home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth" });
      }
      
      setFadeOut(false);
    }, 500);

    setActiveSection("home");
  };

  const handleScrollToAbout = () => {
    setFadeOut(true);
    setTimeout(() => {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
      
      setFadeOut(false);
    }, 500);

    setActiveSection("about");
  };

  const handleScrollToContact = () => {
    setFadeOut(true);
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
      setFadeOut(false);
    }, 500);

    setActiveSection("contact");
  };

  useEffect(() => {
    let currentIndex = 0;
    let forward = true;

    const colorInterval = setInterval(() => {
      const nextIndex = forward ? currentIndex + 1 : currentIndex - 1;
      const nextColor = `${baseColors[currentIndex]}, ${baseColors[nextIndex]}`;

      setGradientRotate(`conic-gradient(${nextColor} 30deg, transparent 110deg)`);
      setGradient(`linear-gradient(95deg, ${nextColor})`);
      
      document.dispatchEvent(
        new CustomEvent("setGradient", {
          detail: {
            previousColor: baseColors[currentIndex],
            newColor: baseColors[nextIndex], 
          },
        })
      );

      if (nextIndex === baseColors.length - 1) forward = false;
      if (nextIndex === 0) forward = true;

      currentIndex = nextIndex;
    }, 500);

    return () => clearInterval(colorInterval);
  }, []);

  return (
    
    <div className="flex flex-col justify-between min-h-screen max-w-[1080px] px-2 md:px-8 mx-auto">
      {loading ? (
      <LoadingScreen/>
      ) : (
        <>
        <Header 
          activeSection={activeSection} 
          gradient={gradient} 
          handleScrollToHome={handleScrollToHome} 
          handleScrollToAbout={handleScrollToAbout} 
          handleScrollToContact={handleScrollToContact}
        />
        <div className="h-[80vh] overflow-auto scroll-smooth snap-y snap-mandatory">
          <AnimatePresence mode="sync">
            <motion.div
              key="home"
              id="home"
              ref={homeRef} 
              className="section h-[80vh]  w-full justify-center items-center flex snap-start relative" 
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: homeSectionVisible ? 1 : 0,
                y: homeSectionVisible ? 0 : 20, 
              }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="absolute top-10 left-5">
                <XShape gradient={gradient} yValue={100} />
              </div>
              <Foto gradient={gradientRotate} fadeOut={fadeOut} handleScrollToAbout={handleScrollToAbout} />
              <div className="absolute bottom-10 right-[-32px]">
                <XShape gradient={gradient} yValue={-100} />
              </div>
            </motion.div>

            <motion.div
              key="about"
              id="about"
              ref={aboutRef} 
              className="section h-[80vh] w-full snap-start"
              initial={{ opacity: 0, visibility: 'hidden', y: 15 }}
              animate={{
                opacity: aboutSectionVisible ? 1 : 0, 
                visibility: aboutSectionVisible ? 'visible' : 'hidden',
                y: aboutSectionVisible ? 0 : -15,
              }}
              exit={{ opacity: 0, visibility: 'hidden', y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <About gradient={gradient} />
            </motion.div>

            <motion.div
              key="contact"
              id="contact"
              ref={contactRef} 
              className="section h-[80vh] w-full snap-start"
              initial={{ opacity: 0, visibility: 'hidden', y: 15 }}
              animate={{
                opacity: contactSectionVisible ? 1 : 0, 
                visibility: contactSectionVisible ? 'visible' : 'hidden',
                y: contactSectionVisible ? 0 : -15,
              }}
              exit={{ opacity: 0, visibility: 'hidden', y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Contact/>
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer/>
        </>
      )}
      <MouseTrail gradient={gradient} />


      <Script
        id="delayed-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            setTimeout(() => {
              const script = document.createElement('script');
              script.type = 'module';
              script.src = '/etc/app.js';
              document.body.appendChild(script);
            }, 3000);
          `,
        }}
      />

      <div id="container3D">
      </div> 
    </div>

    

  );
  
}

const LoadingScreen = () => {
  const text = "Loading...";
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // Function to detect device type
  const detectDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(userAgent)) {
      setDeviceType("mobile");
    } else if (/ipad|tablet|kindle|playbook/i.test(userAgent) || (navigator.maxTouchPoints > 1 && window.innerWidth <= 1024)) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }
  };

  useEffect(() => {
    detectDevice();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prev) => (index < text.length ? text.slice(0, index + 1) : ""));
      setIndex((prev) => (prev < text.length ? prev + 1 : 0));
    }, 200);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="h-[100vh] flex items-center justify-center text-white text-2xl"
    >
      <div>
        <p>{displayText}</p>
      </div>

      {/* Show mobile/tablet warning if detected */}
      {(deviceType === "mobile" || deviceType === "tablet") && (
        <div className="w-full absolute bottom-12 left-1/2 transform -translate-x-1/2 text-xl">
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">It seems you're using a {deviceType} device</p>
            <p className="text-[16px]">Please use a PC or laptop for the full experience!</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};