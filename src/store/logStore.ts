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
import { persist } from "zustand/middleware";

type LogState = {
  loading: boolean;
  logs: Log[];
  selectedDate?: Date;
  setLoading: (value: boolean) => void;
  setSelectedDate: (value: Date | undefined) => void;
  add: (input: LogData & { createdBy: Member }) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<LogData>) => void;
  getAllEnrollmentLogs: () => EnrollmentLog[];
  getAllPlanDiaryLogs: () => PlanDiaryLog[];
  getAllPurchaseLogs: () => PurchaseLog[];
  getAllLossLogs: () => LossLog[];
  getAllAdhesionLogs: () => AdhesionLog[];
  getLogsByDate(selectedDate?: Date, types?: LogType[]): Log[];
  getByEnrollmentId: (enrollmentId: string) => EnrollmentLog | null;
  getByPurchaseId: (purchaseId: string) => PurchaseLog | null;
  getLogsByMonth: (month: number, year?: number) => Log[];
  getLogsByYear: (year: number) => Log[];
};

export const useLogStore = create<LogState>()(
  persist(
    (set, get) => ({
      loading: true,
      logs: [],
      selectedDate: new Date(),
      setLoading(value) {
        set(() => ({ loading: value }));
      },
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
        return get().logs.filter(
          (log) => log.type === "adhesion"
        ) as AdhesionLog[];
      },
      getLogsByDate(selectedDate, types) {
        return get().logs.filter((log) => {
          const isSelectedDate = isDateEqual(
            log.createdAt,
            selectedDate || new Date()
          );
          if (types && types.length > 0) {
            return types.includes(log.type) && isSelectedDate;
          }
          return isSelectedDate;
        });
      },
      getByEnrollmentId(enrollmentId) {
        const foundLog = get().logs.find(
          (log) =>
            log.type === "enrollment" && log.enrollment.id === enrollmentId
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
      getLogsByMonth(month, year) {
        return get().logs.filter((log) => {
          if (year)
            return (
              new Date(log.createdAt).getMonth() === month &&
              new Date(log.createdAt).getFullYear() === year
            );
          return new Date(log.createdAt).getMonth() === month;
        });
      },
      getLogsByYear(year) {
        return get().logs.filter((log) => log.createdAt.getFullYear() === year);
      },
    }),
    {
      name: "log-storage",
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (error) {
            console.log(error);
          } else {
            state?.setLoading(false);
          }
        };
      },
    }
  )
);
