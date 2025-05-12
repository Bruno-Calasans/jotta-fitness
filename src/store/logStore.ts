"use client";

// import { LOGS_DATA } from "@/data/LOGS_DATA";
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
import { create } from "zustand";
import generateDbFields from "@/utils/generateDefaultDbFields";
import { DB } from "@/types/Db.type";
import { Member } from "@/types/Member.type";
import { PlanDiary } from "@/types/PlanDiary.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";
import { addDays } from "date-fns";
import { Optional } from "@/types/Optional.type";
import { Purchase } from "@/types/Purchase.type";
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
  createPlanDiary: (
    input: Optional<PlanDiary, keyof DB | "expiresIn">
  ) => PlanDiary;
  createPurchase: (input: Optional<Purchase, keyof DB>) => Purchase;
  getLogsByDate: (type: LogType, selectedDate: Date) => Log[];
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
  createPlanDiary(input) {
    const newDiary: PlanDiary = {
      ...generateDefaultDbFields(),
      ...input,
      expiresIn: addDays(new Date(), input.days),
    };
    return newDiary;
  },
  createPurchase(input) {
    const newPurchase: Purchase = {
      ...generateDefaultDbFields(),
      ...input,
    };
    return newPurchase;
  },
  getLogsByDate(type, selectedDate) {
    return get().logs.filter(
      (log) => log.type === type && isDateEqual(log.createdAt, selectedDate)
    ) as (Log & { type: typeof type })[];
  },
}));
