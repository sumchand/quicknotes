'use client';

import { useState } from 'react';
import Link from 'next/link';
import '@/styles/auth.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear individual error
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && !formData.name) {
      newErrors.name = 'Full name is required';
    }

    return newErrors;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  const endpoint = isLogin ? '/api/login' : '/api/signup';

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

 if (data.success) {
  // ✅ Good for SSR protection — cookie is already set server-side
  // ✅ Still setting localStorage in case you want to use it on client-side
  localStorage.setItem('token', data.token);
  localStorage.setItem('role', data.user.role);

  // ⏩ Route based on role
  if (data.user.role === 'Admin') {
    window.location.href = '/admin/dashboard';
  } else {
    window.location.href = '/notes';
  }
}
 else {
    alert(data.message || 'Something went wrong');
  }
};

  return (
    <main className="auth-container">
  <div className="auth-card">
    <h2 className="auth-heading">
      {isLogin ? 'Login to QuickNotes' : 'Create your QuickNotes account'}
    </h2>

    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {!isLogin && (
        <div className="form-group">
          <label className="auth-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className={`auth-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && <p className="auth-error">{errors.name}</p>}
        </div>
      )}

      <div className="form-group">
        <label className="auth-label">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className={`auth-input ${errors.email ? 'error' : ''}`}
        />
        {errors.email && <p className="auth-error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label className="auth-label">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className={`auth-input ${errors.password ? 'error' : ''}`}
        />
        {errors.password && <p className="auth-error">{errors.password}</p>}
      </div>

      <button type="submit" className="auth-button">
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
    </form>

    <div className="auth-toggle">
      {isLogin ? (
        <>
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(false);
              setErrors({});
              setFormData({ name: '', email: '', password: '' });
            }}
          >
            Sign up
          </button>
        </>
      ) : (
        <>
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => {
              setIsLogin(true);
              setErrors({});
              setFormData({ name: '', email: '', password: '' });
            }}
          >
            Log in
          </button>
        </>
      )}
    </div>

    <div className="auth-back">
      <Link href="/">← Back to Home</Link>
    </div>
  </div>
</main>

  );
}
