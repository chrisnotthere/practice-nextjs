'use client'

export default function error({ error, reset }) {
  return (
    <main className="text-center">
      <h2 className="test-4x1">Oh No!</h2>
        <p>{error.message}</p>
        <button
          className="btn-primary mx-auto my-4"
          onClick={reset}
        >
          Try Again
        </button>
    </main>
  )
}
