"use client";

"use client";

import type {
  AdhesionLog,
  EnrollmentLog,
  Log,
  LogData,
  LogType,
  LossLog,
  PlanDiaryLog,
  PurchaseLog,
} from "@/types/Log.type";
import type { Member } from "@/types/Member.type";
import { create } from "zustand";
import generateDbFields from "@/utils/generateDefaultDbFields";
import isDateEqual from "@/utils/isDateEquals";

type LogState = {
  logs: Log[];
  selectedDate?: Date;
  setSelectedDate: (value: Date | undefined) => void;
  add: (input: LogData & { createdBy: Member }) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<LogData>) => void;
  getAllEnrollmentLogs: () => EnrollmentLog[];
  getAllPlanDiaryLogs: () => PlanDiaryLog[];
  getAllPurchaseLogs: () => PurchaseLog[];
  getAllLossLogs: () => LossLog[];
  getAllAdhesionLogs: () => AdhesionLog[];
  getLogsByDate: (type: LogType, selectedDate: Date) => Log[];
  getByEnrollmentId: (enrollmentId: string) => EnrollmentLog | null;
  getByPurchaseId: (purchaseId: string) => PurchaseLog | null;
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
        return { ...log, ...input, updatedAt: new Date() };
      }
      return log;
    }) as Log[];

    set((state) => ({ ...state, logs: updatedLogs }), true);
  },
  getAllEnrollmentLogs() {
    return get().logs.filter(
      (log) => log.type === "enrollment"
    ) as EnrollmentLog[];
  },
  getAllPlanDiaryLogs() {
    return get().logs.filter(
      (log) => log.type === "plan-diary"
    ) as PlanDiaryLog[];
  },
  getAllPurchaseLogs() {
    return get().logs.filter((log) => log.type === "purchase") as (Log & {
      type: "purchase";
    })[];
  },
  getAllLossLogs() {
    return get().logs.filter(
      (log) => log.type === "investment" || "expense"
    ) as LossLog[];
  },
  getAllAdhesionLogs() {
    return get().logs.filter((log) => log.type === "adhesion") as AdhesionLog[];
  },
  getLogsByDate(type, selectedDate) {
    return get().logs.filter(
      (log) => log.type === type && isDateEqual(log.createdAt, selectedDate)
    ) as (Log & { type: typeof type })[];
  },
  getByEnrollmentId(enrollmentId) {
    const foundLog = get().logs.find(
      (log) => log.type === "enrollment" && log.enrollment.id === enrollmentId
    );

    if (!foundLog) return null;

    return foundLog as EnrollmentLog;
  },
  getByPurchaseId(purchaseId) {
    const foundLog = get().logs.find(
      (log) => log.type === "purchase" && log.purchase.id === purchaseId
    );

    if (!foundLog) return null;

    return foundLog as PurchaseLog;
  },
}));
