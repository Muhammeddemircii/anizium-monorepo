import { FileSliders, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { SubtitleStyle } from './interfaces'
import { PlayerControlsProps } from './interfaces'
import { onDoubleClick } from './utils'
import { Slider } from '../ui/slider'
import { defaultSubtitleStyle } from './data'

export interface SubtitleStyleMenuProps extends PlayerControlsProps {
  style: SubtitleStyle
  onStyleChange: (style: Partial<SubtitleStyle>) => void
  availableFonts: string[]
  availableFontSizes: { label: string; value: number | string }[]
  availableColors: { label: string; value: string }[]
  availableBackgroundColors: { label: string; value: string }[]
  availableMargins: number[]
  availableFontWeights: { label: string; value: number }[]
  fontFamilyLabel?: string
  fontSizeLabel?: string
  fontWeightLabel?: string
  textColorLabel?: string
  backgroundColorLabel?: string
  positionLabel?: string
  positionBottomLabel?: string
  positionTopLabel?: string
  marginLabel?: string
  textShadowLabel?: string
  textShadowOnLabel?: string
  textShadowOffLabel?: string
  letterColors: { label: string; value: string }[]
  letterColorLabel?: string
  timeShiftLabel?: string
  onReset?: () => void
}

export function SubtitleStyleMenu({
  style: subtitleStyle,
  onStyleChange,
  availableFonts,
  availableFontSizes,
  availableFontWeights,
  availableColors,
  availableBackgroundColors,
  buttonClassName,
  iconClassName,
  dropdownMenuContentClassName,
  dropdownMenuItemClassName,
  showLabel,
  labelClassName,
  labelText,
  labelTextClassName,
  checkIconClassName,
  portalContainerId,
  fontFamilyLabel = 'Yazı Tipi',
  fontSizeLabel = 'Yazı Boyutu',
  fontWeightLabel = 'Yazı Kalınlığı',
  textColorLabel = 'Yazı Rengi',
  backgroundColorLabel = 'Arkaplan Rengi',
  positionLabel = 'Konum',
  positionBottomLabel = 'Alt',
  positionTopLabel = 'Üst',
  marginLabel = 'Kenar Boşluğu',
  textShadowLabel = 'Metin Gölgesi',
  textShadowOnLabel = 'Açık',
  textShadowOffLabel = 'Kapalı',
  availableMargins = [20, 30, 40, 50, 60],
  triggerClassName,
  triggerLabelClassName,
  triggerValueClassName,
  textClassName,
  valueClassName,
  letterColors,
  letterColorLabel = 'Harf Sınır Rengi',
  timeShiftLabel = 'Zaman Kayması',
  onReset,
}: SubtitleStyleMenuProps) {
  const container =
    portalContainerId && typeof window !== 'undefined'
      ? document.getElementById(portalContainerId)
      : null

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
        {/* <Button variant="ghost" size="icon" className={cn(buttonClassName)}>
          <FileSliders className={iconClassName} />
        </Button> */}
        <div className={cn(triggerClassName)}>
          <span className={cn(triggerLabelClassName)}>{labelText}</span>
        </div>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent
        // container={container}
        // side="top"
        // align="end"
        onDoubleClick={onDoubleClick}
        className={cn(dropdownMenuContentClassName, 'overflow-hidden')}
      >
        {showLabel && (
          <div className={cn(labelClassName)}>
            <span className={cn(labelTextClassName)}>{labelText}</span>
          </div>
        )}
        <div
          className="overflow-y-auto overflow-x-hidden scrollbar-hide"
          style={{ maxHeight: '60vh' }}
        >
          <DropdownMenuItem
            className={cn(dropdownMenuItemClassName)}
            onClick={(e) => {
              onClick(e)
              onReset?.()
            }}
          >
            <span className={cn(textClassName)}>Ayarları Sıfırla</span>
          </DropdownMenuItem>

          {/* Font Family */}

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
              <div className={cn(triggerClassName)}>
                <span className={cn(textClassName)}>{fontFamilyLabel}</span>
                <span className={cn(valueClassName)}>{subtitleStyle.fontFamily}</span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent
              className="overflow-y-auto overflow-x-hidden scrollbar-hide"
              style={{ maxHeight: '40vh' }}
            >
              {availableFonts.map((font) => (
                <DropdownMenuItem
                  key={font}
                  className={cn(dropdownMenuItemClassName)}
                  onClick={(e) => {
                    onClick(e)
                    onStyleChange({ fontFamily: font })
                  }}
                >
                  <span className={cn(textClassName)} style={{ fontFamily: font }}>
                    {font}
                  </span>
                  {subtitleStyle.fontFamily === font && <Check className={checkIconClassName} />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Font Size */}
          <div className={cn(dropdownMenuItemClassName, 'flex flex-col gap-2')}>
            <div className="flex w-full items-center justify-between">
              <span className={cn(textClassName)}>{fontSizeLabel}</span>
              <span className={cn(valueClassName)}>
                {Number(subtitleStyle.fontSize.toString().replace('rem', '')) * 100}%
              </span>
            </div>
            <Slider
              value={[Number(subtitleStyle.fontSize.toString().replace('rem', '')) * 100]}
              onValueChange={(value) => {
                onStyleChange({ fontSize: `${value[0] / 100}rem` })
              }}
              max={400}
              min={50}
              step={25}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
          </div>

          {/* Font Weight */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
              <div className={cn(triggerClassName)}>
                <span className={cn(textClassName)}>{fontWeightLabel}</span>
                <span className={cn(valueClassName)}>{subtitleStyle.fontWeight}</span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="overflow-y-auto overflow-x-hidden scrollbar-hide">
              {availableFontWeights.map((weight) => (
                <DropdownMenuItem
                  key={weight.value}
                  className={cn(dropdownMenuItemClassName)}
                  onClick={(e) => {
                    onClick(e)
                    onStyleChange({ fontWeight: weight.value })
                  }}
                >
                  <span className={cn(textClassName)}>{weight.label}</span>
                  {subtitleStyle.fontWeight === weight.value && (
                    <Check className={checkIconClassName} />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Text Color */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
              <div className={cn(triggerClassName)}>
                <span className={cn(textClassName)}>{textColorLabel}</span>
                <span className={cn(valueClassName)}>
                  {availableColors.find((c) => c.value === subtitleStyle.color)?.label}
                </span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="overflow-y-auto overflow-x-hidden scrollbar-hide">
              {availableColors.map((color) => (
                <DropdownMenuItem
                  key={color.value}
                  className={cn(dropdownMenuItemClassName)}
                  onClick={(e) => {
                    onClick(e)
                    onStyleChange({ color: color.value })
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className={cn(textClassName)}>{color.label}</span>
                  </div>
                  {subtitleStyle.color === color.value && <Check className={checkIconClassName} />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Letter Color */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
              <div className={cn(triggerClassName)}>
                <span className={cn(textClassName)}>{letterColorLabel}</span>
                <span className={cn(valueClassName)}>
                  {letterColors.find((c) => c.value === subtitleStyle.letterColor)?.label}
                </span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="overflow-y-auto overflow-x-hidden scrollbar-hide">
              {letterColors.map((color) => (
                <DropdownMenuItem
                  key={color.value}
                  className={cn(dropdownMenuItemClassName)}
                  onClick={(e) => {
                    onClick(e)
                    onStyleChange({ letterColor: color.value })
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className={cn(textClassName)}>{color.label}</span>
                  </div>
                  {subtitleStyle.letterColor === color.value && (
                    <Check className={checkIconClassName} />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Background Color */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
              <div className={cn(triggerClassName)}>
                <span className={cn(textClassName)}>{backgroundColorLabel}</span>
                <span className={cn(valueClassName)}>
                  {
                    availableBackgroundColors.find((c) => c.value === subtitleStyle.backgroundColor)
                      ?.label
                  }
                </span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="overflow-y-auto overflow-x-hidden scrollbar-hide">
              {availableBackgroundColors.map((color) => (
                <DropdownMenuItem
                  key={color.value}
                  className={cn(dropdownMenuItemClassName)}
                  onClick={(e) => {
                    onClick(e)
                    onStyleChange({ backgroundColor: color.value })
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full border border-white/20"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className={cn(textClassName)}>{color.label}</span>
                  </div>
                  {subtitleStyle.backgroundColor === color.value && (
                    <Check className={checkIconClassName} />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator className="my-2 bg-white/10" />

          {/* Time Shift */}
          <div className={cn(dropdownMenuItemClassName, 'flex flex-col gap-2')}>
            <div className="flex w-full items-center justify-between">
              <span className={cn(textClassName)}>{timeShiftLabel}</span>
              <span className={cn(valueClassName)}>{subtitleStyle.timeShift} s</span>
            </div>
            <Slider
              value={[subtitleStyle.timeShift]}
              onValueChange={(value) => {
                onStyleChange({ timeShift: value[0] })
              }}
              max={5}
              min={-5}
              step={0.5}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            />
          </div>

          {/* Position */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
              <div className={cn(triggerClassName)}>
                <span className={cn(textClassName)}>{positionLabel}</span>
                <span className={cn(valueClassName)}>
                  {subtitleStyle.position === 'bottom' ? positionBottomLabel : positionTopLabel}
                </span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="overflow-y-auto overflow-x-hidden scrollbar-hide">
              <DropdownMenuItem
                className={cn(dropdownMenuItemClassName)}
                onClick={(e) => {
                  onClick(e)
                  onStyleChange({ position: 'bottom', margin: 15 })
                }}
              >
                <span className={cn(textClassName)}>{positionBottomLabel}</span>
                {subtitleStyle.position === 'bottom' && <Check className={checkIconClassName} />}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(dropdownMenuItemClassName)}
                onClick={(e) => {
                  onClick(e)
                  onStyleChange({ position: 'top', margin: 15 })
                }}
              >
                <span className={cn(textClassName)}>{positionTopLabel}</span>
                {subtitleStyle.position === 'top' && <Check className={checkIconClassName} />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Margin */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className={cn(dropdownMenuItemClassName)}>
              <div className={cn(triggerClassName)}>
                <span className={cn(textClassName)}>{marginLabel}</span>
                <span className={cn(valueClassName)}>{subtitleStyle.margin}px</span>
              </div>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="overflow-y-auto overflow-x-hidden scrollbar-hide">
              {availableMargins.map((margin) => (
                <DropdownMenuItem
                  key={margin}
                  className={cn(dropdownMenuItemClassName)}
                  onClick={(e) => {
                    onClick(e)
                    onStyleChange({ margin })
                  }}
                >
                  <span className={cn(textClassName)}>{margin}px</span>
                  {subtitleStyle.margin === margin && <Check className={checkIconClassName} />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Text Shadow Toggle */}
          <DropdownMenuItem
            className={cn(dropdownMenuItemClassName)}
            onClick={(e) => {
              onClick(e)
              onStyleChange({ textShadow: !subtitleStyle.textShadow })
            }}
          >
            <div className={cn(triggerClassName)}>
              <span className={cn(textClassName)}>{textShadowLabel}</span>
              <span className={cn(valueClassName)}>
                {subtitleStyle.textShadow ? textShadowOnLabel : textShadowOffLabel}
              </span>
            </div>
            {subtitleStyle.textShadow && <Check className={checkIconClassName} />}
          </DropdownMenuItem>
        </div>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
