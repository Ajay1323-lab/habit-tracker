import { createContext, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { getUserEmail } from "../utils/authUtils";
import { ICON_OPTIONS, COLOR_OPTIONS } from "../utils/habitUiOptions";

export const HabitContext = createContext();

const DAYS_IN_MONTH = dayjs().daysInMonth();

/* ---------- Helpers ---------- */
const createEmptyDay = (date, habitMaster) => {
  const habits = {};
  habitMaster.forEach(h => {
    habits[h.key] = { done: false, note: "" };
  });

  return {
    date: date.format("YYYY-MM-DD"),
    habits,
  };
};

const buildInitialState = (habitMaster = []) => ({
  habitMaster,
  days: Array.from({ length: DAYS_IN_MONTH }, (_, i) =>
    createEmptyDay(dayjs().startOf("month").add(i, "day"), habitMaster)
  ),
});

/* ---------- Provider ---------- */
export const HabitProvider = ({ children }) => {
  const [email, setEmail] = useState(getUserEmail());

  /* 🔁 react to profile save */
  useEffect(() => {
    const sync = () => setEmail(getUserEmail());
    window.addEventListener("storage", sync);
    sync();
    return () => window.removeEventListener("storage", sync);
  }, []);

  const STORAGE_KEY = useMemo(
    () => (email ? `habitApp_${email}` : null),
    [email]
  );

  const [state, setState] = useState(() => {
    if (!STORAGE_KEY) return buildInitialState([]);
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : buildInitialState([]);
  });

  /* reload when email changes */
  useEffect(() => {
    if (!STORAGE_KEY) {
      setState(buildInitialState([]));
      return;
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    setState(saved ? JSON.parse(saved) : buildInitialState([]));
  }, [STORAGE_KEY]);

  /* persist */
  useEffect(() => {
    if (STORAGE_KEY) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, STORAGE_KEY]);

  /* ---------- Actions ---------- */

  const addHabit = ({ label, icon, color }) => {
    if (!email) return false;
    const key = label.toLowerCase().replace(/\s+/g, "_");

    setState(prev => {
      if (prev.habitMaster.some(h => h.key === key)) return prev;

      const index = prev.habitMaster.length;

      const newHabit = {
        key,
        label,
        icon: icon || ICON_OPTIONS[index % ICON_OPTIONS.length],
        color: color || COLOR_OPTIONS[index % COLOR_OPTIONS.length],
      };

      return {
        habitMaster: [...prev.habitMaster, newHabit],
        days: prev.days.map(day => ({
          ...day,
          habits: {
            ...day.habits,
            [key]: { done: false, note: "" },
          },
        })),
      };
    });

    return true;
  };

  const toggleHabit = (dayIndex, habitKey) => {
    setState(prev => {
      const days = [...prev.days];
      days[dayIndex] = {
        ...days[dayIndex],
        habits: {
          ...days[dayIndex].habits,
          [habitKey]: {
            ...days[dayIndex].habits[habitKey],
            done: !days[dayIndex].habits[habitKey].done,
          },
        },
      };
      return { ...prev, days };
    });
  };

  const updateHabitNote = (dayIndex, habitKey, note) => {
    setState(prev => {
      const days = [...prev.days];
      days[dayIndex] = {
        ...days[dayIndex],
        habits: {
          ...days[dayIndex].habits,
          [habitKey]: {
            ...days[dayIndex].habits[habitKey],
            note,
          },
        },
      };
      return { ...prev, days };
    });
  };

  const deleteHabit = (habitKey) => {
    setState(prev => ({
      habitMaster: prev.habitMaster.filter(h => h.key !== habitKey),
      days: prev.days.map(day => {
        const { [habitKey]: _, ...rest } = day.habits;
        return { ...day, habits: rest };
      }),
    }));
  };


  return (
    <HabitContext.Provider
      value={{
        days: state.days,
        habitMaster: state.habitMaster,
        addHabit,
        toggleHabit,
        updateHabitNote,
        deleteHabit,
        hasEmail: !!email,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
