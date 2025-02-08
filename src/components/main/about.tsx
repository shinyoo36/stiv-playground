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
      } else if(section == 'work'){
        text = "Here you go, my work experiences!"
        text2 = "Not that many though...😪"
      } else if(section == 'project'){
        text = "Here’s the project I worked on."
        text2 = "Not that many though...😪"
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
   <div className="flex flex-col justify-center items-center">
    <div className="flex flex-col gap-2 text-center justify-center">

    </div>
    <div className="grid gap-2 mb-[20px] grid-cols-2 sm:grid-cols-3">
        <CustomCard text="Short Desc" gradient={gradient} onClick={() => handleCardClick("shortDesc")} isActive={activeSection === "shortDesc"} />
        <CustomCard text="Skills" gradient={gradient} onClick={() => handleCardClick("skills")} isActive={activeSection === "skills"}/>
        <CustomCard text="Certificates" gradient={gradient} onClick={() => handleCardClick("certificates")} isActive={activeSection === "certificates"}/>
        <CustomCard text="Work Experiences" gradient={gradient} onClick={() => handleCardClick("work")} isActive={activeSection === "work"}/>
        <CustomCard text="Project" gradient={gradient} onClick={() => handleCardClick("project")} isActive={activeSection === "project"}/>
        <CustomCard text="Resume" gradient={gradient} onClick={() => window.open("https://drive.google.com/file/d/1DeCPiktq-s6-Hpd5jXA4HeML_O3yjwnA/view?usp=sharing", "_blank")} isActive={activeSection === "resume"}/>
    </div>

    <AnimatePresence mode="wait">

    {activeSection === "shortDesc" && (
        <motion.div
            key="shortDesc"
            className="max-w-[600px]  space-y-4 py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="flex flex-row gap-8 items-center justify-center">
            <div data-tilt data-tilt-glare className="w-[156px] h-[156px] md:w-[216px] md:h-[216px] lg:w-[246px] lg:h-[246px] rounded-full items-center justify-center flex" style={{ background: gradient }}>
                  <img src="/etc/profile.jpeg" className="z-10 object-cover w-[150px] h-[150px] md:w-[210px] md:h-[210px] lg:w-[240px] lg:h-[240px] rounded-full"/>
              </div>
            <div>
            <h1 className="text-3xl font-bold">Stiven</h1>
              <p className="text-lg font-bold">Full Stack Developer</p>
              <p className="text-base">Multimedia Nusantara University</p>
            </div>
          </div>
          <div className="flex p-[2px] rounded-sm max-w-[475px] lg:max-w-[600px]"  style={{ background: gradient }}>
            <p className="text-justify p-3 text-[14px] md:text-[16px] rounded-sm  bg-neutral-800">
                  I am a Full Stack Developer with 2 years+ of experience, I have developed web apps using React, Next.js, PostgreSQL, Tailwind, MaterialUI, and Spring,
                  with proficient knowledge of Lifecycle Hooks, State Management, Components, Composables, TDD, REST, etc.
                  I prefer the frontend field over backend, but I am capable of working on both.
                  My current goal is to become a proficient Three.js developer.
                  However, I am always open to new opportunities and challenges.
              </p>
          </div>

        </motion.div>
    )}

    {activeSection === "skills" && (
        <motion.div
            key="skills"
            className="flex flex-col gap-8  h-full justify-center py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8 justify-center items-center">
            {skillList.map((skill, index) => (
              <SkillIcon 
                key={index} 
                src={skill.src} 
                title={skill.title} 
                text={skill.text} 
                gradient={gradient} 
              />
            ))}
          </div>

        </motion.div>
    )}

    {activeSection === "certificates" && (
        <CertificateSection gradient={gradient} />
    )}

    {activeSection === "work" && (
        <motion.div
            key="work"
            className="flex flex-col gap-8 w-full justify-center items-center  py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <Work gradient={gradient} />
        </motion.div>
    )}

    {activeSection === "project" && (
        <motion.div
            key="project "
            className=" w-full flex items-center justify-center  py-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <Project gradient={gradient} />
        </motion.div>
    )}

    </AnimatePresence>

    <Script type="module" src="/etc/vanila-tilt.js" strategy="lazyOnload" />
   </div>
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
            className="rounded-xl flex flex-row "
            style={{ background: isActive ? gradient : "" }} 
            onClick={onClick} 
        >
        <div className="bg-neutral-700  w-full m-[2px] py-1 pl-2 pr-10  cursor-customPointer rounded-xl relative " >
            <div className="flex justify-center items-center h-full">
              <p className="text-[14px] w-full">{text}</p>
            </div>
            <div
                className="absolute w-[3px] h-[15px] rounded-lg -rotate-[43.5deg] right-[20px] top-[25%]"
                style={{ background: gradient }}
            />
           <div
                className="absolute w-[3px] h-[15px] rounded-lg rotate-[43.5deg] right-[10px] top-[25%]"
                style={{ background: gradient }}
            />
        </div>
        </div>
    );
};

