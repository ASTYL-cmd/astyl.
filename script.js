document.addEventListener('DOMContentLoaded', () => {
  
  // --- NAVSLIDE LOGIC (Mobile Menu Toggle) ---
function toggleMenu() {  
      const hamburger = document.getElementById('hamburger');  
      const mobileMenu = document.getElementById('mobile-menu');  
        
      // Toggle Active Classes  
      hamburger.classList.toggle('active');  
      mobileMenu.classList.toggle('active');  
    }  
  
    // Event Listener for click  
    document.getElementById('hamburger').addEventListener('click', toggleMenu);  
  
    // Close menu when clicking outside (Optional polish)  
    document.addEventListener('click', function(event) {  
      const hamburger = document.getElementById('hamburger');  
      const mobileMenu = document.getElementById('mobile-menu');  
      const isClickInside = hamburger.contains(event.target) || mobileMenu.contains(event.target);  
        
      if (!isClickInside && mobileMenu.classList.contains('active')) {  
        toggleMenu();  
      }  
    });  

  // --- NAVBAR SCROLL EFFECT ---
  window.addEventListener('scroll', () => {
    // Add 'scrolled' class for potential styling (e.g., changing opacity/size)
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- TESTIMONIAL CAROUSEL LOGIC ---
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function showSlide(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.remove('active');
      dots[i].classList.remove('active');
    });

    // Handle wrap-around index
    currentSlide = (index + testimonialCards.length) % testimonialCards.length;
    
    testimonialCards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  if (testimonialCards.length > 1) { // Only run carousel if there's more than one slide
    // Auto-advance every 5 seconds
    setInterval(nextSlide, 5000);

    // Manual control via dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        showSlide(index);
      });
    });
    
    // Initialize first slide state
    showSlide(0);
  }

  // --- SMOOTH SCROLLING FOR ALL HASH LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- INTERSECTION OBSERVER (Scroll Reveal) ---
  const observerOptions = {
    // Reveal element when 10% is visible
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  scrollRevealElements.forEach(element => {
    observer.observe(element);
  });

  // --- FEATURE CARD STAGGERED ANIMATION ---
  const featureCards = document.querySelectorAll('.feature-box');
  featureCards.forEach((card, index) => {
    // Applies an increasing delay for a cascading entrance effect (zoom-in from CSS)
    card.style.animationDelay = `${index * 0.1}s`; 
  });
});
