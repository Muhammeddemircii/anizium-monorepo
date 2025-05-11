import { Flag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { PlayerControlsProps } from './interfaces'
import { reportTypes } from './data'

export interface PlayerReportProps extends PlayerControlsProps {
  onReport: (type: string, message: string) => void
  types?: {
    id: string
    label: string
    description: string
  }[]
  title?: string
  description?: string
  cancelButtonText?: string
  submitButtonText?: string
  placeholder?: string
}

export function PlayerReport({
  onReport,
  buttonClassName,
  iconClassName,
  portalContainerId,
  types = reportTypes,
  title = 'Sorun Bildir',
  description = 'Lütfen yaşadığınız sorunu seçin ve açıklayın',
  cancelButtonText = 'İptal',
  submitButtonText = 'Gönder',
  placeholder = 'Sorunu detaylı açıklayın...',
}: PlayerReportProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (selectedType) {
      onReport(selectedType, message)
      setIsOpen(false)
      setSelectedType(null)
      setMessage('')
    }
  }

  const container =
    portalContainerId && typeof window !== 'undefined'
      ? document.getElementById(portalContainerId)
      : null

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={cn(buttonClassName)}
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen(true)
        }}
      >
        <Flag className={iconClassName} />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          container={container}
          className="mx-auto max-w-[75%] border-neutral-700 bg-neutral-900/95 p-0 sm:max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader className="p-6">
            <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
            <DialogDescription className="text-sm text-neutral-400 md:text-base">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 p-6 pt-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {types.map((type) => (
                <button
                  key={type.id}
                  className={cn(
                    'flex flex-col gap-1 rounded-lg border border-neutral-700 p-4 text-left transition-colors hover:bg-white/10',
                    selectedType === type.id && 'border-primary bg-primary/10'
                  )}
                  onClick={() => setSelectedType(type.id)}
                >
                  <span className="text-sm font-medium md:text-base">{type.label}</span>
                  <span className="text-xs text-neutral-400 md:text-sm">{type.description}</span>
                </button>
              ))}
            </div>

            <textarea
              placeholder={placeholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="focus:border-primary h-24 w-full resize-none rounded-lg border border-neutral-700 bg-neutral-800 p-4 text-sm text-white placeholder-neutral-400 outline-none transition-colors md:h-32 md:text-base"
            />
          </div>

          <DialogFooter className="flex-col gap-2 p-6 pt-0 sm:flex-row">
            <Button
              variant="ghost"
              onClick={() => {
                setIsOpen(false)
                setSelectedType(null)
                setMessage('')
              }}
              className="w-full sm:w-auto"
            >
              {cancelButtonText}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!selectedType || !message.trim()}
              className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
            >
              {submitButtonText}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
