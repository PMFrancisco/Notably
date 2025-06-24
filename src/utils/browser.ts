import browser from 'webextension-polyfill'

export const getCurrentTabUrl = async (): Promise<string | null> => {
  try {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    return tabs[0]?.url || null
  } catch (error) {
    console.error('Error getting current tab:', error)
    throw error
  }
}

export const getHostnameFromUrl = (url: string): string => {
  try {
    return new URL(url).hostname
  } catch (error) {
    console.error('Error parsing URL:', error)
    return url
  }
} 