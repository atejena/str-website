'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { forwardRef, createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// Toast Context for global toast management
interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            open={true}
            onOpenChange={(open) => {
              if (!open) removeToast(toast.id);
            }}
            {...toast}
          />
        ))}
        <ToastViewport />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}

// Toast Viewport
const ToastViewport = forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-0 right-0 z-[100]',
      'flex max-h-screen w-full flex-col-reverse gap-2 p-4',
      'sm:bottom-4 sm:right-4 sm:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

// Toast Component
interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

const Toast = forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  ({ className, title, description, variant = 'default', ...props }, ref) => {
    const icons = {
      default: null,
      success: <CheckCircle className="h-5 w-5 text-success" />,
      error: <AlertCircle className="h-5 w-5 text-error" />,
      warning: <AlertTriangle className="h-5 w-5 text-warning" />,
      info: <Info className="h-5 w-5 text-focus-blue" />,
    };

    const variants = {
      default: 'bg-surface border-border',
      success: 'bg-surface border-success/50',
      error: 'bg-surface border-error/50',
      warning: 'bg-surface border-warning/50',
      info: 'bg-surface border-focus-blue/50',
    };

    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(
          'group pointer-events-auto relative flex w-full items-start gap-3',
          'rounded-[4px] border p-4 shadow-elevated',
          'transition-all',
          'data-[swipe=cancel]:translate-x-0',
          'data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
          'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
          'data-[swipe=move]:transition-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-80',
          'data-[state=closed]:slide-out-to-right-full',
          'data-[state=open]:slide-in-from-top-full',
          'data-[state=open]:sm:slide-in-from-bottom-full',
          variants[variant],
          className
        )}
        {...props}
      >
        {icons[variant]}
        <div className="flex-1">
          <ToastPrimitive.Title className="font-display font-medium text-foreground">
            {title}
          </ToastPrimitive.Title>
          {description && (
            <ToastPrimitive.Description className="mt-1 text-sm text-muted">
              {description}
            </ToastPrimitive.Description>
          )}
        </div>
        <ToastPrimitive.Close
          className={cn(
            'absolute right-2 top-2',
            'rounded-[2px] p-1',
            'text-muted opacity-0 transition-opacity',
            'hover:text-foreground',
            'group-hover:opacity-100',
            'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-focus-blue'
          )}
        >
          <X className="h-4 w-4" />
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    );
  }
);
Toast.displayName = ToastPrimitive.Root.displayName;

export { Toast, ToastViewport };
