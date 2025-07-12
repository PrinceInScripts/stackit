

// src/components/NotificationsBell.jsx
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bell } from 'lucide-react'
import { fetchNotifications, markAsRead } from './notification.slice'
import Portal from './Portal'

export default function NotificationsBell() {
  const dispatch = useDispatch()
  const { list, loading, error } = useSelector(state => state.notifications)
  const [open, setOpen] = useState(false)
  const bellRef = useRef()
  const containerRef = useRef()

  // Fetch notifications once on mount
  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        containerRef.current && !containerRef.current.contains(e.target) &&
        bellRef.current && !bellRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = list.filter(n => !n.read).length

  const handleBellClick = () => setOpen(prev => !prev)
  const handleMarkAsRead = id => dispatch(markAsRead(id))

  return (
    <div className="relative">
      {/* Bell icon toggles dropdown */}
      <button
        ref={bellRef}
        onClick={handleBellClick}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none relative"
        aria-label="Notifications"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <Portal>
          <div
            ref={containerRef}
            className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            <h4 className="px-4 py-2 border-b text-sm font-medium">Notifications</h4>
            {loading && <div className="p-4 text-sm">Loading...</div>}
            {error && <div className="p-4 text-sm text-red-500">{error}</div>}
            {!loading && list.length === 0 && (
              <div className="p-4 text-sm text-gray-500">No notifications</div>
            )}
            <ul>
              {list.map((n, idx) => (
                <li
                  key={n._id || idx}
                  className={`flex justify-between items-start px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    n.read ? 'opacity-70' : 'font-semibold'
                  }`}
                  onClick={() => handleMarkAsRead(n._id)}
                >
                  <div>
                    <div className="text-sm text-gray-800">{n.message}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </div>
                  </div>
                  {!n.read && <span className="w-2 h-2 bg-blue-600 rounded-full mt-2" />}
                </li>
              ))}
            </ul>
            <div className="px-4 py-2 border-t text-center">
              <a href="/notifications" className="text-blue-600 hover:underline">
                View all
              </a>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
