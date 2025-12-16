import { 
  FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaBriefcase, FaGraduationCap, FaEdit, FaSave, FaTimes
} from 'react-icons/fa';
import './Profile.css';
import { useState, useEffect } from 'react';
import { getCurrentUser, isRecruiter, getUserRole } from '../utils/authUtils';
import { getUsers, updateUser } from '../api/users';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    address: '',
    pincode: '',
    bio: '',
    title: '',
    company: ''
  });

  const [editForm, setEditForm] = useState({
    FullName: '',
    Email: '',
    PhoneNo: '',
    Address: '',
    Pincode: ''
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [changingPassword, setChangingPassword] = useState(false);

  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  // Load user data on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    const userRole = getUserRole();
    
    // Format role display (capitalize first letter, replace hyphens/underscores)
    const roleDisplay = userRole.charAt(0).toUpperCase() + userRole.slice(1).replace(/[-_]/g, ' ');
    
    if (currentUser) {
      setUserInfo({
        name: currentUser.FullName || '',
        email: currentUser.Email || '',
        phone: currentUser.PhoneNo || '',
        location: currentUser.Address || '',
        address: currentUser.Address || '',
        pincode: currentUser.Pincode || '',
        bio: currentUser.bio || '',
        title: roleDisplay || 'User',
        company: currentUser.company || ''
      });

      setEditForm({
        FullName: currentUser.FullName || '',
        Email: currentUser.Email || '',
        PhoneNo: currentUser.PhoneNo || '',
        Address: currentUser.Address || '',
        Pincode: currentUser.Pincode || ''
      });

      // Load mock skills/experience/education (can be extended with real data)
      setSkills(currentUser.skills || [
        'JavaScript', 'React', 'Node.js', 'Problem Solving',
        'Communication', 'Team Collaboration', 'Git', 'Agile'
      ]);

      setExperience(currentUser.experience || [
        {
          title: 'Current Role',
          company: 'Your Company',
          period: 'Present',
          description: 'Your current position and responsibilities'
        }
      ]);

      setEducation(currentUser.education || [
        {
          degree: 'Relevant Qualification',
          school: 'Your School/University',
          year: 'Year'
        }
      ]);
    }
    setLoading(false);
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage(null);
    const currentUser = getCurrentUser();
    
    if (!currentUser || !currentUser.id) {
      setMessage('Error: User not found');
      setSaving(false);
      return;
    }

    try {
      const payload = {
        FullName: editForm.FullName,
        Email: editForm.Email,
        PhoneNo: editForm.PhoneNo,
        Address: editForm.Address,
        Pincode: editForm.Pincode ? Number(editForm.Pincode) : undefined
      };

      await updateUser(currentUser.id, payload);
      
      // Update localStorage with new user data
      const updatedUser = { ...currentUser, ...payload };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setUserInfo({
        name: editForm.FullName,
        email: editForm.Email,
        phone: editForm.PhoneNo,
        location: editForm.Address,
        address: editForm.Address,
        pincode: editForm.Pincode,
        bio: userInfo.bio,
        title: userInfo.title,
        company: userInfo.company
      });

      setMessage('Profile updated successfully');
      setIsEditing(false);
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Failed to update profile', err);
      const serverMsg = err?.response?.data?.error || err?.message || 'Failed to update profile';
      setMessage(serverMsg);
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordMessage(null);
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.id) {
      setPasswordMessage('Error: User not found');
      return;
    }

    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMessage('Please fill all password fields');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage('New password must be at least 6 characters');
      return;
    }

    setChangingPassword(true);
    try {
      const payload = {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      };
      // API call
      const { changePassword } = await import('../api/users');
      await changePassword(currentUser.id, payload);
      setPasswordMessage('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
      setTimeout(() => setPasswordMessage(null), 3000);
    } catch (err) {
      console.error('Password change failed', err);
      const serverMsg = err?.response?.data?.error || err?.message || 'Failed to change password';
      setPasswordMessage(serverMsg);
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return <main className="profile-page" aria-busy="true">Loading profile...</main>;
  }

  return (
    <main className="profile-page">
      <header className="profile-header-section">
        <h1 className="page-title">User Profile</h1>
        {!isEditing ? (
          <button className="btn btn-primary" type="button" onClick={() => setIsEditing(true)} aria-label="Edit profile">
            <FaEdit className="me-2" aria-hidden="true" />
            Edit Profile
          </button>
        ) : (
          <div className="btn-group gap-2" role="group" aria-label="Profile edit actions">
            <button className="btn btn-success" type="button" onClick={handleSaveProfile} disabled={saving} aria-disabled={saving} aria-label="Save profile">
              <FaSave className="me-2" aria-hidden="true" />
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button className="btn btn-secondary" type="button" onClick={() => setIsEditing(false)} disabled={saving} aria-label="Cancel editing">
              <FaTimes className="me-2" aria-hidden="true" />
              Cancel
            </button>
          </div>
        )}
      </header>

      {message && (
        <div role="status" aria-live="polite" className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} mt-2`}>
          {message}
        </div>
      )}

      <section className="profile-grid" aria-labelledby="profile-overview">
        <aside className="profile-sidebar" aria-label="User summary">
          <div className="avatar-wrapper" role="img" aria-label={`Avatar for ${userInfo.name}`}>
            <FaUserCircle className="profile-avatar-large" aria-hidden="true" />
          </div>
          <h2 id="profile-overview" className="profile-name">{userInfo.name}</h2>
          <p className="profile-title">{userInfo.title}</p>
          <p className="profile-company">{userInfo.company}</p>
          <p className="profile-bio">{userInfo.bio}</p>
        </aside>

        <div className="profile-main">
          {isEditing ? (
            <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} aria-label="Edit profile form">
              <div className="form-row">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input id="fullName" name="FullName" aria-required="true" className="form-control" value={editForm.FullName} onChange={handleEditChange} />
              </div>

              <div className="form-row">
                <label htmlFor="email" className="form-label">Email</label>
                <input id="email" name="Email" type="email" aria-required="true" className="form-control" value={editForm.Email} onChange={handleEditChange} />
              </div>

              <div className="form-row">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input id="phone" name="PhoneNo" className="form-control" value={editForm.PhoneNo} onChange={handleEditChange} />
              </div>

              <div className="form-row">
                <label htmlFor="address" className="form-label">Address</label>
                <input id="address" name="Address" className="form-control" value={editForm.Address} onChange={handleEditChange} />
              </div>

              <div className="form-row">
                <label htmlFor="pincode" className="form-label">Pincode</label>
                <input id="pincode" name="Pincode" className="form-control" value={editForm.Pincode} onChange={handleEditChange} />
              </div>

              <hr />

              <div className="form-row">
                <button className="btn btn-primary" type="submit" disabled={saving} aria-disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
                <button className="btn btn-secondary" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
              </div>

              <div className="password-section">
                <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPasswordForm(prev => !prev)} aria-expanded={showPasswordForm} aria-controls="password-form">Change Password</button>

                {showPasswordForm && (
                  <div id="password-form" className="password-change-section" aria-live="polite">
                    <div className="mb-3">
                      <label htmlFor="currentPassword" className="form-label">Current Password</label>
                      <input id="currentPassword" type="password" className="form-control" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <input id="newPassword" type="password" className="form-control" value={passwordForm.newPassword} onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                      <input id="confirmPassword" type="password" className="form-control" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))} />
                    </div>
                    {passwordMessage && <div role="status" className={`alert ${passwordMessage.includes('success') ? 'alert-success' : 'alert-danger'} mt-2`}>{passwordMessage}</div>}
                    <div className="d-flex gap-2">
                      <button className="btn btn-primary" onClick={handlePasswordChange} disabled={changingPassword} type="button">{changingPassword ? 'Changing...' : 'Change Password'}</button>
                      <button className="btn btn-secondary" onClick={() => { setShowPasswordForm(false); setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); setPasswordMessage(null); }} type="button">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          ) : (
            <div className="profile-info" aria-label="Profile details">
              <div className="info-row">
                <label className="info-label">Email</label>
                <div className="info-value">{userInfo.email}</div>
              </div>
              <div className="info-row">
                <label className="info-label">Phone</label>
                <div className="info-value">{userInfo.phone}</div>
              </div>
              <div className="info-row">
                <label className="info-label">Location</label>
                <div className="info-value">{userInfo.location}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;