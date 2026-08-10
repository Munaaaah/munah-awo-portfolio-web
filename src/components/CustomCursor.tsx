"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PRIMARY = "#7A46FF";

/* Custom cursor: arrow + name pill, follows the pointer with a spring.
   Only rendered on fine-pointer devices (native cursor is hidden via CSS). */
const CustomCursor = ({ label = "Munah" }: { label?: string }) => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const pillX = useSpring(x, { stiffness: 400, damping: 35 });
  const pillY = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[99999999] transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Arrow — tracks the pointer exactly */}
      <motion.svg
        style={{ x, y }}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="absolute -top-[2px] -left-[2px]"
      >
        <path
          d="M5 3L19 12.5L12 13.5L8.5 20L5 3Z"
          fill="white"
          stroke={PRIMARY}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Name pill — trails slightly on a spring */}
      <motion.div
        style={{ x: pillX, y: pillY }}
        className="absolute top-[20px] left-[14px]"
      >
        <span
          className="block rounded-full px-[12px] py-[5px] text-[12px] leading-[16px] font-bold text-white font-creatoDisplay whitespace-nowrap"
          style={{ backgroundColor: PRIMARY }}
        >
          {label}
        </span>
      </motion.div>
    </div>
  );
};

export default CustomCursor;
