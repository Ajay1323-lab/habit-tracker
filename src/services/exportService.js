import * as XLSX from "xlsx";
import dayjs from "dayjs";

export const exportToExcel = (days, habitMaster) => {
  const workbook = XLSX.utils.book_new();
  
  // ====================================
  // SHEET 1: DAILY HABIT TRACKER
  // ====================================
  const dailyData = [];
  
  // Header row
  const headers = [
    "Date",
    "Day",
    ...habitMaster.map(h => h.label),
    "Daily Score",
    "Completion %"
  ];
  dailyData.push(headers);

  // Data rows
  days.forEach(day => {
    const row = [];
    const date = dayjs(day.date);
    
    row.push(date.format("DD/MM/YYYY"));
    row.push(date.format("dddd"));
    
    // Add habit status (1 = done, 0 = not done)
    habitMaster.forEach(habit => {
      const habitData = day.habits[habit.key];
      row.push(habitData?.done ? 1 : 0);
    });
    
    // Calculate daily score
    const totalHabits = habitMaster.length;
    const completedHabits = habitMaster.filter(
      h => day.habits[h.key]?.done
    ).length;
    
    row.push(completedHabits);
    row.push(Math.round((completedHabits / totalHabits) * 100));
    
    dailyData.push(row);
  });

  // Create daily sheet
  const dailySheet = XLSX.utils.aoa_to_sheet(dailyData);
  
  // Set column widths
  dailySheet['!cols'] = [
    { wch: 12 }, // Date
    { wch: 12 }, // Day
    ...habitMaster.map(() => ({ wch: 10 })), // Habits
    { wch: 12 }, // Daily Score
    { wch: 14 }  // Completion %
  ];

  XLSX.utils.book_append_sheet(workbook, dailySheet, "Daily Tracker");

  // ====================================
  // SHEET 2: HABIT DETAILS WITH NOTES
  // ====================================
  const notesData = [];
  
  // Header for notes sheet
  notesData.push(["Date", "Day", "Habit", "Status", "Notes"]);
  
  days.forEach(day => {
    const date = dayjs(day.date);
    
    habitMaster.forEach(habit => {
      const habitData = day.habits[habit.key];
      if (habitData?.done || habitData?.note) {
        notesData.push([
          date.format("DD/MM/YYYY"),
          date.format("dddd"),
          `${habit.icon} ${habit.label}`,
          habitData.done ? "✓ Done" : "○ Pending",
          habitData.note || "-"
        ]);
      }
    });
  });

  const notesSheet = XLSX.utils.aoa_to_sheet(notesData);
  
  // Set column widths for notes
  notesSheet['!cols'] = [
    { wch: 12 }, // Date
    { wch: 12 }, // Day
    { wch: 30 }, // Habit
    { wch: 12 }, // Status
    { wch: 50 }  // Notes
  ];

  XLSX.utils.book_append_sheet(workbook, notesSheet, "Habit Notes");

  // ====================================
  // SHEET 3: MONTHLY SUMMARY
  // ====================================
  const summaryData = [];
  
  // Month header
  const monthName = dayjs(days[0].date).format("MMMM YYYY");
  summaryData.push([`Monthly Summary - ${monthName}`]);
  summaryData.push([]); // Empty row
  
  // Summary headers
  summaryData.push([
    "Habit",
    "Total Days",
    "Completed",
    "Completion %",
    "Streak"
  ]);

  // Calculate stats for each habit
  habitMaster.forEach(habit => {
    const totalDays = days.length;
    const completedDays = days.filter(
      d => d.habits[habit.key]?.done
    ).length;
    const completionPercent = Math.round((completedDays / totalDays) * 100);
    
    // Calculate longest streak
    let currentStreak = 0;
    let maxStreak = 0;
    
    days.forEach(day => {
      if (day.habits[habit.key]?.done) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });

    summaryData.push([
      `${habit.icon} ${habit.label}`,
      totalDays,
      completedDays,
      completionPercent,
      maxStreak
    ]);
  });

  // Add overall summary
  summaryData.push([]); // Empty row
  summaryData.push(["Overall Statistics"]);
  
  const totalPossible = days.length * habitMaster.length;
  const totalCompleted = days.reduce((sum, day) => {
    return sum + habitMaster.filter(h => day.habits[h.key]?.done).length;
  }, 0);
  const overallPercent = Math.round((totalCompleted / totalPossible) * 100);

  summaryData.push(["Total Habits", habitMaster.length]);
  summaryData.push(["Total Days Tracked", days.length]);
  summaryData.push(["Total Possible Completions", totalPossible]);
  summaryData.push(["Total Completed", totalCompleted]);
  summaryData.push(["Overall Completion Rate", `${overallPercent}%`]);

  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  
  // Set column widths for summary
  summarySheet['!cols'] = [
    { wch: 35 }, // Habit
    { wch: 15 }, // Total Days
    { wch: 15 }, // Completed
    { wch: 15 }, // Completion %
    { wch: 15 }  // Streak
  ];

  XLSX.utils.book_append_sheet(workbook, summarySheet, "Monthly Summary");

  // ====================================
  // SHEET 4: WEEKLY BREAKDOWN
  // ====================================
  const weeklyData = [];
  weeklyData.push(["Week", "Start Date", "End Date", "Habits Completed", "Completion %"]);

  // Group days into weeks
  let weekNum = 1;
  for (let i = 0; i < days.length; i += 7) {
    const weekDays = days.slice(i, i + 7);
    const startDate = dayjs(weekDays[0].date).format("DD/MM/YYYY");
    const endDate = dayjs(weekDays[weekDays.length - 1].date).format("DD/MM/YYYY");
    
    const weekTotal = weekDays.reduce((sum, day) => {
      return sum + habitMaster.filter(h => day.habits[h.key]?.done).length;
    }, 0);
    
    const weekPossible = weekDays.length * habitMaster.length;
    const weekPercent = Math.round((weekTotal / weekPossible) * 100);

    weeklyData.push([
      `Week ${weekNum}`,
      startDate,
      endDate,
      `${weekTotal} / ${weekPossible}`,
      weekPercent
    ]);
    
    weekNum++;
  }

  const weeklySheet = XLSX.utils.aoa_to_sheet(weeklyData);
  weeklySheet['!cols'] = [
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 },
    { wch: 15 }
  ];

  XLSX.utils.book_append_sheet(workbook, weeklySheet, "Weekly Breakdown");

  // ====================================
  // EXPORT FILE
  // ====================================
  const fileName = `Habit_Tracker_${dayjs(days[0].date).format("MMMM_YYYY")}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};