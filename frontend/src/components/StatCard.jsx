import './StatCard.css'

export default function StatCard({ icon, label, value, sub, color = 'green', trend, delay = 0 }) {
  return (
    <div className={`stat-card accent-${color}`} style={{ animationDelay: `${delay}ms` }}>
      <div className="stat-top">
        <div className={`stat-icon ic-${color}`}>{icon}</div>
        {trend !== undefined && (
          <span className={`stat-trend ${trend >= 0 ? 'up' : 'down'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  )
}
