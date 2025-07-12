// src/pages/UserListPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from './user.slice';
import { LoaderSpinner } from '../../components/LoadingSpinner';

export default function UserListPage() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (loading) return <LoaderSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full space-y-4">
      <h2 className="text-2xl font-semibold">All Registered Users</h2>
      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Username</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-600">{user.username}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
              <td className="px-4 py-3 text-sm text-gray-600 capitalize">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}