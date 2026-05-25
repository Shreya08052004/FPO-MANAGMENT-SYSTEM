import { useState } from 'react'
import './Settings.css'

export default function Settings() {
  const [settings, setSettings] = useState({
    fpoName: 'Kisan Samridhi FPO',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    email: 'admin@kisansamridhi.org',
    phone: '+91-9876543210',
    language: 'English',
    currency: 'INR',
    theme: 'dark',
    notifications: true,
    autoRefresh: true,
  })
  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage FPO preferences and configuration</p>
        </div>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h2>FPO Information</h2>
          <div className="form-group"><label>Organization Name</label>
            <input value={settings.fpoName} onChange={e => setSettings(s => ({ ...s, fpoName: e.target.value }))} />
          </div>
          <div className="form-row">
            <div className="form-group"><label>District</label>
              <input value={settings.district} onChange={e => setSettings(s => ({ ...s, district: e.target.value }))} />
            </div>
            <div className="form-group"><label>State</label>
              <input value={settings.state} onChange={e => setSettings(s => ({ ...s, state: e.target.value }))} />
            </div>
          </div>
          <div className="form-group"><label>Admin Email</label>
            <input type="email" value={settings.email} onChange={e => setSettings(s => ({ ...s, email: e.target.value }))} />
          </div>
          <div className="form-group"><label>Phone</label>
            <input value={settings.phone} onChange={e => setSettings(s => ({ ...s, phone: e.target.value }))} />
          </div>
        </div>

        <div className="settings-section">
          <h2>Preferences</h2>
          <div className="form-group"><label>Language</label>
            <select value={settings.language} onChange={e => setSettings(s => ({ ...s, language: e.target.value }))}>
              <option>English</option><option>Hindi</option>
            </select>
          </div>
          <div className="form-group"><label>Currency</label>
            <select value={settings.currency} onChange={e => setSettings(s => ({ ...s, currency: e.target.value }))}>
              <option>INR</option><option>USD</option>
            </select>
          </div>
          <div className="toggle-group">
            <div className="toggle-item">
              <div><div className="toggle-label">Enable Notifications</div><div className="toggle-sub">Receive alerts and updates</div></div>
              <button className={`toggle ${settings.notifications ? 'on' : ''}`} onClick={() => setSettings(s => ({ ...s, notifications: !s.notifications }))}>
                <span />
              </button>
            </div>
            <div className="toggle-item">
              <div><div className="toggle-label">Auto Refresh Data</div><div className="toggle-sub">Refresh dashboard every 5 minutes</div></div>
              <button className={`toggle ${settings.autoRefresh ? 'on' : ''}`} onClick={() => setSettings(s => ({ ...s, autoRefresh: !s.autoRefresh }))}>
                <span />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-actions">
        <button className="btn-cancel">Reset to Default</button>
        <button className="btn-primary" onClick={save}>
          {saved ? '✓ Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
