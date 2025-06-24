import React from 'react'

interface LoadingProps {
  message?: string
  className?: string
}

export const Loading: React.FC<LoadingProps> = ({ 
  message = "Loading...", 
  className = "" 
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-muted-foreground">{message}</div>
    </div>
  )
} 