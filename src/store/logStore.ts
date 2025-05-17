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
import calcPurchasePrice from "@/utils/calcPurchasePrice";
import calcEnrollmentPrice from "@/utils/calcEnrollmentPrice";
import calcPlanDiaryPrice from "@/utils/calcPlanDiaryPrice";
import calcAdhesionPrice from "@/utils/calcAdhesionPrice";
import sumNumbers from "@/utils/sumNumbers";

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
  getLogsByDate(type: LogType, selectedDate: Date): Log[];
  getByEnrollmentId: (enrollmentId: string) => EnrollmentLog | null;
  getByPurchaseId: (purchaseId: string) => PurchaseLog | null;
  sumAllPurchasesLogsByDate: (date: Date) => number;
  sumAllEnrollmentLogsByDate: (date: Date) => number;
  sumAllPlanDiaryLogsByDate: (date: Date) => number;
  sumAllAdhesionLogsByDate: (date: Date) => number;
  sumAllLossLogsByDate: (date: Date) => {
    expenseLoss: number;
    investmentLoss: number;
    loss: number;
  };
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
    );
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
  sumAllPurchasesLogsByDate(date) {
    const purchaseLogs = get().getLogsByDate("purchase", date) as PurchaseLog[];

    if (purchaseLogs.length === 0) return 0;

    return purchaseLogs
      .map(({ purchase }) => calcPurchasePrice(purchase))
      .reduce(sumNumbers);
  },
  sumAllEnrollmentLogsByDate(date) {
    const enrollmentLogs = get().getLogsByDate(
      "enrollment",
      date
    ) as EnrollmentLog[];

    if (enrollmentLogs.length === 0) return 0;

    return enrollmentLogs
      .map(({ enrollment }) => calcEnrollmentPrice(enrollment))
      .reduce(sumNumbers);
  },
  sumAllPlanDiaryLogsByDate(date) {
    const planDiaries = get().getLogsByDate(
      "plan-diary",
      date
    ) as PlanDiaryLog[];

    if (planDiaries.length === 0) return 0;

    return planDiaries
      .map(({ planDiary }) => calcPlanDiaryPrice(planDiary))
      .reduce(sumNumbers);
  },
  sumAllAdhesionLogsByDate(date) {
    const adhesionLogs = get().getLogsByDate("adhesion", date) as AdhesionLog[];

    if (adhesionLogs.length === 0) return 0;

    return adhesionLogs
      .map(({ adhesion, plan, member }) =>
        calcAdhesionPrice(adhesion, plan, member)
      )
      .reduce(sumNumbers);
  },
  sumAllLossLogsByDate(date) {
    const expenseLogs = get().getLogsByDate("expense", date) as LossLog[];
    const investimentLogs = get().getLogsByDate(
      "investment",
      date
    ) as LossLog[];

    if (expenseLogs.length === 0 && investimentLogs.length === 0)
      return {
        expenseLoss: 0,
        investmentLoss: 0,
        loss: 0,
      };

    const expenseLoss =
      expenseLogs.length > 0
        ? expenseLogs.map((log) => log.value).reduce(sumNumbers)
        : 0;

    const investmentLoss =
      investimentLogs.length > 0
        ? investimentLogs.map((log) => log.value).reduce(sumNumbers)
        : 0;

    return {
      expenseLoss,
      investmentLoss,
      loss: expenseLoss + investmentLoss,
    };
  },
}));
