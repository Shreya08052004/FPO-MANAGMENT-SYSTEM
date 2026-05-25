import { useFetch } from '../hooks/useFetch'
import { api } from '../utils/api'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, ReferenceLine
} from 'recharts'
import './Analytics.css'

const COLORS = ['#22c55e','#f59e0b','#3b82f6','#a855f7','#ef4444','#06b6d4','#ec4899']

const fmtCurrency = v => v >= 100000 ? `₹${(v/100000).toFixed(1)}L` : v >= 1000 ? `₹${(v/1000).toFixed(0)}K` : `₹${v}`

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 10, padding: '10px 14px' }}>
      <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginBottom: 6 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: '0.82rem', color: p.color, fontWeight: 600, marginBottom: 2 }}>
          {p.name}: {typeof p.value === 'number' && p.value > 10000 ? fmtCurrency(p.value) : p.value}
        </div>
      ))}
    </div>
  )
}

export default function Analytics() {
  const { data: salesData } = useFetch(api.monthlySales)
  const { data: cropDist } = useFetch(api.cropDistribution)
  const { data: villageData } = useFetch(api.villageStats)
  const { data: incomeData } = useFetch(api.incomeTrend)

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <h1>Analytics & Insights</h1>
          <p>Deep-dive into FPO performance metrics</p>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Income Trend */}
        <div className="an-card wide">
          <div className="chart-header">
            <div><h3>Farmer Income Trend</h3><p>Monthly avg/min/max income (₹)</p></div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={incomeData?.data || []} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text3)', fontSize: 10 }} />
              <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} tick={{ fill: 'var(--text3)', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="max_income" stroke="#22c55e" strokeOpacity={0.3} fill="url(#incomeGrad)" strokeWidth={1} name="Max Income" />
              <Line type="monotone" dataKey="avg_income" stroke="#22c55e" strokeWidth={2.5} dot={false} name="Avg Income" />
              <Line type="monotone" dataKey="min_income" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Min Income" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Crop Pie */}
        <div className="an-card">
          <div className="chart-header">
            <div><h3>Crop Portfolio</h3><p>Farmer distribution by crop</p></div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={cropDist?.data || []} dataKey="count" nameKey="crop" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4}>
                {(cropDist?.data || []).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 8, fontSize: '0.8rem' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {(cropDist?.data || []).map((d, i) => (
              <div key={d.crop} className="legend-item">
                <div className="legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
                <span>{d.crop}</span>
                <span className="legend-pct">{d.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Village Bar */}
        <div className="an-card wide">
          <div className="chart-header">
            <div><h3>Village-wise Avg. Income</h3><p>Average annual income per village</p></div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={villageData?.data?.slice(0,8) || []} margin={{ top: 5, right: 10, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="village" tick={{ fill: 'var(--text3)', fontSize: 10 }} angle={-35} textAnchor="end" />
              <YAxis tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} tick={{ fill: 'var(--text3)', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avg_income" fill="#f59e0b" radius={[4,4,0,0]} maxBarSize={36} name="Avg Income" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Sales */}
        <div className="an-card">
          <div className="chart-header">
            <div><h3>Sales Trend</h3><p>Monthly revenue (₹)</p></div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData?.data || []} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text3)', fontSize: 10 }} />
              <YAxis tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} tick={{ fill: 'var(--text3)', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill: '#3b82f6', r: 4 }} name="Sales" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top villages table */}
        <div className="an-card wide">
          <div className="chart-header">
            <div><h3>Village Performance Table</h3><p>All villages ranked by farmer count</p></div>
          </div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Village</th>
                <th>Farmers</th>
                <th>Total Land (Acres)</th>
                <th>Avg. Income</th>
                <th>Income Bar</th>
              </tr>
            </thead>
            <tbody>
              {(villageData?.data || []).map((v, i) => (
                <tr key={v.village}>
                  <td><span className="mono" style={{ color: 'var(--text3)', fontSize: '0.78rem' }}>{i+1}</span></td>
                  <td><span style={{ color: 'var(--text)', fontWeight: 600 }}>{v.village}</span></td>
                  <td><span className="mono">{v.farmers}</span></td>
                  <td><span className="mono">{v.total_land}</span></td>
                  <td><span style={{ color: 'var(--green)', fontWeight: 700 }}>₹{v.avg_income.toLocaleString()}</span></td>
                  <td>
                    <div className="income-bar-track">
                      <div className="income-bar-fill" style={{ width: `${v.avg_income / 250000 * 100}%` }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
