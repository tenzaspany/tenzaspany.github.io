import { motion } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import type { Skill } from '../data/skills'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useTypewriter } from '../hooks/useTypewriter'
import { useLanguage } from '../i18n/useLanguage'

const syntaxPattern =
  /("(?:\\.|[^"\\])*(?:"|$)|'(?:\\.|[^'\\])*(?:'|$)|`(?:\\.|[^`\\])*(?:`|$)|\b(?:const|let|var|return|new|SELECT|AS|FROM|WHERE)\b|\b(?:console|process|System)\b|\b(?:log|write|println|stdout|print)\b|\b\d+\b|[{}()[\].,:;=<>])/g

function renderHighlightedCode(code: string) {
  const fragments: ReactNode[] = []
  let previousIndex = 0

  for (const match of code.matchAll(syntaxPattern)) {
    const token = match[0]
    const index = match.index
    if (index > previousIndex) fragments.push(code.slice(previousIndex, index))

    const className =
      token.startsWith('"') || token.startsWith("'") || token.startsWith('`')
        ? 'syntax-string'
        : /^(const|let|var|return|new|SELECT|AS|FROM|WHERE)$/.test(token)
          ? 'syntax-keyword'
          : /^(console|process|System|stdout)$/.test(token)
            ? 'syntax-object'
            : /^(log|write|println|print)$/.test(token)
              ? 'syntax-function'
              : /^\d+$/.test(token)
                ? 'syntax-number'
                : 'syntax-punctuation'

    fragments.push(
      <span className={className} key={`${index}-${token}`}>
        {token}
      </span>,
    )
    previousIndex = index + token.length
  }

  if (previousIndex < code.length) fragments.push(code.slice(previousIndex))
  return fragments
}

export function CodeEditorCard({ skill, stagger }: { skill: Skill; stagger: number }) {
  const previewRef = useRef<HTMLPreElement>(null)
  const reducedMotion = useReducedMotion()
  const animatedCode = useTypewriter(skill.code, previewRef, { initialDelay: stagger })
  const { dictionary } = useLanguage()
  const Icon = skill.icon

  return (
    <motion.article
      className="skill-editor glass-card"
      whileHover={reducedMotion ? undefined : { y: -5, rotateX: 2, rotateY: -1.5 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      aria-label={dictionary.skills.editorAria
        .replace('{name}', skill.name)
        .replace('{code}', skill.code)}
    >
      <div className="editor-header">
        <span className="editor-window-dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="editor-filename">{skill.filename}</span>
        <span className="editor-language-icon" aria-hidden="true"><Icon size={15} strokeWidth={1.8} /></span>
      </div>
      <div className="editor-content">
        <span className="editor-line-number" aria-hidden="true">
          1{skill.code.includes('\n') && <><br />2</>}
        </span>
        <div
          className="editor-code-accessible"
          role="img"
          aria-label={`${skill.filename}: ${skill.code}`}
        >
          <pre ref={previewRef} aria-hidden="true"><code>{renderHighlightedCode(animatedCode)}<span className="typewriter-cursor" /></code></pre>
        </div>
      </div>
      <span className="editor-skill-name">{skill.name}</span>
    </motion.article>
  )
}
