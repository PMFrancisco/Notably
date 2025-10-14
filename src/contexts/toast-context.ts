import { createContext } from 'react'
import { ToastVariant } from '../components/atoms/Toast'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
  duration: number
}

export interface ToastContextValue {
  toasts: Toast[]
  showToast: (message: string, variant?: ToastVariant, duration?: number) => void
  dismissToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined)


