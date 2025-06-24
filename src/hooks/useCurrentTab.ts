import { useState, useEffect } from 'react'
import { getCurrentTabUrl } from '../utils'

export const useCurrentTab = () => {
  const [currentUrl, setCurrentUrl] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCurrentTab = async () => {
      try {
        const url = await getCurrentTabUrl()
        if (url) {
          setCurrentUrl(url)
        }
      } catch (error) {
        console.error('Error getting current tab:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCurrentTab()
  }, [])

  return { currentUrl, isLoading }
} 