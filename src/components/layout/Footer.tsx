import { Link } from 'react-router-dom'
import { footerNavItems } from '../../data/navigation'

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-lg font-bold mb-3">Just Stories</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Stories of justice in action from the Presbyterian whānau and beyond.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3 text-white/90">Pages</h4>
            <nav className="flex flex-col gap-2">
              {footerNavItems.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-3 text-white/90">Connect</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              We welcome stories of justice in action from across Aotearoa New Zealand.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-3 text-sm text-accent-light hover:text-white transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center">
          <p className="text-sm text-white/40">
            Just Stories — Presbyterian Church of Aotearoa New Zealand
          </p>
        </div>
      </div>
    </footer>
  )
}
