import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, LogOut, Home, BarChart3, User as UserIcon } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          MantaTrack
        </Link>
        
        <nav className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <Home size={16} />
            Price Board
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                <BarChart3 size={16} />
                Dashboard
              </Link>
              <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                <UserIcon size={16} />
                Profile
              </Link>
              <div className="user-info">
                <User size={16} />
                <span>{user?.name}</span>
              </div>
              <button onClick={handleLogout} className="btn btn-outline">
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                Login
              </Link>
              <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
