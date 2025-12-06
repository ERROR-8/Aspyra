import { FaEye, FaEdit, FaBan, FaTimes, FaUserPlus, FaFilter, FaSort } from 'react-icons/fa';
import './UserManagement.css';
import { useEffect, useState } from 'react';
import { getUsers, createUser } from '../api/users';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = () => {
    setLoading(true);
    getUsers()
      .then((data) => {
        const mapped = (data || []).map((u) => ({
          id: u._id || u.id,
          name: u.FullName || `${u.firstName || ''} ${u.lastName || ''}`.trim(),
          location: u.Address || '',
          email: u.Email || '',
          phone: u.PhoneNo ? String(u.PhoneNo) : u.phone || '',
          status: 'Active',
          statusColor: 'success',
          avatar: (u.FullName && u.FullName.split(' ').map(n=>n[0]).slice(0,2).join('')) || 'U'
        }));
        setUsers(mapped);
      })
      .catch((err) => {
        console.error('Failed to load users', err);
        setError(err?.message || 'Error loading users');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadUsers(); }, []);

  const [showCreate, setShowCreate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    FullName: '',
    Email: '',
    PhoneNo: '',
    Address: '',
    Pincode: '',
    Password: ''
  });
  const [message, setMessage] = useState(null);

  const openCreate = () => { setMessage(null); setShowCreate(true); };
  const closeCreate = () => { setShowCreate(false); setForm({ FullName: '', Email: '', PhoneNo: '', Address: '', Pincode: '', Password: '' }); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    // Basic validation
    const missing = [];
    if (!form.FullName) missing.push('Full Name');
    if (!form.Email) missing.push('Email');
    if (!form.PhoneNo) missing.push('Phone No');
    if (!form.Address) missing.push('Address');
    if (!form.Pincode) missing.push('Pincode');
    if (!form.Password) missing.push('Password');
    if (missing.length) {
      setMessage('Please provide: ' + missing.join(', '));
      setSubmitting(false);
      return;
    }
    try {
      const payload = { ...form, PhoneNo: Number(form.PhoneNo), Pincode: Number(form.Pincode) };
      await createUser(payload);
      setMessage('User created successfully');
      closeCreate();
      loadUsers();
    } catch (err) {
      console.error('Create user failed', err);
      const serverMsg = err?.response?.data?.error || err?.response?.data || err?.message;
      setMessage(serverMsg || 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

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

  if (loading) return <div className="user-management-page">Loading users...</div>;
  if (error) return <div className="user-management-page">Error: {error}</div>;

  return (
    <div className="user-management-page">
      {/* Page Header */}
      <div className="page-header-section">
        <h1 className="page-title">User Management</h1>
        <button className="btn btn-primary" onClick={openCreate}>
          Add User
        </button>
      </div>

      {message && <div className="alert alert-info mt-2">{message}</div>}

      {showCreate && (
        <div className="create-user-form card p-3 mb-4">
          <form onSubmit={handleCreate}>
            <div className="mb-2">
              <label className="form-label">Full Name</label>
              <input name="FullName" value={form.FullName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input name="Email" value={form.Email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Phone No</label>
              <input name="PhoneNo" value={form.PhoneNo} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Address</label>
              <input name="Address" value={form.Address} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Pincode</label>
              <input name="Pincode" value={form.Pincode} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input name="Password" type="password" value={form.Password} onChange={handleChange} className="form-control" required />
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success" type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Create'}</button>
              <button className="btn btn-secondary" type="button" onClick={closeCreate}>Cancel</button>
            </div>
          </form>
        </div>
      )}

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