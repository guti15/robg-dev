/**
 * Theme Switcher
 * Handles light/dark mode toggle functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Function to set theme
  const setTheme = (theme) => {
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(theme + '-theme');
    localStorage.setItem('theme', theme);
  };
  
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme');
  const currentTheme = savedTheme || 'dark';
  
  // Apply the current theme
  setTheme(currentTheme);
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only change theme if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      setTheme('dark'); // Always default to dark theme
    }
  });
});
