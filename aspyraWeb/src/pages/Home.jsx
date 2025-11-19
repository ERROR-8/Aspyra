import { 
  FaTools, FaShoppingCart, FaBullhorn, FaCoins, 
  FaLaptopCode, FaCog, FaBriefcase, FaUsers, FaPlus 
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const popularJobs = [
    {
      id: 1,
      company: 'Google Inc.',
      logo: 'G',
      position: 'Software Engineer',
      salary: '$120k - $150k',
      location: 'California, US'
    },
    {
      id: 2,
      company: 'Amazon',
      logo: 'amazon',
      position: 'Product Manager',
      salary: '$100k - $130k',
      location: 'Seattle, US'
    },
    {
      id: 3,
      company: 'Netflix',
      logo: 'N',
      position: 'UI/UX Designer',
      salary: '$90k - $110k',
      location: 'Los Gatos, US'
    }
  ];

  const categories = [
    { name: 'Design', icon: FaTools, color: '#dbeafe' },
    { name: 'Sales', icon: FaShoppingCart, color: '#dcfce7' },
    { name: 'Marketing', icon: FaBullhorn, color: '#fce7f3' },
    { name: 'Finance', icon: FaCoins, color: '#fef9c3' },
    { name: 'Technology', icon: FaLaptopCode, color: '#e9d5ff' },
    { name: 'Engineering', icon: FaCog, color: '#dbeafe' },
    { name: 'Business', icon: FaBriefcase, color: '#fce7f3' },
    { name: 'Human Resource', icon: FaUsers, color: '#dbeafe' },
    { name: 'More', icon: FaPlus, color: '#fef3c7' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <h1 className="hero-title">Hi, Welcome Back! 👋</h1>
            <p className="hero-subtitle">Let's find your dream job</p>
            
            <div className="hero-card mt-4">
              <h2 className="hero-card-title">Find your dream job here!</h2>
              <p className="hero-card-text">
                Explore the best job opportunities from top companies.
              </p>
              <button className="btn btn-primary btn-search-job">
                Search Job
              </button>
            </div>
          </div>
          <div className="col-lg-5 text-center">
            <div className="hero-illustration">
              <div className="illustration-placeholder"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Jobs and Categories */}
      <div className="row mt-5">
        {/* Popular Jobs */}
        <div className="col-lg-8">
          <h3 className="section-title">Popular Jobs</h3>
          <div className="jobs-list">
            {popularJobs.map(job => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <div className="company-logo">
                    {job.logo}
                  </div>
                  <div className="job-info">
                    <h4 className="job-position">{job.position}</h4>
                    <p className="company-name">{job.company}</p>
                  </div>
                </div>
                <div className="job-details">
                  <span className="job-salary">{job.salary}</span>
                  <span className="job-location">{job.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Categories */}
        <div className="col-lg-4">
          <h3 className="section-title">Job Categories</h3>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-item">
                <div 
                  className="category-icon" 
                  style={{ backgroundColor: category.color }}
                >
                  <category.icon />
                </div>
                <p className="category-name">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;