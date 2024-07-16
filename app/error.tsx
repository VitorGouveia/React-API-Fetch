"use client"

export default function Error({ error, reset }: ErrorBoundary) {
  return (
    <div>
      <p>looks like it failed</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
