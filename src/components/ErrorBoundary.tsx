import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
  name: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`${this.props.name} failed to render.`, error, errorInfo)
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children
  }
}

export function ApplicationErrorFallback() {
  return (
    <main className="application-error" role="alert">
      <p className="eyebrow">TENZASPANY · PORTFOLIO</p>
      <h1>Something went wrong.</h1>
      <p>The page could not be displayed. Please try reloading it.</p>
      <button type="button" onClick={() => window.location.reload()}>
        Reload page
      </button>
    </main>
  )
}