const CertificateCard = ({
    title,
    link,
    platform,
    gradient,
  }: {
    title: string;
    link: string;
    platform: string;
    gradient: string;
  }) => {
    return (
      <div
        data-tilt
        data-tilt-glare
        className="p-[2px] rounded-lg flex h-full max-h-[90px] w-full items-center justify-center"
        style={{ background: gradient }}
      >
        <div className="p-2  max-w-[475px] sm:max-w-[600px] w-full  bg-neutral-700 rounded-lg ">
              <div className="gap-8 flex flex-row justify-between">
                <div>
                  <p className="text-wrap text-[14px] font-bold ">{title}</p>
                  <h1 className="text-[13px] font-semibold ">{platform}</h1>
                </div>
                <img 
                  src="/icon/certificate.svg" 
                  onClick={() => window.open(link, "_blank")}
                  className="w-[30px] h-[30px] cursor-customPointer"
                  alt="Preview"
                />
              </div>
            
        </div>
      </div>
    );
};
  

const certificates = [
  {
    title: "Programming with JavaScript by Meta",
    link: "https://www.coursera.org/account/accomplishments/verify/67LJ9BRY56A4",
    platform: "Coursera - Meta",
  },
  {
    title: "System Administration and IT Infrastructure Services by Google",
    link: "https://www.coursera.org/account/accomplishments/verify/KC32MBACP3HV",
    platform: "Coursera - Google",
  },
  {
    title: "Learn Git Basics with GitHub",
    link: "https://www.dicoding.com/certificates/GRX52GDQ3X0M",
    platform: "Dicoding Indonesia",
  },
  {
    title: "Getting Started with Programming Basics to Become a Software Developer",
    link: "https://www.dicoding.com/certificates/QLZ9QJ267Z5D",
    platform: "Dicoding Indonesia",
  },
  {
    title: "Introduction to Programming Logic (Programming Logic 101)",
    link: "https://www.dicoding.com/certificates/07Z68L04YXQR",
    platform: "Dicoding Indonesia",
  },
];

const CertificateSection = ({ gradient } : { gradient: string;}) => {

  return (
    <motion.div
      key="certificates"
      className="flex flex-row justify-center gap-3  py-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="flex flex-col gap-3">
        {certificates.map((cert, index) => (
          <CertificateCard key={index} {...cert} gradient={gradient} />
        ))}
      </div>
    </motion.div>
  );
};


const skillList = [
    { src: "/skill/tailwind.svg", title: "Tailwind", text: "Intermediate" },
    { src: "/skill/spring.svg", title: "Spring Boot", text: "Intermediate" },
    { src: "/skill/react.svg", title: "React", text: "Intermediate" },
    { src: "/skill/django.svg", title: "Django", text: "Beginner" },
    { src: "/skill/postgresql.svg", title: "Postgresql", text: "Intermediate" },
    { src: "/skill/mui.svg", title: "MaterialUI", text: "Intermediate" },
    { src: "/skill/java.svg", title: "Java", text: "Intermediate" },
    { src: "/skill/js.svg", title: "Javascript", text: "Intermediate" },
    { src: "/skill/ts.svg", title: "Typescript", text: "Intermediate" },
    { src: "/skill/css.svg", title: "CSS", text: "Intermediate" },
    { src: "/skill/html.svg", title: "HTML", text: "Intermediate" },
    { src: "/skill/three.svg", title: "Three.js", text: "Beginner" },
];

