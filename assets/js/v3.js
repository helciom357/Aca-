(() => {
  'use strict';
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const header = $('.site-header');
  const toggle = $('.menu-toggle');
  const mobile = $('.mobile-nav');
  const closeMenu = () => {
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Abrir menu');
    mobile?.classList.remove('is-open');
    if (mobile) mobile.inert = true;
    document.body.classList.remove('nav-open');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobile.classList.toggle('is-open', open);
    mobile.inert = !open;
    document.body.classList.toggle('nav-open', open);
  });
  $$('.mobile-nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (innerWidth > 850) closeMenu(); }, { passive: true });

  // A single measured line is cloned enough times to cover the largest monitor.
  const ticker = $('.ticker-track');
  if (ticker) {
    const seed = ticker.firstElementChild;
    const fill = () => {
      const width = Math.ceil(seed.getBoundingClientRect().width);
      if (!width) return;
      while (ticker.children.length * width < innerWidth + width * 2) ticker.appendChild(seed.cloneNode(true));
      ticker.style.setProperty('--ticker-shift', `${width}px`);
      ticker.style.animationDuration = `${Math.max(14, width / 52)}s`;
    };
    fill();
    window.addEventListener('resize', fill, { passive: true });
  }

  const sections = ['servicos', 'espacos', 'rotina', 'depoimentos', 'duvidas'];
  const activeNav = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    $$('.desktop-nav a').forEach(a => a.classList.toggle('is-current', a.hash === `#${entry.target.id}`));
  }), { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(id => { const element = document.getElementById(id); if (element) activeNav.observe(element); });

  const sources = [
    { type: 'video', src: 'assets/images/aca-tour-completo-poster.webp', alt: 'Golden retriever no pátio da ACA Resort, diante da piscina', label: 'Veja a casa completa' },
    { type: 'image', src: 'assets/images/aca-grupo-patio.webp', alt: 'Cães na área coberta do ACA Resort', label: 'A área coberta' },
    { type: 'image', src: 'assets/images/aca-piscina-contexto.webp', alt: 'Visão da piscina da ACA Resort com cão junto à borda', label: 'A piscina no dia a dia' },
    { type: 'image', src: 'assets/images/aca-playground-melhorado.webp', alt: 'Cuidador brincando com um cão no playground do ACA Resort', label: 'Playground com a equipe' },
    { type: 'image', src: 'assets/images/aerial.webp', alt: 'Vista aérea real do terreno e das construções do ACA Resort', label: 'A casa vista de cima' }
  ];
  sources.forEach(item => { const image = new Image(); image.src = item.src; });
  const sceneImage = $('#space-image');
  const sceneCount = $('#space-count');
  const sceneLabel = $('#space-photo-label');
  const sceneBox = $('.space-main-image');
  const sceneTabs = $$('.space-tab');
  let sceneIndex = 0;
  let sceneTimeout;
  function scene(index) {
    if (!sources[index] || index === sceneIndex) return;
    sceneIndex = index;
    clearTimeout(sceneTimeout);
    sceneBox.classList.add('is-changing');
    sceneTabs.forEach((tab, i) => { tab.classList.toggle('is-active', i === index); tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
    sceneTimeout = setTimeout(() => {
      sceneImage.src = sources[index].src;
      sceneBox.classList.toggle('is-video', sources[index].type === 'video');
      $('.space-expand')?.setAttribute('aria-label', sources[index].type === 'video' ? 'Reproduzir vídeo: Veja a casa completa' : 'Ampliar a foto selecionada da casa');
      sceneBox.style.setProperty('--scene-background', `url("../images/${sources[index].src.split('/').pop()}")`);
      sceneImage.alt = sources[index].alt;
      sceneCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(sources.length).padStart(2, '0')}`;
      sceneLabel.textContent = sources[index].label;
      if (sceneImage.complete) sceneBox.classList.remove('is-changing');
      else sceneImage.addEventListener('load', () => sceneBox.classList.remove('is-changing'), { once: true });
    }, 100);
  }
  sceneTabs.forEach((tab, index) => {
    tab.tabIndex = index ? -1 : 0;
    tab.addEventListener('click', () => scene(index));
    tab.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + sources.length) % sources.length;
      scene(next); sceneTabs[next].focus();
    });
  });
  let startX = 0;
  sceneBox?.addEventListener('touchstart', e => { startX = e.changedTouches[0].screenX; }, { passive: true });
  sceneBox?.addEventListener('touchend', e => { const d = e.changedTouches[0].screenX - startX; if (Math.abs(d) > 45) scene((sceneIndex + (d < 0 ? 1 : -1) + sources.length) % sources.length); }, { passive: true });

  // Motion follows actual photo and reading order, without hiding content during load.
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.animate([{ transform: 'translateY(20px)', opacity: .4 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 700, easing: 'cubic-bezier(.2,.7,.2,1)' });
    reveal.unobserve(entry.target);
  }), { rootMargin: '0px 0px -7% 0px', threshold: .08 });
  $$('.section-heading,.service-card,.routine-intro,.routine-photos,.story-people,.story-copy,.social-copy,.social-videos,.faq-intro,.booking-intro,.booking-form').forEach(el => reveal.observe(el));
  const dayLine = $('.routine-steps');
  if (dayLine) {
    const dayObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { dayLine.classList.add('is-visible'); dayObserver.disconnect(); }
    }), { threshold: .2 });
    dayObserver.observe(dayLine);
  }
  const heroPhoto = $('.hero-photo');
  let queued = false;
  window.addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      header?.classList.toggle('is-scrolled', scrollY > 20);
      if (scrollY < 180) $$('.desktop-nav a').forEach(a => a.classList.remove('is-current'));
      if (heroPhoto && scrollY < innerHeight) heroPhoto.style.translate = `0 ${Math.min(22, scrollY * .045)}px`;
      queued = false;
    });
  }, { passive: true });

  const reviewTrack = $('#proof-track');
  [$('.proof-prev'), $('.proof-next')].forEach((button, direction) => button?.addEventListener('click', () => {
    const card = $('.quote-card', reviewTrack);
    const step = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(reviewTrack).gap) || 17);
    reviewTrack.scrollBy({ left: direction ? step : -step, behavior: 'smooth' });
  }));

  const faqDetails = $$('.faq-list details');
  faqDetails.forEach(detail => {
    const summary = $('summary', detail);
    const answer = $('.faq-answer', detail);
    let busy = false;
    summary.addEventListener('click', event => {
      event.preventDefault();
      if (busy) return;
      busy = true;
      const opening = !detail.open;
      if (opening) {
        faqDetails.forEach(other => {
          if (other !== detail) other.open = false;
        });
        detail.open = true;
      }
      const height = answer.scrollHeight;
      const animation = answer.animate([
        { height: opening ? '0px' : `${height}px`, opacity: opening ? 0 : 1 },
        { height: opening ? `${height}px` : '0px', opacity: opening ? 1 : 0 }
      ], { duration: 280, easing: 'cubic-bezier(.2,.7,.2,1)' });
      animation.onfinish = () => { if (!opening) detail.open = false; busy = false; };
      animation.oncancel = () => { busy = false; };
    });
  });

  const form = $('#booking-form');
  $$('[data-service-link]').forEach(link => link.addEventListener('click', () => {
    const input = $(`input[name="servico"][value="${link.dataset.serviceLink}"]`, form);
    if (input) input.checked = true;
  }));
  const val = name => form?.elements.namedItem(name)?.value?.trim() || '';
  const date = value => { if (!value) return ''; const [year, month, day] = value.split('-'); return `${day}/${month}/${year}`; };
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const text = ['Olá, vim pelo site da ACA Resort e gostaria de consultar disponibilidade e valores.', '', `Serviço: ${val('servico')}.`];
    if (val('tutor')) text.push(`Meu nome: ${val('tutor')}.`);
    if (val('pet')) text.push(`Pet: ${val('pet')}.`);
    if (val('chegada') && val('saida')) text.push(`Período: ${date(val('chegada'))} a ${date(val('saida'))}.`);
    else if (val('chegada')) text.push(`Chegada prevista: ${date(val('chegada'))}.`);
    if (val('observacoes')) text.push(`Sobre o pet: ${val('observacoes')}`);
    window.open(`https://wa.me/5521970439700?text=${encodeURIComponent(text.join('\n'))}`, '_blank', 'noopener,noreferrer');
  });
  $('#year').textContent = new Date().getFullYear();
})();
