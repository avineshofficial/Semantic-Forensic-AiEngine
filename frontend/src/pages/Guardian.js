import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Guardian() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
    const [isVerifying, setIsVerifying] = useState(false);

    // Mock Questions - In the final version, these will come from Ollama
    const questions = [
        "What is the brand name visible on the item?",
        "Describe any specific damage or unique marks (scratches, stickers).",
        "What color is the interior lining or the backside?"
    ];

    const handleVerify = () => {
        setIsVerifying(true);
        // Simulate Backend/Ollama delay
        setTimeout(() => {
            setIsVerifying(false);
            alert("Verification Score: 85% - Match Confirmed! Finder details unlocked.");
            navigate('/');
        }, 3000);
    };

    return (
        <div className="main-content">
            <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div className="badge badge-pending">SECURE VERIFICATION SESSION</div>
                    <h1>AI Guardian Challenge</h1>
                    <p>Answer the following questions to prove ownership.</p>
                </div>

                {/* Blind Match Image (Blurred) */}
                <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#ddd',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative',
                    marginBottom: '30px'
                }}>
                    <img 
                        src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600" 
                        alt="Hidden"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(15px)' }}
                    />
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        background: 'rgba(0,0,0,0.6)', color: 'white', padding: '10px 20px', borderRadius: '20px'
                    }}>
                        Visual Identity Hidden
                    </div>
                </div>

                <div className="form-group">
                    <label>Question 1: {questions[0]}</label>
                    <input 
                        type="text" 
                        onChange={(e) => setAnswers({...answers, q1: e.target.value})} 
                        placeholder="Your answer..."
                    />
                </div>

                <div className="form-group">
                    <label>Question 2: {questions[1]}</label>
                    <textarea 
                        rows="3"
                        onChange={(e) => setAnswers({...answers, q2: e.target.value})} 
                        placeholder="Be as specific as possible..."
                    ></textarea>
                </div>

                <button 
                    className="btn-primary" 
                    onClick={handleVerify}
                    disabled={isVerifying}
                >
                    {isVerifying ? "AI is Analyzing Your Answers..." : "Submit for Verification"}
                </button>
            </div>
        </div>
    );
}

export default Guardian;