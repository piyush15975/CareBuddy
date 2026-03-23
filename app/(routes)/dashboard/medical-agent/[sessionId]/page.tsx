"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Circle, PhoneCall, PhoneOff, MessageCircle, User, Bot, Download, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import Vapi from "@vapi-ai/web";
import { Messages } from "openai/resources/chat/completions.mjs";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
};

type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetail] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [transcripts, setTranscripts] = useState<{ role: string; text: string }[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState<string>("");
  const [currentRole, setRole] = useState<string>("assistant");
  const [loading, setLoading] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [transcripts, currentTranscript]);

  // Call duration timer
  useEffect(() => {
    if (callStarted) {
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [callStarted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCallStart = () => {
    setCallStarted(true);
    setCallDuration(0);
  };

  const handleCallEnd = () => {
    setCallStarted(false);
  };

  const handleMessage = (message: any) => {
    if (message.type === "transcript") {
      const { role, transcriptType, transcript } = message;
      if (transcriptType === "partial") {
        setCurrentTranscript(transcript);
        setRole(role);
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => {
          setTranscripts((prev) => [
            ...prev,
            { role, text: transcript },
          ]);
          setCurrentTranscript("");
        }, 1500);
      } else if (transcriptType === "final") {
        setTranscripts((prev) => [
          ...prev,
          { role, text: transcript },
        ]);
        setCurrentTranscript("");
      }
    }
  };

  const handleSpeechStart = () => setRole("assistant");
  const handleSpeechEnd = () => setRole("user");

  const StartCall = () => {
    setLoading(true);
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);

    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("error", (error: any) => {
      console.error("VAPI Error:", error);
      toast.error("Connection error. Please try again.");
      setLoading(false);
    });

    vapi.start(process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID);
  };

  const endCall = async () => {
    setLoading(true);
    if (vapiInstance) {
      vapiInstance.stop();
      setVapiInstance(null);
    }
    setCallStarted(false);
    
    try {
      await GenerateReport();
      toast.success("Consultation completed! Your medical report has been generated.");
    } catch (error) {
      toast.error("Report generation failed, but consultation was saved.");
    }
    
    setLoading(false);
    router.push("/dashboard/history");
  };

  const GenerateReport = async () => {
    const result = await axios.post("/api/medical-report", {
      messages: transcripts,
      sessionDetail: sessionDetail,
      sessionId: sessionId,
    });
    return result.data;
  };

  useEffect(() => {
    if (sessionId) {
      GetSessionDetails();
    }
  }, [sessionId]);

  const GetSessionDetails = async () => {
    try {
      const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
      setSessionDetail(result.data);
    } catch (error) {
      console.error("Error fetching session details:", error);
      toast.error("Failed to load session details");
    }
  };

  const doctor = sessionDetail?.selectedDoctor;
  const imageSrc = doctor?.image?.startsWith("/") ? doctor.image : `/${doctor?.image}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-indigo-900/20">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.1),rgba(255,255,255,0))] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col lg:flex-row w-full h-screen overflow-hidden">
        {/* Doctor Profile Section - Full Height Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-2/5 relative flex flex-col bg-slate-800/30 backdrop-blur-sm border-r border-slate-700/50"
        >
          {/* Full Screen Doctor Image */}
          <div className="flex-1 relative">
            {doctor?.image && (
              <Image
                src={imageSrc}
                alt={doctor.specialist}
                fill
                className="object-cover"
                priority
                quality={100}
              />
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
          </div>

          {/* Doctor Info Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-300">AI Medical Specialist</span>
              </div>
              
              <h1 className="text-3xl font-bold text-white">{doctor?.specialist}</h1>
              <p className="text-slate-300 text-lg leading-relaxed">{doctor?.description}</p>
              
              <div className="flex items-center gap-4 text-slate-400 text-sm">
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>Voice Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Available</span>
                </div>
              </div>

              {/* Session Notes */}
              {sessionDetail?.notes && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 mt-4"
                >
                  <h3 className="font-semibold text-white mb-2">Session Notes</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{sessionDetail.notes}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Voice Interface Section */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-3/5 flex flex-col p-6 bg-slate-900/50 backdrop-blur-sm"
        >
          {/* Connection Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 mb-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Circle
                  className={`h-3 w-3 ${
                    callStarted
                      ? "text-emerald-500 fill-emerald-500 animate-pulse"
                      : "text-red-500 fill-red-500"
                  }`}
                />
                <span className={`text-sm font-medium ${
                  callStarted ? "text-emerald-400" : "text-red-400"
                }`}>
                  {callStarted ? "Live Consultation" : "Ready to Connect"}
                </span>
              </div>
              
              {callStarted && (
                <div className="flex items-center gap-2 text-cyan-400">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-sm">{formatTime(callDuration)}</span>
                </div>
              )}
            </div>

            {callStarted && (
              <Button
                variant="outline"
                size="sm"
                onClick={endCall}
                className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-300"
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                End Call
              </Button>
            )}
          </motion.div>

          {/* Transcript Container */}
          <div className="flex-1 bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6 mb-6 overflow-hidden">
            <div className="h-full flex flex-col">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-cyan-400" />
                Live Conversation
              </h3>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <AnimatePresence>
                  {transcripts.length === 0 && !currentTranscript && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-slate-500 py-12"
                    >
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Start the call to begin your consultation</p>
                      <p className="text-sm">Your conversation will appear here in real-time</p>
                    </motion.div>
                  )}

                  {transcripts.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start gap-3 ${
                        msg.role === "assistant" ? "justify-start" : "justify-end"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4 text-cyan-400" />
                        </div>
                      )}
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                          msg.role === "assistant"
                            ? "bg-cyan-500/20 text-cyan-100 border border-cyan-500/30 rounded-bl-none"
                            : "bg-blue-500/20 text-blue-100 border border-blue-500/30 rounded-br-none"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                      </div>
                      {msg.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {currentTranscript && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-3 ${
                        currentRole === "assistant" ? "justify-start" : "justify-end"
                      }`}
                    >
                      {currentRole === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4 text-cyan-400" />
                        </div>
                      )}
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl animate-pulse ${
                          currentRole === "assistant"
                            ? "bg-cyan-500/20 text-cyan-100 border border-cyan-500/30 rounded-bl-none"
                            : "bg-blue-500/20 text-blue-100 border border-blue-500/30 rounded-br-none"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{currentTranscript}</p>
                      </div>
                      {currentRole === "user" && (
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-blue-400" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>

          {/* Call Control */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            {!callStarted ? (
              <Button
                onClick={StartCall}
                disabled={loading}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold px-8 py-6 rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Starting Consultation...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-5 h-5" />
                    <span>Start Voice Consultation</span>
                  </div>
                )}
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={endCall}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white px-6 py-6 rounded-2xl transition-all duration-300"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Save & End
                </Button>
                <Button
                  variant="destructive"
                  onClick={endCall}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-6 rounded-2xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
                >
                  <PhoneOff className="w-5 h-5 mr-2" />
                  End Call
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default MedicalVoiceAgent;