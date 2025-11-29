document.addEventListener('DOMContentLoaded', () => {
  
  // --- MOBILE MENU TOGGLE ---
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  if (burger) {
    burger.addEventListener('click', () => {
      // Toggle nav
      nav.classList.toggle('nav-active');
      
      // Burger animation
      burger.classList.toggle('toggle');
    });
  }

  // --- NAVBAR SCROLL EFFECT ---
  window.addEventListener('scroll', () => {
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

  if (testimonialCards.length > 1) {
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
        
        // Close mobile menu if open
        if (nav.classList.contains('nav-active')) {
          nav.classList.remove('nav-active');
          burger.classList.remove('toggle');
        }
      }
    });
  });

  // --- INTERSECTION OBSERVER (Scroll Reveal) ---
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
  
  const observerOptions = {
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
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
    card.style.animationDelay = `${index * 0.1}s`; 
  });

  // --- CONTACT FORM ---
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      if (name && email && message) {
        const subject = `New message from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
        window.location.href = `mailto:contact.astyl@gmail.com?subject=${subject}&body=${body}`;
      }
    });
  }
});
