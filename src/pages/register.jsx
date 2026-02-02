import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiUserCheck } from 'react-icons/fi';
import '../assets/styles/login.css';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer"
  });
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { name, email, password, role } = data;
    try {
      const { data: response } = await axios.post('/register', {
        name, email, password, role
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({ name: "", email: "", password: "", role: "customer" });
        toast.success("Registration Successful! Please login.");
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
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

      <form className="login-form glass-card" onSubmit={registerUser}>
        <div className="login-header">
          <h3>Create Account</h3>
          <p>Join us today! Enter your details below.</p>
        </div>

        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <div className="input-wrapper">
            <FiUser className="input-icon" />
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>
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
              placeholder="Create a password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>
        </div>

        <button type="submit" className="login-btn" disabled={isLoading}>
          {isLoading ? 'Creating Account...' : (
            <>
              Sign Up <FiUserCheck className="btn-icon" />
            </>
          )}
        </button>

        <div className="login-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </form>
    </div>
  );
}