// src/main.jsx
import React, { useEffect } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider, useDispatch } from 'react-redux'
import { store } from './app/store'
import axios from './api/axios'                   // your configured axios instance
import { fetchUserProfile, logout } from './features/auth/auth.slice' // import from authSlice

function BootstrappedApp() {
  const dispatch = useDispatch()

  useEffect(() => {
    // 1) Rehydrate token & header
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // 2) Fetch profile
      dispatch(fetchUserProfile())
        .unwrap()
        .catch(() => {
          // invalid/expired token -> clear out
          dispatch(logout())
        })
    }
  }, [dispatch])

  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BootstrappedApp />
    </Provider>
  </StrictMode>
)