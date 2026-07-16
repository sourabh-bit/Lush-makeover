import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';

const PasswordInput = ({ id, label, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-[#2a2a2a]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          autoComplete="new-password"
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full rounded-xl border border-black/10 bg-white px-3 pr-12 text-[15px] outline-none focus:border-black/30"
        />
        <button
          type="button"
          onClick={() => setShow((visible) => !visible)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center text-[#8b7f72]"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

// Simple change-password form for the signed-in user.
const ChangePassword = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (next.length < 8) {
      toast.error('Your new password needs at least 8 characters.');
      return;
    }
    if (next !== confirm) {
      toast.error("The two new passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      await apiFetch('/api/auth/password/change', {
        method: 'POST',
        body: { current_password: current, new_password: next },
      });
      toast.success('Password changed! Use the new one next time you sign in.');
      setCurrent('');
      setNext('');
      setConfirm('');
      navigate('/admin');
    } catch (error) {
      if (error.status === 401) {
        toast.error("That current password doesn't look right.");
      } else {
        toast.error("Couldn't change the password. Please try again.");
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex min-h-[44px] items-center gap-1.5 text-[13px] text-[#8b7f72]"
      >
        <ArrowLeft size={16} />
        Back
      </button>
      <h1 className="text-[24px] font-medium text-[#1f1f1f]">Change password</h1>
      <p className="mt-1 text-[14px] text-[#8b7f72]">Pick something only you know, at least 8 characters.</p>

      <form onSubmit={submit} autoComplete="off" className="mt-5 space-y-4 rounded-2xl border border-black/5 bg-white p-5">
        <PasswordInput id="pw-current" label="Current password" value={current} onChange={setCurrent} />
        <PasswordInput id="pw-new" label="New password" value={next} onChange={setNext} />
        <PasswordInput id="pw-confirm" label="New password again" value={confirm} onChange={setConfirm} />
        <button
          disabled={busy}
          className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#1f1f1f] text-[15px] font-medium text-white transition-colors hover:bg-black disabled:opacity-60"
        >
          {busy && <Loader2 size={17} className="animate-spin" />}
          {busy ? 'Changing…' : 'Change password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
