/* ACA Resort Pet Center — interações e transições */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const motion = hasGsap && !reduce;
  if (motion) root.classList.add('motion');

  let lenis = null;
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- dados ---------------- */
  const galleries = {
    'hotel-caes': [
      ['assets/images/aca-dupla-patio.webp', 'Dois cães passeando juntos na área externa'],
      ['assets/images/gal-182.webp', 'Dois cães interagindo na área coberta'],
      ['assets/images/gal-196.webp', 'Dois cães de portes diferentes no pátio'],
      ['assets/images/gal-211.webp', 'Cães explorando juntos a área externa']
    ],
    daycare: [
      ['assets/images/aca-daycare-bulldog.webp', 'Bulldog branco sorrindo'],
      ['assets/images/aca-playground-melhorado.webp', 'Cuidador brincando com um cão no playground'],
      ['assets/images/gal-199.webp', 'Cão brincando na piscina de bolinhas'],
      ['assets/images/gal-227.webp', 'Turma de cães passeando pelo pátio'],
      ['assets/images/gal-284.webp', 'Cães e cuidador em um dia de atividades'],
      ['assets/images/gal-289.webp', 'Cães aproveitando a área verde']
    ],
    gatos: [
      ['assets/images/aca-gato-relaxando.webp', 'Gato preto relaxando durante a estadia'],
      ['assets/images/gal-131.webp', 'Gato siamês curioso no espaço felino']
    ],
    turma: [
      ['assets/images/aca-grupo-patio.webp', 'Cães na área coberta'],
      ['assets/images/aca-trio-turma.webp', 'Três cães juntos em uma das áreas de recreação'],
      ['assets/images/gal-265.webp', 'Cães reunidos no gramado'],
      ['assets/images/gal-274.webp', 'Dois cães passeando juntos pelo pátio'],
      ['assets/images/gal-315.webp', 'Dois cães se encontrando na área coberta']
    ],
    piscina: [
      ['assets/images/aca-piscina-contexto.webp', 'A piscina com cão junto à borda'],
      ['assets/images/aca-golden-piscina.webp', 'Golden retriever dentro da piscina'],
      ['assets/images/gal-179.webp', 'Três cães brincando dentro e ao lado da piscina'],
      ['assets/images/gal-255.webp', 'Cães se refrescando na piscina'],
      ['assets/images/gal-093.webp', 'Cães brincando na piscina com a equipe por perto']
    ]
  };
  galleries.mural = $$('.mural button').map(b => {
    const img = $('img', b);
    return [img.getAttribute('src'), img.alt];
  });

  const reviews = [
    ['Sempre que preciso, eu deixo meus pets no hotel, são super bem tratados, a equipe é muito carinhosa.', 'Ana Martins'],
    ['Eles mandaram fotos e informações diariamente sobre a Nina.', 'Graciana Dias Bento'],
    ['Bem espaçosa, ótima para os cães correrem e brincarem à vontade.', 'Raquel B Kistler Domingues'],
    ['O cão da minha irmã se hospeda com frequência e ele (Sol) ama estar lá.', 'Adriana Pol Balloussier'],
    ['Cuidaram muito bem dele, ouviram minhas recomendações com toda atenção e amor do mundo.', 'Milla Diniz'],
    ['Recebi fotos diariamente e fiquei encantada com o diário dela.', 'Dicas Especiais'],
    ['Laika, minha cachorrinha, voltou muito animada e feliz.', 'Ana Carolina Alvarez'],
    ['O atendimento é maravilhoso, o cuidado com a minha idosinha é excepcional.', 'Josilaine Nos'],
    ['Possuem acompanhamento veterinário e dão retorno cotidiano.', 'Alfeu Barreto'],
    ['O espaço é lindo e os cuidadores muito carinhosos!', 'Priscila Lopes'],
    ['Eles mandaram notícias diárias do meu cachorro e tiraram todas as minhas dúvidas rapidamente.', 'Gabriella Dias'],
    ['Meus cachorrinhos ficaram hospedados por uns dias, foram muito bem cuidados.', 'Beatriz Gomes'],
    ['Você tem notícias o tempo todo, respondem rápido, espaço maravilhoso para eles brincarem.', 'Cristiane Rabelo'],
    ['Ambiente agradável e seguro. Os funcionários são atenciosos e tratam os animais com cuidado.', 'Bernardo Moreira'],
    ['A equipe é muito carinhosa e competente. Meu cão é muito inseguro e se sentiu muito confortável e acolhido lá.', 'Paola Pol Balloussier'],
    ['Além do espaço ser maravilhoso, o atendimento é espetacular. Limpeza, espaço para brincar e excelente tratamento.', 'Andrea França'],
    ['Recebi notícias todos os dias, o que me deu muito conforto.', 'Livia Veloso'],
    ['Equipe bem preparada, atenciosos e muito cordiais.', 'Paulo Morbeck'],
    ['Já conheço o trabalho deles de day use há 4 anos.', 'Suellen Drummond'],
    ['Espaço maravilhoso, atendimento excelente e muito, muito amor e cuidados com os bichinhos.', 'Isabela Neves Cardoso']
  ];

  /* ---------------- depoimentos (marquee) ---------------- */
  const quoteHTML = ([text, name]) =>
    `<a class="quote" href="https://www.google.com/maps/?cid=12518354555546160040" target="_blank" rel="noopener noreferrer"><p>“${text}”</p><footer><span>${name}</span><span class="mono">★★★★★ Google</span></footer></a>`;
  const half = Math.ceil(reviews.length / 2);
  const rows = [[$('#row-a'), reviews.slice(0, half)], [$('#row-b'), reviews.slice(half)]];
  rows.forEach(([el, list]) => {
    if (!el) return;
    const html = list.map(quoteHTML).join('');
    el.innerHTML = html + html; // duplicado para o loop
    $$('.quote', el).slice(list.length).forEach(q => { q.setAttribute('aria-hidden', 'true'); q.tabIndex = -1; });
  });

  /* ---------------- loader ---------------- */
  const loader = $('.loader');
  const loaderCount = $('.loader-count b');
  let started = false;
  const startPage = () => {
    if (started) return; started = true;
    if (loader) loader.classList.add('is-done');
    if (lenis) lenis.start();
    heroIntro();
  };
  if (!motion || !loader) {
    startPage();
  } else {
    const c = { v: 0 };
    gsap.timeline({ onComplete: startPage })
      .to(c, { v: 2000, duration: 1.3, ease: 'power2.inOut', onUpdate: () => { loaderCount.textContent = Math.round(c.v).toLocaleString('pt-BR'); } })
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: .9, ease: 'expo.inOut' }, '+=.15');
  }

  /* ---------------- smooth scroll ---------------- */
  if (motion && window.Lenis) {
    lenis = new Lenis({ lerp: .1, smoothWheel: true });
    if (!started) lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToEl = target => {
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.6, easing: t => 1 - Math.pow(1 - t, 4) });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    closeMenu();
    if (a.dataset.service) setService(a.dataset.service);
    scrollToEl(target);
  });

  /* ---------------- menu ---------------- */
  const menuBtn = $('.menu-btn');
  const menu = $('#menu');
  function closeMenu() {
    if (!menu || !menu.classList.contains('is-open')) return;
    menu.classList.remove('is-open'); menu.inert = true;
    menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Abrir menu');
    lenis && lenis.start();
  }
  menuBtn?.addEventListener('click', () => {
    const open = !menu.classList.contains('is-open');
    if (!open) return closeMenu();
    menu.classList.add('is-open'); menu.inert = false;
    menuBtn.setAttribute('aria-expanded', 'true'); menuBtn.setAttribute('aria-label', 'Fechar menu');
    lenis && lenis.stop();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ---------------- topbar: esconder/mostrar e tom ---------------- */
  const topbar = $('.topbar');
  const navLinks = $$('.topbar-nav a');
  let lastY = scrollY, ticking = false;
  const updateBar = () => {
    ticking = false;
    const y = scrollY;
    topbar.classList.toggle('is-hidden', y > lastY && y > 300 && !menu.classList.contains('is-open'));
    lastY = y;
    const probe = document.elementsFromPoint(innerWidth / 2, 40).map(el => el.closest('[data-tone]')).find(Boolean);
    const tone = probe ? probe.dataset.tone : 'dark';
    topbar.classList.toggle('on-light', tone === 'light' || tone === 'amber' || tone === 'sky');
    const mid = innerHeight * .4;
    let current = null;
    $$('main > section[id]').forEach(s => { const r = s.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) current = s.id; });
    navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + current));
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateBar); } }, { passive: true });
  updateBar();

  /* ---------------- cursor ---------------- */
  const cursor = $('.cursor');
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (cursor && fine && !reduce) {
    const label = $('.cursor-label', cursor);
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }, cur = { ...pos };
    addEventListener('pointermove', e => { pos.x = e.clientX; pos.y = e.clientY; cursor.classList.add('is-on'); }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
    const loop = () => {
      cur.x += (pos.x - cur.x) * .2; cur.y += (pos.y - cur.y) * .2;
      cursor.style.transform = `translate(${cur.x}px,${cur.y}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('[data-cursor], .mural button, .quote');
      if (t) { label.textContent = t.dataset.cursor || (t.classList.contains('quote') ? 'google' : 'ampliar'); cursor.classList.add('is-big'); }
      else cursor.classList.remove('is-big');
    });
  }

  /* ---------------- hero ---------------- */
  function heroIntro() {
    if (!motion) return;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hero-window', { clipPath: 'inset(100% 0 0 0 round 999px 999px 18px 18px)', duration: 1.6 })
      .from('.ht-w', { yPercent: 115, duration: 1.4, stagger: .08 }, '-=1.3')
      .fromTo('.hero-float', { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 1.6, stagger: .08, clearProps: 'clipPath' }, '-=1.2')
      .from('.hero-foot > *', { y: 30, opacity: 0, duration: 1, stagger: .08 }, '-=1');
  }

  if (motion) {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    /* parallax do mouse nas fotos flutuantes */
    if (fine) {
      const floats = $$('.hero-float').map(el => ({ el, d: +el.dataset.depth || 1, x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }) }));
      $('.hero').addEventListener('pointermove', e => {
        const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
        floats.forEach(f => { f.x(nx * 60 * f.d); f.y(ny * 40 * f.d); });
      });
    }

    /* saída do hero: palavras se abrem, fotos se dispersam, janela cresce */
    mm.add('(min-width: 761px)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=110%', scrub: 1, pin: true, pinSpacing: true } });
      tl.to('.ht-row .ht-w:first-child', { xPercent: -60, opacity: 0, ease: 'power2.in' }, 0)
        .to('.ht-row .ht-w:last-child', { xPercent: 60, opacity: 0, ease: 'power2.in' }, 0)
        .to('.hero-window', { scale: 1.9, yPercent: -10, borderRadius: '24px', ease: 'power2.inOut' }, 0)
        .to('.hero-foot', { opacity: 0, y: 40 }, 0);
      $$('.hero-float').forEach(el => {
        const r = el.getBoundingClientRect();
        const dx = (r.left + r.width / 2 - innerWidth / 2), dy = (r.top + r.height / 2 - innerHeight / 2);
        tl.to(el, { xPercent: dx / r.width * 160, yPercent: dy / r.height * 160, scale: 2.2, opacity: 0, ease: 'power2.in' }, 0);
      });
      tl.to('.hero-stage', { opacity: .15, duration: .3 }, .7);
    });

    /* cortina entre capítulos: cada seção sobe como uma folha sobre a anterior */
    const chapters = $$('main > section:not(.hero), .footer');
    chapters.forEach((sec, i) => {
      const prev = i === 0 ? $('.hero') : chapters[i - 1];
      const prevBg = getComputedStyle(prev.classList.contains('rotina') ? $('.rotina-pin') : prev).backgroundColor;
      gsap.fromTo(sec, { clipPath: 'inset(7% 4% 0% 4% round 56px 56px 0 0)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 0px 0px 0 0)', ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 18%', scrub: true,
          onEnter: () => { document.body.style.backgroundColor = prevBg; },
          onLeaveBack: () => { document.body.style.backgroundColor = ''; } }
      });
    });

    /* títulos */
    $$('h2:not(#espacos-title)').forEach(h => {
      gsap.from(h, { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } });
    });

    /* manifesto: palavra por palavra */
    const mt = $('[data-words]');
    if (mt) {
      const walker = document.createTreeWalker(mt, NodeFilter.SHOW_TEXT);
      const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(n => {
        if (!n.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
          else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.appendChild(s); }
        });
        n.replaceWith(frag);
      });
      const parts = $$('.w, .pill', mt);
      gsap.fromTo(parts, { opacity: .14 }, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: mt, start: 'top 80%', end: 'bottom 45%', scrub: true } });
      gsap.from($$('.pill', mt), { width: 0, marginInline: 0, stagger: .15, ease: 'expo.out', duration: 1.4, scrollTrigger: { trigger: mt, start: 'top 70%' } });
    }

    /* números */
    $$('[data-count]').forEach(el => {
      const end = parseFloat(el.dataset.count), dec = el.dataset.format === 'decimal';
      const o = { v: 0 };
      gsap.to(o, { v: end, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: () => { el.textContent = dec ? o.v.toFixed(1).replace('.', ',') : Math.round(o.v).toLocaleString('pt-BR'); } });
    });

    /* serviços: trilho horizontal */
    mm.add('(min-width: 861px)', () => {
      const track = $('.servicos-track');
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, { x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '.servicos-pin', start: 'top top', end: () => '+=' + dist(), scrub: 1, pin: true, invalidateOnRefresh: true, anticipatePin: 1 } });
      gsap.to('.servicos-progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.servicos-pin', start: 'top top', end: () => '+=' + dist(), scrub: true } });
      $$('.svc').forEach(svc => {
        gsap.from($('.svc-char', svc), { yPercent: 70, rotate: -14, opacity: 0, ease: 'back.out(1.6)', duration: 1.2,
          scrollTrigger: { trigger: svc, containerAnimation: tween, start: 'left 70%' } });
        gsap.fromTo($('.svc-photo img', svc), { xPercent: -8 }, { xPercent: 8, ease: 'none',
          scrollTrigger: { trigger: svc, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
      });
    });
    mm.add('(max-width: 860px)', () => {
      $$('.svc').forEach(svc => gsap.from(svc, { y: 80, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: svc, start: 'top 85%' } }));
    });

    /* espaços: cenas que se abrem em círculo */
    const scenes = $$('.espacos .scene');
    const dots = $$('.scene-dots li');
    if (scenes.length) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.espacos-pin', start: 'top top', end: () => '+=' + (scenes.length - 1) * innerHeight * 1.1, scrub: 1, pin: true,
        onUpdate: self => { const idx = Math.min(scenes.length - 1, Math.round(self.progress * (scenes.length - 1))); dots.forEach((d, i) => d.classList.toggle('is-on', i === idx)); } } });
      scenes.forEach((sc, i) => {
        if (i === 0) return;
        const prev = scenes[i - 1];
        tl.fromTo(sc, { clipPath: 'circle(0% at 50% 62%)' }, { clipPath: 'circle(80% at 50% 62%)', duration: 1, ease: 'power2.inOut' }, i - 1)
          .to($('.scene-inner', prev), { scale: .86, opacity: .3, duration: 1, ease: 'power2.in' }, i - 1)
          .fromTo($('.scene-photo img', sc), { scale: 1.35 }, { scale: 1, duration: 1.2, ease: 'power2.out' }, i - 1)
          .fromTo($('.scene-copy', sc), { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: .6, ease: 'power2.out' }, i - .55)
          .to({}, { duration: .35 });
      });
      gsap.from('.scene-intro .scene-inner > *', { y: 60, opacity: 0, stagger: .12, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.espacos', start: 'top 60%' } });
    }

    /* rotina: ciclo do dia */
    const rot = $('.rotina'), pinEl = $('.rotina-pin'), sun = $('.sun');
    const imgs = $$('.rotina-porthole img'), steps = $$('.rotina-steps li');
    const skyStops = [
      [0, '#fbe3a6', '#cfeee3', '#10241b'],
      [.33, '#8fd6e3', '#e9f6ef', '#10241b'],
      [.66, '#f08c52', '#f6cf86', '#10241b'],
      [1, '#081626', '#1b3552', '#eef3ea']
    ];
    const mix = (a, b, t) => {
      const pa = [1, 3, 5].map(i => parseInt(a.substr(i, 2), 16)), pb = [1, 3, 5].map(i => parseInt(b.substr(i, 2), 16));
      return '#' + pa.map((v, i) => Math.round(v + (pb[i] - v) * t).toString(16).padStart(2, '0')).join('');
    };
    const setStep = idx => {
      imgs.forEach((im, i) => im.classList.toggle('is-on', i === idx));
      steps.forEach((s, i) => s.classList.toggle('is-on', i === idx));
    };
    const paintSky = p => {
      let k = 0; while (k < skyStops.length - 2 && p > skyStops[k + 1][0]) k++;
      const [p0, a0, b0, i0] = skyStops[k], [p1, a1, b1, i1] = skyStops[k + 1];
      const t = Math.min(1, Math.max(0, (p - p0) / (p1 - p0)));
      pinEl.style.setProperty('--sky-a', mix(a0, a1, t));
      pinEl.style.setProperty('--sky-b', mix(b0, b1, t));
      pinEl.style.setProperty('--ink', t > .5 ? i1 : i0);
      pinEl.style.setProperty('--stars', Math.max(0, (p - .72) / .28).toFixed(2));
      rot.dataset.tone = p > .8 ? 'dark' : 'sky';
    };
    setStep(0);
    mm.add('(min-width: 861px)', () => {
      ScrollTrigger.create({ trigger: pinEl, start: 'top top', end: '+=300%', pin: true, scrub: true,
        onUpdate: self => {
          const p = self.progress;
          paintSky(p);
          sun.style.left = (50 - Math.cos(Math.PI * p) * 50) + '%';
          sun.style.top = (50 - Math.sin(Math.PI * p) * 50) + '%';
          const moon = Math.max(0, (p - .75) / .25);
          sun.style.setProperty('--moon', (120 - moon * 88) + '%');
          sun.style.background = moon > 0 ? mix('#f2a62a', '#f3eed8', Math.min(1, moon * 2)) : '';
          setStep(Math.min(3, Math.floor(p * 4)));
        } });
    });
    mm.add('(max-width: 860px)', () => {
      steps.forEach(s => s.classList.add('is-on'));
      ScrollTrigger.create({ trigger: rot, start: 'top bottom', end: 'bottom top', scrub: true, onUpdate: self => paintSky(self.progress * .7) });
      let i = 0; const id = setInterval(() => { i = (i + 1) % imgs.length; imgs.forEach((im, k) => im.classList.toggle('is-on', k === i)); }, 2800);
      sun.style.left = '20%'; sun.style.top = '10%';
      return () => clearInterval(id);
    });

    /* história */
    $$('.person-img img').forEach(img => gsap.fromTo(img, { yPercent: -12 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } }));
    gsap.from('.person-img', { clipPath: 'inset(100% 0 0 0 round 999px 999px 18px 18px)', duration: 1.6, stagger: .2, ease: 'expo.out', scrollTrigger: { trigger: '.historia-people', start: 'top 75%' } });
    gsap.from('.historia-copy > p, .historia-copy > a', { y: 30, opacity: 0, stagger: .1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.historia-copy', start: 'top 70%' } });

    /* reels e mural */
    gsap.from('.reel', { y: 120, opacity: 0, stagger: .12, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.reels', start: 'top 85%' } });
    $$('.mural-col').forEach(col => {
      const sp = parseFloat(col.dataset.speed) || 10;
      gsap.fromTo(col, { yPercent: -sp }, { yPercent: sp, ease: 'none', scrollTrigger: { trigger: '.mural', start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* marquee com velocidade ligada à rolagem */
    $$('.marquee').forEach(m => {
      const track = $('.marquee-track', m), dir = +m.dataset.dir || -1;
      let x = 0, boost = 0, paused = false;
      m.addEventListener('pointerenter', () => paused = true);
      m.addEventListener('pointerleave', () => paused = false);
      gsap.ticker.add((t, dt) => {
        const w = track.scrollWidth / 2;
        if (!w) return;
        const v = lenis ? Math.abs(lenis.velocity) : 0;
        boost += (v * .6 - boost) * .1;
        const speed = paused ? 0 : (0.045 + boost * .02) * dt;
        x += speed * dir;
        if (x <= -w) x += w; if (x > 0) x -= w;
        track.style.transform = `translate3d(${x}px,0,0)`;
      });
      if (dir > 0) x = -track.scrollWidth / 4;
    });

    /* FAQ abre com altura animada */
    $$('.faq-list details').forEach(d => d.addEventListener('toggle', () => {
      if (d.open) gsap.from($('.faq-a', d), { height: 0, opacity: 0, duration: .6, ease: 'expo.out' });
    }));
    gsap.from('.faq-list details', { y: 30, opacity: 0, stagger: .05, duration: .9, ease: 'expo.out', scrollTrigger: { trigger: '.faq-list', start: 'top 80%' } });

    /* reserva */
    gsap.fromTo('.reserva-photo img', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.reserva', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.form', { y: 100, rotate: 2, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.form', start: 'top 85%' } });

    /* rodapé */
    gsap.from('.footer-word', { yPercent: 60, opacity: 0, duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: '.footer-word', start: 'top 95%' } });

    addEventListener('load', () => ScrollTrigger.refresh());
  } else {
    /* sem animação: rotina mostra tudo */
    $$('.rotina-steps li').forEach(s => s.classList.add('is-on'));
    $('.rotina-porthole img')?.classList.add('is-on');
  }

  /* reels tocam quando aparecem */
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      const v = en.target;
      if (en.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
    }), { threshold: .35 });
    $$('.reel video, .hero-video').forEach(v => io.observe(v));
  }

  /* ---------------- lightbox ---------------- */
  const lb = $('#lightbox'), stage = $('#lb-stage'), lbText = $('#lb-text'), lbCount = $('#lb-count');
  const prevBtn = $('.lb-prev'), nextBtn = $('.lb-next');
  let list = [], idx = 0;
  const render = () => {
    const [src, alt] = list[idx];
    stage.innerHTML = '';
    const img = new Image(); img.src = src; img.alt = alt; stage.appendChild(img);
    lbText.textContent = alt;
    lbCount.textContent = list.length > 1 ? `${idx + 1} / ${list.length}` : 'ACA Resort · Vargem Grande';
    prevBtn.hidden = nextBtn.hidden = list.length < 2;
  };
  const openLb = (e, setup) => {
    if (e) { lb.style.setProperty('--lb-x', e.clientX + 'px'); lb.style.setProperty('--lb-y', e.clientY + 'px'); }
    setup();
    if (!lb.open) lb.showModal();
    lenis && lenis.stop();
  };
  const closeLb = () => { stage.innerHTML = ''; lb.close(); };
  lb.addEventListener('close', () => { stage.innerHTML = ''; lenis && lenis.start(); });
  $('.lb-close').addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb || e.target === stage) closeLb(); });
  prevBtn.addEventListener('click', () => { idx = (idx - 1 + list.length) % list.length; render(); });
  nextBtn.addEventListener('click', () => { idx = (idx + 1) % list.length; render(); });
  lb.addEventListener('keydown', e => {
    if (list.length < 2 || stage.querySelector('video')) return;
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });

  document.addEventListener('click', e => {
    const g = e.target.closest('[data-gallery]');
    const single = e.target.closest('[data-single]');
    const vid = e.target.closest('[data-video]');
    if (g) {
      openLb(e, () => {
        list = galleries[g.dataset.gallery] || [];
        const start = g.dataset.start || $('img', g)?.getAttribute('src');
        idx = Math.max(0, list.findIndex(([s]) => s === start));
        render();
      });
    } else if (single) {
      openLb(e, () => { list = [[single.dataset.single, single.dataset.caption || '']]; idx = 0; render(); });
    } else if (vid) {
      openLb(e, () => {
        list = [];
        stage.innerHTML = '';
        const v = document.createElement('video');
        v.src = vid.dataset.video; v.controls = true; v.autoplay = true; v.playsInline = true;
        stage.appendChild(v);
        lbText.textContent = vid.dataset.title || '';
        lbCount.textContent = 'ACA Resort · Vargem Grande';
        prevBtn.hidden = nextBtn.hidden = true;
        v.play().catch(() => {});
      });
    }
  });

  /* ---------------- formulário → WhatsApp ---------------- */
  const form = $('#booking-form');
  function setService(name) {
    const r = form && $$('input[name="servico"]', form).find(i => i.value === name);
    if (r) r.checked = true;
  }
  const fmtDate = v => v ? v.split('-').reverse().join('/') : '';
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const val = n => (form.elements[n]?.value || '').trim();
    const text = ['Olá, vim pelo site da ACA Resort e gostaria de consultar disponibilidade e valores.', '', `Serviço: ${val('servico')}.`];
    if (val('tutor')) text.push(`Meu nome: ${val('tutor')}.`);
    if (val('pet')) text.push(`Pet: ${val('pet')}.`);
    if (val('chegada') && val('saida')) text.push(`Período: ${fmtDate(val('chegada'))} a ${fmtDate(val('saida'))}.`);
    else if (val('chegada')) text.push(`Chegada prevista: ${fmtDate(val('chegada'))}.`);
    if (val('observacoes')) text.push(`Sobre o pet: ${val('observacoes')}`);
    const url = `https://wa.me/5521970439700?text=${encodeURIComponent(text.join('\n'))}`;
    const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    document.body.appendChild(a); a.click(); a.remove();
  });
})();
