import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { mainNavItems } from '../../data/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-heading font-bold text-primary">
          Just Stories
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {mainNavItems.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-text-light'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            className="text-sm font-medium bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Admin
          </Link>
        </nav>

        <button
          className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {mainNavItems.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-3 px-4 text-sm font-medium rounded transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary bg-warm'
                    : 'text-text-light hover:text-primary hover:bg-gray-50'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="py-3 px-4 text-sm font-medium text-white bg-primary rounded mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
