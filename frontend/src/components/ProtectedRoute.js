import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; // You need to install this!

function ProtectedRoute({ children }) {
    const [user, loading] = useAuthState(auth);

    if (loading) return <div className="verifying-text" style={{textAlign:'center', marginTop:'50px'}}>VERIFYING IDENTITY...</div>;
    
    if (!user) {
        return <Navigate to="/auth" />;
    }

    return children;
}

export default ProtectedRoute;