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
        {
          id: "social-media-3",
          icon: "/sosmed/twitter.svg",
          link: "https://www.twitter.com/shinyooch",
        },
      ];


    return (
    <div className="flex flex-row py-3 px-36 justify-between items-center h-[8.5vh]">
        <p className="font-teko font-[400] tracking-[2px] text-[15px]">This website is not yet responsive! Please wait soon!</p>
        <div className="flex flex-row gap-4">
        {socialMedia.map((social, index) => (
          <Image
            key={index}
            src={social.icon}
            alt={social.id}
            width={24}
            height={24}
            onClick={() => window.open(social.link)}
            className="cursor-customPointer"
          />
        ))}
        </div>
    </div>
    );
  };
  
  export default Footer;