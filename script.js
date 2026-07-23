/* ========================================
   CHLOE DANIELLE D. GUTIERREZ — PORTFOLIO
   script.js
   ======================================== */

// =================== LOADER ===================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    // Trigger home animations
    document.querySelectorAll('.home-text > *').forEach((el, i) => {
      el.style.animationDelay = `${i * 0.15 + 0.2}s`;
      el.style.animation = 'fadeUp 0.8s ease both';
    });
  }, 2200);
});

// =================== NAVBAR ===================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active link highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = { threshold: 0.3 };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// =================== MOBILE MENU ===================
const toggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

toggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const isOpen = mobileMenu.classList.contains('open');
  toggle.children[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  toggle.children[1].style.opacity = isOpen ? '0' : '1';
  toggle.children[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  toggle.style.transition = 'transform 0.3s';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    toggle.children[0].style.transform = '';
    toggle.children[1].style.opacity = '';
    toggle.children[2].style.transform = '';
  });
});

// =================== REVEAL ON SCROLL ===================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// =================== PROJECT MODAL ===================
const marqueeTracks = [
  { track: document.getElementById('adsTrack'), normalSpeed: 54, slowSpeed: 10, direction: 1 },
  { track: document.getElementById('emailTrack'), normalSpeed: 34, slowSpeed: 7, direction: -1 },
].filter(item => item.track);

marqueeTracks.forEach(({ track, normalSpeed, slowSpeed, direction }) => {
  if (!track.dataset.loopReady) {
    [...track.children].forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
    track.dataset.loopReady = 'true';
  }

  track.dataset.offset = '0';
  track.dataset.speed = `${normalSpeed}`;
  track.dataset.targetSpeed = `${normalSpeed}`;
  track.dataset.direction = `${direction}`;
  track.style.willChange = 'transform';

  const gallery = track.closest('.scroll-gallery');
  if (gallery) {
    gallery.addEventListener('mouseenter', () => {
      track.dataset.targetSpeed = `${slowSpeed}`;
    });
    gallery.addEventListener('mouseleave', () => {
      track.dataset.targetSpeed = `${normalSpeed}`;
    });
  }
});

let marqueeLastTime = 0;
function animateMarquees(time) {
  if (!marqueeLastTime) {
    marqueeLastTime = time;
  }
  const delta = Math.min((time - marqueeLastTime) / 1000, 0.05);
  marqueeLastTime = time;

  marqueeTracks.forEach(({ track }) => {
    const parentWidth = track.parentElement ? track.parentElement.clientWidth : 0;
    const loopWidth = Math.max(track.scrollWidth / 2, parentWidth);
    if (!loopWidth) return;

    const currentSpeed = Number(track.dataset.speed || '0');
    const targetSpeed = Number(track.dataset.targetSpeed || currentSpeed);
    const direction = Number(track.dataset.direction || '1');
    const easedSpeed = currentSpeed + (targetSpeed - currentSpeed) * Math.min(1, delta * 6);
    let offset = Number(track.dataset.offset || '0');

    offset = (offset + easedSpeed * delta * direction) % loopWidth;
    if (offset < 0) {
      offset += loopWidth;
    }
    track.dataset.offset = `${offset}`;
    track.dataset.speed = `${easedSpeed}`;
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
  });

  requestAnimationFrame(animateMarquees);
}

requestAnimationFrame(animateMarquees);

const projectData = [
  {
    title: 'RHN WAGYU About Us',
    desc: 'A refined Shopify storytelling experience designed to elevate brand trust and guide visitors through the company’s story with clarity and confidence.',
    type: 'Shopify / Brand Story',
    liveUrl: 'https://rhnwagyu.myshopify.com/pages/about-us',
    image: 'WebDesigns/RHNWAGYUweb.png',
    tools: ['Shopify', 'Figma', 'Branding']
  },
  {
    title: 'Contours Landing Page',
    desc: 'A sleek landing page concept built to highlight product positioning, encourage exploration, and support conversion-focused interaction.',
    type: 'Landing Page',
    liveUrl: 'https://www.figma.com/proto/y130movbfBq2TSB2BdJzxN/ContoursRX---Chloe?node-id=54-5&t=ZAnmRtNNFhG4EeCM-0&scaling=min-zoom&content-scaling=fixed&page-id=54%3A2',
    image: 'WebDesigns/Contours LandingPage.png',
    tools: ['Figma', 'UI Design', 'Prototyping']
  },
  {
    title: 'Muzzle Gravity PDP',
    desc: 'A premium product detail page focused on product education, visual storytelling, and a smooth buying experience.',
    type: 'Product Detail Page',
    liveUrl: 'https://muzzlesleep.com/products/muzzle-weighted-blanket',
    image: 'WebDesigns/Muzzle Gravity PDP.png',
    tools: ['E-commerce', 'Figma', 'UX Writing']
  },
  {
    title: 'Muzzle Nasal Strip PDP',
    desc: 'A conversion-oriented PDP layout that organizes key information, benefits, and product clarity into a visually compelling flow.',
    type: 'Product Detail Page',
    liveUrl: 'https://muzzlesleep.com/products/adult-nasal-strips',
    image: 'WebDesigns/Nasal Strip PDP.png',
    tools: ['E-commerce', 'UI', 'Motion']
  },
  {
    title: 'MDJ Catering',
    desc: 'A polished brand website concept designed to feel welcoming, premium, and easy to navigate for event and catering audiences.',
    type: 'Brand Website',
    liveUrl: 'https://www.figma.com/proto/jvd7le8VtMSxM5wu7Ndm2A/Untitled?node-id=1-3&t=rBogqQKW92IT1Fff-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=51%3A404',
    image: 'WebDesigns/MDJ Catering WEb.png',
    tools: ['Figma', 'Branding', 'Web UI']
  },
  {
    title: 'Dash Web',
    desc: 'A modern dashboard-style interface designed around clarity, structure, and a clean visual hierarchy for product experiences.',
    type: 'Dashboard UI',
    liveUrl: 'https://www.figma.com/proto/RfMtYOQQrCbAudJuD2dSKH/Dash-web?node-id=30-261&p=f&t=pijdtuA1NSNBMtxA-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A3',
    image: 'WebDesigns/DASH web.png',
    tools: ['Figma', 'Dashboard', 'UI Systems']
  },
];

function openProjectModal(num) {
  const modal = document.getElementById('projectModal');
  const data = projectData[num - 1];
  document.getElementById('modalTitle').textContent = data.title;
  document.getElementById('modalDesc').textContent = data.desc;
  document.getElementById('modalImg').src = data.image;
  document.getElementById('modalImg').alt = `${data.title} preview`;
  modal.querySelector('.modal-tag').textContent = data.type;
  document.getElementById('modalTools').innerHTML = data.tools.map(tool => `<span>${tool}</span>`).join('');
  const liveBtn = document.getElementById('modalLiveBtn');
  liveBtn.href = data.liveUrl;
  liveBtn.textContent = 'View Live';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModal(e) {
  if (e.target === document.getElementById('projectModal')) {
    closeProjectModal();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProjectModal();
});

// =================== SMOOTH ANCHOR SCROLLING ===================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
