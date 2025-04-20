"use client";

import { MEMBERS_DATA } from "@/data/MEMBERS_DATA";
import { DB } from "@/types/Db.typ";
import { Member } from "@/types/Member.type";
import { PlanPayment } from "@/types/Payment.type";
import { create } from "zustand";
import { add as addDate, differenceInDays } from "date-fns";
import { Plan } from "@/types/Plan.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";

type MemberState = {
  members: Member[];
  selectedMember: Member | null;
  selectedPlanPayment: PlanPayment | null;
  setSelectedPlanPayment: (planPayment: PlanPayment | null) => void;
  setSelectedMember: (member: Member | null) => void;
  getById: (id: string) => Member | null;
  add: (input: Omit<Member, keyof DB>) => void;
  remove: (id: string) => void;
  update: (id: string, input: Partial<Omit<Member, keyof DB>>) => Member | null;
  subscribe: (
    memberId: string,
    input: Omit<PlanPayment, keyof DB | "startsIn" | "expiresIn">
  ) => void;
  unsubscribe: (memberId: string, planPaymentId: string) => void;
  updatePlanPayment: (
    memberId: string,
    planPaymentId: string,
    input: Partial<{ plan: Plan; months: number }>
  ) => void;
  getLeftDays: (member: Member, excludes?: string[]) => number;
  getActivePlanPayments: (memberId: string) => PlanPayment[];
};

export const useMemberStore = create<MemberState>((set, get) => ({
  members: MEMBERS_DATA,
  selectedMember: null,
  selectedPlanPayment: null,
  setSelectedPlanPayment(planPayment) {
    set(() => ({ selectedPlanPayment: planPayment }));
  },
  setSelectedMember(member) {
    set(() => ({ selectedMember: member }));
  },
  add(input) {
    set((state) => ({
      members: [...state.members, { ...generateDefaultDbFields(), ...input }],
    }));
  },
  remove(id) {
    const updatedMembers = get().members.filter((member) => member.id !== id);
    set((state) => ({ ...state, members: updatedMembers }), true);
  },
  update(id, input) {
    let updatedMember: Member | null = null;

    const updatedMembers = get().members.map((member) => {
      if (member.id === id) {
        updatedMember = { ...member, updatedAt: new Date(), ...input };
        return updatedMember;
      }
      return member;
    });

    set((state) => ({ ...state, members: updatedMembers }), true);

    return updatedMember;
  },
  getById(id) {
    const foundMember = get().members.find((member) => member.id === id);
    if (!foundMember) return null;
    return foundMember;
  },
  getLeftDays(member: Member, excludes = []) {
    // Check if there's left days at the last plan payment
    let totalLeftDays = 0;
    const activePlanPayments = get().getActivePlanPayments(member.id);
    if (activePlanPayments.length === 0) return totalLeftDays;

    const filteredActivePlanPayments = activePlanPayments.filter(
      (planPayment) => !excludes.includes(planPayment.id)
    );
    if (filteredActivePlanPayments.length === 0) return totalLeftDays;

    const lasActivePayment =
      filteredActivePlanPayments[filteredActivePlanPayments.length - 1];

    // Calc left days
    let leftDays = differenceInDays(lasActivePayment.expiresIn, new Date());

    // plus 1 for day correction
    if (leftDays > 0) {
      totalLeftDays += leftDays + 1;
    }

    return totalLeftDays;
  },
  subscribe(memberId, input) {
    // Check if members exists
    const member = get().getById(memberId);
    if (!member) return;

    // Check if there's left days at the last plan payment
    const leftDaysLastPlanPayment = get().getLeftDays(member);

    console.log(input.months * 30, leftDaysLastPlanPayment);

    const updatedMember = get().update(memberId, {
      ...member,
      planPayments: [
        ...member.planPayments,
        {
          ...input,
          ...generateDefaultDbFields(),
          startsIn: new Date(),
          expiresIn: addDate(new Date(), {
            days: input.months * 30 + leftDaysLastPlanPayment,
          }),
        },
      ],
    });

    // Update selected member
    if (updatedMember) get().setSelectedMember(updatedMember);
  },
  unsubscribe(memberId, planPaymentId) {
    // Found member
    const foundMember = get().getById(memberId);
    if (!foundMember) return;

    // Change specific plan payment
    const updatedPlanPayments = foundMember.planPayments.filter(
      (planPayment) => planPayment.id != planPaymentId
    );

    // Update plan payments
    const updatedMember = get().update(memberId, {
      planPayments: updatedPlanPayments,
    });

    // Update selected member
    get().setSelectedMember(updatedMember);
  },
  updatePlanPayment(memberId, planPaymentId, input) {
    // Found member
    const foundMember = get().getById(memberId);
    if (!foundMember) return;

    const currentDate = new Date();

    // Update specific plan payment
    const updatedPlanPayments = foundMember.planPayments.map((planPayment) => {
      // Find specific plan payment
      if (planPayment.id === planPaymentId) {
        let leftDaysLastPlanPayment = get().getLeftDays(foundMember, [
          planPayment.id,
        ]);

        const isMonthsDiff = input.months && input.months != planPayment.months;
        const pastDays = differenceInDays(planPayment.startsIn, new Date());

        return {
          ...planPayment,
          ...input,
          startsIn: isMonthsDiff ? currentDate : planPayment.startsIn,
          expiresIn: isMonthsDiff
            ? addDate(currentDate, {
                days: input.months! * 30 + leftDaysLastPlanPayment - pastDays,
              })
            : planPayment.expiresIn,
        };
      }
      // Return others plan payments
      return planPayment;
    });

    const updatedMember = get().update(foundMember.id, {
      ...foundMember,
      planPayments: updatedPlanPayments,
    });

    get().setSelectedMember(updatedMember);
  },
  getActivePlanPayments(memberId) {
    let activePlanPayments: PlanPayment[] = [];
    const foundMember = get().getById(memberId);

    if (!foundMember) return activePlanPayments;

    activePlanPayments = foundMember.planPayments.filter((payment) => {
      return differenceInDays(payment.expiresIn, new Date()) > 0;
    });

    return activePlanPayments;
  },
}));
