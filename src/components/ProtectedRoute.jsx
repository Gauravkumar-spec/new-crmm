// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                {/* Pending  */}
                <p className="text-white font-semibold text-5xl">TerraX</p>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/" replace />;
}
