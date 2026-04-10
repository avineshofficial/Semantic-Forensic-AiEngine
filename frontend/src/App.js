import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ReportLost from './pages/ReportLost';
import ReportFound from './pages/ReportFound';
import Matches from './pages/Matches';
import Guardian from './pages/Guardian';
import Auth from './pages/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './firebase';
import './styles/App.css';

function App() {
  const logout = () => auth.signOut();

  return (
    <Router>
      <nav className="navbar">
        <div className="logo">FORENSIC MATCH</div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <button onClick={logout} style={{background:'none', border:'none', color:'white', cursor:'pointer', fontWeight:'bold'}}>Logout</button>
        </div>
      </nav>

      <Routes>
        <Route path="/auth" element={<Auth />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/report-lost" element={<ProtectedRoute><ReportLost /></ProtectedRoute>} />
        <Route path="/report-found" element={<ProtectedRoute><ReportFound /></ProtectedRoute>} />
        <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
        <Route path="/guardian/:itemId" element={<ProtectedRoute><Guardian /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;