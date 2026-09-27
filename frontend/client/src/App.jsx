import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AuthProvider } from "./context/authContext.jsx";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";
import CoursePage from "./Pages/CoursePage.jsx";
import CoursesPage from "./Pages/CoursesPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import SignInPage from "./Pages/SignInPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import "./App.css";
import AppLayout from "./Components/AppLayout";


const App = () => {
  // pass the id as a prop
  return (
    <AuthProvider>
      <AppLayout >
        <Routes>
        <Route path="/" element={<Navigate replace to="/courses" />} />
        <Route path="/courses" element={<CoursesPage  />} />
 
        <Route path="/courses/:courseId" element={
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        } /> 

        <Route path="/login" element={<SignInPage  />} />
        <Route path="/register" element={<RegisterPage  />} />
        <Route path="*" element={<Navigate replace to="/courses" />} />
      </Routes>
      </AppLayout>
    </AuthProvider>
  );
}

export default App;
 