document.addEventListener('DOMContentLoaded', () => {
  
 (function(){
      const menuToggle = document.getElementById('menuToggle');
      const sideWrap = document.getElementById('sideWrap');
      const sidePanel = document.getElementById('sidePanel');
      const overlay = document.getElementById('panelOverlay');
      const closeBtn = document.getElementById('closePanel');
      const focusableSelectors = 'a[href], button:not([disabled]), [tabindex="0"]';
      let lastFocused = null;

      function openPanel(){
        lastFocused = document.activeElement;
        sideWrap.classList.add('active');
        sidePanel.classList.add('open');
        overlay.classList.add('visible');
        menuToggle.setAttribute('aria-expanded','true');
        sideWrap.setAttribute('aria-hidden','false');
        // set focus to first link
        const firstLink = sidePanel.querySelector('.panel-links a');
        if(firstLink) firstLink.focus();
        // prevent body scroll
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      }

      function closePanel(){
        sidePanel.classList.remove('open');
        overlay.classList.remove('visible');
        menuToggle.setAttribute('aria-expanded','false');
        sideWrap.setAttribute('aria-hidden','true');

        // collapse wrapper after transition so click-outside is disabled
        setTimeout(()=> sideWrap.classList.remove('active'), 380);

        // restore focus
        if(lastFocused) lastFocused.focus();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }

      menuToggle.addEventListener('click', function(e){
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        if(!expanded) openPanel(); else closePanel();
      });

      closeBtn.addEventListener('click', closePanel);
      overlay.addEventListener('click', closePanel);

      // close on Escape key
      window.addEventListener('keydown', function(e){
        if(e.key === 'Escape' || e.key === 'Esc'){
          // only if panel is open
          if(sidePanel.classList.contains('open')) closePanel();
        }
      });

      // close when a panel link is clicked (and allow navigation)
      sidePanel.querySelectorAll('.panel-links a').forEach(a => {
        a.addEventListener('click', () => {
          // we let the navigation happen but close the panel visually
          closePanel();
        });
      });

      // handle focus trap minimal: keep tabbing inside panel when open
      sidePanel.addEventListener('keydown', function(e){
        if(e.key !== 'Tab') return;
        const focusables = Array.from(sidePanel.querySelectorAll(focusableSelectors)).filter(n => n.offsetParent !== null);
        if(focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if(e.shiftKey && document.activeElement === first){
          e.preventDefault();
          last.focus();
        } else if(!e.shiftKey && document.activeElement === last){
          e.preventDefault();
          first.focus();
        }
      });

      // progressive enhancement: if JS disabled, show button as link to site map
    })();
  
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
