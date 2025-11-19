import { 
  FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaBriefcase, FaGraduationCap, FaEdit 
} from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const userInfo = {
    name: 'Emily Carter',
    email: 'emily.carter@example.com',
    phone: '+1 (212) 555-0182',
    location: 'New York, NY, USA',
    title: 'Senior Software Engineer',
    company: 'Tech Solutions Inc.',
    bio: 'Passionate software engineer with 8+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies. Always eager to learn new technologies and solve complex problems.'
  };

  const skills = [
    'JavaScript', 'React', 'Node.js', 'Python', 'AWS',
    'Docker', 'MongoDB', 'PostgreSQL', 'Git', 'Agile'
  ];

  const experience = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      period: '2020 - Present',
      description: 'Leading frontend development team, architecting scalable solutions'
    },
    {
      title: 'Software Engineer',
      company: 'Innovate Co.',
      period: '2018 - 2020',
      description: 'Developed full-stack applications using React and Node.js'
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Labs',
      period: '2016 - 2018',
      description: 'Built responsive web applications and learned best practices'
    }
  ];

  const education = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'Stanford University',
      year: '2016'
    },
    {
      degree: 'Bachelor of Science in Software Engineering',
      school: 'MIT',
      year: '2014'
    }
  ];

  return (
    <div className="profile-page">
      {/* Page Header with Edit Button */}
      <div className="profile-header-section">
        <h1 className="page-title">User Profile</h1>
        <button className="btn btn-primary">
          <FaEdit className="me-2" />
          Edit Profile
        </button>
      </div>

      <div className="row g-4">
        {/* Left Column - User Info Card */}
        <div className="col-lg-4">
          <div className="profile-card">
            <div className="profile-avatar-section">
              <FaUserCircle className="profile-avatar-large" />
              <h2 className="profile-name">{userInfo.name}</h2>
              <p className="profile-title">{userInfo.title}</p>
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <span>{userInfo.email}</span>
              </div>
              <div className="detail-item">
                <FaPhone className="detail-icon" />
                <span>{userInfo.phone}</span>
              </div>
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <span>{userInfo.location}</span>
              </div>
              <div className="detail-item">
                <FaBriefcase className="detail-icon" />
                <span>{userInfo.company}</span>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="profile-card mt-3">
            <h3 className="card-section-title">Skills</h3>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <span key={index} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Bio, Experience, Education */}
        <div className="col-lg-8">
          {/* Bio */}
          <div className="profile-card mb-4">
            <h3 className="card-section-title">About Me</h3>
            <p className="bio-text">{userInfo.bio}</p>
          </div>

          {/* Experience */}
          <div className="profile-card mb-4">
            <h3 className="card-section-title">
              <FaBriefcase className="me-2" />
              Work Experience
            </h3>
            <div className="timeline">
              {experience.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4 className="timeline-title">{exp.title}</h4>
                    <p className="timeline-company">{exp.company}</p>
                    <p className="timeline-period">{exp.period}</p>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="profile-card">
            <h3 className="card-section-title">
              <FaGraduationCap className="me-2" />
              Education
            </h3>
            <div className="education-list">
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h4 className="education-degree">{edu.degree}</h4>
                  <p className="education-school">{edu.school}</p>
                  <p className="education-year">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;