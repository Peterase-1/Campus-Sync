import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import HabitGarden from './pages/HabitGarden';
import FinanceCenter from './pages/FinanceCenter';
import StudyDesk from './pages/StudyDesk';
import Goals from './pages/Goals';
import Profile from './pages/Profile';
import Timetable from './pages/Timetable';
import Pomodoro from './pages/Pomodoro';
import QuickNotes from './pages/QuickNotes';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/app/*" element={
              <Routes>
                <Route index element={<Dashboard />} />
                <Route path="habits" element={<HabitGarden />} />
                <Route path="finance" element={<FinanceCenter />} />
                <Route path="desk" element={<StudyDesk />} />
                <Route path="goals" element={<Goals />} />
                <Route path="profile" element={<Profile />} />
                <Route path="timetable" element={<Timetable />} />
                <Route path="pomodoro" element={<Pomodoro />} />
                <Route path="notes" element={<QuickNotes />} />
              </Routes>
            } />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
