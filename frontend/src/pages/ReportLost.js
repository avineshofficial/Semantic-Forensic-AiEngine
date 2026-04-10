import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function ReportLost() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        lostTime: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "lost_items"), {
                ...formData,
                status: "open",
                createdAt: new Date()
            });
            alert("Lost report filed successfully!");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };


    return (
        <div className="main-content">
            <div className="card">
                <h1>Report Lost Item</h1>
                <form>
                    <div className="form-group">
                        <label>Item Name</label>
                        <input type="text" placeholder="e.g. iPhone 13, Leather Wallet" />
                    </div>
                    <div className="form-group">
                        <label>Description (Be detailed for AI Matching)</label>
                        <textarea rows="5" placeholder="Include color, brand, unique marks..."></textarea>
                    </div>
                    <div className="form-group">
                        <label>Last Seen Location</label>
                        <input type="text" placeholder="e.g. Central Library 2nd Floor" />
                    </div>
                    <button type="submit" className="btn-primary">Submit Forensic Report</button>
                </form>
            </div>
        </div>
    );
}
export default ReportLost;