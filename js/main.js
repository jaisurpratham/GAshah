/* ==========================================================================
   Gaurang Shah & Associates (GSA) - Client Side Scripting
   Handles Mobile Navigation, Dropdowns, and Tab Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupMobileNavigation();
  setupTabs();
  setupSmoothScroll();
});

/**
 * Mobile Navigation Toggle (Hamburger Menu)
 */
function setupMobileNavigation() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('mobile-open');
      
      // Animate hamburger lines
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (navMenu.classList.contains('mobile-open')) {
        lines[0].style.transform = 'translateY(7px) rotate(45deg)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('mobile-open') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        const lines = hamburger.querySelectorAll('.hamburger-line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
      }
    });
  }
}

/**
 * Interactive Service Tabs (Homepage)
 */
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabButtons.length > 0 && tabPanes.length > 0) {
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTabId = btn.getAttribute('data-tab');
        
        // Deactivate all buttons and panes
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Activate current button and pane
        btn.classList.add('active');
        const targetPane = document.getElementById(targetTabId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        
        // Smooth scroll to element offset
        const yOffset = -90; // Accounting for sticky header
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });
}
