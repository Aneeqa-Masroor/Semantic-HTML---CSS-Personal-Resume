
document.addEventListener('DOMContentLoaded', () => {

  // ---------- 1. Scroll-reveal for sections & articles ----------
  const revealTargets = document.querySelectorAll(
    '.section, .timeline-item, .edu-card, .stat, .skill-pill'
  );

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08
    });

    revealTargets.forEach((el, i) => {
      el.classList.add('reveal');
      
      if (el.classList.contains('skill-pill') || el.classList.contains('stat')) {
        el.dataset.delay = (i % 9) * 60;
      }
      revealObserver.observe(el);
    });
  } else {
    
    revealTargets.forEach(el => el.classList.add('visible'));
  }

  // ---------- 2. Smooth scroll for internal anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 40;
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
        }
      }
    });
  });

  // ---------- 3. Subtle parallax on background orbs ----------
  const orbs = document.querySelectorAll('.orb');

  if (!prefersReducedMotion && orbs.length && window.innerWidth > 720) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.03;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---------- 4. Dynamic glow on the name (cursor proximity) ----------
  const heroName = document.querySelector('.hero-name');
  const hero = document.querySelector('.hero');

  if (!prefersReducedMotion && heroName && hero && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      heroName.style.textShadow = `
        0 0 20px rgba(160, 32, 240, 0.9),
        0 0 50px rgba(30, 144, 255, 0.7),
        ${(x - 50) * 0.6}px ${(y - 50) * 0.4}px 90px rgba(197, 107, 255, 0.5)
      `;
    });

    hero.addEventListener('mouseleave', () => {
      heroName.style.textShadow = `
        0 0 20px rgba(160, 32, 240, 0.7),
        0 0 50px rgba(30, 144, 255, 0.5),
        0 0 90px rgba(160, 32, 240, 0.3)
      `;
    });
  }

  // ---------- 5. Auto-update footer year ----------
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    const year = new Date().getFullYear();
    footerCopy.textContent = footerCopy.textContent.replace(/\d{4}/, year);
  }

  // ---------- 6. Console easter egg ----------
  console.log(
    '%c✨ Semantic resume loaded ✨',
    'color: #c56bff; font-size: 16px; font-weight: bold; text-shadow: 0 0 8px #a020f0;'
  );
  console.log(
    '%cBuilt with EB Garamond, Itim, and a lot of neon.',
    'color: #4aa8ff; font-size: 12px;'
  );
});