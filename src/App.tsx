import { AnimatePresence, motion } from 'motion/react'
import { Footer } from './components/Footer'
import { Navigation } from './components/Navigation'
import { PageIntro } from './components/PageIntro'
import { PointerGlow } from './components/PointerGlow'
import { ScrollProgress } from './components/ScrollProgress'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { LanguageProvider } from './i18n/LanguageContext'
import { useLanguage } from './i18n/useLanguage'
import './index.css'

function Portfolio() {
  const { language } = useLanguage()

  return (
    <>
      <PageIntro />
      <ScrollProgress />
      <PointerGlow />
      <Navigation />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={language}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  )
}
