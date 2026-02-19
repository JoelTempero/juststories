import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { stories } from '../data/stories'
import { homeContent } from '../data/pages'
import AnimatedElement from '../components/ui/AnimatedElement'
import Card from '../components/ui/Card'

export default function Home() {
  const featuredStories = stories.slice(0, 3)

  return (
    <>
      <section className="bg-primary min-h-[60vh] flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
              {homeContent.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed">
              {homeContent.subtitle}
            </p>
            <p className="mt-4 text-base text-white/70 leading-relaxed">
              {homeContent.content[0]}
            </p>
            <Link
              to="/stories"
              className="inline-flex items-center mt-8 bg-white text-primary font-medium px-6 py-3 rounded hover:bg-warm transition-colors"
            >
              Explore stories
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedElement>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-3">
              Featured Stories
            </h2>
            <p className="text-text-light mb-10 max-w-2xl">
              Discover stories of justice in action from communities across Aotearoa New Zealand.
            </p>
          </AnimatedElement>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story, index) => (
              <AnimatedElement key={story.id} delay={index * 0.1}>
                <Card story={story} />
              </AnimatedElement>
            ))}
          </div>
          <AnimatedElement className="mt-10 text-center">
            <Link
              to="/stories"
              className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
            >
              View all stories
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </AnimatedElement>
        </div>
      </section>

      <section className="py-16 bg-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedElement>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-4">
                Reflect and Respond
              </h2>
              <p className="text-text-light mb-6 leading-relaxed">
                If you want to go deeper, explore our Story Reflection Guide for ideas on how you might reflect on the stories — either on your own or with a gathered group.
              </p>
              <Link
                to="/reflection-guide"
                className="inline-flex items-center bg-primary text-white font-medium px-6 py-3 rounded hover:bg-primary-dark transition-colors"
              >
                Reflection Guide
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </>
  )
}
