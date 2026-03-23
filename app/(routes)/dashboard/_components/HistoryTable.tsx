"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SessionDetail } from "./HistoryList";
import { Button } from "@/components/ui/button";
import moment from 'moment';
import ViewReportDialog from "./ViewReportDialog";
import { motion } from "framer-motion";
import { FileText, Calendar, User, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  historyList: SessionDetail[];
};

function HistoryTable({ historyList }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-800/30 backdrop-blur-sm rounded-3xl border border-slate-700/50 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">Consultation History</h3>
            <p className="text-slate-400 text-sm">Your previous medical consultations and reports</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-700/50 hover:bg-transparent">
              <TableHead className="text-slate-300 font-semibold py-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  AI Medical Specialist
                </div>
              </TableHead>
              <TableHead className="text-slate-300 font-semibold">
                Consultation Notes
              </TableHead>
              <TableHead className="text-slate-300 font-semibold">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date & Time
                </div>
              </TableHead>
              <TableHead className="text-slate-300 font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyList.map((record: SessionDetail, index: number) => (
              <motion.tr
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-all duration-200 group"
              >
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {record.selectedDoctor.specialist}
                      </div>
                      <Badge variant="outline" className="mt-1 bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs">
                        AI Specialist
                      </Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="max-w-xs">
                    <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">
                      {record.notes}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-sm">
                      {moment(new Date(record.createdOn)).format('MMM DD, YYYY')}
                    </span>
                    <span className="text-slate-400 text-xs">
                      {moment(new Date(record.createdOn)).fromNow()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ViewReportDialog record={record} />
                  </motion.div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-800/20">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>Showing {historyList.length} consultation{historyList.length !== 1 ? 's' : ''}</span>
          <span>Last updated: {moment().format('MMM DD, YYYY')}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default HistoryTable;