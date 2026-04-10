import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ReportLost from './pages/ReportLost';
import ReportFound from './pages/ReportFound';
import './styles/App.css';
import Guardian from './pages/Guardian';
function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="logo">FORENSIC MATCH</div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/report-lost">Lost Report</Link>
          <Link to="/report-found">Found Entry</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/guardian/:itemId" element={<Guardian />} />
      </Routes>
    </Router>
  );
}

export default App;