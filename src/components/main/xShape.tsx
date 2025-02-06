import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const XShape = ({ gradient, yValue }: { gradient: string, yValue: number; }) => {
  const [animateX1, setAnimateX1] = useState(true);
  const [animateX2, setAnimateX2] = useState(true);
  const [animateX3, setAnimateX3] = useState(true);
  const [shrinkMoveUp, setShrinkMoveUp] = useState(false);

  useEffect(() => {
    const startAnimation = () => {
      setAnimateX1(true);
      setTimeout(() => setAnimateX2(true), 250);
      setTimeout(() => setAnimateX3(true), 500);

      setTimeout(() => {
        setAnimateX1(false);
        setAnimateX2(false);
        setAnimateX3(false);
      }, 1500);

      setTimeout(startAnimation, 2000);
    };

    startAnimation();
  }, []);

  useEffect(() => {
    const handleTransition = (event: Event) => {
      setShrinkMoveUp((event as CustomEvent).detail);
    };

    document.addEventListener("homeToAbout", handleTransition);
    return () => {
      document.removeEventListener("homeToAbout", handleTransition);
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 1, opacity: 1, y: 0 }}
      animate={shrinkMoveUp ? { scale: 0, opacity: 0, y: yValue, rotate: -360 } : { scale: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="flex flex-row"
    >
      {/* X-1 */}
      <div className="relative w-[65px] h-[65px]">
        <div
          className={`absolute w-[13px] h-[60px] rounded-lg rotate-45 ${
            animateX1 ? "animate-[rotateX_0.6s_ease-in-out_forwards]" : ""
          }`}
          style={{ background: gradient }}
        />
        <div
          className={`absolute w-[13px] h-[60px] rounded-lg -rotate-45 ${
            animateX1 ? "animate-[rotateX2_0.6s_ease-in-out_forwards]" : ""
          }`}
          style={{ background: gradient }}
        />
      </div>

      {/* X-2 */}
      <div className="relative w-[65px] h-[65px]">
        <div
          className={`absolute w-[13px] h-[60px] rounded-lg rotate-45 ${
            animateX2 ? "animate-[rotateX_0.6s_ease-in-out_forwards]" : ""
          }`}
          style={{ background: gradient }}
        />
        <div
          className={`absolute w-[13px] h-[60px] rounded-lg -rotate-45 ${
            animateX2 ? "animate-[rotateX2_0.6s_ease-in-out_forwards]" : ""
          }`}
          style={{ background: gradient }}
        />
      </div>

      {/* X-3 */}
      <div className="relative w-[65px] h-[65px]">
        <div
          className={`absolute w-[13px] h-[60px] rounded-lg rotate-45 ${
            animateX3 ? "animate-[rotateX_0.6s_ease-in-out_forwards]" : ""
          }`}
          style={{ background: gradient }}
        />
        <div
          className={`absolute w-[13px] h-[60px] rounded-lg -rotate-45 ${
            animateX3 ? "animate-[rotateX2_0.6s_ease-in-out_forwards]" : ""
          }`}
          style={{ background: gradient }}
        />
      </div>
    </motion.div>
  );
};

export default XShape;
