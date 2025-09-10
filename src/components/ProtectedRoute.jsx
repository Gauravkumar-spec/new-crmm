// // // src/routes/ProtectedRoute.jsx
// // import React from 'react';
// // import { Navigate, useLocation } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';

// // export default function ProtectedRoute({ children }) {
// //   const { session, loading } = useAuth();
// //   const location = useLocation();

// //   if (loading) return null; // or a spinner

// //   if (!session?.sessionId) {
// //     return <Navigate to={`/login?redirectTo=${encodeURIComponent(location.pathname + location.search)}`} replace />;
// //   }
// //   return children;
// // }





// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         Checking session...
//       </div>
//     );
//   }

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }
