"use client";

// import { LOGS_DATA } from "@/data/LOGS_DATA";
import type { GainLog, Log, LossLog } from "@/types/Log.type";
import { create } from "zustand";
import generateDbFields from "@/utils/generateDefaultDbFields";

type LogState = {
  logs: Log[];
  selectedDate?: Date;
  setSelectedDate: (value: Date | undefined) => void;
  add: (input: GainLog | LossLog) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Log>) => void;
  getAllEnrollmentLogs: () => (Log & { type: "enrollment" })[];
  getAllPlanDiaryLogs: () => (Log & { type: "plan-diary" })[];
  getAllPurchaseLogs: () => (Log & { type: "product-purchase" })[];
  getAllLossLogs: () => (Log & { type: "expense" | "investment" })[];
};

export const useLogStore = create<LogState>((set, get) => ({
  logs: [],
  selectedDate: new Date(),
  setSelectedDate(value) {
    set(() => ({ selectedDate: value }));
  },
  add(input) {
    const newLog = { ...generateDbFields(), ...input } as Log;
    set((state) => ({
      logs: [...state.logs, newLog],
    }));
  },
  remove(id) {
    const updatedLogs = get().logs.filter((log) => log.id !== id);
    set((state) => ({ ...state, logs: updatedLogs }), true);
  },
  update(id, input) {
    const updatedLogs = get().logs.map((log) => {
      if (log.id === id) {
        return { ...log, ...input };
      }
      return log;
    }) as Log[];

    set((state) => ({ ...state, logs: updatedLogs }), true);
  },
  getAllEnrollmentLogs() {
    return get().logs.filter((log) => log.type === "enrollment") as (Log & {
      type: "enrollment";
    })[];
  },
  getAllPlanDiaryLogs() {
    return get().logs.filter((log) => log.type === "plan-diary") as (Log & {
      type: "plan-diary";
    })[];
  },
  getAllPurchaseLogs() {
    return get().logs.filter(
      (log) => log.type === "product-purchase"
    ) as (Log & {
      type: "product-purchase";
    })[];
  },
  getAllLossLogs() {
    return get().logs.filter(
      (log) => log.type === "expense" || "investment"
    ) as (Log & {
      type: "expense" | "investment";
    })[];
  },
}));
