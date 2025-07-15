import React from 'react'
import { Button } from '../atoms'
import { ThemeSelector } from '../molecules'

interface NoteHeaderProps {
  title: string
  subtitle?: string
  onBackClick?: () => void
  backButtonText?: string
  actionButton?: React.ReactNode
}

export const NoteHeader: React.FC<NoteHeaderProps> = ({
  title,
  subtitle,
  onBackClick,
  backButtonText = '← Back',
  actionButton
}) => {
  return (
    <div className="pb-3">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex items-center gap-2">
          {onBackClick && (
            <Button 
              size="sm"
              onClick={onBackClick}
            >
              {backButtonText}
            </Button>
          )}
          {actionButton}
        </div>
      </div>
      {subtitle && (
        <div className="flex items-center justify-between mt-1">
          <div className="text-sm text-muted-foreground">
            {subtitle}
          </div>
          <ThemeSelector className="ml-auto" />
        </div>
      )}
      {!subtitle && (
        <div className="flex justify-end mt-1">
          <ThemeSelector />
        </div>
      )}
    </div>
  )
} 