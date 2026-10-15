import { motion } from 'motion/react'
import type { PointerEvent, ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface MagneticLinkProps {
  href: string
  children: ReactNode
  className: string
  onClick?: () => void
  target?: string
  rel?: string
}

export function MagneticLink({
  href,
  children,
  className,
  onClick,
  target,
  rel,
}: MagneticLinkProps) {
  const reducedMotion = useReducedMotion()

  const moveTowardPointer = (event: PointerEvent<HTMLAnchorElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12
    event.currentTarget.style.setProperty('--mag-x', `${x}px`)
    event.currentTarget.style.setProperty('--mag-y', `${y}px`)
  }

  const resetPosition = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty('--mag-x', '0px')
    event.currentTarget.style.setProperty('--mag-y', '0px')
  }

  return (
    <motion.a
      href={href}
      className={className}
      onClick={onClick}
      onPointerMove={moveTowardPointer}
      onPointerLeave={resetPosition}
      target={target}
      rel={rel}
      whileHover={reducedMotion ? undefined : { scale: 1.025 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.a>
  )
}
