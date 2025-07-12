import React, { useEffect, useState } from 'react'
import { Bell } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotifications, markNotificationAsRead } from '../features/notification/notification.slice'
import { Link } from 'react-router-dom'

export default function NotificationsBell() {
  const dispatch = useDispatch()
  const { list, loading, error } = useSelector((s) => s.notifications)
  const [open, setOpen] = useState(false)

  // 1) fetch on mount
  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  const unreadCount = list.filter((n) => !n.read).length

  // 2) show dropdown on hover
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="p-2 rounded-full hover:bg-gray-200 relative">
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <h4 className="px-4 py-2 border-b text-sm font-medium">Notifications</h4>

          {loading && <div className="p-4 text-sm">Loading…</div>}
          {error && <div className="p-4 text-sm text-red-500">{error}</div>}

          {!loading && list.length === 0 && (
            <div className="p-4 text-sm text-gray-500">No notifications</div>
          )}

          <ul>
            {list.map((n) => (
              <li
                key={n._id}
                onClick={() => dispatch(markNotificationAsRead(n._id))}
                className={`
                  flex justify-between items-start px-4 py-2 
                  hover:bg-gray-100 cursor-pointer 
                  ${n.read ? 'opacity-60' : 'font-semibold'}
                `}
              >
                <div>
                  <div className="text-sm text-gray-800">{n.message}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                )}
              </li>
            ))}
          </ul>

          {/* 3) View All link */}
        
        </div>
      )}
    </div>
  )
}
