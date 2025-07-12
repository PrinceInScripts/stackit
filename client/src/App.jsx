// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import {Footer} from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
import AskQuestionPage from './features/questions/AskQuestionPage'
import QuestionDetailPage from './features/questions/QuestionDetailPage'
import AdminPanel from './pages/AdminPanel'
import { useSelector } from 'react-redux'
// import NotificationsBell  from './features/notification/NotificationsBell'

export default function App() {
    const user = useSelector((state) => state.auth.user || state.user.profile); // ✅ Get user once
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-[calc(100vh-8rem)] bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/ask"
              element={
                <PrivateRoute user={user}>
                  <AskQuestionPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
               
                  <AdminPanel />
             
              }
            />
            <Route path="/questions/:id" element={<QuestionDetailPage />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute user={user}>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  )
}
