document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    scrollRevealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.classList.add('revealed');
      }
    });
  });

  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

  function showSlide(index) {
    testimonialCards.forEach((card, i) => {
      card.classList.remove('active');
      dots[i].classList.remove('active');
    });

    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
  }

  if (testimonialCards.length > 0) {
    setInterval(nextSlide, 5000);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  scrollRevealElements.forEach(element => {
    observer.observe(element);
  });

  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const formButton = contactForm.querySelector('.cta-btn');
    if (formButton) {
      formButton.addEventListener('click', (e) => {
        e.preventDefault();
        const inputs = contactForm.querySelectorAll('input, textarea');
        let allFilled = true;

        inputs.forEach(input => {
          if (!input.value.trim()) {
            allFilled = false;
            input.style.borderColor = '#ff6b6b';
            setTimeout(() => {
              input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }, 2000);
          }
        });

        if (allFilled) {
          const name = contactForm.querySelector('input[type="text"]').value;
          const email = contactForm.querySelector('input[type="email"]').value;
          const message = contactForm.querySelector('textarea').value;

          const mailtoLink = `mailto:contact.astyl@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
          window.location.href = mailtoLink;

          inputs.forEach(input => input.value = '');
        }
      });
    }
  }
});
