import { cn } from '@/lib/utils'

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  version: string
}

export function ContextMenu({ x, y, onClose, version }: ContextMenuProps) {
  return (
    <div
      className="fixed z-[99999] min-w-[200px] rounded-md border border-white/10 bg-neutral-900/95 p-2 text-sm text-white shadow-lg"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="font-medium">Anizium Player</span>
          <span className="text-xs text-white/70">Versiyon {version}</span>
        </div>
        <div className="text-xs text-white/70">© {new Date().getFullYear()} Anizium.</div>
      </div>
    </div>
  )
}
