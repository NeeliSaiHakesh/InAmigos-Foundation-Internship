/* ============================================================
   INAMIGOS FOUNDATION — script.js
   Premium Vanilla JavaScript
   ============================================================ */

(function () {
  'use strict';

  // ── Utility ─────────────────────────────────────────────
  const qs = (s, ctx = document) => ctx.querySelector(s);
  const qsa = (s, ctx = document) => ctx.querySelectorAll(s);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 01 Navigation ────────────────────────────────────────
  const nav = qs('#siteNav');
  const hamburger = qs('#hamburger');
  const navLinks = qs('#navLinks');

  // Create mobile overlay
  const overlay = document.createElement('div');
  overlay.classList.add('nav-overlay');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  // Scroll: add .scrolled class
  function onNavScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', onNavScroll, { passive: true });
  onNavScroll();

  function openMenu() {
    navLinks.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close on nav link click
    qsa('.nav-link', navLinks).forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on overlay click
    overlay.addEventListener('click', closeMenu);

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }

  // ── 02 Scroll-triggered animations ──────────────────────
  if (!prefersReducedMotion) {
    const animatedEls = qsa('[data-animate]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseInt(el.dataset.delay || 0, 10);
            setTimeout(() => {
              el.classList.add('is-visible');
            }, delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Immediately show all if reduced motion preferred
    qsa('[data-animate]').forEach(el => el.classList.add('is-visible'));
  }

  // ── 03 Impact counter animation ──────────────────────────
  function animateCounter(el, target, duration) {
    const start = performance.now();
    const isLarge = target >= 1000;

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (isLarge) {
        el.textContent = current >= 1000
          ? (current / 1000).toFixed(0) + ',000'
          : current.toString();
      } else {
        el.textContent = current.toString();
      }

      if (progress < 1) requestAnimationFrame(update);
      else {
        // Final value formatted nicely
        if (target === 50000) el.textContent = '50,000';
        else el.textContent = target.toString();
      }
    }

    requestAnimationFrame(update);
  }

  const counterEls = qsa('.impact-number');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            animateCounter(el, target, 1800);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterEls.forEach(el => counterObserver.observe(el));
  } else {
    // Show final values immediately
    counterEls.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      if (target === 50000) el.textContent = '50,000';
      else el.textContent = target.toString();
    });
  }

  // ── 04 Hero placeholder show logic ──────────────────────
  const heroImg = qs('.hero-img');
  const heroPh  = qs('#heroPh');

  if (heroImg && heroPh) {
    // Check if image loads
    if (heroImg.complete && heroImg.naturalWidth === 0) {
      heroImg.style.display = 'none';
      heroPh.style.display = 'flex';
    }
    heroImg.addEventListener('error', () => {
      heroImg.style.display = 'none';
      heroPh.style.display = 'flex';
    });
    heroImg.addEventListener('load', () => {
      heroPh.style.display = 'none';
    });
  }

  // ── 05 Smooth scroll for anchor links ────────────────────
  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();

      const navH = nav ? nav.offsetHeight : 0;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;

      if (prefersReducedMotion) {
        window.scrollTo({ top });
      } else {
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── 06 Back-to-top button ────────────────────────────────
  const backToTop = qs('#backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      if (prefersReducedMotion) {
        window.scrollTo({ top: 0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ── 07 Active nav link highlight on scroll ───────────────
  const sections = qsa('section[id], footer[id]');
  const navLinksAll = qsa('.nav-link');

  if (sections.length && navLinksAll.length) {
    const navH = nav ? nav.offsetHeight + 16 : 80;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinksAll.forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { threshold: 0.25, rootMargin: `-${navH}px 0px -40% 0px` }
    );

    sections.forEach(s => sectionObserver.observe(s));
  }

  // ── 08 Project image error fallback ─────────────────────
  qsa('.project-img').forEach(img => {
    img.addEventListener('error', () => {
      img.parentElement.classList.add('no-img');
    });
  });

  // ── 09 Hero entrance animation (page load) ───────────────
  if (!prefersReducedMotion) {
    const heroContent = qs('.hero-content');
    const heroVisual  = qs('.hero-visual');
    const heroStatCard = qs('.hero-stat-card');

    if (heroContent) {
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(24px)';
      setTimeout(() => {
        heroContent.style.transition = 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'none';
      }, 180);
    }

    if (heroVisual) {
      heroVisual.style.opacity = '0';
      heroVisual.style.transform = 'translateX(24px)';
      setTimeout(() => {
        heroVisual.style.transition = 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
        heroVisual.style.opacity = '1';
        heroVisual.style.transform = 'none';
      }, 380);
    }

    if (heroStatCard) {
      heroStatCard.style.opacity = '0';
      heroStatCard.style.transform = 'translateY(16px)';
      setTimeout(() => {
        heroStatCard.style.transition = 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        heroStatCard.style.opacity = '1';
        heroStatCard.style.transform = 'none';
      }, 600);
    }
  }

})();
