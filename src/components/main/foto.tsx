import dynamic from 'next/dynamic';

import { useState } from "react";
import { motion } from "framer-motion";

interface FotoProps {
  gradient: string;
  handleScrollToAbout: () => void; 
  fadeOut: boolean;
}

const Foto = ({ gradient, handleScrollToAbout, fadeOut }: FotoProps) => {
  return (
    <motion.div
    data-tilt data-tilt-glare
      className="boxProfile group [perspective:1000px]" 
      style={{ "--dynamic-gradient": gradient } as React.CSSProperties} 
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full w-full p-2 shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute">
          <img src="/etc/profile.jpeg" className="z-10 object-cover w-[270px] h-[270px] group-hover:blur-sm"/>
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black/50 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Stiven</h1>
            <p className="text-lg font-bold">Full Stack Developer</p>
            <p className="text-base">Multimedia Nusantara University</p>
            <button 
              onClick={handleScrollToAbout} 
              className="mt-2 cursor-customPointer rounded-md bg-neutral-700 py-1 px-2 hover:bg-neutral-950"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Foto;
