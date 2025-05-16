"use client";

import { MEMBERS_DATA } from "@/data/MEMBERS_DATA";
import { create } from "zustand";
import generateDefaultDbFields from "@/utils/generateDefaultDbFields";
import type { Plan } from "@/types/Plan.type";
import type { Purchase } from "@/types/Purchase.type";
import type { AdhesionPayment } from "@/types/AdhesionPayment.type";
import type { PlanDiary } from "@/types/PlanDiary.type";
import type { Member } from "@/types/Member.type";
import type { Enrollment } from "@/types/Enrollment.type";
import type { DB } from "@/types/Db.type";
import createAdhesionPayment from "@/utils/createAdhesionPayment";
import createPurchase from "@/utils/createPurchase";
import createEnrollment from "@/utils/createEnrollment";
import updateEnrollment from "@/utils/updateEnrollment";
import createPlanDiary from "@/utils/createPlanDiary";
import updatePlanDiary from "@/utils/updatePlanDiary";
import updatePurchase from "@/utils/updatePurchase";
import type { Optional } from "@/types/Optional.type";
import { EnrollmentLog } from "@/types/Log.type";

type MemberState = {
  members: Member[];
  selectedMember: Member | null;
  selectedEnrollment: Enrollment | null;
  setSelectedEnrollment: (enrollment: Enrollment | null) => void;
  setSelectedMember: (member: Member | null) => void;
  getMemberById: (id: string) => Member | null;
  add: (
    input: Optional<
      Omit<Member, keyof DB>,
      "adhesionsPayments" | "diaries" | "enrollments" | "purchases" | "role"
    >
  ) => void;
  remove: (id: string) => void;
  update: (
    memberId: string,
    input: Partial<Omit<Member, keyof DB>>
  ) => Member | null;
  addEnrollment: (
    memberId: string,
    input: Omit<Enrollment, keyof DB | "startsIn" | "expiresIn">
  ) => Enrollment | null;
  removeEnrollment: (memberId: string, enrollmentId: string) => void;
  updateEnrollment: (
    memberId: string,
    enrollmentId: string,
    input: Partial<{ plan: Plan; months: number }>
  ) => Enrollment | null;
  addPurchase: (
    memberId: string,
    input: Omit<Purchase, keyof DB>
  ) => Purchase | null;
  updatePurchase: (
    memberId: string,
    purchaseId: string,
    input: Partial<Omit<Purchase, keyof DB>>
  ) => Purchase | null;
  removePurchase: (memberId: string, purchaseId: string) => void;
  addAdhesionPayment: (
    memberId: string,
    adhesionYear: number
  ) => AdhesionPayment | null;
  removeAdhesionPayment: (memberId: string, adhesionId: string) => void;
  addDiary: (
    memberId: string,
    input: Omit<PlanDiary, keyof DB | "expiresIn">
  ) => PlanDiary | null;
  updateDiary: (
    memberId: string,
    diaryId: string,
    input: Omit<PlanDiary, keyof DB | "expiresIn">
  ) => PlanDiary | null;
  removeDiary: (memberId: string, diaryId: string) => void;
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
  getMemberById(memberId) {
    const foundMember = get().members.find((member) => member.id === memberId);
    if (!foundMember) return null;
    return foundMember;
  },
  add(input) {
    set((state) => ({
      members: [
        ...state.members,
        {
          ...generateDefaultDbFields(),
          role: null,
          adhesionsPayments: [],
          enrollments: [],
          diaries: [],
          purchases: [],
          ...input,
        },
      ],
    }));
  },
  update(memberId, input) {
    let updatedMember: Member | null = null;

    const updatedMembers = get().members.map((member) => {
      if (member.id === memberId) {
        updatedMember = { ...member, updatedAt: new Date(), ...input };
        return updatedMember;
      }
      return member;
    });

    set((state) => ({ ...state, members: updatedMembers }), true);

    return updatedMember;
  },
  remove(memberId) {
    const updatedMembers = get().members.filter(
      (member) => member.id !== memberId
    );
    set((state) => ({ ...state, members: updatedMembers }), true);
  },
  addEnrollment(memberId, input) {
    // Check if members exists
    const member = get().getMemberById(memberId);
    if (!member) return null;

    // Create enrollment
    const enrollment = createEnrollment(member, input);

    const updatedMember = get().update(memberId, {
      ...member,
      enrollments: [...member.enrollments, enrollment],
    });

    // Update selected member
    if (updatedMember) get().setSelectedMember(updatedMember);

    return enrollment;
  },
  updateEnrollment(memberId, enrollmentId, input) {
    // Found member
    const foundMember = get().getMemberById(memberId);
    if (!foundMember) return null;

    let updatedEnrollment: Enrollment | null = null;

    // Update specific plan payment
    const updatedEnrollments = foundMember.enrollments.map((enrollment) => {
      // Find and update the specific enrollment
      if (enrollment.id === enrollmentId) {
        updatedEnrollment = updateEnrollment(enrollment, foundMember, input);
        return updatedEnrollment;
      }

      // Return others plan payments
      return enrollment;
    });

    const updatedMember = get().update(foundMember.id, {
      ...foundMember,
      enrollments: updatedEnrollments,
    });

    get().setSelectedMember(updatedMember);

    return updatedEnrollment;
  },
  removeEnrollment(memberId, enrollmentId) {
    // Found member
    const foundMember = get().getMemberById(memberId);
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
  addPurchase(memberId, input) {
    const foundMember = get().getMemberById(memberId);
    if (!foundMember) return null;

    const newPurchase = createPurchase(input);

    const updatedMember = get().update(memberId, {
      purchases: [...foundMember.purchases, newPurchase],
    });

    get().setSelectedMember(updatedMember);

    return newPurchase;
  },
  updatePurchase(memberId, purchaseId, input) {
    const foundMember = get().getMemberById(memberId);
    if (!foundMember) return null;

    let updatedPurchase: Purchase | null = null;

    const updatedPurchases = foundMember.purchases.map((purchase) => {
      if (purchase.id === purchaseId) {
        updatedPurchase = updatePurchase(purchase, input);
        return updatedPurchase;
      }
      return purchase;
    });

    const updatedMember = get().update(foundMember.id, {
      purchases: updatedPurchases,
    });

    get().setSelectedMember(updatedMember);

    return updatedPurchase;
  },
  removePurchase(memberId, purchaseId) {
    const foundMember = get().getMemberById(memberId);
    if (!foundMember) return;

    const updatedPurchases = foundMember.purchases.filter(
      (purchase) => purchase.id !== purchaseId
    );

    const updatedMember = get().update(foundMember.id, {
      purchases: updatedPurchases,
    });

    get().setSelectedMember(updatedMember);
  },
  addAdhesionPayment(memberId, adhesionYear) {
    const foundMember = get().getMemberById(memberId);
    if (!foundMember) return null;

    const newAdhesionPayment = createAdhesionPayment({ year: adhesionYear });

    const updatedMember = get().update(foundMember.id, {
      ...foundMember,
      adhesionsPayments: [...foundMember.adhesionsPayments, newAdhesionPayment],
    });

    get().setSelectedMember(updatedMember);

    return newAdhesionPayment;
  },
  removeAdhesionPayment(memberId, adhesionPaymentId) {
    const foundMember = get().getMemberById(memberId);
    if (!foundMember) return;

    const updatedAdhesionPayments = foundMember.adhesionsPayments.filter(
      (adhesionPayment) => adhesionPayment.id !== adhesionPaymentId
    );

    get().update(foundMember.id, {
      adhesionsPayments: updatedAdhesionPayments,
    });
  },
  addDiary(memberId, input) {
    const foundMember = get().getMemberById(memberId);
    if (!foundMember) return null;

    const newDiary = createPlanDiary(input, foundMember);

    get().update(memberId, { diaries: [...foundMember.diaries, newDiary] });

    return newDiary;
  },
  updateDiary(memberId, diaryId, input) {
    const foundMember = get().getMemberById(memberId);
    if (!foundMember) return null;

    const updatedDiary: PlanDiary | null = null;

    const updatedDiaries = foundMember.diaries.map((diary) => {
      if (diary.id === diaryId) {
        return updatePlanDiary(diary, input, foundMember);
      }
      return diary;
    });

    get().update(memberId, {
      diaries: updatedDiaries,
    });

    return updatedDiary;
  },
  removeDiary(memberId, diaryId) {
    const foundMember = get().getMemberById(memberId);
    if (!foundMember) return null;

    const updatedDiaries = foundMember.diaries.filter(
      (diary) => (diary.id! += diaryId)
    );

    get().update(memberId, {
      diaries: updatedDiaries,
    });
  },
}));
