import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import './CompanyProfiles.css';

const CompanyProfiles = () => {
  const companies = [
    {
      id: 1,
      name: 'Innovate Inc.',
      industry: 'Technology & AI',
      location: 'San Francisco, CA',
      logo: 'G',
      logoColor: '#4285f4',
      description: 'Innovate Inc. is a leading technology company specializing in artificial intelligence and machine learning solutions, driving innovation across various industries.',
      tags: [
        { name: 'AI', color: '#dbeafe' },
        { name: 'SaaS', color: '#dcfce7' }
      ],
      rating: 4.8,
      openPositions: [
        'Senior AI Engineer',
        'Product Designer',
        'Data Scientist'
      ]
    },
    {
      id: 2,
      name: 'QuantumLeap',
      industry: 'Fintech',
      location: 'New York, NY',
      logo: 'amazon',
      logoColor: '#ff9900',
      description: 'QuantumLeap is revolutionizing the financial industry with blockchain technology and decentralized finance solutions.',
      tags: [
        { name: 'Fintech', color: '#fef3c7' },
        { name: 'Blockchain', color: '#e5e7eb' }
      ],
      rating: 4.5,
      openPositions: [
        'Blockchain Developer',
        'Marketing Manager'
      ]
    },
    {
      id: 3,
      name: 'CreativeMinds',
      industry: 'Design & Branding',
      location: 'Remote',
      logo: 'N',
      logoColor: '#e50914',
      description: 'A digital agency with a passion for creating beautiful, intuitive, and user-centric designs for brands worldwide.',
      tags: [
        { name: 'Design', color: '#fce7f3' },
        { name: 'Branding', color: '#dbeafe' }
      ],
      rating: 5.0,
      openPositions: [
        'Lead UX Designer',
        'Graphic Designer',
        'Project Manager',
        'Webflow Developer'
      ]
    }
  ];

  return (
    <div className="company-profiles-page">
      {/* Page Header */}
      <div className="page-header-section mb-4">
        <h1 className="page-title">Company Profiles</h1>
        <p className="page-subtitle">Explore top companies and their job openings.</p>
      </div>

      {/* Company Cards Grid */}
      <div className="row g-4">
        {companies.map(company => (
          <div key={company.id} className="col-lg-4 col-md-6">
            <div className="company-card">
              {/* Company Header */}
              <div className="company-header">
                <div 
                  className="company-logo-large"
                  style={{ backgroundColor: company.logoColor + '20', color: company.logoColor }}
                >
                  {company.logo}
                </div>
                <div className="company-basic-info">
                  <h3 className="company-name">{company.name}</h3>
                  <p className="company-industry">{company.industry}</p>
                  <p className="company-location">
                    <FaMapMarkerAlt className="me-1" />
                    {company.location}
                  </p>
                </div>
              </div>

              {/* Company Description */}
              <p className="company-description">{company.description}</p>

              {/* Tags and Rating */}
              <div className="company-meta">
                <div className="company-tags">
                  {company.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="company-tag"
                      style={{ backgroundColor: tag.color }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <div className="company-rating">
                  <FaStar className="star-icon" />
                  <span className="rating-value">{company.rating}</span>
                </div>
              </div>

              {/* Open Positions */}
              <div className="open-positions">
                <h4 className="positions-title">
                  Open Positions ({company.openPositions.length})
                </h4>
                <ul className="positions-list">
                  {company.openPositions.map((position, index) => (
                    <li key={index}>
                      <a href="#" className="position-link">{position}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyProfiles;