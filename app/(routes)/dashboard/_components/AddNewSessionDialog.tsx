"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Loader2, Stethoscope, MessageCircle, Plus, Sparkles } from "lucide-react";
import axios from "axios";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const [currentStep, setCurrentStep] = useState<"details" | "select">("details");
  const router = useRouter();

  const OnClickNext = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/suggest-doctors", {
        notes: note,
      });
      setSuggestedDoctors(result.data.suggested_doctors || []);
      setCurrentStep("select");
    } catch (err) {
      console.error("Error fetching suggested doctors", err);
    }
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/session-chat", {
        notes: note,
        selectedDoctor: selectedDoctor,
      });
      if (result.data?.sessionId) {
        router.push("/dashboard/medical-agent/" + result.data.sessionId);
      }
    } catch (err) {
      console.error("Error starting consultation", err);
    }
    setLoading(false);
  };

  const resetDialog = () => {
    setNote("");
    setSuggestedDoctors([]);
    setSelectedDoctor(undefined);
    setCurrentStep("details");
  };

  return (
    <Dialog onOpenChange={(open) => !open && resetDialog()}>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            Start Consultation
          </Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="bg-slate-900/95 backdrop-blur-xl border-slate-700/50 text-white max-w-2xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === "details" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-400"} transition-all duration-300`}>
              1
            </div>
            <div className={`w-16 h-1 mx-2 ${currentStep === "select" ? "bg-cyan-500" : "bg-slate-700"} transition-all duration-300`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === "select" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-400"} transition-all duration-300`}>
              2
            </div>
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent text-center">
            {currentStep === "details" ? "Start New Consultation" : "Select Specialist"}
          </DialogTitle>
          
          <DialogDescription className="text-slate-400 text-center">
            {currentStep === "details" 
              ? "Describe your symptoms or medical concerns to find the right specialist"
              : "Choose the most relevant medical specialist for your consultation"
            }
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {currentStep === "details" ? (
            <motion.div
              key="details-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Medical Details</h3>
                    <p className="text-slate-400 text-sm">Describe symptoms, concerns, or medical history</p>
                  </div>
                </div>

                <Textarea
                  placeholder="Example: Patient experiencing headache, fever, and fatigue for 2 days. No known allergies. Blood pressure is 120/80..."
                  className="h-32 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
                  onChange={(e) => setNote(e.target.value)}
                  value={note}
                />
                
                <div className="flex items-center gap-2 mt-3 text-slate-500 text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>AI will analyze your description to suggest relevant specialists</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="select-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Recommended Specialists</h3>
                    <p className="text-slate-400 text-sm">Based on your description, we recommend these specialists</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                  {suggestedDoctors.map((doctor, index) => (
                    <motion.div
                      key={doctor.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <SuggestedDoctorCard
                        doctorAgent={doctor}
                        isSelected={selectedDoctor?.id === doctor.id}
                        setSelectedDoctor={() => setSelectedDoctor(doctor)}
                      />
                    </motion.div>
                  ))}
                </div>

                {suggestedDoctors.length === 0 && !loading && (
                  <div className="text-center py-8 text-slate-500">
                    <Stethoscope className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No specialists found. Please try a different description.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-700/50">
          {currentStep === "select" && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep("details")}
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-300 flex-1"
            >
              Back to Details
            </Button>
          )}
          
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-300 flex-1"
            >
              Cancel
            </Button>
          </DialogClose>

          {currentStep === "details" ? (
            <Button 
              disabled={!note || loading}
              onClick={OnClickNext}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold flex-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Analyzing...
                </>
              ) : (
                <>
                  Find Specialists
                  <ArrowRight className="ml-2" size={16} />
                </>
              )}
            </Button>
          ) : (
            <Button
              disabled={loading || !selectedDoctor}
              onClick={onStartConsultation}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold flex-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Starting...
                </>
              ) : (
                <>
                  Start Consultation
                  <MessageCircle className="ml-2" size={16} />
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;