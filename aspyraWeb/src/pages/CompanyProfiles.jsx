import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import './CompanyProfiles.css';
import { useEffect, useState } from 'react';
import { getCompanies, createCompany } from '../api/companies';

const CompanyProfiles = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCompanies = () => {
    setLoading(true);
    getCompanies()
      .then((data) => {
        const mapped = (data || []).map((c) => ({
          id: c._id || c.id,
          name: c.CompanyName || c.name,
          industry: c.CompanyType || '',
          location: c.CompanyAddress || '',
          logo: c.CompanyName ? c.CompanyName.charAt(0) : '',
          logoColor: '#4285f4',
          description: `Type: ${c.CompanyNature || ''}`,
          tags: [],
          rating: 4.5,
          openPositions: []
        }));
        setCompanies(mapped);
      })
      .catch((err) => {
        console.error('Failed to load companies', err);
        setError(err?.message || 'Error loading companies');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadCompanies(); }, []);

  const [showCreate, setShowCreate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    CompanyName: '',
    RegistrationNo: '',
    CompanyType: '',
    CompanyNature: '',
    CompanyAddress: '',
    ContactNo: '',
    Email: ''
  });
  const [message, setMessage] = useState(null);

  const openCreate = () => { setMessage(null); setShowCreate(true); };
  const closeCreate = () => { setShowCreate(false); setForm({ CompanyName: '', RegistrationNo: '', CompanyType: '', CompanyNature: '', CompanyAddress: '', ContactNo: '', Email: '' }); };

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
    if (!form.CompanyName) missing.push('Company Name');
    if (!form.RegistrationNo) missing.push('Registration No');
    if (!form.CompanyType) missing.push('Company Type');
    if (!form.CompanyNature) missing.push('Company Nature');
    if (!form.CompanyAddress) missing.push('Company Address');
    if (!form.ContactNo) missing.push('Contact No');
    if (!form.Email) missing.push('Email');
    if (missing.length) {
      setMessage('Please provide: ' + missing.join(', '));
      setSubmitting(false);
      return;
    }
    try {
      const payload = { ...form, ContactNo: Number(form.ContactNo) };
      await createCompany(payload);
      setMessage('Company created successfully');
      closeCreate();
      loadCompanies();
    } catch (err) {
      console.error('Create company failed', err);
      const serverMsg = err?.response?.data?.error || err?.response?.data || err?.message;
      setMessage(serverMsg || 'Failed to create company');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="company-profiles-page">Loading companies...</div>;
  if (error) return <div className="company-profiles-page">Error: {error}</div>;

  return (
    <div className="company-profiles-page">
      {/* Page Header */}
      <div className="page-header-section">
        <h1 className="page-title">Company Profiles</h1>
        <button className="btn btn-primary" onClick={openCreate}>
          Add Company
        </button>
      </div>

      {message && <div className="alert alert-info mt-2">{message}</div>}

      {showCreate && (
        <div className="create-company-form card p-3 mb-4">
          <form onSubmit={handleCreate}>
            <div className="mb-2">
              <label className="form-label">Company Name</label>
              <input name="CompanyName" value={form.CompanyName} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Registration No</label>
              <input name="RegistrationNo" value={form.RegistrationNo} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Company Type</label>
              <input name="CompanyType" value={form.CompanyType} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Company Nature</label>
              <input name="CompanyNature" value={form.CompanyNature} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Company Address</label>
              <input name="CompanyAddress" value={form.CompanyAddress} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Contact No</label>
              <input name="ContactNo" value={form.ContactNo} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input name="Email" value={form.Email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-success" type="submit" disabled={submitting}>{submitting ? 'Creating...' : 'Create'}</button>
              <button className="btn btn-secondary" type="button" onClick={closeCreate}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Companies Table */}
      <div className="table-container">
        <div className="table-responsive">
          <table className="table company-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Registration No</th>
                <th>Type</th>
                <th>Nature</th>
                <th>Address</th>
                <th>Contact No</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => (
                <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.registrationNo || company.RegistrationNo || ''}</td>
                  <td>{company.industry}</td>
                  <td>{company.nature || company.CompanyNature || ''}</td>
                  <td>{company.location}</td>
                  <td>{company.contactNo || company.ContactNo || ''}</td>
                  <td>{company.email || company.Email || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfiles;