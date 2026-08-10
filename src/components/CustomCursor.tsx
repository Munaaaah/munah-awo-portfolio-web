"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PRIMARY = "#7A46FF";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary, .cursor-pointer";

/* Custom cursor: arrow + name pill, follows the pointer with a spring.
   Only rendered on fine-pointer devices (native cursor is hidden via CSS). */
const CustomCursor = ({ label = "Munah" }: { label?: string }) => {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

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
      const target = e.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE_SELECTOR)));
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
      {/* Cursor icon — arrow normally, pointing hand over clickables */}
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        {hovering ? (
          <motion.svg
            key="hand"
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            className="-mt-[2px] -ml-[9px] origin-top"
          >
            {/* Lucide "pointer" hand — purple outline pass, then white stroke */}
            <g
              stroke={PRIMARY}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 11v-1a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
              <path d="M14 10V9a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1" />
              <path d="M10 9.5V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v10" />
              <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </g>
            <g
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 11v-1a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
              <path d="M14 10V9a2 2 0 0 0-2-2 2 2 0 0 0-2 2v1" />
              <path d="M10 9.5V4a2 2 0 0 0-2-2 2 2 0 0 0-2 2v10" />
              <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </g>
          </motion.svg>
        ) : (
          <motion.svg
            key="arrow"
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="-mt-[2px] -ml-[2px] origin-top-left"
          >
            <path
              d="M5 3L19 12.5L12 13.5L8.5 20L5 3Z"
              fill="white"
              stroke={PRIMARY}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </motion.div>

      {/* Name pill — trails slightly on a spring */}
      <motion.div
        style={{ x: pillX, y: pillY }}
        className="absolute top-[20px] left-[14px]"
      >
        <motion.span
          animate={{ scale: hovering ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="block rounded-full px-[12px] py-[5px] text-[12px] leading-[16px] font-bold font-creatoDisplay whitespace-nowrap"
          style={{
            backgroundColor: hovering ? "white" : PRIMARY,
            color: hovering ? PRIMARY : "white",
          }}
        >
          {label}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default CustomCursor;
