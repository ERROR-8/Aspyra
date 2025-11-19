import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowUp } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login attempt:', formData);
    // For now, just navigate to home
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Login Form */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            {/* Logo */}
            <div className="login-logo">
              <h1 className="logo-text">
                Aspyra <FaArrowUp className="logo-icon" />
              </h1>
            </div>

            {/* Welcome Text */}
            <div className="login-header">
              <h2 className="login-title">Welcome Back!</h2>
              <p className="login-subtitle">Please login to your account</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="form-check-input"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember" className="form-check-label">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button type="submit" className="btn btn-login">
                Login
              </button>

              {/* Divider */}
              <div className="login-divider">
                <span>or continue with</span>
              </div>

              {/* Social Login Buttons */}
              <div className="social-login-buttons">
                <button type="button" className="btn btn-social btn-google">
                  <svg className="social-icon" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button type="button" className="btn btn-social btn-linkedin">
                  <svg className="social-icon" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="signup-link">
                Don't have an account? <Link to="/register">Sign up</Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Illustration/Branding */}
        <div className="login-illustration-section">
          <div className="illustration-content">
            <h2 className="illustration-title">Find Your Dream Job</h2>
            <p className="illustration-text">
              Join thousands of professionals who found their perfect career match on Aspyra.
            </p>
            <div className="illustration-features">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>10,000+ Job Listings</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>500+ Companies</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Easy Application Process</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;