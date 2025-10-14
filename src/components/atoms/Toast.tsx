import React from 'react'
import { CheckCircle, XCircle, Info, X } from 'lucide-react'

export type ToastVariant = 'success' | 'error' | 'info'

interface ToastProps {
  id: string
  message: string
  variant?: ToastVariant
  onDismiss: (id: string) => void
}

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  variant = 'info',
  onDismiss
}) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info
  }

  const iconColors = {
    success: 'text-green-600',
    error: 'text-red-600',
    info: 'text-foreground'
  }

  const Icon = icons[variant]

  return (
    <div
      className={`
        toast-enter
        flex items-center gap-3 px-4 py-3 
        border-[4px] border-solid
        shadow-lg
        min-w-[280px] max-w-[320px]
        [border-radius:20px_15px_18px_16px/16px_18px_15px_20px]
      `}
      style={{
        backgroundColor: 'hsl(var(--background))',
        borderColor: 'hsl(var(--foreground))',
        color: 'hsl(var(--foreground))'
      }}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColors[variant]}`} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onDismiss(id)}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

