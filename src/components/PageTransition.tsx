"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay rendering the content until after the animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000); // adjust to match transition duration

    return () => {
      clearTimeout(timer);
      setShowContent(false); // reset when path changes
    };
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{
          duration: 2, // match this with timeout above
          ease: [0.76, 0, 0.24, 1],
        }}
        className="min-h-screen"
      >
        {showContent && children}
      </motion.div>
    </AnimatePresence>
  );
}
