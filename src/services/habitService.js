// services/habitService.js

/**
 * Calculates the completion percentage for a single day
 * Returns 0 if no habits exist (instead of wrong values)
 */
export const calculateDayScore = (day) => {
  if (!day || !day.habits || Object.keys(day.habits).length === 0) {
    return 0;
  }

  const total = Object.keys(day.habits).length;
  const completed = Object.values(day.habits).filter(h => h.done).length;

  return Math.round((completed / total) * 100);
};

/**
 * Calculates current streak and longest streak
 * A day counts as successful if completion > 0%
 */
export const calculateStreaks = (days) => {
  let current = 0;
  let longest = 0;

  let tempStreak = 0;

  // Calculate longest streak (anywhere in history)
  days.forEach((day) => {
    if (calculateDayScore(day) > 0) {
      tempStreak++;
      longest = Math.max(longest, tempStreak);
    } else {
      tempStreak = 0;
    }
  });

  // Calculate current streak (from today backwards)
  for (let i = days.length - 1; i >= 0; i--) {
    if (calculateDayScore(days[i]) > 0) {
      current++;
    } else {
      break; // streak broken
    }
  }

  return { current, longest };
};