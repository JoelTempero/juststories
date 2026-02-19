import { reflectionGuideContent } from '../data/pages'
import PageHero from '../components/ui/PageHero'
import AnimatedElement from '../components/ui/AnimatedElement'

export default function ReflectionGuide() {
  return (
    <>
      <PageHero title={reflectionGuideContent.title} />
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {reflectionGuideContent.content.map((paragraph, index) => (
            <AnimatedElement key={index} delay={index * 0.05}>
              <p className="text-base md:text-lg leading-relaxed text-text mb-6">
                {paragraph}
              </p>
            </AnimatedElement>
          ))}

          {reflectionGuideContent.sections?.map((section, sIndex) => (
            <AnimatedElement key={sIndex} delay={(sIndex + 1) * 0.1}>
              <div className="mt-10">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-4">
                  {section.heading}
                </h2>
                {section.heading === 'Reflection Questions' ? (
                  <ol className="space-y-4 list-decimal list-inside">
                    {section.content.map((item, index) => (
                      <li key={index} className="text-base leading-relaxed text-text pl-2">
                        {item}
                      </li>
                    ))}
                  </ol>
                ) : (
                  section.content.map((paragraph, index) => (
                    <p key={index} className="text-base leading-relaxed text-text mb-4">
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
            </AnimatedElement>
          ))}
        </div>
      </section>
    </>
  )
}
