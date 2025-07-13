import { useEffect } from 'react'
import { useToastNotification } from '../hooks/use-toast'
import { toastManager } from '../services/toast-manager'

export const ToastInitializer = () => {
  const toast = useToastNotification()

  useEffect(() => {
    toastManager.setInstance(toast)
  }, [toast])

  return null
} 