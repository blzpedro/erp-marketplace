interface ToastManagerInstance {
  success: (message: string, title?: string) => void
  info: (message: string, title?: string) => void
  warning: (message: string, title?: string) => void
  error: (message: string, title?: string) => void
}

class ToastManager {
  private instance: ToastManagerInstance | null = null

  setInstance(instance: ToastManagerInstance) {
    this.instance = instance
  }

  success(message: string, title?: string) {
    this.instance?.success(message, title)
  }

  info(message: string, title?: string) {
    this.instance?.info(message, title)
  }

  warning(message: string, title?: string) {
    this.instance?.warning(message, title)
  }

  error(message: string, title?: string) {
    this.instance?.error(message, title)
  }
}

export const toastManager = new ToastManager() 