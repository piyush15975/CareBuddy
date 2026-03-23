"use client";

import React, { useEffect, useState } from "react";
import AppHeader from "./_components/AppHeader";
import { motion, AnimatePresence } from "framer-motion";

function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [particles, setParticles] = useState<
    { x: number; y: number }[]
  >([]);

  useEffect(() => {
    const positions = Array.from({ length: 10 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setParticles(positions);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/20">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.1),rgba(255,255,255,0))] pointer-events-none" />

      {/* FIXED FLOATING PARTICLES */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-20"
            initial={{ x: pos.x, y: pos.y }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <AppHeader />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="px-4 sm:px-6 lg:px-8 py-8"
        >
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </div>
        </motion.main>
      </div>

      {/* Bottom Border Glow */}
      <div className="fixed inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30 pointer-events-none">
        <motion.div
          className="h-full w-32 bg-cyan-400"
          animate={{ x: ["-20%", "120%", "-20%"] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

export default DashboardLayout;
