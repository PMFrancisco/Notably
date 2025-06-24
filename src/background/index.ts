// Background script compatible with both Chrome (service worker) and Firefox (background page)
import browser from 'webextension-polyfill';

console.log('Notably background script loaded');

// Listen for extension installation
browser.runtime.onInstalled.addListener(() => {
  console.log('Notably extension installed');
});

// Listen for messages from popup or content scripts
browser.runtime.onMessage.addListener((message: any, _sender: any, sendResponse: any) => {
  console.log('Message received in background:', message);
  
  // Type guard to check if message has the expected structure
  if (typeof message === 'object' && message !== null && 'type' in message) {
    const typedMessage = message as { type: string; [key: string]: any };
    
    // Handle background-specific actions here
    if (typedMessage.type === 'GET_CURRENT_TAB') {
      // This will be used to get current tab URL
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs: any) => {
        sendResponse(tabs);
      }).catch((error: any) => {
        console.error('Error getting current tab:', error);
        sendResponse([]);
      });
      return true; // Return true for async response
    }
  }
  
  return true; // Always return true for consistent async handling
}); 