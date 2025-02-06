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
    <div className="flex flex-row justify-between py-3 px-36 h-[10vh]">
        <div className="flex flex-row justify-center items-center">
        <Image
            src="/logo.svg"
            alt="logo"
            width={50}
            height={50}
        />
        <p>Stiv's Playgrounds</p>
        </div>
        <ul className="flex flex-row gap-16 items-center">
            <div 
                className="p-[2px] rounded-lg" 
                style={activeSection === "home" ? { background: gradient } : {}}
            >
                <li 
                    className=" p-1 rounded-lg bg-[#171717] cursor-customPointer"
                    onClick={handleScrollToHome} 
                >
                    Home
                </li>
            </div>
            <div 
                className="p-[2px] rounded-lg" 
                style={activeSection === "about" ? { background: gradient } : {}}
            >
                <li 
                    className=" p-1 rounded-lg bg-[#171717] cursor-customPointer"
                    onClick={handleScrollToAbout} 
                >
                    About Me
                </li>
            </div>
            <div 
                className="p-[2px] rounded-lg" 
                style={activeSection === "contact" ? { background: gradient } : {}}
            >
                <li 
                    className=" p-1 rounded-lg bg-[#171717] cursor-customPointer"
                    onClick={handleScrollToContact} 
                >
                    Contact
                </li>
            </div>
        </ul>
    </div>
  );
};

export default Header;