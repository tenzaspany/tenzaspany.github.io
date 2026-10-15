import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'

export function Footer() {
  const { dictionary } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="shell footer-content">
        <p>© {year} Nadian Sosnowski <span>·</span> tenzaspany</p>
        <p className="footer-note">{dictionary.footer.made}</p>
        <a href="#top">
          {dictionary.footer.backToTop}
          <ArrowUpRight size={15} aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
