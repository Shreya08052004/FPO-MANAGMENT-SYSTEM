import { useState, useCallback } from 'react'
import { useFetch } from '../hooks/useFetch'
import { api } from '../utils/api'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Transactions.css'

const CROPS = ['All','Wheat','Rice','Sugarcane','Mustard','Potato','Maize','Dal']
const STATUS = ['All','Completed','Pending','Processing']

const statusColor = { Completed: 'green', Pending: 'amber', Processing: 'blue' }

export default function Transactions() {
  const [page, setPage] = useState(1)
  const [crop, setCrop] = useState('All')
  const [status, setStatus] = useState('All')

  const fetchFn = useCallback(() => api.transactions({
    page, limit: 12,
    crop: crop !== 'All' ? crop : undefined,
    status: status !== 'All' ? status : undefined
  }), [page, crop, status])

  const { data, loading } = useFetch(fetchFn, [page, crop, status])

  const fmtCurrency = v => `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`

  return (
    <div className="tx-page">
      <div className="page-header">
        <div>
          <h1>Transactions</h1>
          <p>{data?.total || 0} records total</p>
        </div>
      </div>

      <div className="filter-bar">
        <select value={crop} onChange={e => { setCrop(e.target.value); setPage(1) }}>
          {CROPS.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}>
          {STATUS.map(s => <option key={s}>{s}</option>)}
        </select>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: '0.8rem', color: 'var(--text3)' }}>
          Page {page} of {data?.pages || 1}
        </span>
      </div>

      <div className="table-card">
        {loading ? (
          <div className="loading-rows">
            {[...Array(10)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52, marginBottom: 4 }} />)}
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tx ID</th>
                <th>Date</th>
                <th>Farmer</th>
                <th>Crop</th>
                <th>Qty (Qtl)</th>
                <th>Price/Qtl</th>
                <th>Total Value</th>
                <th>Buyer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(data?.transactions || []).map((t, i) => (
                <tr key={t.id} style={{ animationDelay: `${i * 25}ms` }} className="slide-in">
                  <td><span className="mono" style={{ color: 'var(--green)', fontSize: '0.78rem' }}>{t.id}</span></td>
                  <td><span className="mono" style={{ fontSize: '0.78rem' }}>{t.date}</span></td>
                  <td><span style={{ color: 'var(--green)', fontSize: '0.78rem', fontFamily: 'var(--mono)' }}>{t.farmer_id}</span></td>
                  <td>{t.crop}</td>
                  <td><span className="mono">{t.quantity_qtl}</span></td>
                  <td><span className="mono">{fmtCurrency(t.price_per_qtl)}</span></td>
                  <td><span style={{ color: 'var(--text)', fontWeight: 700 }}>{fmtCurrency(t.total)}</span></td>
                  <td><span style={{ color: 'var(--text2)', fontSize: '0.82rem' }}>{t.buyer}</span></td>
                  <td><span className={`badge badge-${statusColor[t.status] || 'blue'}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination">
        <button className="pag-btn" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}>
          <ChevronLeft size={16} />
        </button>
        {[...Array(Math.min(data?.pages || 1, 5))].map((_, i) => (
          <button key={i+1} className={`pag-btn ${page === i+1 ? 'active' : ''}`} onClick={() => setPage(i+1)}>
            {i+1}
          </button>
        ))}
        <button className="pag-btn" onClick={() => setPage(p => Math.min(data?.pages || 1, p+1))} disabled={page === (data?.pages || 1)}>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
