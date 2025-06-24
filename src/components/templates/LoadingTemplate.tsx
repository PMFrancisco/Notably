import React from 'react'
import { Loading } from '../atoms'

interface LoadingTemplateProps {
  message?: string
}

export const LoadingTemplate: React.FC<LoadingTemplateProps> = ({ 
  message = "Loading..." 
}) => {
  return (
    <Loading 
      message={message}
      className="w-80 h-96 bg-background"
    />
  )
} 