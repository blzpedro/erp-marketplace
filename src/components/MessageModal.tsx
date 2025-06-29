import * as React from "react"
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent as BaseDialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const messageModalVariants = cva(
  "flex items-center gap-3",
  {
    variants: {
      variant: {
        success: "text-green-600",
        warning: "text-yellow-600", 
        error: "text-red-600",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
)

type ActionButton = {
  label?: string
  onClick?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export interface MessageModalProps
  extends Omit<React.ComponentProps<typeof Dialog>, 'variant'>,
    VariantProps<typeof messageModalVariants> {
  title?: string
  message: string
  onClose?: () => void
  showCloseButton?: boolean
  actions?: {
    cancel?: ActionButton
    confirm?: ActionButton
  }
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof BaseDialogContent>,
  React.ComponentPropsWithoutRef<typeof BaseDialogContent>
>(({ className, ...props }, ref) => (
  <BaseDialogContent
    ref={ref}
    className={cn(
      "fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 sm:rounded-lg border bg-background p-6 shadow-lg",
      className
    )}
    {...props}
  />
))
DialogContent.displayName = BaseDialogContent.displayName

const ICON_MAP = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
} as const

const TITLE_MAP = {
  success: "Success",
  warning: "Warning", 
  error: "Error",
} as const

const MessageModal = ({ 
  variant = "success", 
  title, 
  message, 
  onClose, 
  showCloseButton = true,
  actions,
  open,
  onOpenChange,
  ...props 
}: MessageModalProps) => {
  const safeVariant = variant || "success"
  const IconComponent = React.useMemo(() => ICON_MAP[safeVariant], [safeVariant])
  const defaultTitle = React.useMemo(() => TITLE_MAP[safeVariant], [safeVariant])
  const hasActions = React.useMemo(() => actions?.cancel || actions?.confirm, [actions])

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (!newOpen && onClose) {
      onClose()
    }
    onOpenChange?.(newOpen)
  }, [onClose, onOpenChange])

  const handleCancel = React.useCallback(() => {
    actions?.cancel?.onClick?.()
    handleOpenChange(false)
  }, [actions?.cancel, handleOpenChange])

  const handleConfirm = React.useCallback(() => {
    actions?.confirm?.onClick?.()
    handleOpenChange(false)
  }, [actions?.confirm, handleOpenChange])

  const handleClose = React.useCallback(() => {
    handleOpenChange(false)
  }, [handleOpenChange])

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={cn(messageModalVariants({ variant: safeVariant }))}>
            <IconComponent className="h-6 w-6" aria-hidden="true" />
            <span>{title || defaultTitle}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {hasActions ? (
          <div className="flex justify-end gap-2">
            {actions?.cancel && (
              <Button
                variant={actions.cancel.variant || "outline"}
                onClick={handleCancel}
              >
                {actions.cancel.label || "Cancel"}
              </Button>
            )}
            {actions?.confirm && (
              <Button
                variant={actions.confirm.variant || "default"}
                onClick={handleConfirm}
              >
                {actions.confirm.label || "Confirm"}
              </Button>
            )}
          </div>
        ) : showCloseButton && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

MessageModal.displayName = "MessageModal"

export { MessageModal } 