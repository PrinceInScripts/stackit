// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from './user.slice';
import { LoaderSpinner } from '../../components/LoadingSpinner';
import { toast } from 'react-toastify';
import { logout } from '../auth/auth.slice';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector(state => state.user);
  const [formData, setFormData] = useState({ username: '', avatarUrl: '' });
  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({ username: profile.username, avatarUrl: profile.avatarUrl || '' });
    }
  }, [profile]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.message || 'Update failed');
    }
  };

  if (loading) return <LoaderSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>


        {formData.avatarUrl && (
          <div className="flex justify-center">
            <img src={formData.avatarUrl} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover" />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
        >
          Update Profile
        </button>
        {/* logout buttn */}
        <button
          type="button"
          onClick={() => {
            dispatch(handleLogout());
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="w-full py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
        >
            Logout
        </button>
        {profile?.role === 'admin' && (
  <button
    type="button"
    onClick={() => window.location.href = '/admin'}
    className="w-full py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
  >
    Go to Admin Panel
  </button>
)}

        
      </form>
    </div>
  );
}
