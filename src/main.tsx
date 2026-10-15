import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ApplicationErrorFallback, ErrorBoundary } from './components/ErrorBoundary'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root was not found')

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary name="Portfolio application" fallback={<ApplicationErrorFallback />}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
