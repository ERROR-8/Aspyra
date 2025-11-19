import { FaPlus, FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import './JobManagement.css';

const JobManagement = () => {
  const jobs = [
    {
      id: 1,
      title: 'Software Engineer',
      description: 'Develops and maintains software applications.',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      type: 'Full-time',
      status: 'Pending Approval',
      statusColor: 'warning'
    },
    {
      id: 2,
      title: 'Product Manager',
      description: 'Oversees product development from conception to launch.',
      company: 'Innovate Co.',
      location: 'New York, NY',
      salary: '$110k - $140k',
      type: 'Full-time',
      status: 'Approved',
      statusColor: 'success'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      description: 'Designs user interfaces and experiences for web/mobile.',
      company: 'Creative Minds',
      location: 'Remote',
      salary: '$90k - $110k',
      type: 'Contract',
      status: 'Rejected',
      statusColor: 'danger'
    },
    {
      id: 4,
      title: 'Data Analyst',
      description: 'Analyze large datasets to identify trends.',
      company: 'Data Corp',
      location: 'Chicago, IL',
      salary: '$85k - $105k',
      type: 'Part-time',
      status: 'Approved',
      statusColor: 'success'
    },
    {
      id: 5,
      title: 'Marketing Intern',
      description: 'Assist with marketing campaigns and social media.',
      company: 'Growth Hackers',
      location: 'Austin, TX',
      salary: '$20/hr - $25/hr',
      type: 'Internship',
      status: 'Pending Approval',
      statusColor: 'warning'
    }
  ];

  return (
    <div className="job-management-page">
      {/* Page Header */}
      <div className="page-header-section">
        <h1 className="page-title">Job Management</h1>
        <button className="btn btn-primary">
          <FaPlus className="me-2" />
          Create Job Post
        </button>
      </div>

      {/* Filters */}
      <div className="filters-section mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Job Name"
            />
          </div>
          <div className="col-md-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Company"
            />
          </div>
          <div className="col-md-3">
            <input 
              type="text" 
              className="form-control" 
              placeholder="Location"
            />
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>All Job Types</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="table-container">
        <div className="table-responsive">
          <table className="table job-table">
            <thead>
              <tr>
                <th>Job Name</th>
                <th>Company</th>
                <th>Location</th>
                <th>Salary</th>
                <th>Job Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id}>
                  <td>
                    <div className="job-name-cell">
                      <h6 className="job-title-text">{job.title}</h6>
                      <p className="job-description">{job.description}</p>
                    </div>
                  </td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td className="salary-cell">{job.salary}</td>
                  <td>{job.type}</td>
                  <td>
                    <span className={`badge status-badge status-${job.statusColor}`}>
                      {job.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {job.status === 'Pending Approval' && (
                        <>
                          <button className="btn-icon btn-success" title="Approve">
                            <FaCheck />
                          </button>
                          <button className="btn-icon btn-danger" title="Reject">
                            <FaTimes />
                          </button>
                        </>
                      )}
                      <button className="btn-icon btn-primary" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="btn-icon btn-danger" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobManagement;