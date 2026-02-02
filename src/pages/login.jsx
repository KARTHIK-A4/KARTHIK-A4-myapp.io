import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import '../assets/styles/login.css';

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, password } = data;
    try {
      const { data: response } = await axios.post('/login', {
        email,
        password
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({ email: '', password: '' });
        toast.success("Welcome back!");
        if (response.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
      
      <form className="login-form glass-card" onSubmit={loginUser}>
        <div className="login-header">
          <h3>Welcome Back</h3>
          <p>Please enter your details to sign in.</p>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-wrapper">
            <FiMail className="input-icon" />
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="input-wrapper">
            <FiLock className="input-icon" />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
        </div>

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? 'Signing in...' : (
            <>
              Sign In <FiLogIn className="btn-icon" />
            </>
          )}
        </button>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
}
