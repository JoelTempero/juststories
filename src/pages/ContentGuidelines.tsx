import { contentGuidelinesContent } from '../data/pages'
import PageHero from '../components/ui/PageHero'
import AnimatedElement from '../components/ui/AnimatedElement'

export default function ContentGuidelines() {
  return (
    <>
      <PageHero title={contentGuidelinesContent.title} />
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {contentGuidelinesContent.content.map((paragraph, index) => (
            <AnimatedElement key={index} delay={index * 0.05}>
              <p className="text-base md:text-lg leading-relaxed text-text mb-6">
                {paragraph}
              </p>
            </AnimatedElement>
          ))}
        </div>
      </section>
    </>
  )
}
