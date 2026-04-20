/* ============================================================
   IAGT — Main JavaScript
   Handles: theme switcher, nav scroll, fade animations,
            3D tilt, hero parallax, mobile menu, carousel
   ============================================================ */

/* ── THEME SWITCHER ── */
var THEMES = {
  parchment: { icon: '🌅' },
  midnight:  { icon: '🌙' },
  emerald:   { icon: '🌿' },
  regal:     { icon: '👑' },
  classic:   { icon: '🪷' }
};

function setTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  try { localStorage.setItem('iagt-theme', name); } catch(e) {}
  var t = THEMES[name] || THEMES.parchment;
  var iconEl = document.getElementById('themeIcon');
  if (iconEl) iconEl.textContent = t.icon;
  document.querySelectorAll('.theme-option').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-theme') === name);
  });
  closeThemeMenu();
}

function toggleThemeMenu() {
  document.getElementById('themeSwitcher').classList.toggle('open');
}

function closeThemeMenu() {
  var sw = document.getElementById('themeSwitcher');
  if (sw) sw.classList.remove('open');
}

/* ── MOBILE NAV ── */
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

/* ── EVENT CAROUSEL ── */
function scrollEvt(dir) {
  var el = document.getElementById('evtCarousel');
  if (el) el.scrollBy({ left: dir * 320, behavior: 'smooth' });
}

/* ── FADE UP ON SCROLL ── */
function initFade() {
  var els = document.querySelectorAll('.fade-up');

  // Step 1: mark everything already in viewport as visible
  els.forEach(function(el) {
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('visible');
    }
  });

  // Step 2: NOW apply js-loaded so CSS hides only the non-visible ones
  document.documentElement.classList.add('js-loaded');

  // Step 3: observe remaining elements for scroll-in animation
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });
  els.forEach(function(el) { obs.observe(el); });
}

/* ── 3D TILT ── */
function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = 'perspective(700px) rotateY(' + (x*10) + 'deg) rotateX(' + (-y*8) + 'deg) scale(1.02)';
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
}

/* ── HERO PARALLAX — disabled, hero card is static ── */
function initParallax() {
  /* intentionally empty */
}

/* ── ACTIVE NAV LINK ── */
function setActiveNav() {
  var page = document.body.getAttribute('data-active') || 'home';
  document.querySelectorAll('.nav-links a[data-page]').forEach(function(a) {
    a.classList.toggle('active', a.getAttribute('data-page') === page);
  });
}

/* ── SCROLL NAV SHADOW ── */
function initScrollNav() {
  var nav = document.getElementById('nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 24);
  });
}

/* ── INIT ON DOM READY ── */
document.addEventListener('DOMContentLoaded', function() {
  /* Load saved theme */
  var saved = 'parchment';
  try { saved = localStorage.getItem('iagt-theme') || 'parchment'; } catch(e) {}
  setTheme(saved);

  /* Wire up theme options */
  document.querySelectorAll('.theme-option').forEach(function(btn) {
    btn.addEventListener('click', function() {
      setTheme(btn.getAttribute('data-theme'));
    });
  });

  /* Theme toggle button */
  var toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) toggleBtn.addEventListener('click', toggleThemeMenu);

  /* Close theme menu on outside click */
  document.addEventListener('click', function(e) {
    var sw = document.getElementById('themeSwitcher');
    if (sw && !sw.contains(e.target)) closeThemeMenu();
  });

  /* Mobile hamburger */
  var ham = document.getElementById('hamburger');
  if (ham) ham.addEventListener('click', toggleNav);

  /* Close mobile nav on link click */
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.addEventListener('click', function() {
      document.getElementById('navLinks').classList.remove('open');
    });
  });

  setActiveNav();
  initScrollNav();
  initFade();
  initTilt();
  initParallax();
});