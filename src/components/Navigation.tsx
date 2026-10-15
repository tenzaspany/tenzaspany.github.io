import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'

const sectionIds = ['about', 'skills', 'projects', 'contact'] as const

export function Navigation() {
  const { language, dictionary, setLanguage } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { id: sectionIds[0], label: dictionary.nav.about },
    { id: sectionIds[1], label: dictionary.nav.skills },
    { id: sectionIds[2], label: dictionary.nav.projects },
    { id: sectionIds[3], label: dictionary.nav.contact },
  ]

  return (
    <header className="site-header">
      <nav className="navigation shell" aria-label={dictionary.nav.main}>
        <a className="brand" href="#top" aria-label="tenzaspany — home">
          <span className="brand-mark">t<span>.</span></span>
          <span>tenzaspany</span>
        </a>

        <div className="desktop-nav">
          {links.map(({ id, label }) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <div className="language-switch" aria-label="Choose language">
            <button
              className={language === 'en' ? 'active' : ''}
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              aria-label={dictionary.nav.english}
            >
              EN
            </button>
            <span aria-hidden="true">/</span>
            <button
              className={language === 'pl' ? 'active' : ''}
              type="button"
              onClick={() => setLanguage('pl')}
              aria-pressed={language === 'pl'}
              aria-label={dictionary.nav.polish}
            >
              PL
            </button>
          </div>
          <a className="nav-contact" href="#contact">
            {dictionary.nav.contact} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? dictionary.nav.closeMenu : dictionary.nav.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24 }}
          >
            {links.map(({ id, label }, index) => (
              <motion.a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
              >
                <span>0{index + 1}</span>
                {label}
                <ArrowUpRight size={17} aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
