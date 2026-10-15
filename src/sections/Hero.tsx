import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import { MagneticLink } from '../components/MagneticLink'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { useLanguage } from '../i18n/useLanguage'
import { useReducedMotion } from '../hooks/useReducedMotion'

const HeroScene = lazy(() => import('../components/HeroScene'))

function canUseScene() {
  return (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )
}

export function Hero() {
  const { dictionary } = useLanguage()
  const reducedMotion = useReducedMotion()
  const [specialtyIndex, setSpecialtyIndex] = useState(0)
  const [showScene, setShowScene] = useState(canUseScene)

  useEffect(() => {
    if (reducedMotion) return
    const interval = window.setInterval(
      () => setSpecialtyIndex((current) => (current + 1) % dictionary.hero.specialties.length),
      2400,
    )
    return () => window.clearInterval(interval)
  }, [dictionary.hero.specialties.length, reducedMotion])

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerPreference = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateScene = () => setShowScene(canUseScene())
    motionPreference.addEventListener('change', updateScene)
    pointerPreference.addEventListener('change', updateScene)
    return () => {
      motionPreference.removeEventListener('change', updateScene)
      pointerPreference.removeEventListener('change', updateScene)
    }
  }, [])

  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-grid shell">
        <div className="hero-content">
          <motion.div
            className="hero-availability"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            <span className="availability-dot" />
            {dictionary.hero.available}
          </motion.div>
          <motion.p
            className="eyebrow hero-eyebrow"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
          >
            {dictionary.hero.eyebrow}
          </motion.p>
          <motion.h1
            id="hero-title"
            className="hero-name"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {dictionary.hero.name}
            <br />
            <span>{dictionary.hero.surname}</span>
          </motion.h1>
          <motion.div
            className="hero-role"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.39, duration: 0.55 }}
          >
            <span className="role-line" />
            <span>{dictionary.hero.role}</span>
          </motion.div>
          <motion.p
            className="hero-slogan"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.47, duration: 0.55 }}
          >
            {dictionary.hero.slogan}
          </motion.p>
          <motion.div
            className="hero-specialty"
            aria-live="polite"
            aria-atomic="true"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <span className="specialty-prefix">{dictionary.hero.focus}</span>
            <span className="specialty-separator">/</span>
            <AnimatePresence mode="wait">
              <motion.span
                className="specialty-current"
                key={dictionary.hero.specialties[specialtyIndex]}
                initial={reducedMotion ? false : { opacity: 0, y: 9 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -9 }}
                transition={{ duration: 0.3 }}
              >
                {dictionary.hero.specialties[specialtyIndex]}
              </motion.span>
            </AnimatePresence>
            <ArrowUpRight size={15} aria-hidden="true" />
          </motion.div>
          <motion.div
            className="hero-actions"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.55 }}
          >
            <MagneticLink href="#projects" className="button button-primary">
              {dictionary.hero.viewProjects}
              <ArrowRight size={16} aria-hidden="true" />
            </MagneticLink>
            <MagneticLink href="#contact" className="button button-quiet">
              {dictionary.hero.contactMe}
              <ArrowUpRight size={16} aria-hidden="true" />
            </MagneticLink>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="hero-orb-aura" />
          {showScene ? (
            <ErrorBoundary
              name="Hero 3D scene"
              fallback={<div className="hero-orb-static" />}
            >
              <Suspense fallback={<div className="hero-orb-static" />}>
                <div className="hero-canvas">
                  <HeroScene />
                </div>
              </Suspense>
            </ErrorBoundary>
          ) : (
            <div className="hero-orb-static" />
          )}
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-coordinate coordinate-one">{dictionary.hero.visualNoteTop}</div>
          <div className="hero-coordinate coordinate-two">{dictionary.hero.visualNoteBottom}</div>
          <div className="hero-visual-caption">
            <span>01 / 04</span>
            <span>{dictionary.hero.visualCaption}</span>
          </div>
        </motion.div>
      </div>

      <a className="scroll-cue" href="#about">
        <span>{dictionary.hero.scroll}</span>
        <span className="scroll-cue-icon"><ArrowDown size={15} /></span>
      </a>
      <div className="hero-index" aria-hidden="true">01 <span>—</span> 04</div>
    </section>
  )
}
