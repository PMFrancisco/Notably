import browser from 'webextension-polyfill';

console.log('Notably content script loaded');

// Listen for messages from popup or background
browser.runtime.onMessage.addListener((message: unknown, _sender, _sendResponse) => {
  console.log('Message received in content script:', message);
  
  // Type guard to check if message has the expected structure
  if (typeof message === 'object' && message !== null && 'type' in message) {
    const typedMessage = message as { type: string; [key: string]: any };
    
    // Handle any content script specific actions here
    if (typedMessage.type === 'INJECT_FLOATING_BUTTON') {
      // This will be implemented in Phase 2
      console.log('Floating button injection requested');
    }
  }
  
  return true; // Return true for async handling
}); 