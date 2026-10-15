import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface TypewriterOptions {
  typingSpeed?: number
  deletingSpeed?: number
  fullTextPause?: number
  emptyTextPause?: number
  initialDelay?: number
}

export function useTypewriter(
  text: string,
  targetRef: RefObject<HTMLElement | null>,
  {
    typingSpeed = 55,
    deletingSpeed = 25,
    fullTextPause = 1750,
    emptyTextPause = 500,
    initialDelay = 0,
  }: TypewriterOptions = {},
) {
  const reducedMotion = useReducedMotion()
  const [isVisible, setIsVisible] = useState(false)
  const [displayedText, setDisplayedText] = useState(reducedMotion ? text : '')
  const characterCount = useRef(0)
  const hasStarted = useRef(false)
  const phase = useRef<'typing' | 'full' | 'deleting' | 'empty'>('typing')

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '100px 0px', threshold: 0.01 },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef])

  useEffect(() => {
    if (reducedMotion) {
      const frame = window.requestAnimationFrame(() => {
        characterCount.current = text.length
        phase.current = 'full'
        setDisplayedText(text)
      })
      return () => window.cancelAnimationFrame(frame)
    }

    if (!isVisible) return

    let timer = 0
    let disposed = false
    const schedule = (callback: () => void, delay: number) => {
      timer = window.setTimeout(() => {
        if (!disposed) callback()
      }, delay)
    }

    const typeNextCharacter = () => {
      characterCount.current += 1
      setDisplayedText(text.slice(0, characterCount.current))
      if (characterCount.current === text.length) {
        phase.current = 'full'
        schedule(deleteNextCharacter, fullTextPause)
      } else {
        phase.current = 'typing'
        schedule(typeNextCharacter, typingSpeed)
      }
    }

    const deleteNextCharacter = () => {
      characterCount.current -= 1
      setDisplayedText(text.slice(0, characterCount.current))
      if (characterCount.current === 0) {
        phase.current = 'empty'
        schedule(typeNextCharacter, emptyTextPause)
      } else {
        phase.current = 'deleting'
        schedule(deleteNextCharacter, deletingSpeed)
      }
    }

    if (!hasStarted.current) {
      hasStarted.current = true
      schedule(typeNextCharacter, initialDelay)
    } else if (phase.current === 'full') {
      schedule(deleteNextCharacter, fullTextPause)
    } else if (phase.current === 'empty') {
      schedule(typeNextCharacter, emptyTextPause)
    } else if (phase.current === 'deleting') {
      schedule(deleteNextCharacter, deletingSpeed)
    } else {
      schedule(typeNextCharacter, typingSpeed)
    }

    return () => {
      disposed = true
      window.clearTimeout(timer)
    }
  }, [
    deletingSpeed,
    emptyTextPause,
    fullTextPause,
    initialDelay,
    isVisible,
    reducedMotion,
    text,
    typingSpeed,
  ])

  return reducedMotion ? text : displayedText
}
