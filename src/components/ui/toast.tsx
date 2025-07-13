import React, { useState, useCallback } from 'react'
import { Alert, AlertTitle, AlertDescription } from './alert'
import { CheckCircle, Info, AlertTriangle, AlertCircle } from 'lucide-react'
import { ToastContext } from '../../contexts/toast-context'
import type { Toast } from '../../contexts/toast-context'

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto-remove toast after duration (default 5 seconds)
    setTimeout(() => {
      removeToast(id)
    }, toast.duration || 50000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

const ToastContainer: React.FC = () => {
  const context = React.useContext(ToastContext)
  if (!context) return null

  const { toasts, removeToast } = context

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast: Toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

const ToastItem: React.FC<{ toast: Toast; onRemove: () => void }> = ({ toast, onRemove }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />
      case 'info':
        return <Info className="h-4 w-4" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />
      case 'error':
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getVariant = () => {
    switch (toast.type) {
      case 'success':
        return 'success'
      case 'info':
        return 'info'
      case 'warning':
        return 'warning'
      case 'error':
        return 'destructive'
      default:
        return 'default'
    }
  }

  return (
    <Alert 
      variant={getVariant() as "default" | "destructive" | "success" | "warning" | "info"} 
      className="animate-in slide-in-from-top-2 duration-300 shadow-lg relative pr-8"
      showCloseButton={true}
      onClose={onRemove}
    >
      {getIcon()}
      <div className="flex-1">
        {toast.title && <AlertTitle>{toast.title}</AlertTitle>}
        <AlertDescription>{toast.message}</AlertDescription>
      </div>
    </Alert>
  )
}

 