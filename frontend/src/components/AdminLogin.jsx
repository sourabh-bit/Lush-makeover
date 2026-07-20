import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Loader2, Mail } from 'lucide-react';
import { useAuth } from '@/auth/AuthContext';
import { apiFetch } from '@/lib/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      if (err && err.status === 401) {
        setError("That email or password doesn't look right. Please try again.");
      } else {
        setError("Can't reach the server right now. Please check your connection and try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  const submitForgot = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await apiFetch('/api/auth/password/forgot', { method: 'POST', body: { email } });
      setForgotSent(true);
    } catch {
      setError("Can't reach the server right now. Please check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  const backToLogin = () => {
    setMode('login');
    setForgotSent(false);
    setError('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f4f0] px-5 py-10">
      <div className="w-full max-w-[420px]">
        <Link
          to="/"
          className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 text-[13px] text-[#8b7f72]"
        >
          <ArrowLeft size={16} />
          Back to website
        </Link>

        {mode === 'forgot' ? (
          <div className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="font-display text-[20px] tracking-[0.28em] text-[#2a2a2a]">LUSH</div>
            <h1 className="mt-5 text-[24px] font-medium text-[#1f1f1f]">Reset password</h1>

            {forgotSent ? (
              <>
                <p className="mt-3 text-[14px] leading-relaxed text-[#8b7f72]">
                  If an account exists for <span className="font-medium text-[#2a2a2a]">{email}</span>, we've
                  sent a link to reset the password. Check your inbox (and spam folder).
                </p>
                <button
                  type="button"
                  onClick={backToLogin}
                  className="mt-7 flex h-13 min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-[15px] font-medium text-white transition-colors hover:bg-black"
                >
                  Back to sign in
                </button>
              </>
            ) : (
              <form onSubmit={submitForgot} autoComplete="off">
                <p className="mt-1 text-[14px] text-[#8b7f72]">
                  Enter your admin email and we'll send you a link to reset your password.
                </p>
                <div className="mt-6">
                  <label htmlFor="forgot-email" className="mb-1.5 block text-[13px] font-medium text-[#2a2a2a]">
                    Email
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    inputMode="email"
                    autoComplete="off"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="h-12 w-full rounded-xl border border-black/10 bg-[#fbfaf8] px-4 text-[15px] outline-none focus:border-[#1f1f1f]"
                  />
                </div>

                {error && <p className="mt-4 text-[13px] leading-snug text-red-600">{error}</p>}

                <button
                  disabled={busy}
                  className="mt-7 flex h-13 min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-[15px] font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
                >
                  {busy && <Loader2 size={17} className="animate-spin" />}
                  <Mail size={16} className={busy ? 'hidden' : ''} />
                  {busy ? 'Sending…' : 'Send reset link'}
                </button>
                <button
                  type="button"
                  onClick={backToLogin}
                  className="mt-3 flex h-11 w-full items-center justify-center text-[13px] font-medium text-[#8b7f72] hover:text-[#2a2a2a]"
                >
                  Back to sign in
                </button>
              </form>
            )}
          </div>
        ) : (
          <form onSubmit={submit} autoComplete="off" className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="font-display text-[20px] tracking-[0.28em] text-[#2a2a2a]">LUSH</div>
            <h1 className="mt-5 text-[24px] font-medium text-[#1f1f1f]">Welcome back</h1>
            <p className="mt-1 text-[14px] text-[#8b7f72]">Sign in to update your website.</p>

            <div className="mt-7 space-y-4">
              <div>
                <label htmlFor="login-email" className="mb-1.5 block text-[13px] font-medium text-[#2a2a2a]">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  inputMode="email"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 w-full rounded-xl border border-black/10 bg-[#fbfaf8] px-4 text-[15px] outline-none focus:border-[#1f1f1f]"
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="login-password" className="block text-[13px] font-medium text-[#2a2a2a]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setError('');
                    }}
                    className="text-[12px] font-medium text-[#8b7f72] hover:text-[#2a2a2a]"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-12 w-full rounded-xl border border-black/10 bg-[#fbfaf8] px-4 pr-12 text-[15px] outline-none focus:border-[#1f1f1f]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center text-[#8b7f72]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {error && <p className="mt-4 text-[13px] leading-snug text-red-600">{error}</p>}

            <button
              disabled={busy}
              className="mt-7 flex h-13 min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-[15px] font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
            >
              {busy && <Loader2 size={17} className="animate-spin" />}
              {busy ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
