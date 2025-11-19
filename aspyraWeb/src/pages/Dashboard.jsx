import { FaFileAlt, FaHourglass, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Application',
      value: '48',
      icon: FaFileAlt,
      color: '#4f46e5'
    },
    {
      title: 'Pending Review',
      value: '22',
      icon: FaHourglass,
      color: '#eab308'
    },
    {
      title: 'Interviews',
      value: '8',
      icon: FaCheckCircle,
      color: '#22c55e'
    },
    {
      title: 'Declined',
      value: '10',
      icon: FaTimesCircle,
      color: '#ef4444'
    }
  ];

  const chartData = [
    { month: 'Jan', Applications: 10, Interviews: 2 },
    { month: 'Feb', Applications: 16, Interviews: 4 },
    { month: 'Mar', Applications: 7, Interviews: 1 },
    { month: 'Apr', Applications: 13, Interviews: 3 },
    { month: 'May', Applications: 19, Interviews: 5 },
    { month: 'Jun', Applications: 8, Interviews: 2 }
  ];

  const upcomingInterviews = [
    {
      date: 'JUL',
      day: '28',
      title: 'Product Design Interview',
      company: 'Spotify',
      time: '10:30 AM'
    },
    {
      date: 'AUG',
      day: '02',
      title: 'Technical Screening',
      company: 'Google',
      time: '2:00 PM'
    }
  ];

  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <div className="page-header mb-4">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Welcome back, Emily! Here's your job application summary.</p>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-lg-3 col-md-6 mb-3">
            <div className="stat-card">
              <div className="stat-icon" style={{ color: stat.color }}>
                <stat.icon />
              </div>
              <div className="stat-content">
                <p className="stat-title">{stat.title}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Widgets Row */}
      <div className="row">
        {/* Application Trends Chart */}
        <div className="col-lg-8 mb-4">
          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Application Trends</h3>
              <select className="form-select chart-filter">
                <option>Last 6 months</option>
                <option>Last 3 months</option>
                <option>Last year</option>
              </select>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Applications" fill="#818cf8" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="Interviews" fill="#4ade80" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-lg-4">
          {/* Profile Completion */}
          <div className="widget-card mb-4">
            <h3 className="widget-title">Profile Completion</h3>
            <div className="profile-completion">
              <h2 className="completion-percent">80% Complete</h2>
              <p className="completion-text">
                Complete your profile to stand out to recruiters.
              </p>
            </div>
          </div>

          {/* Upcoming Interviews */}
          <div className="widget-card">
            <h3 className="widget-title">Upcoming Interviews</h3>
            <div className="interviews-list">
              {upcomingInterviews.map((interview, index) => (
                <div key={index} className="interview-item">
                  <div className="interview-date">
                    <span className="date-month">{interview.date}</span>
                    <span className="date-day">{interview.day}</span>
                  </div>
                  <div className="interview-details">
                    <h4 className="interview-title">{interview.title}</h4>
                    <p className="interview-meta">
                      {interview.company} • {interview.time}
                    </p>
                  </div>
                </div>
              ))}
              <a href="#" className="view-all-link">View all interviews</a>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="section-header">
            <h3 className="section-title">Recent Applications</h3>
            <a href="#" className="view-all-link">View All</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;