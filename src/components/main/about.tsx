import { motion, AnimatePresence } from "framer-motion";
import Script from "next/script";
import { useState } from "react";

const About = ({ gradient }: { gradient: string }) => {
    const [activeSection, setActiveSection] = useState<string | null>("shortDesc");

    const handleCardClick = (section: string) => {
      setActiveSection(section);

      let text;
      let text2: string = '';
      if(section == 'shortDesc'){
        text = "Here are my short description!"
        text2 = "Is not too long right!? 😤"
      } else if(section == 'skills'){
        text = "These are the skills i have"
        text2 = "Not that many though...😪"
      } else if(section == 'certificates'){
        text = "Here you go, my list of certificates!"
        text2 = "Is it nice to look at? Hm... 🤔"
      }

      document.dispatchEvent(
        new CustomEvent("setSpeechText", {
          detail: {
            text: text,
            text2, 
          },
        })
      );
    };

    
  return (
   <>
    <div className="flex flex-col gap-2 text-center justify-center">
            <div data-tilt data-tilt-glare  className="w-[276px] h-[276px] rounded-full items-center justify-center flex" style={{ background: gradient }}>
                <img src="/etc/profile.jpeg" className="z-10 object-cover w-[270px] h-[270px] rounded-full"/>
            </div>
            <h1 className="text-3xl font-bold">Stiven</h1>
            <p className="text-lg font-bold">Full Stack Developer</p>
            <p className="text-base">Multimedia Nusantara University</p>
    </div>
    <div className="gap-5 flex flex-col">
        <CustomCard text="Short Desc" gradient={gradient} onClick={() => handleCardClick("shortDesc")} isActive={activeSection === "shortDesc"} />
        <CustomCard text="Skills" gradient={gradient} onClick={() => handleCardClick("skills")} isActive={activeSection === "skills"}/>
        <CustomCard text="Certificates" gradient={gradient} onClick={() => handleCardClick("certificates")} isActive={activeSection === "certificates"}/>
    </div>

    <AnimatePresence mode="wait">

    {activeSection === "shortDesc" && (
        <motion.div
            key="shortDesc"
            className="max-w-[600px] flex-shrink-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <p className="text-justify">
                I am a Full Stack Developer with 2 years+ of experience, I have developed web apps using React, Node.js, PostgreSQL, Tailwind, MaterialUI, and Spring,
                with proficient knowledge of Lifecycle Hooks, State Management, Components, Composables, TDD, REST, etc.
                I prefer the frontend field over backend, but I am capable of working on both.
                My current goal is to become a proficient Three.js developer.
                However, I am always open to new opportunities and challenges.
            </p>
        </motion.div>
    )}

    {activeSection === "skills" && (
        <motion.div
            key="skills"
            className="flex flex-col gap-8 w-full justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <div className="flex flex-row gap-8">
              <div className="flex flex-row gap-8">
                <SkillIcon src="/skill/tailwind.svg" title="Tailwind" text="Intermediate" />
                <SkillIcon src="/skill/spring.svg" title="Spring Boot" text="Intermediate"/>
                <SkillIcon src="/skill/react.svg" title="React" text="Intermediate"/>
              </div>

            </div>
            <div className="flex flex-row gap-8">
                <SkillIcon src="/skill/django.svg" title="Django" text="Beginner" />
                <SkillIcon src="/skill/postgresql.svg" title="Postgresql" text="Intermediate" />
                <SkillIcon src="/skill/mui.svg" title="MaterialUI" text="Intermediate" />
            </div>
            <div className="flex flex-row gap-8">
                <SkillIcon src="/skill/java.svg" title="Java" text="Intermediate" />
                <SkillIcon src="/skill/js.svg" title="Javascript" text="Intermediate" />
                <SkillIcon src="/skill/ts.svg" title="Typescript" text="Intermediate" />
            </div>
            <div className="flex flex-row gap-8">
                <SkillIcon src="/skill/css.svg" title="CSS" text="Intermediate" />
                <SkillIcon src="/skill/html.svg" title="HTML" text="Intermediate" />
                <SkillIcon src="/skill/node.svg" title="Node.js" text="Beginner" />
            </div>
            <div className="flex flex-row gap-8">
                <SkillIcon src="/skill/three.svg" title="Three.js" text="Beginner" />
            </div>
        </motion.div>
    )}

    {activeSection === "certificates" && (
        <CertificateSection gradient={gradient} />
    )}

    </AnimatePresence>

    <Script type="module" src="/etc/vanila-tilt.js" strategy="lazyOnload" />
   </>
  );
};

export default About;


interface CustomCard {
    text: string;
    gradient: string;
    onClick: () => void;
    isActive: boolean;
}
  
