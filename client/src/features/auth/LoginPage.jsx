import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, registerUser } from './auth.slice';
import { toast } from 'react-toastify';
import { LoaderSpinner } from '../../components/LoadingSpinner';
// Login Page Component
export function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    if (user) {
      toast.success('Login successful!');
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Login to StackIt</h2>
      {loading ? <LoaderSpinner /> : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      )}
      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">Sign up</Link>
      </p>
    </div>
  );
}