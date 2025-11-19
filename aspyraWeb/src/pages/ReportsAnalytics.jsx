import { 
  FaBriefcase, FaFileAlt, FaBuilding, FaPlus, 
  FaUserPlus, FaCheckCircle, FaFilePdf, FaFileExcel 
} from 'react-icons/fa';
import './ReportsAnalytics.css';

const ReportsAnalytics = () => {
  const metrics = [
    {
      title: 'Jobs Posted',
      value: '1,250',
      change: '↑ 15% last month',
      changeType: 'positive',
      icon: FaBriefcase,
      iconColor: '#4f46e5'
    },
    {
      title: 'Applications Received',
      value: '34,890',
      change: '↑ 22% last month',
      changeType: 'positive',
      icon: FaFileAlt,
      iconColor: '#22c55e'
    },
    {
      title: 'Active Companies',
      value: '312',
      change: '↓ 2% last month',
      changeType: 'negative',
      icon: FaBuilding,
      iconColor: '#a855f7'
    }
  ];

  const activities = [
    {
      icon: FaPlus,
      iconColor: '#22c55e',
      text: 'New job posted: "Senior Frontend Developer"',
      time: '2 hours ago'
    },
    {
      icon: FaUserPlus,
      iconColor: '#4f46e5',
      text: 'New company registered: "Innovate Inc."',
      time: '1 day ago'
    },
    {
      icon: FaCheckCircle,
      iconColor: '#a855f7',
      text: 'Monthly application report downloaded.',
      time: '3 days ago'
    }
  ];

  return (
    <div className="reports-page">
      {/* Page Header */}
      <div className="page-header-section mb-4">
        <h1 className="page-title">Reports & Analytics</h1>
        <p className="page-subtitle">Track key metrics and generate reports.</p>
      </div>

      {/* Metrics Cards */}
      <div className="row mb-4">
        {metrics.map((metric, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-3">
            <div className="metric-card">
              <div 
                className="metric-icon"
                style={{ backgroundColor: metric.iconColor + '20', color: metric.iconColor }}
              >
                <metric.icon />
              </div>
              <div className="metric-content">
                <p className="metric-title">{metric.title}</p>
                <h3 className="metric-value">{metric.value}</h3>
                <p className={`metric-change ${metric.changeType}`}>
                  {metric.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Download Reports Section */}
      <div className="reports-section mb-4">
        <div className="reports-header">
          <h3 className="section-title">Download Reports</h3>
          <div className="download-buttons">
            <button className="btn btn-pdf">
              <FaFilePdf className="me-2" />
              Download PDF
            </button>
            <button className="btn btn-excel">
              <FaFileExcel className="me-2" />
              Download Excel
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="activity-section">
        <h3 className="section-title mb-3">Recent Activity</h3>
        <div className="activity-list">
          {activities.map((activity, index) => (
            <div key={index} className="activity-item">
              <div 
                className="activity-icon"
                style={{ backgroundColor: activity.iconColor + '20', color: activity.iconColor }}
              >
                <activity.icon />
              </div>
              <div className="activity-content">
                <p className="activity-text">{activity.text}</p>
              </div>
              <span className="activity-time">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;