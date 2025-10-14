import React, { createContext, useState, useCallback, ReactNode } from 'react'
import { ToastVariant } from '../components/atoms/Toast'

interface Toast {
  id: string
  message: string
  variant: ToastVariant
  duration: number
}

interface ToastContextValue {
  toasts: Toast[]
  showToast: (message: string, variant?: ToastVariant, duration?: number) => void
  dismissToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((
    message: string,
    variant: ToastVariant = 'info',
    duration: number = 3000
  ) => {
    const id = `toast-${Date.now()}-${Math.random()}`
    const newToast: Toast = { id, message, variant, duration }

    setToasts(prev => {
      // Limit to max 3 toasts
      const updated = [...prev, newToast]
      return updated.slice(-3)
    })

    // Auto-dismiss after duration
    setTimeout(() => {
      dismissToast(id)
    }, duration)
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}

