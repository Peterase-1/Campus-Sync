# Campus Sync

A comprehensive student management platform designed to help university students organize their academic life, track habits, manage finances, and stay on top of their studies.

![Campus Sync](https://img.shields.io/badge/version-1.1.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Features

### 📅 Timetable & Class Schedule
- **Weekly Calendar View**: Visualize your class schedule at a glance.
- **Class Management**: Add, edit, and delete classes with details like location, professor, and color coding.
- **Attendance Tracking**: Keep track of your attendance for each class.

### 🍅 Pomodoro Timer
- **Focus Sessions**: Built-in 25-minute focus timer.
- **Break Intervals**: Automatic 5-minute break periods.
- **Session Tracking**: Monitor your total focus hours and completed sessions.
- **Visual Progress**: Circular progress indicator and audio notifications.

### 📝 Quick Notes
- **Markdown Support**: Write rich text notes with easy formatting.
- **Organization**: Pin important notes and search through your collection.
- **Color Coding**: Categorize notes visually.

### 📊 Enhanced Dashboard
- **Real-time Analytics**: Live data on habits, finance, and study time.
- **Visual Charts**: Interactive graphs for habit completion and financial overview.
- **Quick Actions**: Fast access to frequently used tools.
- **Upcoming Deadlines**: Widget to track immediate goals.

### 🌱 Habit Garden
- **Habit Tracking**: Build and monitor positive habits.
- **Streak System**: Gamified consistency tracking.
- **Frequency Options**: Daily, weekly, or monthly habits.

### 💰 Finance Center
- **Transaction Tracking**: Log income and expenses.
- **Financial Health**: View total balance, income, and expenses.
- **Categorization**: Organize transactions by type (Food, Transport, etc.).

### 📚 Study Desk
- **Task Management**: Create and track study tasks.
- **Study Notes**: Organize academic notes by subject.

### 🎯 Goals
- **Goal Setting**: Define personal, academic, and financial goals.
- **Progress Tracking**: Monitor completion status.

## Project Structure

```
Campus-Sync/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Global state (User, Theme)
│   │   ├── pages/       # Main application pages
│   │   └── utils/       # API integration & helpers
│   └── package.json
│
├── server/          # Express backend API
│   ├── src/
│   │   ├── controllers/ # Business logic
│   │   ├── middleware/  # Auth & error handling
│   │   ├── routes/      # API endpoints
│   │   └── utils/       # Helper functions
│   ├── prisma/          # Database schema & migrations
│   └── package.json
│
└── README.md
```

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Chart.js** - Data visualization
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database management
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Peterase-1/Campus-Sync.git
   cd Campus-Sync
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory:
   ```env
   DATABASE_URL="postgresql://postgres:your_password@localhost:5432/campus_sync?schema=public"
   PORT=5000
   JWT_SECRET="your-secret-key-here"
   ```

   Run Prisma migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend** (from `/server` directory)
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start the Frontend** (from `/client` directory)
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Visit** `http://localhost:5173` in your browser

## Future Roadmap (Advanced Features)

- **Goals 2.0**: Milestones, auto-progress tracking, and gamification achievements.
- **Finance 2.0**: Smart budgeting with monthly limits and visual alerts.
- **Academic 2.0**: Assignment tracker, gradebook, and GPA calculator.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Authors

- **Petros Asegid** - [Peterase-1](https://github.com/Peterase-1)

## Acknowledgments

- React team for the amazing framework
- Prisma team for the excellent ORM
- All contributors and supporters

---

Made with love for students, by students
