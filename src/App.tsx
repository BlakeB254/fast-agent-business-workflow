import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'

// Pages
import Onboarding from './components/Onboarding/OnboardingPage'
import Documents from './components/Documents/DocumentsPage'
import Marketing from './components/Marketing/MarketingPage'
import Calendar from './components/Calendar/CalendarPage'
import Technical from './components/Technical/TechnicalPage'

// Icons
import { FaRocket, FaFileAlt, FaBullhorn, FaCalendarAlt, FaCode } from 'react-icons/fa'

function App() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigationItems = [
    { path: '/', label: 'Onboarding', icon: <FaRocket /> },
    { path: '/documents', label: 'Documents', icon: <FaFileAlt /> },
    { path: '/marketing', label: 'Marketing', icon: <FaBullhorn /> },
    { path: '/calendar', label: 'Calendar', icon: <FaCalendarAlt /> },
    { path: '/technical', label: 'Technical', icon: <FaCode /> },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className={`bg-secondary text-white transition-all duration-200 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && <h1 className="text-xl font-bold">Business Workflow</h1>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md bg-secondary-dark hover:bg-secondary-light"
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>
        <ul className="mt-6">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center py-3 px-4 ${
                  location.pathname === item.path ? 'bg-primary text-white' : 'text-gray-300 hover:bg-secondary-light'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {navigationItems.find(item => item.path === location.pathname)?.label || 'Business Workflow System'}
            </h1>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/technical" element={<Technical />} />
          </Routes>
        </main>

        <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          &copy; 2025 Business Workflow System
        </footer>
      </div>
    </div>
  )
}

export default App
