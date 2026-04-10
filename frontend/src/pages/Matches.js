import React from 'react';
import { useNavigate } from 'react-router-dom';

const mockMatches = [
  { 
    id: "f101", 
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300&auto=format&fit=crop", 
    confidence: 94, 
    location: "Library Cafeteria" 
  },
  { 
    id: "f102", 
    image: "https://images.unsplash.com/photo-1512233629035-199193521e8c?q=80&w=300&auto=format&fit=crop", 
    confidence: 81, 
    location: "Science Block" 
  }
];

function Matches() {
  const navigate = useNavigate();

  return (
    <div className="main-content">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
        <h1>Semantic Matches</h1>
        <div className="badge badge-match">Engine: CLIP-ViT-L/14</div>
      </div>

      <div className="dashboard-grid">
        {mockMatches.map((item) => (
          <div key={item.id} className="card" style={{padding: '10px'}}>
            <img 
              src={item.image} 
              alt="Found Item" 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} 
            />
            <div style={{padding: '15px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                 <strong>Confidence</strong>
                 <span style={{color: '#27ae60', fontWeight: 'bold'}}>{item.confidence}%</span>
              </div>
              <p><strong>Found at:</strong> {item.location}</p>
              
              <button 
                className="btn-primary" 
                onClick={() => navigate(`/guardian/${item.id}`)}
                style={{fontSize: '0.9rem'}}
              >
                Start Verification Process
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;