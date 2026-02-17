'use client'

import { Modal as DialogRoot, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/Modal'

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'large'
  children: React.ReactNode
}

export function AdminModal({ isOpen, onClose, title, size = 'md', children }: AdminModalProps) {
  // Map 'large' to 'lg' for compatibility
  const modalSize = size === 'large' ? 'lg' : size
  
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <ModalContent size={modalSize}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        {children}
      </ModalContent>
    </DialogRoot>
  )
}
