// src/components/Navbar.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/auth.slice'
import NotificationsBell from './NotificationsBell'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/login')
  }

  const gotoNotifications = () => {
    // navigate to notifications page
    navigate('/notifications')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          StackIt
        </Link>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">
                Signup
              </Link>
            </>
          ) : (
            <>
              {/* Home */}
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>

              {/* Notifications (clickable bell) */}
              <button
               
                className="relative text-gray-700 hover:text-blue-600 focus:outline-none"
                aria-label="View notifications"
              >
                <NotificationsBell />
              </button>

              {/* Profile avatar */}
              <div className="relative group">
                <Link to="/profile">
                  <img
                    src={user.avatarUrl || '/default-avatar.png'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
                
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
