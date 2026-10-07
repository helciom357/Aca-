(() => {
  'use strict';

  const galleryExtras = {
    'hotel-caes': [
      ['assets/images/gal-182.webp', 'Dois cães interagindo na área coberta da ACA'],
      ['assets/images/gal-196.webp', 'Dois cães de portes diferentes no pátio'],
      ['assets/images/gal-211.webp', 'Cães explorando juntos a área externa']
    ],
    daycare: [
      ['assets/images/gal-199.webp', 'Cão brincando na piscina de bolinhas'],
      ['assets/images/gal-227.webp', 'Turma de cães passeando pelo pátio'],
      ['assets/images/gal-284.webp', 'Cães e cuidador em um dia de atividades'],
      ['assets/images/gal-289.webp', 'Cães aproveitando a área verde']
    ],
    gatos: [
      ['assets/images/gal-131.webp', 'Gato siamês curioso no espaço felino da ACA']
    ],
    turma: [
      ['assets/images/gal-265.webp', 'Cães reunidos no gramado da ACA'],
      ['assets/images/gal-274.webp', 'Dois cães passeando juntos pelo pátio'],
      ['assets/images/gal-315.webp', 'Dois cães se encontrando na área coberta']
    ],
    piscina: [
      ['assets/images/gal-179.webp', 'Três cães brincando dentro e ao lado da piscina'],
      ['assets/images/gal-255.webp', 'Cães se refrescando na piscina vista de fora'],
      ['assets/images/gal-093.webp', 'Cães brincando na piscina com a equipe por perto']
    ]
  };

  const dialog = document.querySelector('#media-dialog');
  const panel = dialog?.querySelector('.dialog-panel');
  const stage = document.querySelector('#dialog-media');
  const caption = document.querySelector('#dialog-caption-text');
  const galleryBar = document.querySelector('#dialog-gallery-bar');
  const galleryCount = document.querySelector('#dialog-gallery-count');
  const thumbs = document.querySelector('#dialog-gallery-thumbs');
  if (!dialog || !panel || !stage || !caption || !galleryBar || !galleryCount || !thumbs) return;

  let lastTrigger = null;
  let activeGallery = null;
  let galleryIndex = 0;

  const setGalleryImage = index => {
    if (!activeGallery) return;
    galleryIndex = (index + activeGallery.length) % activeGallery.length;
    const item = activeGallery[galleryIndex];
    const image = stage.querySelector('img');
    image.src = item.src;
    image.alt = item.alt;
    caption.textContent = item.alt;
    galleryCount.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(activeGallery.length).padStart(2, '0')}`;
    [...thumbs.children].forEach((button, i) => {
      button.classList.toggle('is-active', i === galleryIndex);
      button.setAttribute('aria-current', i === galleryIndex ? 'true' : 'false');
    });
    if (dialog.open) thumbs.children[galleryIndex]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    const next = new Image();
    next.src = activeGallery[(galleryIndex + 1) % activeGallery.length].src;
  };

  const open = (trigger, media, label, gallery = null) => {
    lastTrigger = trigger;
    activeGallery = gallery;
    stage.replaceChildren(media);
    caption.textContent = label;
    panel.classList.toggle('has-gallery', Boolean(gallery));
    galleryBar.hidden = !gallery;
    thumbs.replaceChildren();

    if (gallery) {
      const makeArrow = (direction, symbol, text) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `dialog-gallery-nav ${direction}`;
        button.setAttribute('aria-label', text);
        button.textContent = symbol;
        button.addEventListener('click', () => setGalleryImage(galleryIndex + (direction === 'next' ? 1 : -1)));
        return button;
      };
      stage.append(makeArrow('prev', '‹', 'Foto anterior'), makeArrow('next', '›', 'Próxima foto'));
      gallery.forEach((item, i) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', `Ver foto ${i + 1}: ${item.alt}`);
        const thumb = new Image();
        thumb.src = item.src;
        thumb.alt = '';
        thumb.loading = 'lazy';
        button.append(thumb);
        button.addEventListener('click', () => setGalleryImage(i));
        thumbs.append(button);
      });
      setGalleryImage(0);
    }

    dialog.showModal();
    dialog.querySelector('.dialog-close').focus();
    if (media.tagName === 'VIDEO') media.play().catch(() => {});
  };

  document.querySelectorAll('[data-open-image]').forEach(button => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      if (!source) return;
      const image = new Image();
      image.src = source.currentSrc || source.src;
      image.alt = source.alt;
      const extras = galleryExtras[button.dataset.gallery];
      const gallery = extras ? [
        { src: image.src, alt: source.alt },
        ...extras.map(([file, alt]) => ({ src: file, alt }))
      ] : null;
      open(button, image, button.dataset.caption || source.alt, gallery);
    });
  });

  document.querySelector('[data-open-current]')?.addEventListener('click', event => {
    const source = document.querySelector('#space-image');
    if (!source) return;
    if (document.querySelector('.space-main-image')?.classList.contains('is-video')) {
      const video = document.createElement('video');
      video.src = 'assets/videos/aca-tour-completo.mp4';
      video.poster = source.currentSrc || source.src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('controlsList', 'nodownload');
      open(event.currentTarget, video, 'Veja a casa completa: vídeo de apresentação da ACA Resort');
      return;
    }
    const image = new Image();
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    open(event.currentTarget, image, document.querySelector('#space-photo-label')?.textContent || source.alt);
  });

  document.querySelectorAll('[data-open-video]').forEach(button => {
    button.addEventListener('click', () => {
      const video = document.createElement('video');
      video.src = button.dataset.openVideo;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('controlsList', 'nodownload');
      open(button, video, button.dataset.videoTitle || 'Vídeo da ACA Resort');
    });
  });

  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (!activeGallery || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    setGalleryImage(galleryIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let touchStartX = 0;
  stage.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
  stage.addEventListener('touchend', event => {
    if (!activeGallery) return;
    const distance = event.changedTouches[0].screenX - touchStartX;
    if (Math.abs(distance) > 45) setGalleryImage(galleryIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });
  dialog.addEventListener('close', () => {
    stage.querySelector('video')?.pause();
    stage.replaceChildren();
    activeGallery = null;
    panel.classList.remove('has-gallery');
    galleryBar.hidden = true;
    lastTrigger?.focus({ preventScroll: true });
  });

  const more = document.querySelector('.faq-more');
  const extraQuestions = [...document.querySelectorAll('.faq-extra')];
  more?.addEventListener('click', () => {
    const expanded = more.getAttribute('aria-expanded') !== 'true';
    more.setAttribute('aria-expanded', String(expanded));
    more.textContent = expanded ? 'Ver menos dúvidas' : `Ver mais dúvidas (${extraQuestions.length})`;
    extraQuestions.forEach(detail => {
      detail.hidden = !expanded;
      if (!expanded) detail.open = false;
    });
  });
})();
