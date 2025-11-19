import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { 
  FaHome, 
  FaChartLine, 
  FaBriefcase, 
  FaBuilding, 
  FaUsers, 
  FaFileAlt,
  FaChartBar,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
  FaArrowUp,
  FaBars
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/dashboard', icon: FaChartLine, label: 'Dashboard' },
    { path: '/job-management', icon: FaBriefcase, label: 'Job Management' },
    { path: '/company-profiles', icon: FaBuilding, label: 'Company Profiles' },
    { path: '/user-management', icon: FaUsers, label: 'User Management' },
    { path: '/reports', icon: FaChartBar, label: 'Reports & Analytics' },
  ];

  const bottomMenuItems = [
    { path: '/support', icon: FaHeadset, label: 'Support / Feedback' },
    { path: '/settings', icon: FaCog, label: 'Settings' },
  ];

  const isActive = (path) => location.pathname === path;

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (err) {
      // ignore storage errors
    }
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Logo and Toggle */}
      <div className="sidebar-header">
        <div className="logo-section">
          <h4 className={`logo-text ${isCollapsed ? 'd-none' : ''}`}>
            Aspyra <FaArrowUp className="ms-1" />
          </h4>
          {isCollapsed && <h4 className="logo-text-collapsed">A</h4>}
        </div>
        <button 
          className="btn btn-link toggle-btn" 
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
      </div>

      {/* Main Menu Items */}
      <nav className="sidebar-nav flex-grow-1">
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon className="nav-icon" />
                {!isCollapsed && <span className="nav-text">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Menu Items */}
      <div className="sidebar-bottom">
        <ul className="nav flex-column">
          {bottomMenuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon className="nav-icon" />
                {!isCollapsed && <span className="nav-text">{item.label}</span>}
              </Link>
            </li>
          ))}
          <li className="nav-item">
            <button
              type="button"
              onClick={handleLogout}
              className="nav-link btn-logout"
              title={isCollapsed ? 'Log out' : ''}
            >
              <FaSignOutAlt className="nav-icon" />
              {!isCollapsed && <span className="nav-text">Log out</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;