import { motion } from 'motion/react'
import { ArrowUpRight, ExternalLink, LoaderCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import type { Project } from '../data/projects'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface LiveProjectPreviewProps {
  project: Project
  livePreview: string
  livePreviewTitle: string
  previewUnavailable: string
  previewBlocked: string
  visitLiveSite: string
  description: string
  featured: string
  clientWork: string
  technologiesLabel: string
  index: number
}

export function LiveProjectPreview({
  project,
  livePreview,
  livePreviewTitle,
  previewUnavailable,
  previewBlocked,
  visitLiveSite,
  description,
  featured,
  clientWork,
  technologiesLabel,
  index,
}: LiveProjectPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null)
  const [previewWidth, setPreviewWidth] = useState(0)
  const [isNearViewport, setIsNearViewport] = useState(false)
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const [previewFailed, setPreviewFailed] = useState(false)
  const reducedMotion = useReducedMotion()
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const scale = previewWidth / 1280
  const shouldLoadPreview = project.previewEnabled && isNearViewport
  const showFallback = !project.previewEnabled || previewFailed

  useEffect(() => {
    const target = previewRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const target = previewRef.current
    if (!target) return

    const updateWidth = (width: number) => setPreviewWidth(width)
    if (typeof ResizeObserver === 'undefined') {
      const frame = window.requestAnimationFrame(() => updateWidth(target.clientWidth))
      return () => window.cancelAnimationFrame(frame)
    }

    const observer = new ResizeObserver(([entry]) => {
      if (entry) updateWidth(entry.contentRect.width)
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoadPreview || previewLoaded || previewFailed) return

    const timeout = window.setTimeout(() => setPreviewFailed(true), 8000)
    return () => window.clearTimeout(timeout)
  }, [previewFailed, previewLoaded, shouldLoadPreview])

  const updateGlow = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty(
      '--pointer-x',
      `${((event.clientX - bounds.left) / bounds.width) * 100}%`,
    )
    event.currentTarget.style.setProperty(
      '--pointer-y',
      `${((event.clientY - bounds.top) / bounds.height) * 100}%`,
    )
  }

  const openFrame = (frame: HTMLIFrameElement) => {
    try {
      const frameUrl = frame.contentWindow?.location.href
      if (!frameUrl || frameUrl === 'about:blank') {
        setPreviewFailed(true)
        return
      }
      setPreviewLoaded(true)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'SecurityError') {
        setPreviewLoaded(true)
        return
      }
      throw error
    }
  }

  return (
    <motion.a
      className="project-card"
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} — ${visitLiveSite}`}
      onPointerMove={updateGlow}
      whileHover={reducedMotion || !canHover ? undefined : { y: -5 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22 }}
    >
      <div
        className={`project-preview ${showFallback ? 'is-fallback' : ''}`}
        ref={previewRef}
        aria-label={livePreview}
        role="group"
      >
        <span className="preview-shade" aria-hidden="true" />
        <span className="preview-window-bar" aria-hidden="true">
          <span className="window-dots"><i /><i /><i /></span>
          <span className="window-url">{project.name}</span>
          <span className="window-open"><ExternalLink size={13} /></span>
        </span>

        {shouldLoadPreview && !showFallback && (
          <iframe
            className={`live-preview-frame ${previewLoaded ? 'is-loaded' : ''}`}
            src={project.liveUrl}
            title={livePreviewTitle}
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            onLoad={(event) => openFrame(event.currentTarget)}
            onError={() => setPreviewFailed(true)}
            style={{ width: 1280, height: 800, transform: `scale(${scale})` }}
          />
        )}

        {!showFallback && !previewLoaded && (
          <div className="preview-skeleton" aria-hidden="true">
            <LoaderCircle size={23} className="preview-loader" />
            <span>{livePreview}</span>
            <span className="preview-skeleton-line" />
          </div>
        )}

        {showFallback && (
          <div className="preview-fallback">
            <span className="preview-fallback-orb" aria-hidden="true" />
            <span className="preview-fallback-label">{livePreview}</span>
            <strong>{project.name}</strong>
            <span className="preview-fallback-message">
              {project.previewEnabled ? previewUnavailable : previewBlocked}
            </span>
            <span className="preview-fallback-cta">
              {visitLiveSite}
              <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </div>
        )}

        <span className="preview-count" aria-hidden="true">0{index + 1} / 01</span>
      </div>

      <div className="project-details">
        <div className="project-copy">
          <div className="project-kickers">
            <span>{featured}</span>
            <span className="kicker-dot" />
            <span>{clientWork}</span>
          </div>
          <h3>{project.name}</h3>
          <p>{description}</p>
          <div className="technology-list" aria-label={technologiesLabel}>
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
        </div>
        <span className="project-visit">
          <span>{visitLiveSite}</span>
          <span className="visit-icon"><ArrowUpRight size={19} /></span>
        </span>
      </div>
    </motion.a>
  )
}
