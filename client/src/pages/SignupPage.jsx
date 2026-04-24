import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { CheckSquare } from 'lucide-react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend validation
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecial) {
      setError('Password must meet all strength requirements.');
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/signup`, { email, password });
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-peach-50 px-4">
      <div className="bg-cream-50 w-full max-w-md p-8 rounded-2xl shadow-sm border border-cream-200">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-peach-100 p-3 rounded-xl mb-4">
            <CheckSquare className="w-8 h-8 text-peach-600" />
          </div>
          <h2 className="text-2xl font-bold text-ink">Create Account</h2>
          <p className="text-ink-mid mt-1">Start organizing with Taskflow</p>
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
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-cream-100 border border-cream-200 rounded-lg px-4 py-3 text-ink focus:border-peach-400 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink-mid mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-cream-100 border border-cream-200 rounded-lg px-4 py-3 text-ink focus:border-peach-400 focus:outline-none transition-colors"
            />
            <div className="mt-2 space-y-1">
              <p className="text-[10px] text-ink-mid/60 flex items-center gap-1">
                {password.length >= 8 ? '✅' : '○'} 8+ characters
              </p>
              <p className="text-[10px] text-ink-mid/60 flex items-center gap-1">
                {(/[A-Z]/.test(password) && /[a-z]/.test(password)) ? '✅' : '○'} Upper & Lowercase
              </p>
              <p className="text-[10px] text-ink-mid/60 flex items-center gap-1">
                {(/[0-9]/.test(password) && /[!@#$%^&*()]/.test(password)) ? '✅' : '○'} Number & Symbol
              </p>
            </div>
          </div>
          <button type="submit" className="w-full bg-peach-400 hover:bg-peach-600 text-peach-50 font-medium py-3 rounded-lg transition-colors mt-2">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-mid">
          Already have an account? <Link to="/login" className="text-peach-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
