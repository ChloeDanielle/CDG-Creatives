/* ============================================================
   CHLOE DANIELLE GUTIERREZ — PORTFOLIO
   Content comes from data.js. No dependencies.
   ============================================================ */

(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const pad2 = (n) => String(n).padStart(2, '0');
  const brandName = (key) => (key && BRANDS[key]) || 'Concept';
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const AD = (src) => `assets/ads/${src}.webp`;
  const BN = (src) => `assets/banners/${src}.webp`;
  const MO = (src, ext) => `assets/motion/${src}.${ext}`;
  const WB = (src) => `assets/web/${src}.webp`;
  const LG = (src) => `assets/logos/${src}.png`;

  /* ---------------- Clients (display only) ---------------- */
  const clientGrid = $('#clientGrid');
  clientGrid.innerHTML = CLIENTS.map(({ brand, logo }) => {
    const name = esc(brandName(brand));
    return `<li class="client rv"><div class="client__inner"><img class="client__logo" src="${LG(logo)}" alt="${name} logo" loading="lazy" decoding="async" /><span class="client__name mono">${name}</span></div></li>`;
  }).join('');

  // Balanced, centred rows (no empty cells): split the logos into rows whose
  // lengths differ by at most one, longest row in the middle (e.g. 4 · 5 · 4).
  function layoutClients() {
    const perRow = innerWidth <= 600 ? 2 : innerWidth <= 1100 ? 4 : 5;
    const n = CLIENTS.length;
    const rows = Math.ceil(n / perRow);
    const base = Math.floor(n / rows);
    let extra = n % rows;
    const sizes = Array(rows).fill(base);
    // hand the extra tiles to the middle rows first
    const order = [...sizes.keys()].sort((a, b) => Math.abs(a - (rows - 1) / 2) - Math.abs(b - (rows - 1) / 2));
    for (const r of order) { if (!extra) break; sizes[r]++; extra--; }
    // grid of perRow*2 columns; each tile spans 2, short rows get a 1-column inset
    clientGrid.style.gridTemplateColumns = `repeat(${perRow * 2}, minmax(0, 1fr))`;
    const items = $$('.client', clientGrid);
    let i = 0;
    sizes.forEach((size) => {
      const start = perRow - size + 1; // centres the row
      items.slice(i, i + size).forEach((li, k) => { li.style.gridColumn = k === 0 ? `${start} / span 2` : 'span 2'; });
      i += size;
    });
  }
  layoutClients();

  /* ---------------- Static ads (display only) ---------------- */
  $('#adGrid').innerHTML = ADS.map((a, i) => `<figure class="ad rv${a.feature ? ' is-feature' : ''}">
      <img src="${AD(a.src)}" alt="${esc(brandName(a.brand) + ' — ' + a.title)}" loading="lazy" decoding="async" width="1080" height="1080" />
      <figcaption class="ad__cap mono"><span>${esc(brandName(a.brand))}</span><span>${pad2(i + 1)}</span></figcaption>
    </figure>`).join('');

  /* ---------------- Motion (display only) ---------------- */
  const clipHTML = (m) => `<figure class="clip rv">
      <div class="clip__media"><video muted loop playsinline preload="none" poster="${MO(m.src, 'webp')}" aria-label="${esc(brandName(m.brand) + ' — ' + m.title)}"><source src="${MO(m.src, 'mp4')}" type="video/mp4" /></video></div>
      <figcaption class="clip__cap"><span class="mono">${esc(brandName(m.brand))}</span><span>${esc(m.title)}</span></figcaption>
    </figure>`;
  $('#motionTall').innerHTML = MOTION.filter((m) => m.shape === 'tall').map(clipHTML).join('');
  $('#motionSquare').innerHTML = MOTION.filter((m) => m.shape !== 'tall').map(clipHTML).join('');

  // Mobile swipe strip: progress bar under the motion clips
  const motionScroller = $('#motionScroller');
  const motionProgress = $('#motionProgress');
  motionScroller.addEventListener('scroll', () => {
    const max = motionScroller.scrollWidth - motionScroller.clientWidth;
    const p = max > 0 ? motionScroller.scrollLeft / max : 0;
    motionProgress.style.transform = `scaleX(${0.08 + p * 0.92})`;
  }, { passive: true });

  // Play videos only while visible
  const vidObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting && !reduced) {
        if (target.preload === 'none') target.preload = 'auto';
        target.play().catch(() => {});
      } else target.pause();
    });
  }, { threshold: 0.25 });
  $$('#motion video').forEach((v) => vidObserver.observe(v));

  /* ---------------- Banners (display only) ---------------- */
  $('#bannerStack').innerHTML = BANNERS.map((b, i) => {
    const name = b.brand ? brandName(b.brand) : 'Client work';
    return `<article class="card">
      <header class="card__head">
        <span class="card__num mono">${pad2(i + 1)}</span>
        <h3 class="card__title">${esc(b.title)}<small>${esc(name)}</small></h3>
        <span class="card__kind mono">${esc(b.kind)}</span>
      </header>
      <div class="card__media">
        <div class="card__desk"><img src="${BN(b.desktop)}" alt="${esc(b.title)} — desktop banner" loading="lazy" decoding="async" /><span class="card__label mono">Desktop</span></div>
        <div class="card__mob"><img src="${BN(b.mobile)}" alt="${esc(b.title)} — mobile banner" loading="lazy" decoding="async" /><span class="card__label mono">Mobile</span></div>
      </div>
    </article>`;
  }).join('');

  // Stacking: earlier cards recede as the next one slides over them
  const cards = $$('.card');
  function updateStack() {
    if (window.innerWidth <= 860 || reduced) return;
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      const top = card.getBoundingClientRect().top;
      const nTop = next.getBoundingClientRect().top;
      const p = Math.min(Math.max(1 - (nTop - top) / card.offsetHeight, 0), 1);
      card.style.transform = `scale(${1 - p * 0.06})`;
      card.style.filter = `brightness(${1 - p * 0.6})`;
    });
  }

  /* ---------------- Web ---------------- */
  $('#webList').innerHTML = WEB.map((w, i) => `<li class="web__item rv">
      <button type="button" data-w="${i}" data-cursor="Open">
        <span class="web__thumb"><img src="${WB(w.img)}" alt="" loading="lazy" /></span>
        <span class="web__num mono">${pad2(i + 1)}</span>
        <span class="web__title">${esc(w.title)}</span>
        <span class="web__type mono">${esc(w.type)}</span>
        <span class="web__go mono">Open ↗</span>
      </button>
    </li>`).join('');

  const preview = $('#webPreview');
  const previewImg = $('img', preview);
  let px = 0, py = 0, tx = 0, ty = 0, previewRaf = null;
  function previewLoop() {
    px += (tx - px) * 0.14;
    py += (ty - py) * 0.14;
    const on = preview.classList.contains('is-on');
    preview.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%) scale(${on ? 1 : 0.85})`;
    previewRaf = on || Math.abs(tx - px) > 0.5 ? requestAnimationFrame(previewLoop) : null;
  }
  if (finePointer) {
    $('#webList').addEventListener('mousemove', (e) => {
      tx = e.clientX + 180; ty = e.clientY;
      if (!previewRaf) previewRaf = requestAnimationFrame(previewLoop);
    });
    $$('.web__item button').forEach((b) => {
      b.addEventListener('mouseenter', (e) => {
        const src = WB(WEB[+b.dataset.w].img);
        if (!previewImg.src.endsWith(src)) previewImg.src = src;
        if (!preview.classList.contains('is-on')) { px = tx = e.clientX + 180; py = ty = e.clientY; }
        preview.classList.add('is-on');
        if (!previewRaf) previewRaf = requestAnimationFrame(previewLoop);
      });
    });
    $('#webList').addEventListener('mouseleave', () => preview.classList.remove('is-on'));
  }
  $('#webList').addEventListener('click', (e) => {
    const b = e.target.closest('[data-w]');
    if (b) openModal(+b.dataset.w);
  });

  let lastFocus = null;

  /* ---------------- Web modal ---------------- */
  const modal = $('#modal');
  function openModal(i) {
    const w = WEB[i];
    lastFocus = document.activeElement;
    $('#modalImg').src = WB(w.img);
    $('#modalImg').alt = `${w.title} — ${w.type}`;
    $('#modalType').textContent = `${pad2(i + 1)} — ${w.type}`;
    $('#modalTitle').textContent = w.title;
    $('#modalDesc').textContent = w.desc;
    $('#modalTools').textContent = w.tools.join(' · ');
    $('#modalLive').href = w.url;
    modal.hidden = false;
    document.body.classList.add('lock');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    $('.modal__close', modal).focus();
  }
  function closeModal() {
    modal.classList.remove('is-open');
    document.body.classList.remove('lock');
    setTimeout(() => { modal.hidden = true; }, 350);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.closest('[data-modal="close"]')) closeModal();
  });

  /* ---------------- Menu ---------------- */
  const menu = $('#menu');
  const toggle = $('#navToggle');
  function toggleMenu(open) {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', !open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('lock', open);
  }
  toggle.addEventListener('click', () => toggleMenu(!menu.classList.contains('is-open')));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => toggleMenu(false)));

  document.addEventListener('keydown', (e) => {
    if (!modal.hidden && e.key === 'Escape') closeModal();
    else if (e.key === 'Escape' && menu.classList.contains('is-open')) toggleMenu(false);
  });

  /* ---------------- About: words light up on scroll ---------------- */
  const statement = $('[data-words]');
  statement.innerHTML = statement.textContent.trim().split(/\s+/).map((w) => `<span class="wd">${esc(w)}</span>`).join(' ');
  const stWords = $$('.wd', statement);
  function updateStatement() {
    const r = statement.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1);
    const lit = reduced ? stWords.length : Math.round(p * stWords.length);
    stWords.forEach((w, i) => w.classList.toggle('on', i < lit));
  }

  /* ---------------- Reveal + chrome sheen on scroll ---------------- */
  $$('.section__head, .about__col, .contact__title, .contact__email, .contact__links').forEach((el) => el.classList.add('rv'));
  const shine = (el) => {
    if (reduced) return;
    $$('.chrome', el).concat(el.classList.contains('chrome') ? [el] : []).forEach((c, i) => {
      setTimeout(() => {
        c.classList.remove('is-shining');
        void c.offsetWidth; // restart the animation
        c.classList.add('is-shining');
      }, 350 + i * 120);
    });
  };
  document.addEventListener('animationend', (e) => {
    if (e.animationName === 'sheen') e.target.classList.remove('is-shining');
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      shine(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  /* ---------------- Text scramble ---------------- */
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/—*+';
  function scramble(el) {
    if (reduced || el.dataset.busy) return;
    const original = el.dataset.text || (el.dataset.text = el.textContent);
    el.dataset.busy = '1';
    let frame = 0;
    const tick = () => {
      const revealed = Math.floor(frame / 1.6);
      el.textContent = original.split('').map((ch, i) => (i < revealed || ch === ' ' ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('');
      frame++;
      if (revealed < original.length) requestAnimationFrame(tick);
      else { el.textContent = original; delete el.dataset.busy; }
    };
    tick();
  }
  if (finePointer) $$('[data-scramble]').forEach((el) => el.addEventListener('mouseenter', () => scramble(el)));

  /* ---------------- Cursor ---------------- */
  if (finePointer && !reduced) {
    const cursor = $('#cursor');
    const label = $('.cursor__label', cursor);
    let cx = innerWidth / 2, cy = innerHeight / 2, mx = cx, my = cy;
    addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; cursor.classList.add('is-on'); }, { passive: true });
    document.addEventListener('mouseleave', () => cursor.classList.remove('is-on'));
    document.addEventListener('mouseover', (e) => {
      const media = e.target.closest('[data-cursor]');
      const link = !media && e.target.closest('a, button');
      cursor.classList.toggle('is-media', !!media);
      cursor.classList.toggle('is-link', !!link);
      if (media) label.textContent = media.dataset.cursor;
    });
    const loop = () => {
      cx += (mx - cx) * 0.2;
      cy += (my - cy) * 0.2;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------------- Nav ---------------- */
  const nav = $('#nav');
  const navLinks = $$('.nav__links a');
  const sectionIds = navLinks.map((a) => a.getAttribute('href').slice(1));
  function updateNav() {
    nav.classList.toggle('is-scrolled', scrollY > 40);
    let current = null;
    sectionIds.forEach((id) => {
      const s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top < innerHeight * 0.4) current = id;
    });
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${current}`));
  }

  /* ---------------- Scroll loop ---------------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateNav();
      updateStack();
      updateStatement();
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { layoutClients(); onScroll(); });

  /* ---------------- Intro ---------------- */
  const intro = $('#intro');
  const bar = $('#introBar');
  const hero = $('#hero');
  function finishIntro() {
    intro.classList.add('is-done');
    document.body.classList.remove('is-loading');
    setTimeout(() => { hero.classList.add('in'); shine(hero); }, reduced ? 0 : 200);
    setTimeout(() => intro.remove(), 1200);
    $$('.rv').forEach((el) => io.observe(el));
    onScroll();
  }
  if (reduced) {
    finishIntro();
  } else {
    const start = performance.now();
    const DURATION = 900;
    const run = (t) => {
      const p = Math.min((t - start) / DURATION, 1);
      bar.style.transform = `scaleX(${1 - Math.pow(1 - p, 3)})`;
      if (p < 1) requestAnimationFrame(run);
      else setTimeout(finishIntro, 120);
    };
    requestAnimationFrame(run);
  }
})();
