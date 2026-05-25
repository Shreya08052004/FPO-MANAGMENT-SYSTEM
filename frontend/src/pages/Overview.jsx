import { useFetch } from '../hooks/useFetch'
import { api } from '../utils/api'
import StatCard from '../components/StatCard'
import {
  Users, Wheat, TrendingUp, MapPin, IndianRupee,
  ArrowLeftRight, CloudSun, Sun, Cloud, CloudRain, Wind, Droplets
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts'
import './Overview.css'

const COLORS = ['#22c55e','#f59e0b','#3b82f6','#a855f7','#ef4444','#06b6d4','#ec4899']

const fmtCurrency = (v) => v >= 100000
  ? `₹${(v/100000).toFixed(1)}L`
  : v >= 1000 ? `₹${(v/1000).toFixed(0)}K` : `₹${v}`

const WeatherIcon = ({ condition }) => {
  const map = { 'Sunny': Sun, 'Partly Cloudy': CloudSun, 'Cloudy': Cloud, 'Light Rain': CloudRain }
  const Icon = map[condition] || Sun
  return <Icon size={40} />
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 10, padding: '10px 14px' }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: '0.875rem', color: p.color, fontWeight: 600 }}>
          {p.name === 'sales' || p.name === 'avg_income' ? fmtCurrency(p.value) : p.value}
        </div>
      ))}
    </div>
  )
}

export default function Overview() {
  const { data: summary, loading: sl } = useFetch(api.summary)
  const { data: salesData } = useFetch(api.monthlySales)
  const { data: cropDist } = useFetch(api.cropDistribution)
  const { data: villageData } = useFetch(api.villageStats)
  const { data: weather } = useFetch(api.weather)
  const { data: alerts } = useFetch(api.alerts)
  const { data: incomeData } = useFetch(api.incomeTrend)

  const alertColors = { warning: 'amber', info: 'blue', success: 'green', danger: 'red' }

  return (
    <div className="overview-page">
      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          icon={<Users size={20} />}
          label="Total Farmers"
          value={sl ? '—' : summary?.total_farmers}
          sub={`${summary?.active_farmers || '—'} active`}
          color="green" trend={5} delay={0}
        />
        <StatCard
          icon={<MapPin size={20} />}
          label="Villages Covered"
          value={sl ? '—' : summary?.villages_covered}
          sub={`${summary?.total_land_acres || '—'} acres`}
          color="blue" trend={12} delay={80}
        />
        <StatCard
          icon={<IndianRupee size={20} />}
          label="Total Sales"
          value={sl ? '—' : fmtCurrency(summary?.total_sales || 0)}
          sub={`${summary?.total_transactions || '—'} transactions`}
          color="amber" trend={8} delay={160}
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Avg. Farmer Income"
          value={sl ? '—' : fmtCurrency(summary?.avg_income || 0)}
          sub="per annum" color="green" trend={3} delay={240}
        />
        <StatCard
          icon={<Wheat size={20} />}
          label="Crops Cultivated"
          value={sl ? '—' : summary?.crops_cultivated}
          sub="variety" color="amber" delay={320}
        />
        <StatCard
          icon={<ArrowLeftRight size={20} />}
          label="Transactions"
          value={sl ? '—' : summary?.total_transactions}
          sub="total records" color="blue" trend={18} delay={400}
        />
      </div>

      <div className="charts-row">
        {/* Monthly Sales Chart */}
        <div className="chart-card wide">
          <div className="chart-header">
            <div>
              <h3>Monthly Sales Revenue</h3>
              <p>Last 6 months performance</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salesData?.data || []} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text3)', fontSize: 11 }} />
              <YAxis tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} tick={{ fill: 'var(--text3)', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={2.5} fill="url(#salesGrad)" name="sales" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Crop Distribution Pie */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3>Crop Distribution</h3>
              <p>Farmers per crop</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={cropDist?.data || []} dataKey="count" nameKey="crop" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
                {(cropDist?.data || []).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: '0.72rem', color: 'var(--text3)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bottom-row">
        {/* Village Stats */}
        <div className="chart-card wide2">
          <div className="chart-header">
            <div><h3>Village-wise Farmers</h3><p>Top villages by farmer count</p></div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={villageData?.data?.slice(0,8) || []} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="village" tick={{ fill: 'var(--text3)', fontSize: 10 }} angle={-30} textAnchor="end" />
              <YAxis tick={{ fill: 'var(--text3)', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="farmers" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weather Widget */}
        <div className="weather-card">
          <div className="chart-header">
            <div><h3>Field Weather</h3><p>Lucknow, Uttar Pradesh</p></div>
            <CloudSun size={18} color="var(--amber)" />
          </div>
          {weather && (
            <div className="weather-body">
              <div className="weather-main">
                <div className="weather-icon-wrap"><WeatherIcon condition={weather.condition} /></div>
                <div>
                  <div className="weather-temp">{weather.temp}°C</div>
                  <div className="weather-cond">{weather.condition}</div>
                </div>
              </div>
              <div className="weather-meta">
                <div className="wm-item"><Droplets size={14} /><span>{weather.humidity}% Humidity</span></div>
                <div className="wm-item"><Wind size={14} /><span>{weather.wind_kmh} km/h</span></div>
              </div>
              <div className="forecast-row">
                {weather.forecast?.map((d, i) => (
                  <div key={i} className="fc-item">
                    <div className="fc-day">{d.day}</div>
                    <div className="fc-hi">{d.high}°</div>
                    <div className="fc-lo">{d.low}°</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Alerts */}
        <div className="alerts-card">
          <div className="chart-header">
            <div><h3>Recent Alerts</h3><p>Updates & Notifications</p></div>
          </div>
          <div className="alerts-list">
            {(alerts?.alerts || []).map(a => (
              <div key={a.id} className={`alert-item alert-${alertColors[a.type]}`}>
                <div className="alert-title">{a.title}</div>
                <div className="alert-msg">{a.message}</div>
                <div className="alert-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
