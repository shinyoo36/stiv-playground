import { useEffect, useRef, useState } from "react";

interface MouseTrailProps {
  gradient: string;
}

const MouseTrail = ({ gradient }: MouseTrailProps) => {
  const trailRef = useRef<HTMLDivElement | null>(null);
  const dots = useRef<HTMLSpanElement[]>([]);
  const maxDots = 20; // Number of trail dots
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const mouseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!trailRef.current) return;

    for (let i = 0; i < maxDots; i++) {
      const dot = document.createElement("span");
      dot.classList.add("mouse-trail-dot");
      trailRef.current.appendChild(dot);
      dots.current.push(dot);
    }

    const updateMouseTrail = (event: MouseEvent) => {
      // Reset the timeout whenever the mouse moves
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      setIsMouseMoving(true);

      dots.current.forEach((dot, index) => {
        setTimeout(() => {
          dot.style.left = `${event.clientX}px`;
          dot.style.top = `${event.clientY}px`;
          dot.style.opacity = `${1 - index / maxDots}`;
        }, index * 15); // Delay each dot slightly
      });

      // Set a timeout to hide the dots after the mouse stops moving
      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false);
      }, 300); // Adjust the delay as needed
    };

    window.addEventListener("mousemove", updateMouseTrail);

    return () => {
      window.removeEventListener("mousemove", updateMouseTrail);
      dots.current.forEach((dot) => dot.remove());
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    dots.current.forEach((dot) => {
      dot.style.background = gradient;
    });
  }, [gradient]);

  useEffect(() => {
    if (!isMouseMoving) {
      dots.current.forEach((dot) => {
        dot.style.opacity = "0"; // Fade out the dots
        // Alternatively, you can use `dot.style.display = "none"` to hide them completely
      });
    }
  }, [isMouseMoving]);

  return (
    <div
      ref={trailRef}
      className="mouse-trail-container absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

export default MouseTrail;