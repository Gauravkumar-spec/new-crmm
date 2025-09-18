// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-white font-semibold text-lg">Checking session...</p>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;
}
