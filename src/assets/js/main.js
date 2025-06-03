/**
 * Main JavaScript
 * Handles general functionality for the website
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize copy buttons for wallet addresses
  initCopyButtons();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
});

/**
 * Initialize copy buttons for wallet addresses
 */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-button');
  
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      // Get the wallet address text
      const addressElement = button.closest('.wallet-address');
      const addressText = addressElement.querySelector('.address-text').textContent.trim();
      
      try {
        // Copy to clipboard
        await navigator.clipboard.writeText(addressText);
        
        // Show success feedback
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.classList.add('copied');
        
        // Reset button after 2 seconds
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
        
        // Show error feedback
        button.textContent = 'Error!';
        button.classList.add('error');
        
        // Reset button after 2 seconds
        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('error');
        }, 2000);
      }
    });
  });
}
