import { FaEye, FaEdit, FaBan, FaTimes, FaUserPlus, FaFilter, FaSort } from 'react-icons/fa';
import './UserManagement.css';

const UserManagement = () => {
  const users = [
    {
      id: 1,
      name: 'Emily Carter',
      location: 'New York, USA',
      email: 'emily.carter@example.com',
      phone: '(212) 555-0182',
      status: 'Active',
      statusColor: 'success',
      avatar: 'EC'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'San Francisco, USA',
      email: 'michael.chen@example.com',
      phone: '(415) 555-0132',
      status: 'Suspicious',
      statusColor: 'warning',
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Sophia Rodriguez',
      location: 'Miami, USA',
      email: 'sophia.r@example.com',
      phone: '(305) 555-0155',
      status: 'Active',
      statusColor: 'success',
      avatar: 'SR'
    },
    {
      id: 4,
      name: 'David Lee',
      location: 'Chicago, USA',
      email: 'david.lee@example.com',
      phone: '(312) 555-0199',
      status: 'Banned',
      statusColor: 'danger',
      avatar: 'DL'
    },
    {
      id: 5,
      name: 'Jessica Miller',
      location: 'Austin, USA',
      email: 'jessica.m@example.com',
      phone: '(512) 555-0112',
      status: 'Deactivated',
      statusColor: 'secondary',
      avatar: 'JM'
    }
  ];

  const getActionButtons = (status) => {
    if (status === 'Active' || status === 'Suspicious') {
      return (
        <>
          <button className="btn-icon btn-primary" title="View Profile">
            <FaEye />
          </button>
          <button className="btn-icon btn-warning" title="Edit">
            <FaEdit />
          </button>
          <button className="btn-icon btn-danger" title="Ban User">
            <FaBan />
          </button>
        </>
      );
    } else if (status === 'Banned' || status === 'Deactivated') {
      return (
        <>
          <button className="btn-icon btn-secondary" title="View Profile (Disabled)">
            <FaEye style={{ opacity: 0.5 }} />
          </button>
          <button className="btn-icon btn-danger" title="Delete">
            <FaTimes />
          </button>
          <button className="btn-icon btn-success" title="Restore User">
            <FaUserPlus />
          </button>
        </>
      );
    }
  };

  return (
    <div className="user-management-page">
      {/* Page Header */}
      <div className="page-header-section">
        <div>
          <h1 className="page-title">User Management</h1>
          <p className="page-subtitle">Manage job seeker accounts and profiles.</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="filters-bar mb-4">
        <h3 className="section-heading">Job Seekers List</h3>
        <div className="filter-actions">
          <button className="btn btn-outline-secondary btn-sm">
            <FaFilter className="me-2" />
            Filter
          </button>
          <button className="btn btn-outline-secondary btn-sm">
            <FaSort className="me-2" />
            Sort
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <div className="table-responsive">
          <table className="table user-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {user.avatar}
                      </div>
                      <div>
                        <h6 className="user-name">{user.name}</h6>
                        <p className="user-location">{user.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="email-cell">{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className={`badge status-badge status-${user.statusColor}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {getActionButtons(user.status)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <p className="pagination-info">Showing 1-5 of 25 users</p>
          <nav>
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#">‹</a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">1</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">2</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">3</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">›</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;