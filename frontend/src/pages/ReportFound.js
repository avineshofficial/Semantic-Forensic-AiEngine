import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function ReportFound() {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!image) return;
        setLoading(true);

        try {
            // 1. Upload Image to Firebase Storage
            const storageRef = ref(storage, `found_items/${Date.now()}_${image.name}`);
            await uploadBytes(storageRef, image);
            const url = await getDownloadURL(storageRef);

            // 2. Save Metadata to Firestore
            await addDoc(collection(db, "found_items"), {
                image_url: url,
                status: "unclaimed",
                createdAt: new Date(),
                // Location and category would be added here similarly
            });

            alert("Found item uploaded!");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-content">
    <div className="card" style={{maxWidth: '600px', margin: '0 auto'}}>
        <h2>Submit Forensic Evidence</h2>
        <p>Upload an image of the found item for semantic analysis.</p>
        
        <form onSubmit={handleUpload}>
            <div className="form-group" style={{border: '2px dashed #ccc', padding: '40px', textAlign: 'center', borderRadius: '12px'}}>
                <input 
                    type="file" 
                    id="file-upload" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    style={{display: 'none'}} 
                />
                <label htmlFor="file-upload" style={{cursor: 'pointer'}}>
                    <div style={{fontSize: '40px'}}>📸</div>
                    {image ? image.name : "Click to select or drag item image"}
                </label>
            </div>
            
            <div className="form-group">
                <label>Discovery Location</label>
                <input type="text" placeholder="e.g. Campus Library, Room 204" />
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Analyzing Features..." : "Initiate System Entry"}
            </button>
        </form>
    </div>
</div>
    );
}

export default ReportFound;