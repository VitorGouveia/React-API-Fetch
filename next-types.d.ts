declare interface ErrorBoundary {
  error: Error & { digest?: string }
  reset: () => void
}
