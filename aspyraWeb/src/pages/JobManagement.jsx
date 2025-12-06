import { FaPlus, FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import './JobManagement.css';
import { useEffect, useState } from 'react';
import { getJobs, createJob } from '../api/jobs';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getJobs()
      .then((data) => {
        // Map backend fields to frontend display fields if needed
        const mapped = (data || []).map((j) => ({
          id: j._id || j.id,
          title: j.JobsName || j.title,
          description: j.JobDesc || j.description,
          company: j.CompanyName || j.company || '',
          location: j.Location || '',
          salary: j.Salary ? `$${j.Salary}` : j.salary || '',
          type: j.JobsType || j.type || '',
          status: j.status || 'Active',
          statusColor: j.status === 'Approved' ? 'success' : (j.status === 'Rejected' ? 'danger' : 'warning')
        }));
        setJobs(mapped);
      })
      .catch((err) => {
        console.error('Failed to load jobs', err);
        setError(err?.message || 'Error loading jobs');
      })
      .finally(() => setLoading(false));
  }, []);

  const loadJobs = () => {
    setLoading(true);
    getJobs()
      .then((data) => {
        const mapped = (data || []).map((j) => ({
          id: j._id || j.id,
          title: j.JobsName || j.title,
          description: j.JobDesc || j.description,
          company: j.CompanyName || j.company || '',
          location: j.Location || '',
          salary: j.Salary ? `$${j.Salary}` : j.salary || '',
          type: j.JobsType || j.type || '',
          status: j.status || 'Active',
          statusColor: j.status === 'Approved' ? 'success' : (j.status === 'Rejected' ? 'danger' : 'warning')
        }));
        setJobs(mapped);
      })
      .catch((err) => {
        console.error('Failed to load jobs', err);
        setError(err?.message || 'Error loading jobs');
      })
      .finally(() => setLoading(false));
  };

  // keep initial load behavior
  useEffect(() => { loadJobs(); }, []);

  const [showCreate, setShowCreate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ JobsName: '', JobsType: '', JobDesc: '', Requirements: '', Location: '', Salary: '' });
  const [message, setMessage] = useState(null);

  const openCreate = () => { setMessage(null); setShowCreate(true); };
  const closeCreate = () => { setShowCreate(false); setForm({ JobsName: '', JobsType: '', JobDesc: '', Requirements: '', Location: '', Salary: '' }); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    // Client-side validation for required backend fields
    const missing = [];
    if (!form.JobsName || !form.JobsName.trim()) missing.push('Job Title');
    if (!form.JobsType || !form.JobsType.trim()) missing.push('Job Type');
    if (!form.JobDesc || !form.JobDesc.trim()) missing.push('Description');
    if (!form.Requirements || !form.Requirements.trim()) missing.push('Requirements');
    if (!form.Location || !form.Location.trim()) missing.push('Location');

    if (missing.length) {
      setMessage('Please provide: ' + missing.join(', '));
      setSubmitting(false);
      return;
    }

    try {
      // Ensure salary is number when sending
      const payload = { ...form, Salary: form.Salary ? Number(form.Salary) : 0 };
      const created = await createJob(payload);
      console.log('Create job response:', created);
      setMessage('Job created successfully');
      closeCreate();
      loadJobs();
    } catch (err) {
      console.error('Create job failed', err);
      const serverMsg = err?.response?.data?.error || err?.response?.data || err?.message;
      setMessage(serverMsg || 'Failed to create job');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="job-management-page">Loading jobs...</div>;
  if (error) return <div className="job-management-page">Error: {error}</div>;

  return (
    <div className="job-management-page">
      {/* Page Header */}
      <div className="page-header-section">
        <h1 className="page-title">Job Management</h1>
        <button className="btn btn-primary" onClick={openCreate}>
          <FaPlus className="me-2" />
          Create Job Post
        </button>
      </div>

      {message && <div className="alert alert-info mt-2">{message}</div>}

      {showCreate && (
        <div className="create-job-form card p-3 mb-4">
          <form onSubmit={handleCreate}>
            <div className="mb-2">
              <label className="form-label">Job Title</label>
              <input name="JobsName" value={form.JobsName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Company</label>
              <input name="CompanyName" value={form.CompanyName || ''} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label className="form-label">Location</label>
              <input name="Location" value={form.Location} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label className="form-label">Salary</label>
              <input name="Salary" value={form.Salary} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label className="form-label">Job Type</label>
              <input name="JobsType" value={form.JobsType} onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label className="form-label">Requirements</label>
              <textarea name="Requirements" value={form.Requirements} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea name="JobDesc" value={form.JobDesc} onChange={handleChange} className="form-control" />
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success" type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Create'}</button>
              <button className="btn btn-secondary" type="button" onClick={closeCreate}>Cancel</button>
            </div>
          </form>
        </div>
      )}

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