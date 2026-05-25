import { useState } from 'react'
import { Search, Bell, RefreshCw, User } from 'lucide-react'
import './Topbar.css'

export default function Topbar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSearch = (e) => {
    setQuery(e.target.value)
    onSearch?.(e.target.value)
  }

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="search-box">
          <Search size={15} className="search-icon" />
          <input
            type="text"
            placeholder="Search farmers, villages, crops..."
            value={query}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>
      <div className="topbar-right">
        <span className="date-str">{dateStr}</span>
        <button className="icon-btn" title="Refresh"><RefreshCw size={16} /></button>
        <button className="icon-btn notif" title="Alerts">
          <Bell size={16} />
          <span className="notif-dot" />
        </button>
        <div className="user-chip">
          <div className="user-avatar"><User size={14} /></div>
          <div>
            <div className="user-name">Admin User</div>
            <div className="user-role">FPO Manager</div>
          </div>
        </div>
      </div>
    </header>
  )
}
