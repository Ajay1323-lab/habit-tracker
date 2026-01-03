import dayjs from "dayjs";

export const getTodayIndex = () =>
  dayjs().date() - 1; // Jan 1 = index 0
