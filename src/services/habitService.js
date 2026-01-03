export const calculateDayScore = (day) =>
  Object.values(day.habits).filter(Boolean).length;

export const calculateStreaks = (days) => {
  let current = 0, longest = 0, temp = 0;

  days.forEach(d => {
    if (calculateDayScore(d) > 0) {
      temp++;
      longest = Math.max(longest, temp);
    } else temp = 0;
  });

  for (let i = days.length - 1; i >= 0; i--) {
    if (calculateDayScore(days[i]) > 0) current++;
    else break;
  }

  return { current, longest };
};
