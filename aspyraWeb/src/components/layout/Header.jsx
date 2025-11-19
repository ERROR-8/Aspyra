import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ searchPlaceholder = "Search..." }) => {
  return (
    <header className="main-header">
      <div className="header-content">
        {/* Search Bar */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            className="form-control search-input" 
            placeholder={searchPlaceholder}
          />
        </div>

        {/* Right Side Actions */}
        <div className="header-actions">
          {/* Notification Bell */}
          <div className="notification-wrapper">
            <button className="btn btn-link notification-btn">
              <FaBell className="bell-icon" />
              <span className="notification-badge"></span>
            </button>
          </div>

          {/* User Profile */}
          <Link to="/profile" className="user-profile">
            <FaUserCircle className="user-avatar" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;