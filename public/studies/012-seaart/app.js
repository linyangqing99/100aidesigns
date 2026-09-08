/* SeaArt homepage study: local interactions only; no account, generation or tracking API. */
(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia('(max-width: 980px)');
  const mobile = window.matchMedia('(max-width: 680px)');
  const storageKey = 'seaart-study-v1';
  const origin = 'https://www.seaart.ai/zhCN';
  const icons = {"heart": "<i class=\"legacy-icon\" aria-hidden=\"true\">&#xe945;</i>", "eye": "<i class=\"source-icon stat-icon\" aria-hidden=\"true\">&#xe64c;</i>", "empty": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\" viewBox=\"0 0 256 256\" aria-hidden=\"true\"><path d=\"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM48,48H208v77.38l-24.69-24.7a16,16,0,0,0-22.62,0L53.37,208H48ZM208,208H76l96-96,36,36v60ZM96,120A24,24,0,1,0,72,96,24,24,0,0,0,96,120Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,96,88Z\"></path></svg>"};

  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  };
  const icon = name => {
    const node = make('span', 'inline-icon');
    node.innerHTML = icons[name] || '';
    return node;
  };
  const behavior = () => motion.matches ? 'auto' : 'smooth';
  const safeUrl = (value, fallback = origin) => {
    if (!value) return fallback;
    try {
      const url = new URL(String(value), document.baseURI);
      return ['https:', 'http:', 'blob:'].includes(url.protocol) ? url.href : fallback;
    } catch { return fallback; }
  };
  const externalLink = (text, url, className = 'source-link') => {
    const link = make('a', className, text);
    link.href = safeUrl(url);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  };

  let saved = { likes: [], prompt: '' };
  try {
    const prior = JSON.parse(localStorage.getItem(storageKey) || '{}');
    saved = {
      likes: Array.isArray(prior.likes) ? prior.likes.filter(id => typeof id === 'string') : [],
      prompt: typeof prior.prompt === 'string' ? prior.prompt : ''
    };
  } catch { /* Browsing still works when local storage is unavailable. */ }
  const liked = new Set(saved.likes);
  const persist = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ likes: [...liked], prompt: saved.prompt }));
      return true;
    } catch { return false; /* Storage is optional and never blocks the interface. */ }
  };

  const state = { tab: 'all', query: '', kind: 'all', sort: 'recommended', media: 'all' };
  const cards = new Map();
  let library = [];
  let featured = [];
  let contests = [];
  let gallery = [];
  let uploadUrl = null;
  const visibleVideos = new Set();
  const observedVideos = new Set();

  function updateVideoPlayback() {
    const paused = motion.matches || document.hidden || Boolean($('dialog[open]'));
    let playing = 0;
    for (const video of observedVideos) {
      if (!video.isConnected) {
        video.pause();
        observer?.unobserve(video);
        observedVideos.delete(video);
        visibleVideos.delete(video);
        continue;
      }
      const play = !paused && visibleVideos.has(video) && playing < 2;
      if (play) {
        playing += 1;
        if (!video.getAttribute('src') && video.dataset.src) video.src = video.dataset.src;
        video.play()?.catch(() => { /* A poster remains when autoplay is unavailable. */ });
      } else video.pause();
    }
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleVideos.add(entry.target);
      else visibleVideos.delete(entry.target);
    }
    updateVideoPlayback();
  }, { threshold: 0.15 }) : null;

  function count(value) {
    if (typeof value === 'number') return value;
    const text = String(value || '0').replaceAll(',', '').trim();
    const number = Number.parseFloat(text) || 0;
    if (/亿/.test(text)) return number * 1e8;
    if (/万|w$/i.test(text)) return number * 1e4;
    if (/m$/i.test(text)) return number * 1e6;
    if (/k$/i.test(text)) return number * 1e3;
    return number;
  }
  const formatCount = value => {
    if (typeof value === 'string') return value || '--';
    const amount = count(value);
    if (amount >= 1e6) return `${(amount / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
    if (amount >= 1e3) return `${(amount / 1e3).toFixed(1).replace(/\.0$/, '')}K`;
    return new Intl.NumberFormat('zh-CN').format(amount);
  };
  const likeCount = item => {
    if (item.likes === '' || item.likes === undefined || item.likes === null) return liked.has(item._id) ? '已收藏' : '收藏';
    if (!Number.isFinite(Number.parseFloat(String(item.likes)))) return String(item.likes);
    return liked.has(item._id) ? formatCount(count(item.likes) + 1) : formatCount(item.likes);
  };
  const tabName = raw => {
    const tab = String(raw || '').toLowerCase();
    if (/^(follow|following|favorites|关注|收藏)$/.test(tab)) return 'following';
    if (/^(app|apps|ai-apps|ai应用|应用)$/.test(tab)) return 'apps';
    if (/^(model|models|模型)$/.test(tab)) return 'models';
    if (/^(inspiration|inspirations|灵感)$/.test(tab)) return 'inspiration';
    if (/^(event|events|activity|activities|contest|contests|活动)$/.test(tab)) return 'events';
    return 'all';
  };
  const mediaType = item => item.video || String(item.type || item.kind || '').includes('video') ? 'video' : 'image';
  const cardType = item => String(item.type || item.kind || item.category || '').toLowerCase();

  function likeButton(item, detail = false) {
    const button = make('button', detail ? 'like-button detail-like' : 'like-button');
    button.type = 'button';
    button.dataset.like = item._id;
    const active = liked.has(item._id);
    button.classList.toggle('is-liked', active);
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-label', `${active ? '取消收藏' : '收藏'} ${item.title}`);
    button.append(icon('heart'), make('span', 'like-count', likeCount(item)));
    return button;
  }

  function avatarFor(item) {
    const avatar = make('img', 'avatar');
    avatar.src = safeUrl(item.avatar, '');
    avatar.alt = '';
    avatar.loading = 'lazy';
    avatar.width = 24;
    avatar.height = 24;
    if (!item.avatarFrame) return avatar;
    const wrap = make('span', 'avatar-wrap');
    const frame = make('img', 'avatar-frame');
    frame.src = safeUrl(item.avatarFrame, '');
    frame.alt = '';
    frame.loading = 'lazy';
    wrap.append(avatar, frame);
    return wrap;
  }

  function createCard(item, isContest = false) {
    const article = make('article', `media-card${isContest ? ' contest-card' : ''}${!item.author ? ' link-card' : ''}`);
    article.dataset.itemId = item._id;
    const open = make('button', 'card-open');
    open.type = 'button';
    open.dataset.openCard = item._id;
    open.setAttribute('aria-label', `查看 ${item.title || '作品'} 详情`);
    const imageWrap = make('div', 'card-image');
    if (item.video) {
      const poster = make('img', 'video-poster');
      poster.src = safeUrl(item.image, '');
      poster.alt = item.alt || item.title || '';
      poster.loading = item._source === 'featured' ? 'eager' : 'lazy';
      poster.decoding = 'async';
      imageWrap.append(poster);
      const video = make('video');
      video.poster = safeUrl(item.image, '');
      video.dataset.src = safeUrl(item.video, '');
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'none';
      video.setAttribute('aria-hidden', 'true');
      video.tabIndex = -1;
      imageWrap.append(video);
      observedVideos.add(video);
      observer?.observe(video);
    } else {
      const image = make('img');
      image.src = safeUrl(item.image, '');
      image.alt = item.alt || item.title || '';
      image.loading = item._source === 'featured' ? 'eager' : 'lazy';
      image.decoding = 'async';
      if (item.objectPosition) image.style.objectPosition = item.objectPosition;
      imageWrap.append(image);
    }
    if (item.tag) imageWrap.append(make('span', 'card-tag', item.tag));
    open.append(imageWrap);
    const info = make('div', 'card-info');
    const titleRow = make('div', 'card-title-row');
    titleRow.append(make('h3', 'card-title', item.title || '未命名作品'));
    if (item.rating) {
      const rating = make('span', 'card-rating');
      rating.textContent = String(item.rating);
      titleRow.append(rating);
    }
    info.append(titleRow);
    if (item.author) {
      const meta = make('div', 'card-meta');
      const author = make('span', 'card-author');
      if (item.avatar) author.append(avatarFor(item));
      author.append(make('span', '', item.author));
      const stats = make('span', 'card-stats');
      const views = make('span', 'card-views');
      views.append(icon('eye'), document.createTextNode(formatCount(item.views)));
      views.setAttribute('aria-label', `${formatCount(item.views)} 次浏览`);
      stats.append(views, likeButton(item));
      meta.append(author, stats);
      info.append(meta);
    }
    if (item.subtitle) info.append(make('p', 'card-subtitle', item.subtitle));
    article.append(open, info);
    return article;
  }

  function populate(target, items, isContest = false) {
    if (!target) return;
    target.replaceChildren(...items.map(item => createCard(item, isContest)));
  }

  function sourceForTab() {
    switch (state.tab) {
      case 'following': return library.filter(item => liked.has(item._id));
      case 'apps': return gallery;
      case 'models': return library.filter(item => /model|模型/.test(cardType(item)) || /^(lora|checkpoint)$/i.test(item.tag || ''));
      case 'events': return contests;
      case 'inspiration': return gallery;
      default: return gallery;
    }
  }

  function renderGallery() {
    const container = $('#gallery');
    if (!container) return;
    const query = state.query.trim().toLocaleLowerCase();
    let items = query && state.tab !== 'following' ? library : sourceForTab();
    items = items.filter(item => {
      const haystack = `${item.title || ''} ${item.author || ''} ${item.tag || ''} ${item.subtitle || ''}`.toLocaleLowerCase();
      const desiredKind = String(state.kind).toLowerCase();
      const matchesKind = !desiredKind || ['all', '全部', '作品'].includes(desiredKind)
        || (['image', 'images', '图片'].includes(desiredKind) && mediaType(item) === 'image')
        || (['video', 'videos', '视频'].includes(desiredKind) && mediaType(item) === 'video')
        || (['model', 'models', '模型'].includes(desiredKind) && /model|模型|lora/i.test(`${cardType(item)} ${item.tag || ''}`))
        || (['app', 'apps', '应用', 'ai应用'].includes(desiredKind) && (item._source === 'featured' || /app|应用/.test(cardType(item))))
        || (['user', 'users', '用户', '作者'].includes(desiredKind) && Boolean(item.author));
      return (!query || haystack.includes(query)) && matchesKind && (state.media === 'all' || mediaType(item) === state.media);
    });
    if (['popular', 'hot', '热门'].includes(state.sort)) items = [...items].sort((a, b) => count(b.views) + count(b.likes) - count(a.views) - count(a.likes));
    else if (['latest', 'new', 'newest', '最新'].includes(state.sort)) items = [...items].sort((a, b) => (Date.parse(b.date || b.createdAt) || b._index) - (Date.parse(a.date || a.createdAt) || a._index));
    populate(container, items, state.tab === 'events');
    if (!items.length) {
      const empty = make('div', 'empty-state');
      empty.append(icon('empty'));
      const isFollowing = state.tab === 'following' && !query && !liked.size;
      empty.append(make('h3', '', isFollowing ? '还没有收藏的作品' : '没有找到匹配的作品'));
      empty.append(make('p', '', isFollowing ? '点击作品下方的爱心，即可在这里查看你的本机收藏。' : '试试其他关键词，或清除筛选条件。'));
      if (!isFollowing) {
        const reset = make('button', 'empty-reset', '清除筛选');
        reset.type = 'button';
        reset.dataset.resetAll = '';
        empty.append(reset);
      }
      container.append(empty);
    }
    const label = $('#result-label');
    const labels = { following: '本机收藏', apps: '广场', models: '模型', inspiration: '灵感', events: '活动', all: '广场' };
    if (label) {
      const heading = query ? `“${state.query}”的搜索结果 · ${items.length}` : labels[state.tab] || '广场';
      label.textContent = ['latest', 'new', 'newest', '最新'].includes(state.sort) ? `${heading} · 快照倒序 · 非实时` : heading;
    }
    const clear = $('#clear-search');
    if (clear) clear.hidden = !state.query && !$('#search-input')?.value;
    updateVideoPlayback();
  }

  function setTab(value) {
    state.tab = tabName(value);
    $$('[data-tab]').forEach(button => {
      const active = tabName(button.dataset.tab) === state.tab;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
      if (button.getAttribute('role') === 'tab') button.tabIndex = active ? 0 : -1;
    });
    renderGallery();
  }

  function toggleLike(id) {
    const item = cards.get(id);
    if (!item) return;
    if (liked.has(id)) liked.delete(id);
    else liked.add(id);
    persist();
    $$('[data-like]').filter(button => button.dataset.like === id).forEach(button => {
      button.classList.toggle('is-liked', liked.has(id));
      button.setAttribute('aria-pressed', String(liked.has(id)));
      button.setAttribute('aria-label', `${liked.has(id) ? '取消收藏' : '收藏'} ${item.title}`);
      const amount = $('.like-count', button);
      if (amount) amount.textContent = likeCount(item);
    });
    if (state.tab === 'following') renderGallery();
  }

  function closeCreationMenu() {
    const menu = $('#creation-menu');
    if (menu) menu.hidden = true;
    $('#create-menu-button')?.setAttribute('aria-expanded', 'false');
  }
  function setSidebar(open) {
    document.body.classList.toggle('sidebar-open', open);
    $('#menu-toggle')?.setAttribute('aria-expanded', String(narrow.matches ? open : !document.body.classList.contains('sidebar-collapsed')));
    if ($('#nav-scrim')) $('#nav-scrim').hidden = !open;
    if ($('#sidebar')) $('#sidebar').inert = mobile.matches && !open;
  }
  function closeSearch(restoreFocus = false) {
    const search = $('.search-bar');
    const wasOpen = search?.classList.contains('search-open');
    search?.classList.remove('search-open');
    if (restoreFocus && wasOpen) $('#search-toggle')?.focus({ preventScroll: true });
  }
  function openDialog(dialog) {
    if (!dialog) return;
    closeCreationMenu();
    setSidebar(false);
    if (!dialog.open) dialog.showModal();
    updateVideoPlayback();
  }

  function openDetail(id) {
    const item = cards.get(id);
    const content = $('#detail-content');
    if (!item || !content) return;
    const media = make('div', 'detail-media');
    if (item.video) {
      const video = make('video');
      video.src = safeUrl(item.video, '');
      video.poster = safeUrl(item.image, '');
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', item.title || '作品视频');
      media.append(video);
    } else {
      const image = make('img');
      image.src = safeUrl(item.image, '');
      image.alt = item.alt || item.title || '作品';
      media.append(image);
    }
    const copy = make('div', 'detail-body');
    if (item.tag) copy.append(make('span', 'detail-tag', item.tag));
    const title = make('h2', 'detail-title', item.title || '作品详情');
    title.id = 'detail-title';
    copy.append(title);
    if (item.author) {
      const meta = make('div', 'card-meta detail-author');
      const author = make('span', 'card-author');
      if (item.avatar) author.append(avatarFor(item));
      author.append(document.createTextNode(item.author));
      meta.append(author);
      copy.append(meta);
    }
    copy.append(make('p', 'detail-description', item.description || item.subtitle || '探索 AI 创作的无限可能，从一份灵感开始创作。'));
    const actions = make('div', 'detail-actions');
    actions.append(likeButton(item, true));
    const create = make('button', 'primary-button detail-create', '使用同款');
    create.type = 'button';
    create.dataset.create = mediaType(item);
    create.dataset.prompt = item.prompt || item.title || '';
    actions.append(create);
    copy.append(actions, externalLink('在 SeaArt 查看原作 ↗', item.url || origin));
    copy.append(make('p', 'detail-note', '此页面为首页复刻案例。收藏保存在本机，实际创作请前往 SeaArt。'));
    const layout = make('div', 'detail-layout');
    layout.append(media, copy);
    content.replaceChildren(layout);
    $('#detail-dialog')?.setAttribute('aria-labelledby', 'detail-title');
    openDialog($('#detail-dialog'));
  }

  function openCreate(mode = 'image', prompt) {
    const dialog = $('#create-dialog');
    if (!dialog) return;
    if ($('#detail-dialog')?.open) $('#detail-dialog').close();
    const select = $('#creation-mode');
    if (select) {
      const selected = [...select.options].find(option => option.value === mode);
      select.value = selected ? mode : (mode === 'movies' ? 'video' : 'image');
      if (!select.value) select.selectedIndex = 0;
    }
    const textarea = $('#creation-prompt');
    if (textarea) textarea.value = prompt ?? saved.prompt;
    const feedback = $('#creation-feedback');
    if (feedback) {
      feedback.textContent = '';
      feedback.hidden = true;
    }
    updateCreateSource();
    openDialog(dialog);
    requestAnimationFrame(() => textarea?.focus({ preventScroll: true }));
  }

  function updateCreateSource() {
    const link = $('#creation-source');
    if (link) {
      const paths = { image: '/create/image', video: '/create/video', movies: '/tv', app: '/app-builder' };
      link.href = `https://www.seaart.ai${paths[$('#creation-mode')?.value] || paths.image}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  }

  const information = {
    'help-button': { title: '帮助与支持', text: '此案例复刻 SeaArt 首页的浏览与创作入口。你可以搜索作品、切换分类、预览详情，并将创意保存在本机。', links: [['前往 SeaArt 获取帮助 ↗', origin]] },
    notifications: { title: '通知', text: '本案例未连接 SeaArt 账户，因此无法读取你的通知。你可以前往 SeaArt 查看真实账户通知。', links: [['打开 SeaArt ↗', origin]] },
    messages: { title: '消息', text: '本案例未连接聊天服务。你的私信与会话可在 SeaArt 官方网站中查看。', links: [['前往 SeaArt 查看消息 ↗', origin]] },
    profile: { title: '欢迎来到 SeaArt', text: '探索作品与灵感，开启你的 AI 创作之旅。此案例不收集登录信息，请在 SeaArt 官方网站登录或管理账户。', links: [['前往 SeaArt 登录 ↗', origin]] },
    vip: { title: 'SeaArt 会员', text: '会员权益、价格和可用额度以 SeaArt 官方网站的实时信息为准。', links: [['在 SeaArt 查看会员权益 ↗', origin]] },
    'gift-open': { title: '创作福利', text: '福利活动和领取条件以 SeaArt 官方页面为准。请前往官网查看当前可参与的活动。', links: [['前往 SeaArt 查看活动 ↗', origin]] }
  };

  function openInfo(id) {
    const info = information[id];
    const content = $('#info-content');
    if (!info || !content) return;
    const title = make('h2', 'info-title', info.title);
    title.id = 'info-title';
    content.replaceChildren(title, make('p', 'info-description', info.text));
    const links = make('div', 'info-links');
    for (const [label, href] of info.links) links.append(externalLink(label, href, 'primary-button'));
    content.append(links);
    $('#info-dialog')?.setAttribute('aria-labelledby', 'info-title');
    openDialog($('#info-dialog'));
  }

  function resetFilters(all = false) {
    state.media = 'all';
    $$('[name="media-type"]').forEach(input => { input.checked = input.value === 'all'; });
    if (all) {
      state.query = '';
      state.kind = 'all';
      if ($('#search-input')) $('#search-input').value = '';
      if ($('#search-kind')) $('#search-kind').value = 'all';
    }
    renderGallery();
  }

  function initialize() {
    const data = window.SEAART_DATA || {};
    let serial = 0;
    const ingest = (items, source) => (Array.isArray(items) ? items : []).map(item => {
      const normalized = { ...item, _id: String(item.id || `${source}:${item.title || serial}`), _source: source, _index: serial++ };
      cards.set(normalized._id, normalized);
      return normalized;
    });
    featured = ingest(data.featured, 'featured');
    contests = ingest(data.contests, 'contests');
    gallery = ingest(data.gallery, 'gallery');
    library = [...new Map([...gallery, ...featured, ...contests].map(item => [item._id, item])).values()];
    state.tab = tabName($('[data-tab].active')?.dataset.tab || $('[data-tab][aria-selected="true"]')?.dataset.tab);
    state.sort = $('#sort-select')?.value || 'recommended';
    state.kind = $('#search-kind')?.value || 'all';
    populate($('#featured-track'), featured);
    populate($('#contest-track'), contests, true);
    setTab(state.tab);
    setSidebar(false);
    $$('.nav-item').forEach(item => {
      const label = $('span', item)?.textContent.trim();
      if (label && !item.hasAttribute('aria-label')) item.setAttribute('aria-label', label);
    });

    $('#search-form')?.addEventListener('submit', event => {
      event.preventDefault();
      state.query = $('#search-input')?.value.trim() || '';
      state.kind = $('#search-kind')?.value || 'all';
      renderGallery();
      $('#explore')?.scrollIntoView({ behavior: behavior(), block: 'start' });
      if (mobile.matches) closeSearch();
    });
    $('#search-input')?.addEventListener('input', event => {
      if ($('#clear-search')) $('#clear-search').hidden = !event.target.value && !state.query;
      if (!event.target.value && state.query) { state.query = ''; renderGallery(); }
    });
    $('#search-kind')?.addEventListener('change', event => {
      state.kind = event.target.value;
      if (state.query) renderGallery();
    });
    $('#sort-select')?.addEventListener('change', event => { state.sort = event.target.value; renderGallery(); });
    $$('[name="media-type"]').forEach(input => input.addEventListener('change', () => {
      state.media = input.value;
      renderGallery();
    }));

    const quickInput = $('#quick-prompt');
    const quickSubmit = $('#quick-form [type="submit"]');
    const updateQuick = () => { if (quickSubmit) quickSubmit.disabled = !quickInput?.value.trim(); };
    quickInput?.addEventListener('input', updateQuick);
    updateQuick();
    $('#quick-form')?.addEventListener('submit', event => {
      event.preventDefault();
      if (quickInput?.value.trim()) openCreate('image', quickInput.value.trim());
    });
    $('#creation-prompt')?.addEventListener('input', event => {
      saved.prompt = event.target.value;
      persist();
      const feedback = $('#creation-feedback');
      if (feedback) feedback.hidden = true;
    });
    $('#creation-mode')?.addEventListener('change', updateCreateSource);
    $('#create-form')?.addEventListener('submit', event => {
      event.preventDefault();
      const prompt = $('#creation-prompt');
      const feedback = $('#creation-feedback');
      if (!prompt?.value.trim()) {
        if (feedback) { feedback.textContent = '先写下你想创作的画面。'; feedback.hidden = false; }
        prompt?.focus();
        return;
      }
      saved.prompt = prompt.value.trim();
      const stored = persist();
      if (feedback) {
        feedback.textContent = stored
          ? '创意已保存到本机。此案例为界面演示，可前往 SeaArt 继续创作。'
          : '创意已保留在当前页面。浏览器未允许本机存储，可前往 SeaArt 继续创作。';
        feedback.hidden = false;
      }
    });
    $('#creation-file')?.addEventListener('change', event => {
      const preview = $('#upload-preview');
      if (!preview) return;
      if (uploadUrl) URL.revokeObjectURL(uploadUrl);
      uploadUrl = null;
      preview.replaceChildren();
      const file = event.target.files?.[0];
      preview.hidden = !file;
      if (!file) return;
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        preview.textContent = '请选择图片或视频文件。';
        event.target.value = '';
        return;
      }
      uploadUrl = URL.createObjectURL(file);
      const media = make(file.type.startsWith('video/') ? 'video' : 'img');
      media.src = uploadUrl;
      if (media instanceof HTMLVideoElement) { media.controls = true; media.playsInline = true; }
      else media.alt = `参考图片：${file.name}`;
      preview.append(media, make('span', 'upload-name', file.name), make('span', 'upload-note', '仅在本机预览'));
    });

    $$('dialog').forEach(dialog => {
      dialog.addEventListener('click', event => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
      });
      dialog.addEventListener('close', () => {
        $$('video', dialog).forEach(video => video.pause());
        updateVideoPlayback();
      });
    });

    document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : event.target.parentElement;
      const anchor = target?.closest('a[href]');
      if (anchor) {
        const rawHref = anchor.getAttribute('href');
        try {
          const url = new URL(rawHref, document.baseURI);
          const samePage = rawHref.startsWith('#') || (url.origin === location.origin && url.pathname === location.pathname);
          const destination = samePage && url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
          if (destination) {
            event.preventDefault();
            setSidebar(false);
            destination.scrollIntoView({ behavior: behavior(), block: 'start' });
            if (anchor.classList.contains('skip-link')) {
              destination.tabIndex = -1;
              destination.focus({ preventScroll: true });
            }
            return;
          }
        } catch { /* Invalid links retain native browser behavior. */ }
      }
      const button = target?.closest('button, [data-create], [data-tab], [data-nav-group], [data-info]');
      if (!button) return;
      if (button.hasAttribute('data-info')) { openInfo(button.dataset.info); return; }
      if (button.hasAttribute('data-like')) { toggleLike(button.dataset.like); return; }
      if (button.hasAttribute('data-open-card')) { openDetail(button.dataset.openCard); return; }
      if (button.hasAttribute('data-create')) { event.preventDefault(); openCreate(button.dataset.create, button.dataset.prompt); return; }
      if (button.hasAttribute('data-dialog-close')) { button.closest('dialog')?.close(); return; }
      if (button.hasAttribute('data-tab')) {
        setTab(button.dataset.tab);
        if (button.closest('#sidebar')) {
          setSidebar(false);
          $('#explore')?.scrollIntoView({ behavior: behavior(), block: 'start' });
        }
        return;
      }
      if (button.hasAttribute('data-reset-all')) { resetFilters(true); return; }
      if (button.hasAttribute('data-nav-group')) {
        const id = button.getAttribute('aria-controls') || button.dataset.navGroup;
        const group = document.getElementById(id?.replace(/^#/, ''));
        const expanded = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(expanded));
        if (group) group.hidden = !expanded;
        return;
      }
      if (button.hasAttribute('data-scroll-target')) {
        const track = document.getElementById(button.dataset.scrollTarget.replace(/^#/, ''));
        track?.scrollBy({ left: (Number(button.dataset.direction) || 1) * Math.max(260, track.clientWidth * 0.8), behavior: behavior() });
        return;
      }
      if (information[button.id]) { openInfo(button.id); return; }
      switch (button.id) {
        case 'search-toggle':
          $('.search-bar')?.classList.add('search-open');
          $('#search-input')?.focus({ preventScroll: true });
          break;
        case 'menu-toggle':
          if (narrow.matches) setSidebar(!document.body.classList.contains('sidebar-open'));
          else {
            const collapsed = document.body.classList.toggle('sidebar-collapsed');
            button.setAttribute('aria-expanded', String(!collapsed));
          }
          break;
        case 'nav-scrim': setSidebar(false); break;
        case 'clear-search':
          state.query = '';
          if ($('#search-input')) { $('#search-input').value = ''; $('#search-input').focus(); }
          renderGallery();
          break;
        case 'filter-button': {
          const panel = $('#filter-panel');
          if (panel) { panel.hidden = !panel.hidden; button.setAttribute('aria-expanded', String(!panel.hidden)); }
          break;
        }
        case 'filter-reset': resetFilters(); break;
        case 'gift-close':
          if ($('#gift-banner')) $('#gift-banner').hidden = true;
          document.body.classList.add('banner-closed');
          break;
        case 'create-menu-button': {
          const menu = $('#creation-menu');
          if (menu) { menu.hidden = !menu.hidden; button.setAttribute('aria-expanded', String(!menu.hidden)); }
          break;
        }
        case 'to-top': window.scrollTo({ top: 0, behavior: behavior() }); break;
        default: break;
      }
    });
    // The scrim may be a non-button element in the page shell.
    $('#nav-scrim')?.addEventListener('click', () => setSidebar(false));
    document.addEventListener('pointerdown', event => {
      if (!event.target.closest('#creation-menu, #create-menu-button')) closeCreationMenu();
      if (mobile.matches && !event.target.closest('.search-bar')) closeSearch();
      const panel = $('#filter-panel');
      if (panel && !panel.hidden && !event.target.closest('#filter-panel, #filter-button')) {
        panel.hidden = true;
        $('#filter-button')?.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', event => {
      const currentTab = event.target.closest?.('[role="tab"][data-tab]');
      if (currentTab && ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
        const tabs = $$('[role="tab"][data-tab]', currentTab.parentElement);
        const position = tabs.indexOf(currentTab);
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1
          : (position + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        event.preventDefault();
        setTab(tabs[next].dataset.tab);
        tabs[next].focus();
        return;
      }
      if (event.key !== 'Escape') return;
      closeCreationMenu();
      closeSearch(true);
      if (document.body.classList.contains('sidebar-open')) { setSidebar(false); $('#menu-toggle')?.focus(); }
      if ($('#filter-panel')) $('#filter-panel').hidden = true;
      $('#filter-button')?.setAttribute('aria-expanded', 'false');
    });
    document.addEventListener('visibilitychange', updateVideoPlayback);
    motion.addEventListener('change', updateVideoPlayback);
    narrow.addEventListener('change', () => {
      setSidebar(false);
      if (!narrow.matches) $('#menu-toggle')?.setAttribute('aria-expanded', String(!document.body.classList.contains('sidebar-collapsed')));
    });
    mobile.addEventListener('change', () => {
      setSidebar(false);
      closeSearch();
    });
    window.addEventListener('beforeunload', () => { if (uploadUrl) URL.revokeObjectURL(uploadUrl); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize, { once: true });
  else initialize();
})();
