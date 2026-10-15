import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function PageIntro() {
  const [visible, setVisible] = useState(true)
  const { dictionary } = useLanguage()
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), reducedMotion ? 120 : 780)
    return () => window.clearTimeout(timeout)
  }, [reducedMotion])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="page-intro"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: reducedMotion ? 0 : 0.42 }}
        >
          <motion.div
            className="intro-mark"
            initial={reducedMotion ? false : { scale: 0.82, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            t<span>.</span>
          </motion.div>
          <p>{dictionary.intro}</p>
          <div className="intro-line"><span /></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
