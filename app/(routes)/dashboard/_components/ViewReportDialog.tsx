"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SessionDetail } from "./HistoryList";
import moment from "moment";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  User, 
  Calendar, 
  Stethoscope, 
  Pill, 
  Lightbulb, 
  AlertCircle, 
  Clock,
  Download,
  Loader2,
  Sparkles,
  Heart,
  Activity,
  Shield
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Props = {
  record: SessionDetail;
};

type MedicalReport = {
  sessionId: string;
  agent: string;
  user: string;
  timestamp: string;
  chiefComplaint: string;
  summary: string;
  symptoms: string[];
  duration: string;
  severity: string;
  medicationsMentioned: string[];
  recommendations: string[];
};

function ViewReportDialog({ record }: Props) {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<MedicalReport | null>(
    //@ts-ignore
    record.report || null
  );
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/medical-report", {
        sessionId: record.sessionId,
        sessionDetail: record,
        //@ts-ignore
        messages: record.conversation || [],
      });

      setReport(res.data);
    } catch (err) {
      console.error("Failed to fetch report", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && !report) {
      fetchReport();
    }
  }, [open]);

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'mild': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'moderate': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'severe': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const downloadReport = () => {
    // Implement PDF download functionality
    toast.success("Report download started");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all duration-300"
        >
          <FileText className="w-4 h-4 mr-2" />
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col bg-slate-900/95 backdrop-blur-xl border-slate-700/50 shadow-2xl rounded-3xl overflow-hidden p-0">
        {/* Header - Fixed */}
        <DialogHeader className="border-b border-slate-700/50 pb-6 px-6 pt-6 bg-slate-900/80 backdrop-blur-sm shrink-0">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Medical Consultation Report
              </DialogTitle>
            </div>
            <DialogDescription className="text-slate-400">
              Comprehensive analysis of your consultation with AI medical specialist
            </DialogDescription>
          </motion.div>
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 h-full"
              >
                <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                <p className="text-slate-400">Generating comprehensive medical report...</p>
              </motion.div>
            ) : !report ? (
              <motion.div
                key="no-report"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 h-full text-center"
              >
                <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Report Unavailable</h3>
                <p className="text-slate-400 max-w-md">
                  The medical report for this consultation is not available at the moment.
                  Please try again later or contact support.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="report"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 pb-4"
              >
                {/* Session Information Card */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Session Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Stethoscope className="w-4 h-4 text-cyan-400" />
                        <div>
                          <p className="text-slate-400 text-sm">Medical Specialist</p>
                          <p className="text-white font-medium">{record.selectedDoctor.specialist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="text-slate-400 text-sm">Patient</p>
                          <p className="text-white font-medium">{report.user || "Anonymous"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <div>
                          <p className="text-slate-400 text-sm">Consultation Date</p>
                          <p className="text-white font-medium">
                            {moment(new Date(record.createdOn)).format("MMMM Do YYYY, h:mm A")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Shield className="w-4 h-4 text-purple-400" />
                        <div>
                          <p className="text-slate-400 text-sm">AI Agent</p>
                          <p className="text-white font-medium">{report.agent}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* Chief Complaint */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Chief Complaint</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                    {report.chiefComplaint}
                  </p>
                </motion.section>

                {/* Consultation Summary */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Consultation Summary</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                    {report.summary}
                  </p>
                </motion.section>

                {/* Symptoms & Assessment */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-orange-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Symptoms</h3>
                    </div>
                    <div className="space-y-2">
                      {report.symptoms.length > 0 ? (
                        report.symptoms.map((symptom, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-700/30 border border-slate-600/50">
                            <div className="w-2 h-2 bg-orange-400 rounded-full" />
                            <span className="text-slate-300 text-sm">{symptom}</span>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-400 italic text-center py-4">No symptoms recorded</p>
                      )}
                    </div>
                  </motion.section>

                  <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-purple-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Assessment</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-slate-400 text-sm mb-2">Duration</p>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                          {report.duration}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm mb-2">Severity</p>
                        <Badge variant="outline" className={getSeverityColor(report.severity)}>
                          {report.severity}
                        </Badge>
                      </div>
                    </div>
                  </motion.section>
                </div>

                {/* Medications */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <Pill className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Medications Mentioned</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {report.medicationsMentioned.length > 0 ? (
                      report.medicationsMentioned.map((med, i) => (
                        <Badge key={i} variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                          {med}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-slate-400 italic">No medications mentioned</p>
                    )}
                  </div>
                </motion.section>

                {/* Recommendations */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Recommendations</h3>
                  </div>
                  <div className="space-y-3">
                    {report.recommendations.length > 0 ? (
                      report.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                          <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                          <p className="text-cyan-100 text-sm leading-relaxed">{rec}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400 italic text-center py-4">No specific recommendations</p>
                    )}
                  </div>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions - Fixed */}
        <div className="border-t border-slate-700/50 pt-4 pb-6 px-6 bg-slate-900/80 backdrop-blur-sm shrink-0">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white"
            >
              Close
            </Button>
            {report && (
              <Button
                onClick={downloadReport}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;