import { useContext } from 'react'
import { ToastContext } from '../contexts/toast-context'

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

// Convenience hook for common toast types
export const useToastNotification = () => {
  const { addToast } = useToast()

  return {
    success: (message: string, title?: string) => 
      addToast({ type: 'success', title, message }),
    info: (message: string, title?: string) => 
      addToast({ type: 'info', title, message }),
    warning: (message: string, title?: string) => 
      addToast({ type: 'warning', title, message }),
    error: (message: string, title?: string) => 
      addToast({ type: 'error', title, message }),
  }
} 