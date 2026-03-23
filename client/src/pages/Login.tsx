import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, User } from 'lucide-react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!isLogin) {
        // 🔹 Signup
        await api.post('/signup', {
          email,
          password,
          full_name: fullName,
        });
      }

      // 🔹 OAuth2 login (IMPORTANT FIX)
      const body = new URLSearchParams();
      body.append('username', email);
      body.append('password', password);

      const response = await api.post('/token', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      login(response.data.access_token);
      navigate('/dashboard');

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {!isLogin && (
          <div className="mb-4">
            <label className="block mb-1">Full Name</label>
            <div className="flex items-center bg-gray-700 rounded px-3">
              <User size={18} />
              <input
                type="text"
                className="bg-transparent p-2 w-full outline-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <div className="flex items-center bg-gray-700 rounded px-3">
            <Mail size={18} />
            <input
              type="email"
              className="bg-transparent p-2 w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <div className="flex items-center bg-gray-700 rounded px-3">
            <Lock size={18} />
            <input
              type="password"
              className="bg-transparent p-2 w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded flex items-center justify-center gap-2"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
          <ArrowRight size={18} />
        </button>

        <p className="text-center mt-4 text-sm">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Create one
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
