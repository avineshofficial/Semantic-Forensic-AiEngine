import React, { useState } from 'react';
import { db, auth } from '../firebase'; // Import both db and auth
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function ReportLost() {
    const navigate = useNavigate();
    
    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'General',
        location: '',
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Check if user is logged in
            if (!auth.currentUser) {
                alert("You must be logged in to file a report.");
                navigate('/auth');
                return;
            }

            // 1. Add document to 'lost_items' collection in Firestore
            const docRef = await addDoc(collection(db, "lost_items"), {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                location: formData.location,
                userId: auth.currentUser.uid, // <--- Links report to the logged-in user
                status: "open",
                createdAt: new Date()
            });

            console.log("Forensic Report Filed. ID: ", docRef.id);
            
            // 2. Redirect to Matches page and pass the new ID so the AI can start matching
            navigate('/matches', { state: { lostItemId: docRef.id } });
            
        } catch (error) {
            console.error("Firebase Error:", error);
            alert("Submission failed. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-content">
            <div className="card">
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div className="badge badge-pending">STEP 1: EVIDENCE SUBMISSION</div>
                    <h1>Report Lost Item</h1>
                    <p>Provide a detailed semantic description for the AI Matching Engine.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Item Name / Title</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Vintage Leather Wallet" 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select 
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="General">General</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Documents">Documents/ID</option>
                            <option value="Personal Effects">Personal Effects</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Detailed Description (Crucial for AI)</label>
                        <textarea 
                            rows="5" 
                            placeholder="Be specific: color, brand, scratches, stickers, or unique textures. The AI uses this text to scan images."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})} 
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Last Known Location</label>
                        <input 
                            type="text" 
                            placeholder="e.g. Science Lab 3 or Library Cafe"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})} 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "FILING REPORT..." : "SUBMIT FOR SEMANTIC ANALYSIS"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ReportLost;