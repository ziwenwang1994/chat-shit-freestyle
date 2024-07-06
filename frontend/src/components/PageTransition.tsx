"use client";

import { useAppSelector } from "@/lib/hooks";
import { animate, AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";

type TransitionProps = {
    children: any
}

const PageTransition:React.FC<TransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const initialized = useAppSelector(state => state.user.initialized);
  return (
    <AnimatePresence>
      <div key={pathname}>
        <motion.div className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: initialized ? 0 : 1, transition: { delay: 0.25, ease: "easeInOut" } }}
        ><div className="bg-black w-[100vw] h-[100vh] fixed left-0 top-0 z-[1001]"></div></motion.div>
        {children}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;