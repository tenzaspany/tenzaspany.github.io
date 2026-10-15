import { motion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, Check, Code2, Copy, MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { Reveal, SectionHeading } from '../components/Reveal'
import { useLanguage } from '../i18n/useLanguage'

type CopyStatus = 'idle' | 'copied' | 'error'

export function Contact() {
  const { dictionary } = useLanguage()
  const contact = dictionary.contact
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle')

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText('tenzaspany')
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    }
    window.setTimeout(() => setCopyStatus('idle'), 2400)
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="shell contact-shell">
        <Reveal>
          <SectionHeading
            id="contact-title"
            label={contact.label}
            title={contact.title}
            accent={contact.titleAccent}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="contact-description">{contact.description}</p>
        </Reveal>
        <div className="contact-options">
          <Reveal delay={0.12}>
            <motion.button
              className={`contact-card discord-card glass-card ${copyStatus === 'copied' ? 'is-copied' : ''}`}
              type="button"
              onClick={copyDiscord}
              whileHover={{ y: -5, rotateX: 2 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`${contact.copy}: tenzaspany`}
            >
              <span className="contact-card-icon"><MessageCircle size={22} /></span>
              <span className="contact-card-copy">
                <span className="contact-platform">{contact.discord}</span>
                <span className="contact-detail">{contact.discordDetail}</span>
              </span>
              <span className="contact-action">
                {copyStatus === 'copied' ? <Check size={19} /> : <Copy size={17} />}
              </span>
            </motion.button>
          </Reveal>
          <Reveal delay={0.2}>
            <motion.a
              className="contact-card github-card glass-card"
              href="https://github.com/tenzaspany"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, rotateX: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="contact-card-icon"><Code2 size={22} /></span>
              <span className="contact-card-copy">
                <span className="contact-platform">{contact.github}</span>
                <span className="contact-detail">{contact.githubDetail}</span>
              </span>
              <span className="contact-action"><ArrowUpRight size={19} /></span>
            </motion.a>
          </Reveal>
        </div>
        <div className="copy-feedback" aria-live="polite" role="status">
          {copyStatus === 'copied' && (
            <motion.span initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
              {contact.copied}
            </motion.span>
          )}
          {copyStatus === 'error' && (
            <motion.span className="copy-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {contact.copiedError}
            </motion.span>
          )}
        </div>
        <Reveal>
          <p className="contact-signoff"><ArrowDownRight size={16} /> TENZASPANY · POLAND</p>
        </Reveal>
      </div>
    </section>
  )
}