const SkillIcon = ({ title, text, src, gradient }: { title: string, text: string; src: string, gradient: string }) => {
  return (
    
    <div className="flex gap-2 rounded-lg min-w-[175px]" style={{ background: gradient }}>
      <div className="flex bg-neutral-700 m-[2.5px] p-1 justify-between w-full rounded-lg">
        <img src={src} className="z-10 h-[40px]" alt={text} />
        <div className="flex flex-col justify-center items-end">
            <p className="text-[14px] tracking-[2px] font-bold">{title}</p>
            <p className="text-[12px] tracking-[2px]">{text}</p>
        </div> 
      </div>
    </div>
  );
};

const Work = ({
  gradient,
}: {
  gradient: string;
}) => {
  return (
    <div
      data-tilt
      data-tilt-glare
      className="p-[3px] rounded-lg flex items-center justify-center"
      style={{ background: gradient }}
    >
      <div className=" h-full p-2 space-y-3 bg-neutral-700 rounded-lg ">
        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-row gap-3 ">
            <div className="flex flex-col justify-end items-center">
              <div className="w-[15px] h-[15px] rounded-full" style={{ background: gradient }}></div>
              <div className="w-[3px] h-[40px] rotate-60 mt-[-1px] mb-[-13px]" style={{ background: gradient }}></div>
            </div>
            <div className="flex flex-col">
              <p className="text-wrap text-[14] font-semibold">Cranium</p>
              <p className="text-wrap text-[12px] font-thin">Full Stack Developer</p>
              <div className="flex flex-row gap-2 pt-1">
                <div className="rounded-lg " style={{ background: gradient }}>
                  <div className="bg-slate-800 rounded-lg m-[1px] px-2"><p className="text-[10px] md:text-[12px]">React</p></div>
                </div>
                <div className="rounded-lg " style={{ background: gradient }}>
                  <div className="bg-slate-800 rounded-lg m-[1px] px-2"><p className="text-[10px] md:text-[12px]">Typescript</p></div>
                </div>
                <div className="rounded-lg " style={{ background: gradient }}>
                  <div className="bg-slate-800 rounded-lg m-[1px] px-2"><p className="text-[10px] md:text-[12px]">Spring Boot</p></div>
                </div>
                <div className="rounded-lg " style={{ background: gradient }}>
                  <div className="bg-slate-800 rounded-lg m-[1px] px-2"><p className="text-[10px] md:text-[12px]">Next.js</p></div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-wrap text-[12px] md:text-[14px]">Jan 2023 - Present</p>
        </div>


        <div className="flex flex-row justify-between items-center ">
          <div className="flex flex-row gap-3">
            <div className="flex flex-col justify-center items-center">
              <div className="w-[3px] h-[28px] rotate-60 mt-[-25px]" style={{ background: gradient }}></div>
              <div className="w-[15px] h-[15px] rounded-full" style={{ background: gradient }}></div>
            </div>
            <div className="flex flex-col">
              <p className="text-wrap text-[14px] font-semibold">PT. Multimedia Digital Nusantara</p>
              <p className="text-wrap text-[12px] font-thin">Web Developer Intern</p>
              <div className="flex flex-row gap-2 pt-1">
                <div className="rounded-lg " style={{ background: gradient }}>
                  <div className="bg-slate-800 rounded-lg m-[1px] px-2"><p className="text-[10px] md:text-[12px]">Django</p></div>
                </div>
                <div className="rounded-lg " style={{ background: gradient }}>
                  <div className="bg-slate-800 rounded-lg m-[1px] px-2"><p className="text-[10px] md:text-[12px]">HTML</p></div>
                </div>
                <div className="rounded-lg " style={{ background: gradient }}>
                  <div className="bg-slate-800 rounded-lg m-[1px] px-2"><p className="text-[10px] md:text-[12px]">Javascript</p></div>
                </div>
                <div className="rounded-lg " style={{ background: gradient }}>
                  <div className="bg-slate-800 rounded-lg m-[1px] px-2"><p className="text-[10px] md:text-[12px]">Tailwind</p></div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-wrap text-[12px] md:text-[14px]">Aug 2022 - Jan 2023</p>
        </div>

      </div>
    </div>
  );
};


