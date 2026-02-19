import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { getStoryBySlug } from '../data/stories'
import AnimatedElement from '../components/ui/AnimatedElement'

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const story = slug ? getStoryBySlug(slug) : undefined

  if (!story) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">Story not found</h1>
          <Link to="/stories" className="text-primary hover:underline">
            Back to stories
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="bg-primary py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Link
              to="/stories"
              className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to stories
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              {story.tags.map(tag => (
                <span key={tag} className="text-xs font-medium px-2 py-1 bg-white/20 text-white rounded">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
              {story.title}
            </h1>
            {story.subtitle && (
              <p className="mt-3 text-lg text-white/80">{story.subtitle}</p>
            )}
            {story.date && (
              <p className="mt-4 text-sm text-white/60">{story.date}</p>
            )}
          </motion.div>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {story.content.map((paragraph, index) => (
            <AnimatedElement key={index} delay={index * 0.05}>
              <p className="text-base md:text-lg leading-relaxed text-text mb-6">
                {paragraph}
              </p>
            </AnimatedElement>
          ))}

          {story.resources && story.resources.length > 0 && (
            <AnimatedElement className="mt-12 border-t border-gray-200 pt-8">
              <h2 className="text-xl font-heading font-bold mb-4">Resources</h2>
              <ul className="space-y-3">
                {story.resources.map((resource, index) => (
                  <li key={index}>
                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {resource.title}
                      </a>
                    ) : (
                      <span>{resource.title}</span>
                    )}
                    {resource.description && (
                      <p className="text-sm text-text-light mt-1">{resource.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </AnimatedElement>
          )}
        </div>
      </article>
    </>
  )
}
