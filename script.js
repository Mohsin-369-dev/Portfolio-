/**
 * Developer Portfolio UI — Interactive Scripts
 * Provides micro-interactions, smooth scrolling, copy-to-clipboard,
 * live clock, and interactive spotlight effects.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCursorSpotlight();
  initCardGlowEffects();
  initScrollSpy();
  initCopyEmail();
  initLiveClock();
  initMobileMenu();
});

/* 1. Header scroll state & backdrop effect */
function initNavbar() {
  const header = document.getElementById('navbar');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* 2. Interactive Cursor Spotlight Follower */
function initCursorSpotlight() {
  const cursorGlow = document.getElementById('cursorGlow');
  if (!cursorGlow) return;

  // Don't activate on touch-only devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursorGlow.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  const render = () => {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    cursorGlow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

/* 3. Dynamic Card Spotlight Glow on Mouse Move */
function initCardGlowEffects() {
  const glowingCards = document.querySelectorAll('[data-glow]');
  
  glowingCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* 4. ScrollSpy: Highlight active navigation link */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* 5. Copy Email to Clipboard */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText');
  if (!copyBtn || !emailText) return;

  copyBtn.addEventListener('click', async () => {
    const textToCopy = emailText.textContent.trim();
    try {
      await navigator.clipboard.writeText(textToCopy);
      const copySpan = copyBtn.querySelector('.copy-text');
      const originalText = copySpan.textContent;
      copySpan.textContent = 'Copied!';
      copyBtn.style.borderColor = '#10b981';
      copyBtn.style.color = '#10b981';

      setTimeout(() => {
        copySpan.textContent = originalText;
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 2000);
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      const copySpan = copyBtn.querySelector('.copy-text');
      copySpan.textContent = 'Copied!';
      setTimeout(() => { copySpan.textContent = 'Copy'; }, 2000);
    }
  });
}

/* 6. Live Clock in Footer */
function initLiveClock() {
  const liveTimeEl = document.getElementById('liveTime');
  if (!liveTimeEl) return;

  const updateClock = () => {
    const now = new Date();
    liveTimeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  updateClock();
  setInterval(updateClock, 1000);
}

/* 7. Mobile Menu Drawer */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* 8. Contact Form Simulation (Zero backend required, instant UX feedback) */
window.handleContactSubmit = function() {
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById('contactForm');
  if (!statusEl || !submitBtn || !form) return;

  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>Sending...</span>';

  setTimeout(() => {
    statusEl.className = 'form-status success';
    statusEl.textContent = '✓ Thank you! Your message has been sent successfully.';
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<span>Send Message</span><svg viewBox="0 0 20 20" fill="currentColor" style="width:16px;height:16px;"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>`;

    setTimeout(() => {
      statusEl.textContent = '';
    }, 5000);
  }, 800);
};
