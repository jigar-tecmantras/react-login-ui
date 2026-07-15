import { useState } from 'react';
import './App.css';

const emailRegex = /^\S+@\S+\.\S+$/;

function App() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  const isSubmitDisabled = !formData.email.trim() || !formData.password.trim();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password should be at least 6 characters.';
    }

    return validationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatusMessage('');
      return;
    }

    setErrors({});
    setStatusMessage('Great! The form is ready to submit.');
  };

  const infoText = statusMessage || 'Sign in to continue to your dashboard.';

  return (
    <div className="app-shell">
      <div className="background-glow glow-a" aria-hidden="true" />
      <div className="background-glow glow-b" aria-hidden="true" />
      <main className="login-card">
        <header className="card-header">
          <span className="brand-pill">Lumi</span>
          <h1>Welcome Mahesh</h1>
          <p>Securely sign in to access your dashboard.</p>
        </header>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
            {errors.email ? (
              <span id="email-error" className="error-text">
                {errors.email}
              </span>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            {errors.password ? (
              <span id="password-error" className="error-text">
                {errors.password}
              </span>
            ) : null}
          </div>

          <div className="form-actions">
            <label className="remember-line">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>
            <a className="text-link" href="#reset">
              Forgot password?
            </a>
          </div>

          <p className="info-line" aria-live="polite">
            {infoText}
          </p>

          <button className="primary-btn" type="submit" disabled={isSubmitDisabled}>
            Sign in
          </button>
        </form>

        <div className="divider">
          <span>or continue with</span>
        </div>

        <div className="social-grid">
          {['Google', 'GitHub', 'Apple'].map((provider) => (
            <button type="button" key={provider} className="social-btn">
              {provider}
            </button>
          ))}
        </div>

        <footer className="card-footer">
          <p>
            Need an account? <a className="text-link" href="#create">Create one</a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
