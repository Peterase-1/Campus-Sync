# Campus Sync 🎓

A comprehensive student management platform designed to help university students organize their academic life, track habits, manage finances, and stay on top of their studies.

![Campus Sync](https://img.shields.io/badge/version-1.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

### 📚 Study Desk
- Create and organize study notes by subject
- Manage study tasks with priority levels
- Track deadlines and completion status
- Organize study materials in one place

### 🌱 Habit Garden
- Build and track positive habits
- Monitor daily/weekly/monthly goals
- Track streak counts for consistency
- Visual progress indicators

### 💰 Finance Center
- Track income and expenses
- Categorize transactions (Food, Transport, Education, etc.)
- Monitor spending patterns
- Calculate savings automatically

### 🎯 Dashboard
- Overview of all activities
- Quick access to all features
- Personalized statistics
- Recent activity feed

## 🏗️ Project Structure

```
Campus-Sync/
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── utils/
│   └── package.json
│
├── server/          # Express backend API
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   ├── prisma/
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
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

## 🚀 Getting Started

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
   npx prisma db push
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

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Habits
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create habit
- `PATCH /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit

### Finance
- `GET /api/finance/transactions` - Get all transactions
- `POST /api/finance/transactions` - Create transaction
- `DELETE /api/finance/transactions/:id` - Delete transaction

### Study
- `GET /api/study/notes` - Get all notes
- `POST /api/study/notes` - Create note
- `DELETE /api/study/notes/:id` - Delete note
- `GET /api/study/tasks` - Get all tasks
- `POST /api/study/tasks` - Create task
- `PATCH /api/study/tasks/:id` - Update task
- `DELETE /api/study/tasks/:id` - Delete task

## 🎨 Features in Detail

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Token-based session management
- Protected routes

### Responsive Design
- Mobile-first approach
- Dark mode support
- Smooth animations
- Modern UI/UX

### Data Persistence
- PostgreSQL database
- Prisma ORM for type-safe queries
- Automatic migrations
- Data validation

## 🌙 Dark Mode

Campus Sync includes a built-in dark mode that automatically adapts to your system preferences or can be toggled manually.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Authors

- **Peter Aseer** - [Peterase-1](https://github.com/Peterase-1)

## 🙏 Acknowledgments

- React team for the amazing framework
- Prisma team for the excellent ORM
- All contributors and supporters

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for students, by students**
