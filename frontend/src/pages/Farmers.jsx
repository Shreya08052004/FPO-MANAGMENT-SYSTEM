import { useState, useCallback } from 'react'
import { useFetch } from '../hooks/useFetch'
import { api } from '../utils/api'
import { Search, Plus, User, MapPin, Wheat, X, Check } from 'lucide-react'
import './Farmers.css'

const CROPS = ['All', 'Wheat', 'Rice', 'Sugarcane', 'Mustard', 'Potato', 'Maize', 'Dal']

function Badge({ status }) {
  return <span className={`badge badge-${status === 'Active' ? 'green' : 'red'}`}>{status}</span>
}

function Modal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ name: '', village: '', crop: 'Wheat', land_acres: '', income: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const submit = async () => {
    if (!form.name || !form.village || !form.land_acres) return
    setLoading(true)
    try {
      await api.createFarmer({ ...form, land_acres: parseFloat(form.land_acres), income: parseInt(form.income) || 0 })
      setSuccess(true)
      setTimeout(() => { onSuccess?.(); onClose() }, 1200)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Farmer</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        {success ? (
          <div className="modal-success">
            <div className="success-icon"><Check size={28} /></div>
            <div>Farmer added successfully!</div>
          </div>
        ) : (
          <>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name *</label>
                <input placeholder="e.g. Ramesh Kumar" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Village *</label>
                <input placeholder="e.g. Sitapur" value={form.village} onChange={e => setForm(f => ({ ...f, village: e.target.value }))} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Main Crop</label>
                  <select value={form.crop} onChange={e => setForm(f => ({ ...f, crop: e.target.value }))}>
                    {CROPS.slice(1).map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Land (Acres) *</label>
                  <input type="number" placeholder="e.g. 3.5" value={form.land_acres} onChange={e => setForm(f => ({ ...f, land_acres: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label>Annual Income (₹)</label>
                <input type="number" placeholder="e.g. 120000" value={form.income} onChange={e => setForm(f => ({ ...f, income: e.target.value }))} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={onClose}>Cancel</button>
              <button className="btn-primary" onClick={submit} disabled={loading}>
                {loading ? 'Adding...' : 'Add Farmer'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function Farmers() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')
  const [crop, setCrop] = useState('All')
  const [showModal, setShowModal] = useState(false)

  const fetchFn = useCallback(() => api.farmers({ search, status: status !== 'All' ? status : undefined, crop: crop !== 'All' ? crop : undefined }), [search, status, crop])
  const { data, loading, refetch } = useFetch(fetchFn, [search, status, crop])

  const fmtIncome = (v) => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : `₹${(v/1000).toFixed(0)}K`

  return (
    <div className="farmers-page">
      <div className="page-header">
        <div>
          <h1>Farmers Registry</h1>
          <p>{data?.total || 0} farmers enrolled</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add Farmer
        </button>
      </div>

      <div className="filter-bar">
        <div className="search-wrap">
          <Search size={14} />
          <input placeholder="Search by name or village..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select value={status} onChange={e => setStatus(e.target.value)}>
          {['All','Active','Inactive'].map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={crop} onChange={e => setCrop(e.target.value)}>
          {CROPS.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="table-card">
        {loading ? (
          <div className="loading-rows">
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52, marginBottom: 4 }} />)}
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Farmer ID</th>
                <th>Name</th>
                <th>Village</th>
                <th>Crop</th>
                <th>Land (Acres)</th>
                <th>Annual Income</th>
                <th>Joined</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(data?.farmers || []).map((f, i) => (
                <tr key={f.id} style={{ animationDelay: `${i * 30}ms` }} className="slide-in">
                  <td><span className="mono" style={{ color: 'var(--green)', fontSize: '0.8rem' }}>{f.id}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="avatar-sm"><User size={13} /></div>
                      <span style={{ color: 'var(--text)', fontWeight: 500 }}>{f.name}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <MapPin size={12} color="var(--text3)" />
                      {f.village}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <Wheat size={12} color="var(--amber)" />
                      {f.crop}
                    </div>
                  </td>
                  <td><span className="mono">{f.land_acres}</span></td>
                  <td><span style={{ color: 'var(--green)', fontWeight: 600 }}>{fmtIncome(f.income)}</span></td>
                  <td><span className="mono" style={{ fontSize: '0.78rem' }}>{f.joined}</span></td>
                  <td><Badge status={f.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)} onSuccess={refetch} />}
    </div>
  )
}
