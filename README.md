# 🧠 Habit Tracker App

A modern Habit Tracker application built with **React + Vite**, designed to help users build consistency by tracking daily habits, goals, and progress through a clean and colorful UI.

---

## 🚀 Features

- ➕ Add and manage daily habits
- ✅ Mark habits as completed
- 📝 Add notes to habits
- 🎯 Set and track goals
- 📊 View insights, progress, and streaks
- 👤 Profile-based habit tracking
- 🎨 Clean UI using Material UI
- 💾 Persistent data using LocalStorage
- ⚡ Fast development with Vite

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **UI Library:** Material UI (MUI)
- **State Management:** React Context API
- **Routing:** React Router
- **Date Handling:** Day.js
- **Storage:** Browser LocalStorage

---

## 📂 Project Folder Structure

```text
habit-tracker/
├── node_modules/
├── public/
│
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   ├── AppLayout.jsx
│   │   ├── routes.jsx
│   │   └── theme.jsx
│   │
│   ├── assets/
│   │   └── react.svg
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── dashboard/
│   │   └── habit/
│   │       ├── AddHabit.jsx
│   │       ├── HabitCalendar.jsx
│   │       ├── HabitCard.jsx
│   │       └── HabitList.jsx
│   │
│   ├── context/
│   │   ├── HabitContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── hooks/
│   │   └── useLocalStorage.js
│   │
│   ├── pages/
│   │   ├── Goals.jsx
│   │   ├── Insights.jsx
│   │   ├── Profile.jsx
│   │   ├── Progress.jsx
│   │   └── Streaks.jsx
│   │
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
🧩 Key Modules Explained
📌 Habit Module
AddHabit.jsx – Add new habits

HabitList.jsx – Display and manage daily habits

HabitCard.jsx – Individual habit UI

HabitCalendar.jsx – Date-based habit tracking

📊 Pages
Goals.jsx – Habit goals management

Insights.jsx – Habit insights & analytics

Progress.jsx – Progress tracking

Streaks.jsx – Habit streak tracking

Profile.jsx – User profile details

🧠 Context
HabitContext.jsx – Central state management for habits

ThemeContext.jsx – Application theming support

⚙️ Installation & Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/habit-tracker.git
Navigate to the project directory:

bash
Copy code
cd habit-tracker
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Open in browser:

arduino
Copy code
http://localhost:5173
🧪 How the App Works
User sets up their profile

Habits are created and tracked daily

Completion status and notes are stored locally

Progress, goals, and streaks are calculated from habit data

No backend required (LocalStorage-based)

📌 Future Enhancements
🔔 Habit reminders & notifications

📊 Advanced analytics & charts

☁️ Backend integration for cloud sync

📱 Mobile-first UI improvements
