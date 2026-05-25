import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Overview from './pages/Overview'
import Farmers from './pages/Farmers'
import Crops from './pages/Crops'
import Transactions from './pages/Transactions'
import Analytics from './pages/Analytics'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import './App.css'

export default function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <BrowserRouter>
      <div className={`app-layout ${collapsed ? 'collapsed' : ''}`}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="main-area">
          <Topbar />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/crops" element={<Crops />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
