import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function PointerGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return
    }

    const glow = glowRef.current
    if (!glow) return
    let frame = 0

    const followPointer = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${event.clientX - 220}px, ${event.clientY - 220}px, 0)`
        glow.style.opacity = '1'
      })
    }

    const hideGlow = () => {
      glow.style.opacity = '0'
    }

    window.addEventListener('pointermove', followPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', hideGlow)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', followPointer)
      document.documentElement.removeEventListener('pointerleave', hideGlow)
    }
  }, [reducedMotion])

  return <div className="pointer-glow" ref={glowRef} aria-hidden="true" />
}
