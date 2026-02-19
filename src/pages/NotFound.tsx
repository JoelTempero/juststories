import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-text-light mb-6">Page not found</p>
        <Link
          to="/"
          className="inline-flex items-center bg-primary text-white font-medium px-6 py-3 rounded hover:bg-primary-dark transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
