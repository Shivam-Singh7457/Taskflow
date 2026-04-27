import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CheckSquare } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, { email, password });
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-peach-50 px-4">
      <div className="bg-cream-50 w-full max-w-md p-8 rounded-2xl shadow-sm border border-cream-200">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-peach-100 p-3 rounded-xl mb-4">
            <CheckSquare className="w-8 h-8 text-peach-600" />
          </div>
          <h2 className="text-2xl font-bold text-ink">Welcome back</h2>
          <p className="text-ink-mid mt-1">Sign in to Taskflow</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-peach-100 text-peach-600 rounded-lg text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-mid mb-1">Email address</label>
            <input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-cream-100 border border-cream-200 rounded-lg px-4 py-3 text-ink focus:border-peach-400 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-mid mb-1">Password</label>
            <input
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-cream-100 border border-cream-200 rounded-lg px-4 py-3 text-ink focus:border-peach-400 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-peach-400 hover:bg-peach-600 disabled:bg-peach-300 text-peach-50 font-medium py-3 rounded-lg transition-colors mt-2 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-peach-50 border-t-transparent rounded-full animate-spin"></span>
                Hang on setting up environment
              </>
            ) : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-mid">
          Don't have an account? <Link to="/signup" className="text-peach-600 font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
