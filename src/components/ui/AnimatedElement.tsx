import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface AnimatedElementProps {
  children: ReactNode
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right'
  delay?: number
  className?: string
}

const animations = {
  'fade-up': { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  'fade-in': { initial: { opacity: 0 }, animate: { opacity: 1 } },
  'fade-left': { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } },
  'fade-right': { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 } },
}

export default function AnimatedElement({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
}: AnimatedElementProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '-50px',
  })

  const { initial, animate } = animations[animation]

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
