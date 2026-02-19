import { useState } from 'react'
import { stories, getAllTags } from '../data/stories'
import PageHero from '../components/ui/PageHero'
import AnimatedElement from '../components/ui/AnimatedElement'
import Card from '../components/ui/Card'

export default function Stories() {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const tags = getAllTags()

  const filteredStories = activeTag
    ? stories.filter(s => s.tags.includes(activeTag))
    : stories

  return (
    <>
      <PageHero
        title="Stories"
        subtitle="Stories of justice in action from communities across Aotearoa New Zealand."
      />
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-sm px-3 py-1.5 rounded transition-colors ${
                !activeTag
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-light hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-sm px-3 py-1.5 rounded transition-colors ${
                  activeTag === tag
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-text-light hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story, index) => (
              <AnimatedElement key={story.id} delay={index * 0.05}>
                <Card story={story} />
              </AnimatedElement>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <p className="text-center text-text-light py-12">
              No stories found for this tag.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