const CustomCard: React.FC<CustomCard> = ({ text, gradient, onClick, isActive }) => {

    return (
        <div
            data-tilt
            data-tilt-glare
            className="rounded-xl flex flex-row justify-center items-center mx-3"
            style={{ background: isActive ? gradient : "" }} 

            onClick={onClick} 
        >
        <div className="bg-neutral-700 m-[2px] p-2 pl-4 pr-12 flex flex-row items-center gap-2 cursor-customPointer rounded-xl min-w-[175px] relative">
            <p className="w-full text-xl">{text}</p>
            <div
                className="absolute w-[3px] h-[15px] rounded-lg rotate-[135deg] right-5 top-[25%]"
                style={{ background: gradient }}
            />
            <div
                className="absolute w-[3px] h-[15px] rounded-lg rotate-[45deg] right-5 top-[45%]"
                style={{ background: gradient }}
            />
        </div>
        </div>
    );
};

const CertificateCard = ({
    idTitle,
    enTitle,
    link,
    platform,
    gradient,
  }: {
    idTitle: string;
    enTitle: string;
    link: string;
    platform: string;
    gradient: string;
  }) => {
    return (
      <div
        data-tilt
        data-tilt-glare
        className="min-w-[625px] h-[85px] p-1 rounded-lg flex items-center justify-center"
        style={{ background: gradient }}
      >
        <div className="min-w-[620px] h-[80px] bg-neutral-700 rounded-lg group [perspective:1000px]">
          <div className="h-full w-full p-2 shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0 h-full w-full rounded-xl text-center text-slate-200 [backface-visibility:hidden]">
              <div className="flex min-h-full flex-col items-center justify-center">
                <p className="text-wrap text-[15px] font-bold text-center">{idTitle}</p>
                <p className="text-wrap text-[15px] font-bold text-center">{enTitle}</p>
              </div>
            </div>
            <div className="absolute inset-0 h-full w-full rounded-xl bg-black/50 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <div className="flex min-h-full flex-col items-center justify-center">
                <h1 className="text-[22px] font-bold">{platform}</h1>
                <button
                  className="mt-1 cursor-pointer rounded-md bg-neutral-700 px-2 hover:bg-neutral-900"
                  onClick={() => window.open(link, "_blank")}
                >
                  Open Credential
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
  

const certificates = [
  {
    idTitle: "Pemrograman dengan JavaScript Oleh Meta (ID Title)",
    enTitle: "Programming with JavaScript By Meta (EN Title)",
    link: "https://www.coursera.org/account/accomplishments/verify/67LJ9BRY56A4",
    platform: "Coursera",
  },
  {
    idTitle: "Administrasi Sistem dan Layanan Infrastruktur TI Oleh Google (ID Title)",
    enTitle: "System Administration and IT Infrastructure Services By Google (EN Title)",
    link: "https://www.coursera.org/account/accomplishments/verify/KC32MBACP3HV",
    platform: "Coursera",
  },
  {
    idTitle: "Belajar Dasar Git dengan GitHub (ID Title)",
    enTitle: "Learn Git Basics with GitHub (EN Title)",
    link: "https://www.dicoding.com/certificates/GRX52GDQ3X0M",
    platform: "Dicoding Indonesia",
  },
  {
    idTitle: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software (ID Title)",
    enTitle: "Getting Started with Programming Basics to Become a Software Developer (EN Title)",
    link: "https://www.dicoding.com/certificates/QLZ9QJ267Z5D",
    platform: "Dicoding Indonesia",
  },
  {
    idTitle: "Pengenalan ke Logika Pemrograman (Programming Logic 101) (ID Title)",
    enTitle: "Introduction to Programming Logic (Programming Logic 101) (EN Title)",
    link: "https://www.dicoding.com/certificates/07Z68L04YXQR",
    platform: "Dicoding Indonesia",
  },
];

const CertificateSection = ({ gradient } : { gradient: string;}) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(certificates.length / itemsPerPage);
  const currentPage = startIndex / itemsPerPage;

  const handleNext = () => {
    if (startIndex + itemsPerPage < certificates.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handleBack = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  return (
    <motion.div
      key="certificates"
      className="flex flex-col gap-4 min-h-[550px] max-w-[640px] px-2 items-center justify-center overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {certificates.slice(startIndex, startIndex + itemsPerPage).map((cert, index) => (
        <CertificateCard key={index} {...cert} gradient={gradient} />
      ))}

      <div className="flex justify-between w-full mt-4">
      <button
        className={`px-4 py-2 bg-gray-600 rounded-md text-white disabled:opacity-50 ${currentPage === 0 ? 'pointer-events-none' : 'cursor-customPointer'}`}
        onClick={handleBack}
        disabled={currentPage === 0}
      >
        Back
      </button>
      <button
        className={`px-4 py-2 bg-gray-600 rounded-md text-white disabled:opacity-50 ${currentPage + 1 >= totalPages ? 'pointer-events-none' : 'cursor-customPointer'}`}
        onClick={handleNext}
        disabled={currentPage + 1 >= totalPages}
      >
        Next
      </button>

      </div>
    </motion.div>
  );
};

const SkillIcon = ({ title, text, src }: { title: string, text: string; src: string }) => {
  return (
    <div className="relative group">
      <img src={src} className="z-10 h-[40px] flying-wave" alt={text} />
      <span className="font-teko absolute z-20  bg-neutral-800 flex flex-col items-center justify-center  rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[18px] tracking-[2px]">{title}</p>
        <p className="text-[16px] tracking-[2px]">{text}</p>
      </span>
    </div>
  );
};

