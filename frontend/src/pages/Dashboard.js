import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="main-content">
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{fontSize: '2.5rem', fontWeight: '800'}}>Semantic Forensic Engine</h1>
        <p style={{color: '#7f8c8d'}}>AI-Powered Blind-Match Protocol</p>
      </header>

      <div className="dashboard-grid">
        <div className="card" style={{ borderTop: '6px solid var(--primary)' }}>
          <div>
            <div className="icon-box">🔍</div>
            <h2>I Lost Something</h2>
            <p>File a report with a text description. Our AI will perform a semantic search across all found items.</p>
          </div>
          <Link to="/report-lost">
            <button className="btn-primary">File Lost Report</button>
          </Link>
        </div>

        <div className="card" style={{ borderTop: '6px solid var(--accent)' }}>
          <div>
            <div className="icon-box">📦</div>
            <h2>I Found Something</h2>
            <p>Found an item? Upload a photo. Our engine will extract visual features for matching.</p>
          </div>
          <Link to="/report-found">
            <button className="btn-primary" style={{ backgroundColor: 'var(--accent)' }}>Upload Found Item</button>
          </Link>
        </div>
      </div>

      <div className="status-bar">
        <div className="status-item">
          <span>Active Inventory</span>
          <strong>1,240 Items</strong>
        </div>
        <div className="status-item">
          <span>Recent Matches</span>
          <strong>42 Today</strong>
        </div>
        <div className="status-item">
          <span>AI Guardian</span>
          <strong style={{color: '#27ae60'}}>ONLINE</strong>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;