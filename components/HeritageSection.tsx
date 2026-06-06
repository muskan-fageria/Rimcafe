"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface HeritageSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function HeritageSection({
  children,
  className = "",
  delay = 0,
}: HeritageSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
