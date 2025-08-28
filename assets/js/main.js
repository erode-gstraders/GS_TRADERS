/* main.js for GS Traders
   Place at: assets/js/main.js
*/

document.addEventListener('DOMContentLoaded', () => {
  // AOS init
  if (window.AOS) AOS.init({ once: true, duration: 700 });

  /* =========================
     Hero Slider - simple rotation
     ========================= */
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  let current = 0;
  const SLIDE_INTERVAL = 2000; // 2 seconds

  function showSlide(index){
    slides.forEach((s,i) => {
      s.classList.toggle('active', i === index);
    });
  }

  function nextSlide(){
    current = (current + 1) % slides.length;
    showSlide(current);
  }

  // start
  if (slides.length){
    showSlide(0);
    let sliderTimer = setInterval(nextSlide, SLIDE_INTERVAL);

    // pause on hover
    slides.forEach(s => {
      s.addEventListener('mouseenter', () => clearInterval(sliderTimer));
      s.addEventListener('mouseleave', () => sliderTimer = setInterval(nextSlide, SLIDE_INTERVAL));
    });
  }

  /* =========================
     Dark Mode toggle + persistence
     ========================= */
  const darkBtn = document.getElementById('darkModeToggle') || document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  // initialize from localStorage or system preference
  const saved = localStorage.getItem('gstraders-theme');
  if(saved){
    htmlEl.setAttribute('data-theme', saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    htmlEl.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }

  if(darkBtn){
    darkBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', current);
      localStorage.setItem('gstraders-theme', current);
      // swap icon if using fontawesome
      const icon = darkBtn.querySelector('i');
      if(icon){
        icon.classList.toggle('fa-sun', current === 'dark');
        icon.classList.toggle('fa-moon', current === 'light');
      }
    });
  }

  /* =========================
     Navbar scroll behavior
     ========================= */
  const nav = document.querySelector('.luxury-navbar');
  const hero = document.getElementById('hero');
  function handleNavScroll(){
    if(window.scrollY > 40){
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  handleNavScroll();
  document.addEventListener('scroll', handleNavScroll);

  /* =========================
     Category expand on mobile (tap)
     ========================= */
  const categoryBoxes = document.querySelectorAll('.category-box');
  categoryBoxes.forEach(box => {
    // if device is touch, allow tap to toggle sample
    box.addEventListener('click', (e) => {
      // if has a sample element then toggle it on mobile
      const sample = box.querySelector('.sample');
      if(!sample) return; // nothing to show
      if(window.innerWidth <= 768){
        e.stopPropagation();
        // close other open samples
        document.querySelectorAll('.category-box .sample.open').forEach(s => {
          if(s !== sample) s.classList.remove('open');
        });
        sample.classList.toggle('open');
        // toggle display via class (we'll use inline block)
        if(sample.classList.contains('open')){
          sample.style.display = 'block';
        } else {
          sample.style.display = 'none';
        }
      } else {
        // on desktop, clicks go to product page (fallback)
        const target = box.getAttribute('data-target');
        if(target) window.location.href = target;
      }
    });
  });

  // close sample if click outside (mobile)
  document.addEventListener('click', (e) => {
    if(window.innerWidth <= 768){
      document.querySelectorAll('.category-box .sample.open').forEach(s => {
        if(!s.contains(e.target)) {
          s.classList.remove('open');
          s.style.display = 'none';
        }
      });
    }
  });

  /* =========================
     Back to top button
     ========================= */
  const back = document.createElement('div');
  back.className = 'back-to-top';
  back.innerHTML = '<i class="fas fa-arrow-up"></i>';
  back.style.display = 'none';
  document.body.appendChild(back);

  back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  window.addEventListener('scroll', () => {
    if(window.scrollY > 400) back.style.display = 'flex'; else back.style.display = 'none';
  });

});
