import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, registerUser } from './auth.slice';
import { toast } from 'react-toastify';
import { LoaderSpinner } from '../../components/LoadingSpinner';


// Register Page Component
export function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

//   useEffect(() => {
//     if (user) {
//       toast.success('Registration successful!');
//       navigate('/login');
//     }
//   }, [user, navigate]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
  e.preventDefault();

  try {
    const res = await dispatch(registerUser(formData)).unwrap();
    toast.success(res.message || 'Registered!');  
    navigate('/login');
  } catch(err) {
    toast.error(err.message || 'Registration failed');
  }
};
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Your Account</h2>
      {loading ? <LoaderSpinner /> : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
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
            className="w-full py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Sign Up
          </button>
        </form>
      )}
      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}
