import Image from "next/image";

interface FotoProps {
    gradient: string;
    activeSection: string;
    handleScrollToHome: () => void; 
    handleScrollToAbout: () => void; 
    handleScrollToContact: () => void; 
  }

const Header = ({gradient, activeSection, handleScrollToHome, handleScrollToAbout, handleScrollToContact }: FotoProps) => {

  return (
    <div className="flex flex-row justify-between py-3 px-2 lg:px-36 h-[10vh]">
        <div className="flex flex-row justify-center items-center">
            <Image
                src="/logo.svg"
                alt="logo"
                width={50}
                height={50}
            />
            <p>Stiv's Playgrounds</p>
        </div>
        <ul className="flex flex-row gap-3 lg:gap-16 items-center">
            <Text 
                activeSection={activeSection} 
                section="home" 
                text="Home" 
                gradient={gradient} 
                handleClick={handleScrollToHome}
            />
            <Text 
                activeSection={activeSection} 
                section="about" 
                text="About Me" 
                gradient={gradient} 
                handleClick={handleScrollToAbout}
            />
            <Text 
                activeSection={activeSection} 
                section="contact" 
                text="Contact" 
                gradient={gradient} 
                handleClick={handleScrollToContact}
            />
            <img 
                src="/icon/resume.svg" 
                className="h-[40px] cursor-customPointer"            
                onClick={() => window.open("https://drive.google.com/file/d/1DeCPiktq-s6-Hpd5jXA4HeML_O3yjwnA/view?usp=sharing", "_blank")}
            />
        </ul>
    </div>
  );
};

export default Header;

interface TextProps {
    activeSection: string;
    section: string;
    text: string;
    gradient: string;
    handleClick: () => void;
};

const Text: React.FC<TextProps> = ({ activeSection, section, text, gradient, handleClick}) =>{

    return (
        <div 
            className="p-[2px] rounded-lg" 
            style={activeSection === section ? { background: gradient } : {}}
        >
        <li 
            className=" p-1 rounded-lg bg-[#171717] cursor-customPointer"
            onClick={handleClick} 
        >
            {text}
        </li>
    </div>
    );
};