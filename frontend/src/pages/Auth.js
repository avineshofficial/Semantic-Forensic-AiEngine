import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            navigate('/'); // Go to dashboard after success
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="main-content">
            <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div className="badge badge-pending">SECURE ACCESS</div>
                    <h1>{isLogin ? 'Agent Login' : 'Register Account'}</h1>
                </div>

                <form onSubmit={handleAuth}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn-primary">
                        {isLogin ? 'Access System' : 'Create Identity'}
                    </button>
                </form>

                <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
                    {isLogin ? "New to the engine?" : "Already have an account?"}
                    <span 
                        style={{ color: 'var(--accent)', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' }}
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Auth;