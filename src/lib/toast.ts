// Re-export the useToast hook for convenience
export { useToast } from '@/components/ui/Toast'

// Helper to create toast notifications
export function createToast(addToast: (toast: any) => void) {
  return {
    success: (message: string) => {
      addToast({ title: message, variant: 'success', duration: 3000 })
    },
    error: (message: string) => {
      addToast({ title: message, variant: 'error', duration: 5000 })
    },
    info: (message: string) => {
      addToast({ title: message, variant: 'info', duration: 3000 })
    },
    warning: (message: string) => {
      addToast({ title: message, variant: 'warning', duration: 4000 })
    },
  }
}
