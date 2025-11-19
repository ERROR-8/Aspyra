import { FaBell, FaLock, FaGlobe, FaPalette, FaShieldAlt } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  const settingsSections = [
    {
      title: 'Notifications',
      icon: FaBell,
      iconColor: '#3b82f6',
      settings: [
        { label: 'Email Notifications', type: 'switch', defaultChecked: true },
        { label: 'Push Notifications', type: 'switch', defaultChecked: false },
        { label: 'SMS Notifications', type: 'switch', defaultChecked: false }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: FaShieldAlt,
      iconColor: '#22c55e',
      settings: [
        { label: 'Two-Factor Authentication', type: 'switch', defaultChecked: true },
        { label: 'Profile Visibility', type: 'select', options: ['Public', 'Private', 'Friends Only'] },
        { label: 'Activity Status', type: 'switch', defaultChecked: true }
      ]
    },
    {
      title: 'Appearance',
      icon: FaPalette,
      iconColor: '#a855f7',
      settings: [
        { label: 'Theme', type: 'select', options: ['Light', 'Dark', 'Auto'] },
        { label: 'Language', type: 'select', options: ['English', 'Spanish', 'French', 'German'] }
      ]
    },
    {
      title: 'Account',
      icon: FaLock,
      iconColor: '#ef4444',
      settings: [
        { label: 'Change Password', type: 'button' },
        { label: 'Delete Account', type: 'button', variant: 'danger' }
      ]
    }
  ];

  return (
    <div className="settings-page">
      {/* Page Header */}
      <div className="page-header-section mb-4">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your account preferences and settings.</p>
      </div>

      {/* Settings Sections */}
      <div className="row g-4">
        {settingsSections.map((section, index) => (
          <div key={index} className="col-lg-6">
            <div className="settings-card">
              <div className="settings-card-header">
                <div 
                  className="settings-icon"
                  style={{ backgroundColor: section.iconColor + '20', color: section.iconColor }}
                >
                  <section.icon />
                </div>
                <h3 className="settings-title">{section.title}</h3>
              </div>
              
              <div className="settings-card-body">
                {section.settings.map((setting, idx) => (
                  <div key={idx} className="setting-item">
                    <label className="setting-label">{setting.label}</label>
                    
                    {setting.type === 'switch' && (
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          defaultChecked={setting.defaultChecked}
                        />
                      </div>
                    )}
                    
                    {setting.type === 'select' && (
                      <select className="form-select setting-select">
                        {setting.options.map((option, optIdx) => (
                          <option key={optIdx}>{option}</option>
                        ))}
                      </select>
                    )}
                    
                    {setting.type === 'button' && (
                      <button 
                        className={`btn ${setting.variant === 'danger' ? 'btn-danger' : 'btn-primary'} btn-sm`}
                      >
                        {setting.label}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-4">
        <button className="btn btn-primary btn-lg">Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;