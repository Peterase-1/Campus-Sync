# 🎓 Campus Sync - Student Life Manager

A comprehensive React-based web application designed to help students manage their academic life, habits, finances, and study schedules all in one place.

![Campus Sync](https://img.shields.io/badge/React-18.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-pink?style=for-the-badge)

## 🌟 Features

### 📊 **Dashboard**
- **Personalized Welcome**: Dynamic user greeting with avatar
- **Quick Stats**: Overview of habits, finances, studies, and goals
- **Recent Activity**: Track your latest actions and progress
- **Quick Actions**: Fast access to main features

### 🌱 **Habit Garden**
- **Habit Tracking**: Create and manage daily habits
- **Streak Counter**: Track consecutive days of habit completion
- **Smart Logic**: Prevents duplicate streaks and handles missed days
- **Visual Progress**: Beautiful progress indicators and animations

### 💰 **Finance Center**
- **Expense Tracking**: Log and categorize expenses
- **Budget Management**: Set and monitor spending limits
- **Visual Analytics**: Charts and graphs for financial insights
- **Category Management**: Organize expenses by type

### 📚 **Study Desk**
- **Note Management**: Create, edit, and organize study notes
- **Priority System**: Categorize notes by importance
- **Search Functionality**: Find notes quickly
- **Study Tracking**: Monitor study sessions and progress

### 🎯 **Life Goals** (Coming Soon)
- **Goal Setting**: Define and track personal objectives
- **Progress Monitoring**: Visual progress tracking
- **Milestone Celebration**: Achieve and celebrate milestones

## 🚀 **Technology Stack**

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom components
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for modern iconography
- **Routing**: React Router DOM for navigation
- **State Management**: React Context API
- **Data Persistence**: LocalStorage for user data

## 🎨 **Design Features**

### **Modern UI/UX**
- **Glass Morphism**: Beautiful backdrop blur effects
- **Dark/Light Mode**: Seamless theme switching
- **Responsive Design**: Optimized for all screen sizes
- **Smooth Animations**: Framer Motion powered transitions
- **Intuitive Navigation**: Easy-to-use interface

### **Color Scheme**
- **Primary**: Green (#10B981) for success and growth
- **Secondary**: Blue (#3B82F6) for trust and stability
- **Accent**: Purple (#8B5CF6) for creativity
- **Neutral**: Gray scale for text and backgrounds

## 📱 **Responsive Design**

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced experience for tablets
- **Desktop**: Full-featured desktop experience
- **Touch Friendly**: Large touch targets and gestures

## 🛠️ **Installation & Setup**

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Installation Steps**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Peterase-1/Campus-Sync.git
   cd Campus-Sync
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### **Build for Production**
```bash
npm run build
# or
yarn build
```

## 📁 **Project Structure**

```
src/
├── components/          # Reusable UI components
│   └── Navbar.jsx      # Responsive navigation
├── context/            # React Context providers
│   ├── ThemeContext.jsx    # Dark/Light mode
│   └── UserContext.jsx     # User data management
├── pages/              # Main application pages
│   ├── Landing.jsx     # Homepage
│   ├── Dashboard.jsx   # Main dashboard
│   ├── HabitGarden.jsx # Habit tracking
│   ├── FinanceCenter.jsx # Finance management
│   ├── StudyDesk.jsx   # Study notes
│   ├── About.jsx       # About page
│   └── Contact.jsx     # Contact page
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 **Key Features Explained**

### **Habit Tracking Logic**
- **Smart Streaks**: Only counts one completion per day
- **Missed Day Reset**: Automatically resets streaks after missed days
- **Duplicate Prevention**: Prevents adding habits with same name
- **Visual Feedback**: Progress bars and streak counters

### **Finance Management**
- **Expense Categories**: Food, Transportation, Entertainment, etc.
- **Budget Tracking**: Visual budget vs. actual spending
- **Monthly Analytics**: Track spending patterns
- **Quick Entry**: Fast expense logging

### **Study Organization**
- **Priority Levels**: High, Medium, Low priority notes
- **Search & Filter**: Find notes quickly
- **Rich Text**: Formatted note content
- **Progress Tracking**: Monitor study completion

## 🌍 **Internationalization**

- **Ethiopian Context**: Designed for Ethiopian students
- **Local University**: Debre Berhan University integration
- **Local Names**: Ethiopian team members and contacts
- **Cultural Adaptation**: Relevant for local student needs

## 🔧 **Development**

### **Available Scripts**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### **Code Style**
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Team**

- **Alemayehu Tadesse** - Founder & CEO
- **Kebede Assefa** - CTO  
- **Meseret Bekele** - Head of Design

## 📞 **Contact**

- **Email**: info@cumpassync.com
- **Phone**: +251 11 123 4567
- **Address**: Debre Berhan University, Debre Berhan, Ethiopia
- **Website**: [Campus Sync](https://github.com/Peterase-1/Campus-Sync)

## 🙏 **Acknowledgments**

- **Debre Berhan University** - For inspiration and support
- **React Community** - For excellent documentation
- **Tailwind CSS** - For beautiful styling utilities
- **Framer Motion** - For smooth animations

---

<div align="center">

**Made with ❤️ for Ethiopian Students**

[⭐ Star this repository](https://github.com/Peterase-1/Campus-Sync) | [🐛 Report Bug](https://github.com/Peterase-1/Campus-Sync/issues) | [💡 Request Feature](https://github.com/Peterase-1/Campus-Sync/issues)

</div>
