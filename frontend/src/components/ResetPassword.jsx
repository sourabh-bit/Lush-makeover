import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { apiFetch } from '@/lib/api';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      await apiFetch('/api/auth/password/reset', { method: 'POST', body: { token, password } });
      setDone(true);
    } catch (err) {
      if (err && err.status === 401) {
        setError('This reset link has expired or was already used. Request a new one from the sign-in page.');
      } else {
        setError("Can't reach the server right now. Please check your connection and try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f4f0] px-5 py-10">
      <div className="w-full max-w-[420px]">
        <Link
          to="/admin/login"
          className="mb-4 inline-flex min-h-[44px] items-center gap-1.5 text-[13px] text-[#8b7f72]"
        >
          <ArrowLeft size={16} />
          Back to sign in
        </Link>

        <div className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.35)] sm:p-8">
          <div className="font-display text-[20px] tracking-[0.28em] text-[#2a2a2a]">LUSH</div>
          <h1 className="mt-5 text-[24px] font-medium text-[#1f1f1f]">
            {done ? 'Password updated' : 'Choose a new password'}
          </h1>

          {!token && !done && (
            <p className="mt-3 text-[14px] leading-relaxed text-red-600">
              This link is missing its reset token. Please use the link from your email, or request a new one.
            </p>
          )}

          {done ? (
            <>
              <div className="mt-4 flex items-center gap-2 text-[14px] text-[#4a4742]">
                <CheckCircle2 size={18} className="text-green-600" />
                Your password has been changed. You can sign in with it now.
              </div>
              <Link
                to="/admin/login"
                className="mt-7 flex h-13 min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-[15px] font-medium text-white transition-colors hover:bg-black"
              >
                Go to sign in
              </Link>
            </>
          ) : (
            <form onSubmit={submit} autoComplete="off">
              <p className="mt-1 text-[14px] text-[#8b7f72]">Enter a new password for your admin account.</p>

              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="new-password" className="mb-1.5 block text-[13px] font-medium text-[#2a2a2a]">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="new-password"
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
                <div>
                  <label htmlFor="confirm-password" className="mb-1.5 block text-[13px] font-medium text-[#2a2a2a]">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    className="h-12 w-full rounded-xl border border-black/10 bg-[#fbfaf8] px-4 text-[15px] outline-none focus:border-[#1f1f1f]"
                  />
                </div>
              </div>

              {error && <p className="mt-4 text-[13px] leading-snug text-red-600">{error}</p>}

              <button
                disabled={busy || !token}
                className="mt-7 flex h-13 min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-[15px] font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
              >
                {busy && <Loader2 size={17} className="animate-spin" />}
                {busy ? 'Saving…' : 'Save new password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
