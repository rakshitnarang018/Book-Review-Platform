import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            📚 BookReview
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/books" className="text-gray-700 hover:text-primary-600 transition-colors">
              Books
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/add-book" 
                  className="text-gray-700 hover:text-primary-600 transition-colors"
                >
                  Add Book
                </Link>
                <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
                <button 
                  onClick={handleLogout}
                  className="btn-secondary text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;