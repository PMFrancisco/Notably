import React from 'react'
import { Toast } from '../atoms/Toast'
import { useToast } from '../../hooks/useToast'

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed top-4 left-0 right-0 z-50 flex flex-col gap-2 items-center px-4"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          variant={toast.variant}
          onDismiss={dismissToast}
        />
      ))}
    </div>
  )
}

