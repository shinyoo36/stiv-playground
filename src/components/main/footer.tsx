import Image from "next/image";

const Footer = () => {
    const socialMedia = [
        {
          id: "social-media-4",
          icon: "/sosmed/linkedin.svg",
          link: "https://www.linkedin.com/in/stiven-065047261/",
        },
        {
          id: "social-media-1",
          icon: "/sosmed/instagram.svg",
          link: "https://www.instagram.com/stivenang",
        },
        {
          id: "social-media-2",
          icon: "/sosmed/youtube.svg",
          link: "https://www.youtube.com/channel/UCoKYPbx6jVOqc-cGsp7DTCQ/",
        },
      ];


    return (
    <div className="flex flex-row space-x-4 py-3 px-4 lg:px-36 justify-between items-center h-[10vh] ">
        <p className="font-teko font-[400] max-w-[200px] sm:max-w-[400px] line-clamp-2 tracking-[2px] text-[18px] md:text-[18px]">For full experience please use PC or Laptop !</p>
        <div className="flex flex-row gap-4">
        {socialMedia.map((social, index) => (
          <img
            key={index}
            src={social.icon}
            alt={social.id}
            onClick={() => window.open(social.link)}
            className="cursor-customPointer h-[20px] md:h-[20px]"
          />
        ))}
        </div>
    </div>
    );
  };
  
  export default Footer;