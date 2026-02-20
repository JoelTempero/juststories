import { motion } from 'framer-motion'

interface PageHeroProps {
  title: string
  subtitle?: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
