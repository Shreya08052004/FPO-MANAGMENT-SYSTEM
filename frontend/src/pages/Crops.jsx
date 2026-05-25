import { useFetch } from '../hooks/useFetch'
import { api } from '../utils/api'
import { Wheat, TrendingUp, Package } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'
import './Crops.css'

const COLORS = ['#22c55e','#f59e0b','#3b82f6','#a855f7','#ef4444','#06b6d4','#ec4899']

export default function Crops() {
  const { data, loading } = useFetch(api.crops)
  const crops = data?.crops || []

  const maxProd = Math.max(...crops.map(c => c.production_qtl), 1)

  return (
    <div className="crops-page">
      <div className="page-header">
        <div>
          <h1>Crops & MSP Tracker</h1>
          <p>Minimum Support Prices and production data</p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 180 }} />)}
        </div>
      ) : (
        <div className="crops-grid">
          {crops.map((crop, i) => (
            <div key={crop.name} className="crop-card" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="crop-header">
                <div className="crop-icon" style={{ background: `${COLORS[i % COLORS.length]}22`, border: `1px solid ${COLORS[i % COLORS.length]}44`, color: COLORS[i % COLORS.length] }}>
                  <Wheat size={20} />
                </div>
                <div>
                  <div className="crop-name">{crop.name}</div>
                  <div className="crop-area">{crop.area_ha} ha cultivated</div>
                </div>
              </div>

              <div className="crop-stats">
                <div className="cstat">
                  <div className="cstat-label">MSP Rate</div>
                  <div className="cstat-val" style={{ color: COLORS[i % COLORS.length] }}>₹{crop.msp.toLocaleString()}</div>
                  <div className="cstat-sub">/quintal</div>
                </div>
                <div className="cstat">
                  <div className="cstat-label">Market Price</div>
                  <div className="cstat-val" style={{ color: 'var(--text)' }}>₹{crop.price_per_qtl.toLocaleString()}</div>
                  <div className="cstat-sub">/quintal</div>
                </div>
                <div className="cstat">
                  <div className="cstat-label">Production</div>
                  <div className="cstat-val" style={{ color: 'var(--text)' }}>{crop.production_qtl.toLocaleString()}</div>
                  <div className="cstat-sub">quintals</div>
                </div>
              </div>

              <div className="crop-bar-wrap">
                <div className="crop-bar-label">
                  <span>Production Volume</span>
                  <span>{Math.round(crop.production_qtl / maxProd * 100)}%</span>
                </div>
                <div className="crop-bar-track">
                  <div className="crop-bar-fill" style={{ width: `${crop.production_qtl / maxProd * 100}%`, background: COLORS[i % COLORS.length] }} />
                </div>
              </div>

              {crop.price_per_qtl > crop.msp && (
                <div className="above-msp"><TrendingUp size={12} /> ₹{(crop.price_per_qtl - crop.msp).toFixed(0)} above MSP</div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="chart-card" style={{ marginTop: 8 }}>
        <div className="chart-header">
          <div><h3>Production Comparison</h3><p>Quintals harvested by crop</p></div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={crops} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: 'var(--text3)', fontSize: 12 }} />
            <YAxis tick={{ fill: 'var(--text3)', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: 'var(--card2)', border: '1px solid var(--border2)', borderRadius: 10 }} />
            <Bar dataKey="production_qtl" radius={[6, 6, 0, 0]} name="Production (Qtl)" maxBarSize={48}>
              {crops.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
