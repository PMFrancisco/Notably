import React, { useState, useCallback, ReactNode } from 'react'
import { ToastVariant } from '../components/atoms/Toast'
import { ToastContext, Toast } from './toast-context'

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

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
  }, [dismissToast])

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  )
}


