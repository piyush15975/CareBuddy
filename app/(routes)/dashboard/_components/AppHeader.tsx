"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Stethoscope, History, Home, Activity } from "lucide-react";
import { usePathname } from "next/navigation";

function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const menuOptions = [
    { 
      id: 1, 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: Home 
    },
    { 
      id: 2, 
      name: "Medical History", 
      path: "/dashboard/history", 
      icon: History 
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 py-3 shadow-2xl" 
            : "bg-transparent py-5 border-b border-slate-800/30"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Image 
                    src="/logo.webp" 
                    alt="CareBuddy Logo"
                    width={36}
                    height={36}
                    className="rounded-lg"
                  />
                </div>
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="flex flex-col">
                <motion.h1 
                  className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  CareBuddy
                </motion.h1>
                <p className="text-xs text-slate-400 hidden sm:block">
                  AI Medical Assistant
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {menuOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={option.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActivePath(option.path)
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                    }`}
                  >
                    <option.icon className="w-4 h-4" />
                    {option.name}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side - User Info & Controls */}
          <div className="flex items-center gap-4">
            {/* Welcome Text - Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden lg:flex flex-col items-end"
            >
              <p className="text-sm text-slate-400">Welcome back,</p>
              <p className="text-white font-medium text-sm">
                {user?.firstName || "Healthcare Professional"}
              </p>
            </motion.div>

            {/* User Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative"
            >
              <div className="p-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <UserButton 
                  appearance={{
                    elements: {
                      rootBox: "rounded-xl",
                      userButtonAvatarBox: "w-8 h-8 rounded-xl",
                      userButtonOuter: "rounded-xl",
                    }
                  }}
                />
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50"
            >
              <div className="px-4 py-4 space-y-2">
                {menuOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link 
                      href={option.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isActivePath(option.path)
                            ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                        }`}
                      >
                        <option.icon className="w-5 h-5" />
                        {option.name}
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex items-center gap-3 px-4 py-3 border-t border-slate-700/50 mt-4 pt-4"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">
                      {user?.firstName || "Healthcare Professional"}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {user?.primaryEmailAddress?.emailAddress || "Medical Account"}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-20 md:h-24" />
    </>
  );
}

export default AppHeader;