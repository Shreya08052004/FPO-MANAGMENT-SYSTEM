import { useFetch } from '../hooks/useFetch'
import { api } from '../utils/api'
import { AlertTriangle, Info, CheckCircle, XCircle, Bell } from 'lucide-react'
import './Alerts.css'

const icons = {
  warning: AlertTriangle, info: Info, success: CheckCircle, danger: XCircle
}
const colors = { warning: 'amber', info: 'blue', success: 'green', danger: 'red' }

const govSchemes = [
  { name: 'PM-KISAN', desc: 'Income support ₹6,000/year to farmers', status: 'Active', link: 'pmkisan.gov.in' },
  { name: 'KCC', desc: 'Kisan Credit Card — short-term crop loans', status: 'Active', link: 'nabard.org' },
  { name: 'PMFBY', desc: 'PM Fasal Bima Yojana — crop insurance', status: 'Active', link: 'pmfby.gov.in' },
  { name: 'e-NAM', desc: 'National Agriculture Market — online trading', status: 'Active', link: 'enam.gov.in' },
  { name: 'PMKSY', desc: 'Sinchai Yojana — irrigation support', status: 'Active', link: 'pmksy.gov.in' },
  { name: 'Soil Health Card', desc: 'Free soil testing & nutrient advisory', status: 'Active', link: 'soilhealth.dac.gov.in' },
]

export default function Alerts() {
  const { data, loading } = useFetch(api.alerts)

  return (
    <div className="alerts-page">
      <div className="page-header">
        <div>
          <h1>Alerts & Notifications</h1>
          <p>Latest updates, news and government schemes</p>
        </div>
      </div>

      <div className="alerts-layout">
        <div>
          <h2 className="section-title">Recent Alerts</h2>
          {loading ? (
            [...Array(5)].map((_, i) => <div key={i} className="skeleton" style={{ height: 90, marginBottom: 10, borderRadius: 12 }} />)
          ) : (
            <div className="alerts-list-full">
              {(data?.alerts || []).map((a, i) => {
                const Icon = icons[a.type]
                const col = colors[a.type]
                return (
                  <div key={a.id} className={`alert-full alert-${col}`} style={{ animationDelay: `${i * 70}ms` }}>
                    <div className={`alert-icon-full ic-${col}`}><Icon size={18} /></div>
                    <div className="alert-content">
                      <div className="alert-title-full">{a.title}</div>
                      <div className="alert-msg-full">{a.message}</div>
                      <div className="alert-time-full">{a.time}</div>
                    </div>
                    <span className={`badge badge-${col}`}>{a.type}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div>
          <h2 className="section-title">Government Schemes</h2>
          <div className="schemes-list">
            {govSchemes.map((s, i) => (
              <div key={s.name} className="scheme-card" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="scheme-left">
                  <div className="scheme-badge"><Bell size={12} /></div>
                  <div>
                    <div className="scheme-name">{s.name}</div>
                    <div className="scheme-desc">{s.desc}</div>
                    <div className="scheme-link">{s.link}</div>
                  </div>
                </div>
                <span className="badge badge-green">{s.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
