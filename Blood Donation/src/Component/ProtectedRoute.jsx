// import React from "react";
// import { Navigate } from "react-router-dom";
// // import AdminDashboard from "./AdminDashboard";

// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("token");
//   const isAdmin = localStorage.getItem("isAdmin") === "true"; // Check admin status

//   return token && isAdmin ? children : <Navigate to="/login" />;
// };

// const routes = [
//   {
//     path: '/admin-dashboard',
//     element: (
//       <ProtectedRoute>
//         <AdminDashboard />
//       </ProtectedRoute>
//     ),
//   },
// ];

export default ProtectedRoute;