"use client";

import { MEMBERS_DATA } from "@/data/MEMBERS_DATA";
import { DB } from "@/types/Db.typ";
import type { Member } from "@/types/Member.type";
import type { Enrollment } from "@/types/Enrollment.type";
import { create } from "zustand";
import { add as addDate, differenceInDays } from "date-fns";
import type { Plan } from "@/types/Plan.type";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";
import type { Purchase } from "@/types/Purchase.type";
import { AdhesionPayment } from "@/types/AdhesionPayment.type";
import { Adhesion } from "@/types/Adhesion.type";

type MemberState = {
  members: Member[];
  selectedMember: Member | null;
  selectedEnrollment: Enrollment | null;
  setSelectedEnrollment: (enrollment: Enrollment | null) => void;
  setSelectedMember: (member: Member | null) => void;
  getById: (id: string) => Member | null;
  add: (input: Omit<Member, keyof DB>) => void;
  remove: (id: string) => void;
  update: (
    memberId: string,
    input: Partial<Omit<Member, keyof DB>>
  ) => Member | null;
  subscribe: (
    memberId: string,
    input: Omit<Enrollment, keyof DB | "startsIn" | "expiresIn">
  ) => void;
  unsubscribe: (memberId: string, enrollmentId: string) => void;
  updateEnrollment: (
    memberId: string,
    enrollmentId: string,
    input: Partial<{ plan: Plan; months: number }>
  ) => void;
  getLeftDays: (member: Member, excludes?: string[]) => number;
  getActiveEnrollments: (memberId: string) => Enrollment[];
  addPurchase: (memberId: string, input: Omit<Purchase, keyof DB>) => void;
  updatePurchase: (
    memberId: string,
    purchaseId: string,
    input: Partial<Omit<Purchase, keyof DB>>
  ) => void;
  removePurchase: (memberId: string, purchaseId: string) => void;
  getPurchaseById: (id: string) => Purchase | null;
  payAdhesion: (memberId: string, year: number) => void;
  getAdhesionPaymentByYear: (
    memberId: string,
    year: number
  ) => AdhesionPayment | null;
};

export const useMemberStore = create<MemberState>((set, get) => ({
  members: MEMBERS_DATA,
  selectedMember: null,
  selectedEnrollment: null,
  setSelectedEnrollment(enrollment) {
    set(() => ({ selectedEnrollment: enrollment }));
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
    const activeEnrollments = get().getActiveEnrollments(member.id);
    if (activeEnrollments.length === 0) return totalLeftDays;

    const filteredActiveEnrollments = activeEnrollments.filter(
      (enrollment) => !excludes.includes(enrollment.id)
    );
    if (filteredActiveEnrollments.length === 0) return totalLeftDays;

    const lasActivePayment =
      filteredActiveEnrollments[filteredActiveEnrollments.length - 1];

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
    const leftDaysLastEnrollment = get().getLeftDays(member);

    const updatedMember = get().update(memberId, {
      ...member,
      enrollments: [
        ...member.enrollments,
        {
          ...input,
          ...generateDefaultDbFields(),
          startsIn: new Date(),
          expiresIn: addDate(new Date(), {
            days: input.months * 30 + leftDaysLastEnrollment,
          }),
        },
      ],
    });

    // Update selected member
    if (updatedMember) get().setSelectedMember(updatedMember);
  },
  unsubscribe(memberId, enrollmentId) {
    // Found member
    const foundMember = get().getById(memberId);
    if (!foundMember) return;

    // Change specific plan payment
    const updatedEnrollments = foundMember.enrollments.filter(
      (enrollment) => enrollment.id != enrollmentId
    );

    // Update plan payments
    const updatedMember = get().update(memberId, {
      enrollments: updatedEnrollments,
    });

    // Update selected member
    get().setSelectedMember(updatedMember);
  },
  updateEnrollment(memberId, enrollmentId, input) {
    // Found member
    const foundMember = get().getById(memberId);
    if (!foundMember) return;

    const currentDate = new Date();

    // Update specific plan payment
    const updatedEnrollments = foundMember.enrollments.map((enrollment) => {
      // Find specific plan payment
      if (enrollment.id === enrollmentId) {
        let leftDaysLastEnrollment = get().getLeftDays(foundMember, [
          enrollment.id,
        ]);

        const isMonthsDiff = input.months && input.months != enrollment.months;
        const pastDays = differenceInDays(enrollment.startsIn, new Date());

        return {
          ...enrollment,
          ...input,
          startsIn: isMonthsDiff ? currentDate : enrollment.startsIn,
          expiresIn: isMonthsDiff
            ? addDate(currentDate, {
                days: input.months! * 30 + leftDaysLastEnrollment - pastDays,
              })
            : enrollment.expiresIn,
        };
      }
      // Return others plan payments
      return enrollment;
    });

    const updatedMember = get().update(foundMember.id, {
      ...foundMember,
      enrollments: updatedEnrollments,
    });

    get().setSelectedMember(updatedMember);
  },
  getActiveEnrollments(memberId) {
    let activeEnrollments: Enrollment[] = [];
    const foundMember = get().getById(memberId);

    if (!foundMember) return activeEnrollments;

    activeEnrollments = foundMember.enrollments.filter((payment) => {
      return differenceInDays(payment.expiresIn, new Date()) > 0;
    });

    return activeEnrollments;
  },
  addPurchase(memberId, input) {
    const foundMember = get().getById(memberId);
    if (!foundMember) return;

    const updatedMember = get().update(memberId, {
      purchases: [
        ...foundMember.purchases,
        {
          ...generateDefaultDbFields(),
          ...input,
        },
      ],
    });

    get().setSelectedMember(updatedMember);
  },
  updatePurchase(memberId, purchaseId, input) {
    const foundMember = get().getById(memberId);
    if (!foundMember) return;

    const updatedPurchases = foundMember.purchases.map((purchase) => {
      if (purchase.id === purchaseId) {
        return {
          ...purchase,
          ...input,
        };
      }
      return purchase;
    });

    const updatedMember = get().update(foundMember.id, {
      purchases: updatedPurchases,
    });

    get().setSelectedMember(updatedMember);
  },
  getPurchaseById(id) {
    let foundPurchase: Purchase | null = null;

    for (let member of get().members) {
      const purchase = member.purchases.find((purchase) => purchase.id === id);
      if (purchase) {
        foundPurchase = purchase;
        break;
      }
    }
    return foundPurchase;
  },
  removePurchase(memberId, purchaseId) {
    const foundMember = get().getById(memberId);
    if (!foundMember) return;

    const updatedPurchases = foundMember.purchases.filter(
      (purchase) => purchase.id !== purchaseId
    );

    const updatedMember = get().update(foundMember.id, {
      purchases: updatedPurchases,
    });

    get().setSelectedMember(updatedMember);
  },
  payAdhesion(memberId, year) {
    const foundMember = get().getById(memberId);
    if (!foundMember) return;

    const newAdhesion: AdhesionPayment = {
      ...generateDefaultDbFields(),
      year,
      paidAt: new Date(),
    };

    const updatedMember = get().update(foundMember.id, {
      ...foundMember,
      adhesionsPayments: [...foundMember.adhesionsPayments, newAdhesion],
    });

    get().setSelectedMember(updatedMember);
  },
  getAdhesionPaymentByYear(memberId, year) {
    const foundMember = get().getById(memberId);
    if (!foundMember) return null;

    const foundAdhesion = foundMember.adhesionsPayments.find(
      (adhesionPayment) => adhesionPayment.year === year
    );

    if (!foundAdhesion) return null;

    return foundAdhesion;
  },
}));
