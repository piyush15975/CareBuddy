"use client";
import { cn } from "@/lib/utils";
import React from "react";
import {
  IconMicrophone,
  IconHeartbeat,
  IconShieldCheck,
  IconClock,
  IconUserCheck,
  IconBrain,
  IconStethoscope,
  IconMessage,
  IconCalendarEvent,
  IconReportMedical,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function FeatureBentoGrid() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Smart Healthcare Features
        </h2>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Discover how our AI voice assistant transforms patient care with intelligent, 
          personalized healthcare solutions
        </p>
      </motion.div>
      
      <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[22rem]">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            className={cn(
              "border border-slate-700/50 bg-slate-900/30 backdrop-blur-sm",
              "[&>p:text-lg]",
              item.className
            )}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </div>
  );
}

const VoiceAssistantSkeleton = () => {
  const voiceVariants = {
    initial: { x: 0, opacity: 0.8 },
    animate: { 
      x: 10, 
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };
  
  const responseVariants = {
    initial: { x: 0, opacity: 0.8 },
    animate: { 
      x: -10, 
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-xl flex-col space-y-3 p-4"
    >
      <motion.div
        variants={voiceVariants}
        className="flex flex-row rounded-2xl border border-cyan-500/30 p-3 items-center space-x-3 bg-cyan-900/20 backdrop-blur-sm"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shrink-0 flex items-center justify-center">
          <IconMicrophone className="h-4 w-4 text-white" />
        </div>
        <div className="w-full bg-cyan-800/30 h-4 rounded-full" />
      </motion.div>
      
      <motion.div
        variants={responseVariants}
        className="flex flex-row rounded-2xl border border-blue-500/30 p-3 items-center space-x-3 w-4/5 ml-auto bg-blue-900/20 backdrop-blur-sm"
      >
        <div className="w-full bg-blue-800/30 h-4 rounded-full" />
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shrink-0 flex items-center justify-center">
          <IconBrain className="h-4 w-4 text-white" />
        </div>
      </motion.div>
      
      <motion.div
        variants={voiceVariants}
        className="flex flex-row rounded-2xl border border-cyan-500/30 p-3 items-center space-x-3 bg-cyan-900/20 backdrop-blur-sm"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shrink-0 flex items-center justify-center">
          <IconMicrophone className="h-4 w-4 text-white" />
        </div>
        <div className="w-full bg-cyan-800/30 h-4 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

const AppointmentScheduler = () => {
  const variants = {
    initial: { width: 0 },
    animate: { 
      width: "100%",
      transition: {
        duration: 0.3,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 1.5,
      },
    },
  };
  
  const appointments = [
    { time: "09:00 AM", patient: "Dr. Smith - Cardiology", duration: 70 },
    { time: "10:30 AM", patient: "Blood Work - Lab", duration: 85 },
    { time: "02:15 PM", patient: "Physical Therapy", duration: 60 },
    { time: "04:00 PM", patient: "Dr. Johnson - Follow-up", duration: 45 },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-emerald-900/20 to-green-900/20 rounded-xl flex-col space-y-3 p-4"
    >
      {appointments.map((appointment, i) => (
        <motion.div
          key={i}
          variants={variants}
          style={{
            maxWidth: `${appointment.duration}%`,
          }}
          className="flex flex-row rounded-xl border border-emerald-500/30 p-2 items-center space-x-2 bg-emerald-900/30 backdrop-blur-sm w-full h-6"
        >
          <div className="text-xs text-emerald-300 font-medium px-2">
            {appointment.time}
          </div>
          <div className="text-xs text-emerald-200 truncate">
            {appointment.patient}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

const HealthMonitoring = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
  };
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl flex-col space-y-2 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(-45deg, #0ea5e9, #06b6d4, #10b981, #84cc16)",
        backgroundSize: "400% 400%",
      }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="relative z-10 p-4 flex flex-col h-full justify-center items-center">
        <IconHeartbeat className="h-12 w-12 text-white mb-4" />
        <div className="text-white font-bold text-lg text-center">
          Real-time Health Monitoring
        </div>
        <div className="text-white/80 text-sm text-center mt-2">
          Continuous patient data tracking
        </div>
      </div>
    </motion.div>
  );
};

const PatientProfiles = () => {
  const first = {
    initial: { x: 20, rotate: -5, opacity: 0.8 },
    hover: { x: 0, rotate: 0, opacity: 1 },
  };
  
  const second = {
    initial: { x: -20, rotate: 5, opacity: 0.8 },
    hover: { x: 0, rotate: 0, opacity: 1 },
  };

  const patients = [
    { name: "Sarah Chen", condition: "Diabetes", status: "Stable", color: "green" },
    { name: "Mike Rodriguez", condition: "Hypertension", status: "Monitoring", color: "blue" },
    { name: "Emma Wilson", condition: "Post-op Recovery", status: "Improving", color: "purple" },
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-xl flex-row space-x-3 p-4"
    >
      {patients.map((patient, index) => (
        <motion.div
          key={index}
          variants={index === 0 ? first : index === 2 ? second : {}}
          className={`h-full w-1/3 rounded-2xl bg-gradient-to-br from-${patient.color}-900/30 to-${patient.color}-800/30 p-4 border border-${patient.color}-500/30 flex flex-col items-center justify-center backdrop-blur-sm`}
        >
          <div className={`h-12 w-12 rounded-full bg-${patient.color}-500/20 flex items-center justify-center mb-3`}>
            <IconUserCheck className={`h-6 w-6 text-${patient.color}-300`} />
          </div>
          <p className="text-sm text-center font-semibold text-white mt-2">
            {patient.name}
          </p>
          <p className="text-xs text-center text-slate-300 mt-1">
            {patient.condition}
          </p>
          <p className={`border border-${patient.color}-500 bg-${patient.color}-900/30 text-${patient.color}-300 text-xs rounded-full px-2 py-1 mt-3`}>
            {patient.status}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

const SymptomAnalysis = () => {
  const variants = {
    initial: { x: 0, opacity: 0.8 },
    animate: { 
      x: 10, 
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };
  
  const responseVariants = {
    initial: { x: 0, opacity: 0.8 },
    animate: { 
      x: -10, 
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-xl flex-col space-y-3 p-4"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-orange-500/30 p-3 items-start space-x-3 bg-orange-900/20 backdrop-blur-sm"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shrink-0 flex items-center justify-center">
          <IconReportMedical className="h-4 w-4 text-white" />
        </div>
        <p className="text-xs text-orange-200 flex-1">
          Patient reports: Headache, fever, and fatigue for 2 days. No known allergies.
        </p>
      </motion.div>
      
      <motion.div
        variants={responseVariants}
        className="flex flex-row rounded-2xl border border-red-500/30 p-3 items-center justify-end space-x-3 w-4/5 ml-auto bg-red-900/20 backdrop-blur-sm"
      >
        <p className="text-xs text-red-200">Possible: Viral infection</p>
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 shrink-0 flex items-center justify-center">
          <IconStethoscope className="h-4 w-4 text-white" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const items = [
  {
    title: "Voice Assistant",
    description: (
      <span className="text-sm text-slate-300">
        Natural voice interactions for seamless patient communication and support.
      </span>
    ),
    header: <VoiceAssistantSkeleton />,
    className: "md:col-span-1",
    icon: <IconMicrophone className="h-5 w-5 text-cyan-400" />,
  },
  {
    title: "Appointment Scheduling",
    description: (
      <span className="text-sm text-slate-300">
        AI-powered scheduling that optimizes your calendar and reduces no-shows.
      </span>
    ),
    header: <AppointmentScheduler />,
    className: "md:col-span-1",
    icon: <IconCalendarEvent className="h-5 w-5 text-emerald-400" />,
  },
  {
    title: "Health Monitoring",
    description: (
      <span className="text-sm text-slate-300">
        Continuous tracking of vital signs and health metrics with AI analysis.
      </span>
    ),
    header: <HealthMonitoring />,
    className: "md:col-span-1",
    icon: <IconHeartbeat className="h-5 w-5 text-blue-400" />,
  },
  {
    title: "Patient Management",
    description: (
      <span className="text-sm text-slate-300">
        Comprehensive patient profiles with real-time status updates and care plans.
      </span>
    ),
    header: <PatientProfiles />,
    className: "md:col-span-2",
    icon: <IconUserCheck className="h-5 w-5 text-purple-400" />,
  },
  {
    title: "Symptom Analysis",
    description: (
      <span className="text-sm text-slate-300">
        AI-driven symptom assessment and preliminary diagnosis support.
      </span>
    ),
    header: <SymptomAnalysis />,
    className: "md:col-span-1",
    icon: <IconReportMedical className="h-5 w-5 text-orange-400" />,
  },
];