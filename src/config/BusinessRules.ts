export const BUSINESS_RULES = {
  // Min days to not pay fee to change plans
  daysBeforeChangePlanWithoutTax: 15,

  // Min days to become a veteran member
  daysBeforeVeteran: 40,

  // Money Fee to pay per day
  lateFeePerDay: 1.5,

  // Visual feedback when time is this value and before workout finishes (in min)
  timeToWarningBeforeFinishes: 5,

  // Workout counter speed in ms (don't change it)
  // 1 min = 60000 ms
  workoutTick: 60000,

  // Workout changes state to finished when time is
  minTimeToTimeout: 0,

  // Timeout workout is removed when time is this value
  maxTimeAfterTimeout: 6,
};
