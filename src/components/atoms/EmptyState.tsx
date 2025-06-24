import React from 'react'

interface EmptyStateProps {
  message: string
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  className = "" 
}) => {
  return (
    <div className={`text-center text-muted-foreground py-8 ${className}`}>
      {message}
    </div>
  )
} 