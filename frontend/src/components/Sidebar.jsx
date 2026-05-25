import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, Wheat, ArrowLeftRight,
  BarChart3, Bell, Settings, Sprout, ChevronRight
} from 'lucide-react'
import './Sidebar.css'

const links = [
  { to: '/', icon: LayoutDashboard, label: 'Overview' },
  { to: '/farmers', icon: Users, label: 'Farmers' },
  { to: '/crops', icon: Wheat, label: 'Crops & MSP' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/alerts', icon: Bell, label: 'Alerts & News' },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-logo">
        <div className="logo-icon"><Sprout size={22} /></div>
        {!collapsed && (
          <div className="logo-text">
            <span className="logo-main">Kisan</span>
            <span className="logo-sub">Samridhi FPO</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
            {!collapsed && <ChevronRight size={14} className="chevron" />}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <ChevronRight size={16} style={{ transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.3s' }} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
