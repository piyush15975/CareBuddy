"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FeatureBentoGrid } from "./_components/FeatureBentoGrid";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Sparkles, Mic, Heart, Shield, Clock, Zap, Stethoscope, Brain, Activity, Users } from "lucide-react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [particlePositions, setParticlePositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    setIsVisible(true);

    const positions = Array.from({ length: 25 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));

    setParticlePositions(positions);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.15),rgba(255,255,255,0))]"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
            initial={{ x: pos.x, y: pos.y }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-y-0 left-1/4 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent">
          <motion.div
            className="h-32 w-px bg-cyan-400"
            animate={{ y: [0, 120, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
        <div className="absolute inset-y-0 right-1/4 w-px bg-gradient-to-b from-transparent via-indigo-400 to-transparent">
          <motion.div
            className="h-32 w-px bg-indigo-400"
            animate={{ y: [120, 0, 120] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
          />
        </div>
      </div>

      <Navbar />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 px-4 py-10 md:py-24"
          >
            {/* Main Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-20"
            >
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-8"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">
                  Revolutionizing Patient Experience
                </span>
              </motion.div>

              {/* Main Heading with Staggered Animation */}
              <h1 className="relative z-10 mx-auto max-w-6xl text-center text-4xl font-bold md:text-6xl lg:text-7xl mb-8">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                  {"Transform Healthcare Through Intelligent Voice Technology"
                    .split(" ")
                    .map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.08,
                          ease: "easeOut",
                        }}
                        className="mr-3 inline-block"
                      >
                        {word}
                      </motion.span>
                    ))}
                </span>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="relative z-10 mx-auto max-w-3xl text-xl font-light text-slate-300 leading-relaxed mb-12"
              >
                Our advanced voice AI platform bridges the gap between patients and healthcare providers, 
                delivering personalized support, instant medical guidance, and seamless care coordination 
                through natural conversations.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20"
              >
                <Link href={"/dashboard"}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6,182,212,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 px-10 py-4 rounded-2xl font-semibold text-white shadow-2xl transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <Stethoscope className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Start Free Trial
                      <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.button>
                </Link>
                
                
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mb-20"
              >
                {[
                  { number: "24/7", label: "Availability", icon: Clock },
                  { number: "98%", label: "Accuracy Rate", icon: Activity },
                  { number: "50k+", label: "Patients Served", icon: Users },
                  { number: "2.5s", label: "Avg Response Time", icon: Zap },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group"
                  >
                    <stat.icon className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                      <div className="text-sm font-medium text-slate-400">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Feature Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              >
                {[
                  { 
                    icon: Mic, 
                    title: "Natural Voice Interface", 
                    description: "Patients interact naturally without technical barriers",
                    color: "text-cyan-400" 
                  },
                  { 
                    icon: Heart, 
                    title: "Emotional Intelligence", 
                    description: "AI understands patient emotions and responds with empathy",
                    color: "text-pink-400" 
                  },
                  { 
                    icon: Shield, 
                    title: "HIPAA Compliant", 
                    description: "Enterprise-grade security protecting sensitive health data",
                    color: "text-emerald-400" 
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex flex-col items-center text-center gap-4 p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group hover:bg-white/10"
                  >
                    <div className="relative">
                      <feature.icon className={`w-12 h-12 ${feature.color} group-hover:scale-110 transition-transform`} />
                      <motion.div
                        className="absolute -inset-2 bg-current rounded-full opacity-20 blur-md"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Feature Bento Grid Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.7 }}
              className="relative z-10 mt-20"
            >
              <FeatureBentoGrid />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Gradient Border */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60">
        <motion.div
          className="h-full w-48 bg-cyan-400"
          animate={{ x: ["-20%", "120%", "-20%"] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

const Navbar = () => {
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 py-3 shadow-xl" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="flex w-full items-center justify-between px-6 max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Image 
                  src="/logo.webp" 
                  alt="CareBuddy Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-30"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              CareBuddy
            </motion.h1>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        {!user ? (
          <div className="flex items-center gap-4">
            <Link href={"/about"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl font-medium text-slate-300 hover:text-white transition-all duration-300"
              >
                About
              </motion.button>
            </Link>
            <Link href={"/sign-in"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-xl font-medium text-white border border-slate-600 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300"
              >
                Login
              </motion.button>
            </Link>
            <Link href={"/sign-up"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <Link href={"/dashboard"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl font-medium text-slate-300 hover:text-white transition-all duration-300"
              >
                My Patients
              </motion.button>
            </Link>
            <UserButton />
            <Link href={"/dashboard"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-xl font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition-all duration-300"
              >
                Dashboard
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </motion.nav>
  );
};