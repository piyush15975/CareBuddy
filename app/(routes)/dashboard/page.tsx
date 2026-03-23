"use client";

import React from 'react'
import HistoryList from './_components/HistoryList';
import { Button } from '@/components/ui/button';
import DoctorsAgentList from './_components/DoctorsAgentList';
import AddNewSessionDialog from './_components/AddNewSessionDialog';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Brain, Heart, Calendar, Activity, Users, Zap } from 'lucide-react';

function Dashboard() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='flex justify-between items-center'
      >
        <div>
          <h2 className='font-bold text-3xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
            My Dashboard
          </h2>
          <p className="text-slate-400 mt-2">Welcome to your healthcare assistant</p>
        </div>
        <AddNewSessionDialog />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1),transparent_50%)]" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-4"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">
                AI-Powered Assistance
              </span>
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to Your{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Medical Assistant
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
              Start your first consultation to receive personalized care and expert medical advice. 
              Our AI voice assistant is here to help you anytime, anywhere.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mt-6"
            >
              <AddNewSessionDialog />
              
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <Image
                src={"/medical-assistance.png"}
                alt="AI Medical Assistant"
                width={280}
                height={280}
                className="rounded-2xl border-4 border-cyan-500/20 shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* <div className="">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="xl:col-span-2"
        >
          <DoctorsAgentList />
        </motion.div>

        
      </div> */}
    </div>
  )
}

export default Dashboard