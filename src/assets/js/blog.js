/**
 * Blog functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize share buttons
  initShareButtons();
  
  // Initialize reaction buttons
  initReactionButtons();
  
  // Initialize category filters
  initCategoryFilters();
});

/**
 * Initialize share buttons functionality
 */
function initShareButtons() {
  const copyButton = document.querySelector('.share-btn.copy');
  
  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const url = copyButton.dataset.url;
      
      try {
        await navigator.clipboard.writeText(url);
        
        // Visual feedback
        copyButton.classList.add('copied');
        const originalText = copyButton.querySelector('span').textContent;
        copyButton.querySelector('span').textContent = 'Copied!';
        
        // Reset after 2 seconds
        setTimeout(() => {
          copyButton.classList.remove('copied');
          copyButton.querySelector('span').textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy URL: ', err);
        alert('Failed to copy URL. Please try again.');
      }
    });
  }
}

/**
 * Initialize reaction buttons functionality
 */
function initReactionButtons() {
  const reactionButtons = document.querySelectorAll('.reaction-btn');
  
  if (reactionButtons.length) {
    reactionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const reaction = button.dataset.reaction;
        const countElement = button.querySelector('.count');
        let count = parseInt(countElement.textContent);
        
        // Get stored reactions from localStorage
        const postUrl = window.location.pathname;
        const storedReactions = JSON.parse(localStorage.getItem('blogReactions') || '{}');
        
        // Initialize post reactions if not exist
        if (!storedReactions[postUrl]) {
          storedReactions[postUrl] = {};
        }
        
        // Toggle reaction
        if (storedReactions[postUrl][reaction]) {
          delete storedReactions[postUrl][reaction];
          count--;
        } else {
          storedReactions[postUrl][reaction] = true;
          count++;
        }
        
        // Update localStorage
        localStorage.setItem('blogReactions', JSON.stringify(storedReactions));
        
        // Update UI
        countElement.textContent = count;
        
        // Toggle active class
        button.classList.toggle('active', storedReactions[postUrl][reaction]);
      });
    });
    
    // Load initial reaction states
    loadReactionStates();
  }
}

/**
 * Load initial reaction states from localStorage
 */
function loadReactionStates() {
  const postUrl = window.location.pathname;
  const storedReactions = JSON.parse(localStorage.getItem('blogReactions') || '{}');
  
  if (storedReactions[postUrl]) {
    const reactionButtons = document.querySelectorAll('.reaction-btn');
    
    reactionButtons.forEach(button => {
      const reaction = button.dataset.reaction;
      
      if (storedReactions[postUrl][reaction]) {
        button.classList.add('active');
        const countElement = button.querySelector('.count');
        const count = parseInt(countElement.textContent);
        countElement.textContent = count + 1;
      }
    });
  }
}

/**
 * Initialize category filters
 */
function initCategoryFilters() {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const postItems = document.querySelectorAll('.post-item');
  
  if (categoryButtons.length && postItems.length) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Toggle active class
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter posts
        if (category === 'all') {
          postItems.forEach(item => item.style.display = 'grid');
        } else {
          postItems.forEach(item => {
            if (item.dataset.category === category) {
              item.style.display = 'grid';
            } else {
              item.style.display = 'none';
            }
          });
        }
      });
    });
  }
}
