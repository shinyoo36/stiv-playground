import Image from "next/image";

const Contact = () => {
    const contactInfo = [
        {
          id: "email",
          icon: "/icon/email.svg",
          value: "stiven.riandy@gmail.com",
        },
        {
          id: "phone",
          icon: "/icon/phone.svg",
          value: "+62895620713559 (Whatsapp)",
        },
        {
          id: "location",
          icon: "/icon/location.svg",
          value: "Jakarta",
        }
      ];


    return (
    <div className="flex flex-col gap-6 py-3 px-12 lg:px-36 justify-between items-center w-full">
        <p className="font-teko font-[400] tracking-[2px] text-[24px] lg:text-[30px]">Contact</p>
        <div className="flex flex-col gap-4 p-3">
        {contactInfo.map((social, index) => (
          <div key={index} className="flex flex-row items-center gap-3">
            <Image
              key={index}
              src={social.icon}
              alt={social.id}
              width={60}
              height={60}
            />
            <p>
              {social.value}
            </p>
          </div>
        ))}
        </div>
        <p className="font-teko font-[400] tracking-[1px] text-[24px] lg:text-[30px] text-justify">
          For business inquiries, freelance or any opportunities you can contact me at stiven.riandy@gmail.com or through personal message on my LinkedIn below.
          I can also work remotely!
        </p>
    </div>
    );
  };
  
  export default Contact;