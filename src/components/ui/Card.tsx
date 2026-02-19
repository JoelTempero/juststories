import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Story } from '../../types'

interface CardProps {
  story: Story
}

export default function Card({ story }: CardProps) {
  return (
    <Link
      to={`/stories/${story.slug}`}
      className="group block bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {story.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-xs font-medium px-2 py-1 bg-warm text-primary rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {story.title}
        </h3>
        <p className="text-sm text-text-light leading-relaxed line-clamp-3">
          {story.description}
        </p>
        <span className="inline-flex items-center mt-4 text-sm font-medium text-primary">
          Read story
          <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
