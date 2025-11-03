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
      className="w-80 flex-1 flex flex-col bg-background"
    />
  )
} 