import { motion } from 'motion/react'
import { ArrowDownRight } from 'lucide-react'
import { useState } from 'react'
import { Reveal, SectionHeading } from '../components/Reveal'
import { useAge } from '../hooks/useAge'
import { useLanguage } from '../i18n/useLanguage'

export function About() {
  const { dictionary } = useLanguage()
  const age = useAge()
  const [avatarFailed, setAvatarFailed] = useState(false)
  const about = dictionary.about

  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="about-title"
            label={about.label}
            title={about.title}
            accent={about.titleAccent}
          />
        </Reveal>
        <div className="about-grid">
          <Reveal className="portrait-column" delay={0.08}>
            <motion.div
              className="portrait-frame"
              whileHover={{ rotateY: -4, rotateX: 3, scale: 1.012 }}
              transition={{ type: 'spring', stiffness: 170, damping: 18 }}
            >
              <div className="portrait-backdrop" />
              {avatarFailed ? (
                <div className="portrait-fallback" role="img" aria-label={about.portraitAlt}>NS</div>
              ) : (
                // Add or replace public/avatar.png; the initials fallback handles a missing image.
                <img
                  src="/avatar.png"
                  alt={about.portraitAlt}
                  loading="lazy"
                  onError={() => setAvatarFailed(true)}
                />
              )}
              <div className="portrait-index">N / 01</div>
              <span className="portrait-stamp"><ArrowDownRight size={18} /></span>
            </motion.div>
            <div className="portrait-caption">
              <span>{about.portraitBadge}</span>
              <span className="caption-line" />
            </div>
          </Reveal>

          <div className="about-copy">
            <Reveal delay={0.12}>
              <p className="about-intro">
                {about.paragraph.replace('{age}', String(age))}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="stats-grid">
                {about.stats.map((stat, index) => (
                  <motion.article
                    className="stat-card glass-card"
                    key={stat.title}
                    whileHover={{ y: -5, borderColor: 'rgba(99, 124, 255, .48)' }}
                    transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                  >
                    <span className="stat-number">0{index + 1}</span>
                    <h3>{stat.title}</h3>
                    <p>{stat.detail}</p>
                  </motion.article>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
