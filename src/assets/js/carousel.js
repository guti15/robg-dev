/**
 * Image Carousel/Slider functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initCarousels();
});

/**
 * Initialize all carousels on the page
 */
function initCarousels() {
  const carousels = document.querySelectorAll('.carousel');
  
  if (carousels.length) {
    carousels.forEach(carousel => {
      const container = carousel.querySelector('.carousel-container');
      const slides = carousel.querySelectorAll('.carousel-slide');
      const prevButton = carousel.querySelector('.carousel-button.prev');
      const nextButton = carousel.querySelector('.carousel-button.next');
      
      if (!container || !slides.length) return;
      
      let currentIndex = 0;
      let autoplayInterval;
      const slideCount = slides.length;
      
      // Set up initial state
      updateCarousel();
      
      // Start autoplay
      startAutoplay();
      
      // Add event listeners
      if (prevButton) {
        prevButton.addEventListener('click', () => {
          goToPrevSlide();
          resetAutoplay();
        });
      }
      
      if (nextButton) {
        nextButton.addEventListener('click', () => {
          goToNextSlide();
          resetAutoplay();
        });
      }
      
      // Add touch/swipe support
      let touchStartX = 0;
      let touchEndX = 0;
      
      carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
      
      // Add mouse hover pause
      carousel.addEventListener('mouseenter', () => {
        stopAutoplay();
      });
      
      carousel.addEventListener('mouseleave', () => {
        startAutoplay();
      });
      
      // Add keyboard navigation
      document.addEventListener('keydown', e => {
        if (isElementInViewport(carousel)) {
          if (e.key === 'ArrowLeft') {
            goToPrevSlide();
            resetAutoplay();
          } else if (e.key === 'ArrowRight') {
            goToNextSlide();
            resetAutoplay();
          }
        }
      });
      
      /**
       * Go to the previous slide
       */
      function goToPrevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
      }
      
      /**
       * Go to the next slide
       */
      function goToNextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
      }
      
      /**
       * Update carousel display
       */
      function updateCarousel() {
        const translateX = -currentIndex * 100;
        container.style.transform = `translateX(${translateX}%)`;
      }
      
      /**
       * Start autoplay
       */
      function startAutoplay() {
        if (slideCount > 1) {
          autoplayInterval = setInterval(() => {
            goToNextSlide();
          }, 5000); // Change slide every 5 seconds
        }
      }
      
      /**
       * Stop autoplay
       */
      function stopAutoplay() {
        clearInterval(autoplayInterval);
      }
      
      /**
       * Reset autoplay
       */
      function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
      }
      
      /**
       * Handle swipe gesture
       */
      function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
          // Swipe right, go to previous slide
          goToPrevSlide();
        } else if (swipeDistance < -swipeThreshold) {
          // Swipe left, go to next slide
          goToNextSlide();
        }
        
        resetAutoplay();
      }
    });
  }
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
