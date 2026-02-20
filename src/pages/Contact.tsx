import { useState } from 'react'
import { contactContent } from '../data/pages'
import PageHero from '../components/ui/PageHero'
import AnimatedElement from '../components/ui/AnimatedElement'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  return (
    <>
      <PageHero title={contactContent.title} />
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {contactContent.content.map((paragraph, index) => (
            <AnimatedElement key={index} delay={index * 0.05}>
              <p className="text-base md:text-lg leading-relaxed text-text mb-6">
                {paragraph}
              </p>
            </AnimatedElement>
          ))}

          <AnimatedElement delay={0.15}>
            {submitted ? (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 text-center">
                <p className="text-lg font-medium text-accent">Thank you for your message. We will be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-y"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white font-medium px-8 py-3 rounded hover:bg-primary-dark transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </AnimatedElement>
        </div>
      </section>
    </>
  )
}
