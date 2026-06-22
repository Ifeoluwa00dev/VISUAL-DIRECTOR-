import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface CustomCursorProps {
  cursorType: "default" | "project" | "cta";
  hoverText?: string;
}

export default function CustomCursor({ cursorType, hoverText = "VIEW" }: CustomCursorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for magnetic look
  const springConfig = { damping: 40, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
    
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", listener);

    // Filter touch devices
    const touchQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(touchQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      mediaQuery.removeEventListener("change", listener);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isMounted || isTouchDevice || prefersReduced || !isVisible) {
    return null;
  }

  // Morph cursor styles depending on the active state
  const isProject = cursorType === "project";
  const isCTA = cursorType === "cta";

  return (
    <motion.div
      id="custom-mag-cursor"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: cursorX,
        y: cursorY,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
      }}
      className="hidden md:flex items-center justify-center pointer-events-none"
    >
      <motion.div
        animate={{
          width: isProject ? 90 : isCTA ? 48 : 12,
          height: isProject ? 90 : isCTA ? 48 : 12,
          backgroundColor: isProject 
            ? "rgba(0, 245, 255, 0.15)" 
            : isCTA 
              ? "rgba(255, 255, 255, 0.1)" 
              : "#00F5FF",
          borderColor: isProject 
            ? "#00F5FF" 
            : isCTA 
              ? "rgba(255, 255, 255, 0.4)" 
              : "transparent",
          borderWidth: isProject || isCTA ? "1px" : "0px",
          backdropFilter: isProject ? "blur(3px)" : "blur(0px)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
        className="rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.35)] transition-shadow duration-300"
      >
        {isProject && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] tracking-[0.2em] font-sans font-bold text-[#00F5FF] uppercase"
          >
            {hoverText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
