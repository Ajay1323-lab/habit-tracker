import { createContext, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { getUserEmail } from "../utils/authUtils";
import { ICON_OPTIONS, COLOR_OPTIONS } from "../utils/habitUiOptions";

export const HabitContext = createContext();

const DAYS_IN_MONTH = dayjs().daysInMonth();

/* ---------- Email Validation Helper ---------- */
const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length > 5;
};

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
  const [email, setEmail] = useState(() => {
    const userEmail = getUserEmail();
    return isValidEmail(userEmail) ? userEmail : null;
  });

  /* 🔁 react to profile save */
  useEffect(() => {
    const sync = () => {
      const userEmail = getUserEmail();
      setEmail(isValidEmail(userEmail) ? userEmail : null);
    };
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
    // Prevent duplicate
    if (prev.habitMaster.some(h => h.key === key)) return prev;

    const index = prev.habitMaster.length;
    const newHabit = {
      key,
      label,
      icon: icon || ICON_OPTIONS[index % ICON_OPTIONS.length],
      color: color || COLOR_OPTIONS[index % COLOR_OPTIONS.length],
    };

    // Only add the new habit from TODAY onwards
    const today = dayjs().format("YYYY-MM-DD");

    const updatedDays = prev.days.map(day => {
      // If this day is in the past → do NOT add the new habit
      if (day.date < today) {
        return day;
      }

      // For today and future days → add the habit as undone
      return {
        ...day,
        habits: {
          ...day.habits,
          [key]: { done: false, note: "" },
        },
      };
    });

    return {
      habitMaster: [...prev.habitMaster, newHabit],
      days: updatedDays,
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

  // Check if user has completed profile
  const getUserProfile = () => {
    try {
      const profile = localStorage.getItem('userProfile');
      return profile ? JSON.parse(profile) : null;
    } catch {
      return null;
    }
  };

  const userProfile = getUserProfile();
  const hasCompleteProfile = userProfile && 
                            userProfile.name && 
                            userProfile.name.trim() !== '' && 
                            isValidEmail(userProfile.email);

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
        userProfile,
        hasCompleteProfile,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};