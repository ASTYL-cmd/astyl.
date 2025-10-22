document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.createElement('button');
  toggle.innerHTML = '☰';
  toggle.classList.add('menu-toggle');
  document.querySelector('.navbar .container').prepend(toggle);
  
  const navLinks = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    toggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
  });
});