const Project = ({
  gradient,
}: {
  gradient: string;
}) => {
  return (
    <div className="gap-3 grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
        <ProjectCard
          gradient={gradient}
          projectName="Rumah Hangeul"
          desc="A Responsive Korean Language Learning Website with Bahasa as the main language "
          skill={["React", "Tailwind", "JavaScript", "Spring Boot", "Java", "MaterialUI"]}
          link="https://rumahhangeul.vercel.app/"
          src="/project/rumahhangeul.png"
        />
        <ProjectCard
          gradient={gradient}
          projectName="UMN Pictures (affiliated with PT. MDN)"
          desc="A Website that designed to showcase cinematic content."
          skill={["HTML", "Django", "JavaScript", "Tailwind"]}
          link="https://umnpictures.com/"
          src="/project/umnpic.png"
        />
        <ProjectCard
          gradient={gradient}
          projectName="Movie List Website"
          desc="A Website that designed to showcase cinematic content."
          skill={["HTML", "Bootstrap", "JavaScript"]}
          link="https://invokermovie.web.app/index.html"
          src="/project/movie.png"
        />
        <ProjectCard
          gradient={gradient}
          projectName="iCare"
          desc="A Mobile App for monitoring activities and distribution of foundation funds."
          skill={["Java", "XML"]}
          link="https://play.google.com/store/apps/details?id=umn.ac.id.icare"
          src="/project/icare.jpg"
        />
    </div>
  );
};

const ProjectCard = ({
  gradient, 
  projectName,
  desc,
  skill,
  link,
  src,
} : {
  gradient: string;
  projectName: string;
  desc: string;
  skill: string[];
  link?: string;
  src: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex rounded-lg" style={{ background: gradient }}>
      <div className="h-full w-full m-[2px] p-2 bg-neutral-700 rounded-lg">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="w-full flex flex-row gap-3">
            <div className="w-full flex flex-col">
              <div className="flex flex-row items-center justify-between">
                <p className="text-wrap text-[14px] font-semibold">{projectName}</p>
                <div className="flex flex-row gap-2">
                  <img 
                    src="/icon/image.svg" 
                    onClick={() => setIsModalOpen(true)} 
                    className="w-[30px] h-[30px] cursor-customPointer"
                    alt="Preview"
                  />
                  <img 
                    src="/icon/link.svg" 
                    onClick={() => window.open(link)} 
                    className="w-[30px] h-[30px] cursor-customPointer"
                    alt="Open Link"
                  />
                </div>
              </div>
              <p className="text-[12px] md:text-[12px] font-thin line-clamp-2">{desc}</p>
              <div className="flex flex-row gap-2 pt-1">
                {skill.map((item, index) => (
                  <div key={index} className="rounded-lg" style={{ background: gradient }}>
                    <div className="m-[1px] px-2 bg-slate-800 rounded-lg">
                      <p className="text-[10px] md:text-[12px]">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="rounded-lg shadow-lg relative">
            <button 
              className="absolute top-[-40px] right-5 text-black text-lg font-bold cursor-customPointer "
              onClick={() => setIsModalOpen(false)}
            >
              <div
                  className="absolute w-[5px] h-[30px] rounded-lg -rotate-[43.5deg] "
                  style={{ background: gradient }}
              />
              <div
                  className="absolute w-[5px] h-[30px] rounded-lg rotate-[43.5deg] "
                  style={{ background: gradient }}
              />
            </button>
            <img 
              src={src} 
              alt={projectName} 
              className="max-w-[475px] max-h-[550px] sm:max-w-[600px] md:max-w-[750px] lg:max-w-[1000px] rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
